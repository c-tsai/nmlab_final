pragma solidity ^0.5.0;

import "./Ownable.sol";
import "./SafeMath.sol";

/*I design the DNA to have two strains(dna1, dna2 uint256), 
    The following is the representative of each gene (in LSB order)
        0 -> seed yellow (dominant), green(recessive) [mendilan trait]
        1 -> seed round (dominant), wrinkled(recessive) [mendilan trait]
        2~40 -> whole color (from pale yellow to dark green) [polygenic trait]
        41~100 ->  stem width [polygenic trait]
        101~160 ->  stem height [polygenic trait]
        161~200 -> productivity, the amount of generated seed [polygenetic trait]
        201~255 ->  grow speed [polygenic trait]

        *mendilan trait: 
        output is a bool= (bit1|bit2 == 1), recessive trait=false, domminent trait= True
        *polygenetic trait:
        output is uint8, represent the amount of 1 among the corresponding bits
        
About Traits: 
     height(uint): the full grown height of height gene=0 is 60 cm, gene=120 is 180 cm (born with height =0)
     width(uint): the full grown width of width gene=0 is 10 mm, gene=120 is 20 mm (born with width =3)
     color(uint):  0 ~ 78
     It take 2 days to reach full grown for speed gene=0, a quarter day for speed gene = 110
     (though the actual game won't be that long because we'd like to plug it up before the sprout get too green and stiff)
     productivity: the amount of seed produced for produce_gen=0 is 10, for produce_gen= 80 is 50
     mendilan trait(bool): directly return the bool 

About Growing:
    1. before the reaching 10% of full growth, the seed would shown, but slowly sinking into ground
        (it's the perfect time to plug the sprout!, giving true for sprout stage (bool))
    2. the color I guess should be turning greener and greener (though I don't really know how to design this part) 
    3. all the growing before full grown is linear
    4. after full grown, it use 5% of the full grown time to die off, all the other feature would remain same in this period
    5. The bean can only be planted at (x, y) where 0 <= x <5, 0 <= y < 5
    6. You can start to have seed after 1.02 full grown time
    7. you can pollen in 1 ~ 1.02 full grown time, the amount of pollen for all beanstalks are always 10
    8. you can pollenize in 1.01 ~1.02 full grown time

About price:
    1. plug a non-sprout stage bean stalk get $10
    2. plug a dying stage bean stalk get $5
    3. a sprout's price = height*width//(color//4 + 1)
    4. price +5 if bean is round
    5. price +5 if bean is yellow  



Notes:
    1. The reason I have such a lengthy design for the whole bean lifespan is because I originally thought of designing the 
        feature of the whole reproducing process and maybe cultivate or trading seeds(which I don't really know if we have time for)
        If it would be implemented, there's definately more parameter to be set.
    3. I'm also thinking of some level up species could be represented as mendilen trait
        (which would be always 1/0 before reaching a certain level)
    4. In addition to the current polygene traits, I'm also consider adding some other such as disease resistence, productivity, etc.
    5. Feel free to let me know if you think any design is impractical or what parameter is wierd or any other helpful advice :)

Updates:
    1. the getSproutLook function is substitute with getColor, getSproutHeight, getSproutWidth, getSproutPrice,
    getSeedYellow, getSeedRound. Each of these functions is a view public function, which must be workable in 
    without using Event feature.
    2. The cost of the randomAdd is $300

    
*/
contract Sprout is Ownable {

  using SafeMath for uint256;

  event OnAdd(uint x_id, uint y_id, uint dna1, uint dna2);
  event OnPlug(uint x_id, uint y_id);
  event OnItemAdded(uint Id);
  event OnItemDeleted(uint Id);
  event OnRegister(address account);
  //events for debug usage
  event debugStage(uint s);
  
  
  struct sprout_dna {
    uint dna1;
    uint dna2;
  }
  struct sproutt {
    uint planttime;
    uint[] pollen;
    bool isset;
  }
  struct plugging {
    bool seed_plug;
    bool pollen_plug;
  }
  struct Item {
    string itemName;
    uint num;
    uint[] content;
    bool isValid;
  }
  
  // the mappings
  mapping (address => sprout_dna[5][5]) sprout_list_dna;
  mapping (address => sproutt[5][5]) sprout_list_t;
  mapping (address => plugging[5][5]) sprout_list_plugging;
  mapping (address => uint) balance;//account
  mapping (address => Item[]) _ItemList;
  
  // the modifiers
  modifier SproutExist(uint x_id, uint y_id){
    require(sprout_list_t[msg.sender][x_id][y_id].isset, "location does not have sprout");
    _;
  }
  modifier EnoughBuySeed(){
    require(balance[msg.sender]> 300, "not enough money to buy random seed");
    _;
  }
  modifier SeedExist(uint x_id, uint y_id, uint time){
    uint now_stage = time.sub(getPlantTime(x_id, y_id));
    uint fullgrown_time = getFullGrownTime(x_id, y_id);
    require(now_stage > fullgrown_time.mul(102).div(100), "too early to have seeds");
    require(!sprout_list_plugging[msg.sender][x_id][y_id].seed_plug, "the seeds are already plugged.");
    _;
  }
  modifier PollenExist(uint x_id, uint y_id, uint time){
    uint now_stage = time.sub(getPlantTime(x_id, y_id));
    uint fullgrown_time = getFullGrownTime(x_id, y_id);
    require(now_stage > fullgrown_time, "too early to have pollen");
    require(now_stage < fullgrown_time.mul(102).div(100), "too late to have pollen");
    require(!sprout_list_plugging[msg.sender][x_id][y_id].pollen_plug, "the pollen are already plugged.");
    _;
  }
  modifier PollenizeReady(uint x_id, uint y_id, uint time){
    uint now_stage = time.sub(getPlantTime(x_id, y_id));
    uint fullgrown_time = getFullGrownTime(x_id, y_id);
    require(now_stage > fullgrown_time.mul(101).div(100), "too early to have pollen");
    require(now_stage < fullgrown_time.mul(102).div(100), "too late to have pollen");
    _;
  }
  modifier isValidItem(uint _Id) {
      require(isItemValid(_Id), "item must be valid to call");
      _;
  }
  modifier isSeedItem(uint _Id){
      uint temp1 = uint(keccak256(abi.encodePacked(_ItemList[msg.sender][_Id].itemName)));
      uint temp2 = uint(keccak256(abi.encodePacked("seed")));
      require(temp1 == temp2, "not a seed item");
      _;
  }
  modifier isPollenItem(uint _Id){
      uint temp1 = uint(keccak256(abi.encodePacked(_ItemList[msg.sender][_Id].itemName)));
      uint temp2 = uint(keccak256(abi.encodePacked("pollen")));
      require(temp1 == temp2, "not a pollen item");
      _;
  }



//get TRAITS
  function getFullGrownTime(uint x_id, uint y_id) public view returns(uint){
    uint point = 2**201;
    uint speed_gen = 0;
    for (uint i =201; i <256; i++){
        if (((sprout_list_dna[msg.sender][x_id][y_id].dna1) & point) == point){speed_gen = speed_gen.add(1);}
        if (((sprout_list_dna[msg.sender][x_id][y_id].dna2) & point) == point){speed_gen = speed_gen.add(1);}
        point = point >> 1;
    }
    return (2 days) - (speed_gen.mul(7 days).div(880));
  }
  function getPlantTime(uint x_id,  uint y_id) internal view returns(uint){
    return sprout_list_t[msg.sender][x_id][y_id].planttime;
  }
  function getHeightGene(uint x_id, uint y_id) internal view returns(uint){
    uint point = 2**101;
    uint height_gen = 0;
    for (uint i =101; i <161; i++){
        if (((sprout_list_dna[msg.sender][x_id][y_id].dna1) & point) == point){height_gen = height_gen.add(1);}
        if (((sprout_list_dna[msg.sender][x_id][y_id].dna2) & point) == point){height_gen = height_gen.add(1);}
        point = point >> 1;
    }
    return height_gen;
  }
  function getWidthGene(uint x_id, uint y_id) internal view returns(uint){
    uint point = 2**41;
    uint width_gen = 0;
    for (uint i =41; i <101; i++){
        if (((sprout_list_dna[msg.sender][x_id][y_id].dna1) & point) == point){width_gen = width_gen.add(1);}
        if (((sprout_list_dna[msg.sender][x_id][y_id].dna2) & point) == point){width_gen = width_gen.add(1);}
        point = point >> 1;
    }
    return width_gen;
  }
  // The following traits could be seen from the players
  function getGrownTime(uint x_id, uint y_id, uint time) public view SproutExist(x_id, y_id) returns(uint){
    return (time-getPlantTime(x_id, y_id));
  }
  function getProduceGene(uint x_id, uint y_id) public view SproutExist(x_id, y_id) returns(uint){
    uint point = 2**161;
    uint produce_gen = 0;
    for (uint i =161; i <201; i++){
        if (((sprout_list_dna[msg.sender][x_id][y_id].dna1) & point) == point){produce_gen = produce_gen.add(1);}
        if (((sprout_list_dna[msg.sender][x_id][y_id].dna2) & point) == point){produce_gen = produce_gen.add(1);}
        point = point >> 1;
    }
    return produce_gen;
  }
  function getSeedPlug(uint x_id, uint y_id)  public view SproutExist(x_id, y_id) returns(bool){
    return sprout_list_plugging[msg.sender][x_id][y_id].seed_plug;
  }
  function getSeedRound(uint x_id, uint y_id) public view SproutExist(x_id, y_id) returns(bool){
    return (((sprout_list_dna[msg.sender][x_id][y_id].dna1)&2== 2) || ((sprout_list_dna[msg.sender][x_id][y_id].dna2)&2 == 2));
  }
  function getSeedYellow(uint x_id, uint y_id) public view SproutExist(x_id, y_id) returns(bool){
    return  (((sprout_list_dna[msg.sender][x_id][y_id].dna1%2) | (sprout_list_dna[msg.sender][x_id][y_id].dna2%2)) > 0);
  }
  function getColor(uint x_id, uint y_id) public view SproutExist(x_id, y_id) returns(uint){
    uint point = 2**2;
    uint color = 0;
    for (uint i =2; i <41; i++){
        if (((sprout_list_dna[msg.sender][x_id][y_id].dna1) & point) == point){color = color.add(1);}
        if (((sprout_list_dna[msg.sender][x_id][y_id].dna2) & point) == point){color = color.add(1);}
        point = point >> 1;
    }
    return color;
  }
  function getSproutHeight( uint x_id, uint y_id, uint time) public view SproutExist(x_id, y_id) returns(uint){
      uint now_stage = time.sub(getPlantTime(x_id, y_id));
      uint fullgrown_time = getFullGrownTime(x_id, y_id);
      uint height_gen =  getHeightGene(x_id, y_id);
      if(now_stage > fullgrown_time) {
        if((now_stage.sub(fullgrown_time)) < fullgrown_time.div(20)) {//before death
          return height_gen.add(60);
        } else{ return 0;} 
      }else{
        if(now_stage==0){ return 0;
        } else{
           return (height_gen.add(60)).mul(now_stage).div(fullgrown_time);}
      }
  }
  function getSproutWidth( uint x_id, uint y_id, uint time) public view SproutExist(x_id, y_id) returns(uint){
    uint now_stage = time.sub(getPlantTime(x_id, y_id));
    uint fullgrown_time = getFullGrownTime(x_id, y_id);
    uint width_gen =getWidthGene(x_id, y_id);
      if(now_stage > fullgrown_time) {
            if((now_stage.sub(fullgrown_time)) < fullgrown_time.div(20)) {//before death
              return (width_gen.add(120)).div(12).add(3);
            } else{ return 0;} 
        }
        else{
            if(now_stage==0){ return 0;
            } else{
              return (width_gen.add(120)).mul(now_stage).div(fullgrown_time.mul(12)).add(3);}
        }
  }
  function getSproutPrice( uint now_stage, uint fullgrown_time, uint height, uint width, uint x_id, uint y_id) 
    public view SproutExist(x_id, y_id) returns(uint){
      uint color = getColor(x_id, y_id);
      bool seed_yellow = getSeedYellow(x_id, y_id);
      bool seed_round = getSeedRound(x_id, y_id);
      if(now_stage > fullgrown_time) {
            if((now_stage.sub(fullgrown_time)) < fullgrown_time.div(20)) {//before death
              return 5;
            } else{ return 0;} 
        }
        else{
            if(now_stage==0){ return 2;
            } else{
              uint price= height.mul(width).div(color.div(4).add(1));
              if(seed_round){ price.add(5);}
              if(seed_yellow){ price.add(5);}
              return price;
            }
        }
  }
    


  
  /*function addSprout(uint x_id, uint y_id, uint dna1, uint dna2, uint time) internal  {
    //sprout_list[msg.sender][x_id][y_id] = sprout(dna1, dna2, now, 0, new uint[](0), true, false, false);
    //sprout_list_dna[msg.sender][x_id][y_id] = sprout_dna(dna1, dna2);
    sprout_list_t[msg.sender][x_id][y_id] = sproutt(time, new uint[](0), true);
    //sprout_list_plugging[msg.sender][x_id][y_id] = plugging(false, false);
    emit OnAdd(x_id, y_id, dna1, dna2);
  }*/

  function addSprout1(uint x_id, uint y_id, uint dna1, uint dna2) public {
    sprout_list_dna[msg.sender][x_id][y_id] = sprout_dna(dna1, dna2);
  }

  function addSprout2(uint x_id, uint y_id, uint time) public {
    sprout_list_t[msg.sender][x_id][y_id] = sproutt(time, new uint[](0), true);
  }

  function addSprout3(uint x_id, uint y_id, uint dna1, uint dna2) public {
    sprout_list_plugging[msg.sender][x_id][y_id] = plugging(false, false);
    balance[msg.sender] = balance[msg.sender].sub(300);
    emit OnAdd(x_id, y_id, dna1, dna2);
  }

  function addSprout4plantSeed(uint x_id, uint y_id, uint dna1, uint dna2) public {
    sprout_list_plugging[msg.sender][x_id][y_id] = plugging(false, false);
    emit OnAdd(x_id, y_id, dna1, dna2);
  }
  // plant a sprout with random dna  cost $300
  /*function randomAddSprout(uint x_id, uint y_id) public EnoughBuySeed(){
    /*uint dna1 = uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty)));
    uint dna2 = uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp)));
    addSprout(x_id, y_id, dna1, dna2);
    addSprout(x_id, y_id, 2**256-2**40, 2**256-2**40);//for testing
    balance[msg.sender] = balance[msg.sender].sub(300);
  }*/
    
  function plugSprout(uint x_id, uint y_id, uint price) public SproutExist(x_id, y_id){
      if(sprout_list_t[msg.sender][x_id][y_id].isset == true){
        sprout_list_t[msg.sender][x_id][y_id].isset = false;
        balance[msg.sender] = balance[msg.sender].add(price);
      }
      emit OnPlug(x_id, y_id);
  }

  function balanceOf(address account) public view returns (uint256) {
        return balance[account];
  }
  function transfer(address account, uint amount) public{
        balance[account] = balance[account]+amount;
  }

  // when a player enter the game, he or she should be registered by the contract owner (us) first
  function Register(address new_player) public onlyOwner(){
        balance[new_player] = 1000;
        emit OnRegister(new_player);
    }
    //when you plug the pollen from a beanstalk, it's immediately add to your item list
    /*function PlugPollen(uint x_id, uint y_id) public SproutExist(x_id, y_id) PollenExist(x_id, y_id){
        sprout_list_plugging[msg.sender][x_id][y_id].pollen_plug = true;
        addItem("pollen", 10, new uint[](0));
        uint _Id = _ItemList[msg.sender].length -1;
        _ItemList[msg.sender][_Id].content.push(sprout_list_dna[msg.sender][x_id][y_id].dna1);
        _ItemList[msg.sender][_Id].content.push(sprout_list_dna[msg.sender][x_id][y_id].dna2);
    }
    // The seed Items could be used to plant a new sprout at (x_id, y_id)
    function UsePollenItem(uint x_id, uint y_id, uint _Id) public 
    isValidItem(_Id) isPollenItem( _Id) SproutExist(x_id, y_id) PollenizeReady(x_id, y_id){
        if(!sprout_list_plugging[msg.sender][x_id][y_id].pollen_plug){
            sprout_list_t[msg.sender][x_id][y_id].pollen.push(sprout_list_dna[msg.sender][x_id][y_id].dna1);
            sprout_list_t[msg.sender][x_id][y_id].pollen.push(sprout_list_dna[msg.sender][x_id][y_id].dna2);
        }
        sprout_list_t[msg.sender][x_id][y_id].pollen.push(_ItemList[msg.sender][_Id].content[0]);
        sprout_list_t[msg.sender][x_id][y_id].pollen.push(_ItemList[msg.sender][_Id].content[1]);
    }


    //when you plug the seeds from a beanstalk, it's immediately add to your item list
    function PlugSeed(uint x_id, uint y_id) public SproutExist(x_id, y_id) SeedExist(x_id, y_id){
        sprout_list_plugging[msg.sender][x_id][y_id].seed_plug = true;
        uint num = getProduceGene(x_id, y_id).div(2).add(10);
        addItem("seed", num, new uint[](0));
        uint _Id = _ItemList[msg.sender].length -1;
        _ItemList[msg.sender][_Id].content.push(sprout_list_dna[msg.sender][x_id][y_id].dna1);
        _ItemList[msg.sender][_Id].content.push(sprout_list_dna[msg.sender][x_id][y_id].dna2);
        if(!sprout_list_plugging[msg.sender][x_id][y_id].pollen_plug){
            _ItemList[msg.sender][_Id].content.push(sprout_list_dna[msg.sender][x_id][y_id].dna1);
            _ItemList[msg.sender][_Id].content.push(sprout_list_dna[msg.sender][x_id][y_id].dna2);
        }
        uint len = sprout_list_t[msg.sender][x_id][y_id].pollen.length;
        for (uint i=0; i < len ; i++){
            _ItemList[msg.sender][_Id].content.push(sprout_list_t[msg.sender][x_id][y_id].pollen[i]);
        }
    }
    // The seed Items could be used to plant a new sprout at (x_id, y_id)
    function UseSeedItem(uint x_id, uint y_id, uint _Id) public isValidItem(_Id) isSeedItem( _Id){
        uint num = (_ItemList[msg.sender][_Id].content.length.div(2)).sub(1);
        uint num_f = uint(keccak256(abi.encodePacked(block.timestamp))) % (num);
        uint rand_m = uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty)));
        uint rand_f = uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp)));
        uint dna1 = rand_m & (_ItemList[msg.sender][_Id].content[0]);
        dna1 = dna1.add(~rand_m & (_ItemList[msg.sender][_Id].content[1]));
        uint dna2 = rand_f & (_ItemList[msg.sender][_Id].content[num_f.mul(2).add(2)]);
        dna2 = dna2.add(~rand_f & (_ItemList[msg.sender][_Id].content[num_f.mul(2).add(3)]));
        addSprout(x_id, y_id, dna1, dna2);
        spendItem(_Id, 1);
    }*/
    //Basic functions for showing list
    function isItemValid(uint _Id) public view returns(bool isValid) {
        return _ItemList[msg.sender][_Id].isValid;
    }
    function getItemNum(uint _Id) public view isValidItem(_Id) returns(uint) {
        return _ItemList[msg.sender][_Id].num;
    }
    function getItem(uint _Id) public view isValidItem(_Id) returns(string memory, uint) {
        return (_ItemList[msg.sender][_Id].itemName, _ItemList[msg.sender][_Id].num);
    }

    function getItemList() public view returns(uint[] memory, uint[] memory) {
        uint len;
        uint[] memory valids;

        (valids, len) = _getValidItems();

        uint[] memory ids = new uint[](len);
        uint[] memory nums = new uint[](len);
        for (uint i = 0; i < len; i++) {
            uint id = valids[i];
            ids[i] = id;
            nums[i] = _ItemList[msg.sender][id].num;
        }
        return (ids, nums);
    }



    // private function
    // add all kinds of Item in general
    function addItem(string memory itemName, uint num, uint[] memory content) internal {
        Item memory item = Item(itemName, num, content, true);
        uint Id = _ItemList[msg.sender].push(item) - 1;

        emit OnItemAdded(Id);
    }
    //remove some number of the Item
    function spendItem(uint _Id, uint num) internal isValidItem(_Id){
        require(num <= getItemNum(_Id), "not enough item");
        if (num == getItemNum(_Id)){deleteItem(_Id);}
        else{_ItemList[msg.sender][_Id].num -= num;}
    }
    // remove the whole Item
    function deleteItem(uint _Id) internal isValidItem(_Id) {
        _ItemList[msg.sender][_Id].isValid = false;

        emit OnItemDeleted(_Id);
    }

    function _getValidItems() private view returns(uint[] memory valids, uint length) {
        uint[] memory validItems = new uint[](_ItemList[msg.sender].length);
        uint count = 0;
        for (uint i = 0; i < _ItemList[msg.sender].length; i++) {
            if (isItemValid(i)) {
                validItems[count] = i;
                count++;
            }
        }
        return(validItems, count);
    }
}

