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
        161~200 -> peoductivity, the amount of generated seed [polygenetic trait]
        201~256 ->  grow speed [polygenic trait]

        *mendilan trait: 
        output is a bool= (bit1|bit2 == 1), recessive trait=false, domminent trait= True
        *polygenetic trait:
        output is uint8, represent the amount of 1 among the corresponding bits
        
About Traits: 
     height(uint): the full grown height of height gene=0 is 60 cm, gene=120 is 180 cm
     width(uint): the full grown width of width gene=0 is 5 mm, gene=120 is 20 mm
     color(uint): I guess I will directly return the gene(cause I don't really know how to present color with 1 dim...)
     It take 2 days to reach full grown for speed gene=0, half day for speed gene = 110
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
    3. a sprout's price = height*width-color/10
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
  //events for debug usage
  event debugStage(uint s);
  
  //If the sprout didn't be plugged and then died, 12 hours later can the grid be added with a new sprout. 
  uint replantTime = 12 hours;
  
  struct sprout {
    uint dna1;
    uint dna2;
    uint planttime;
    uint readytime;//ready to replant
    uint[] pollen;
    bool isset;
    bool seed_plug;
    bool pollen_plug;
    gene g;
  }
  // could be derived from dna1 and dna2
  struct gene {
    uint height_gen;
    uint width_gen;
    uint color;
    uint fullgrown_time;
    uint produce_gen;
    bool seed_yellow;
    bool seed_round;
  }
  
  
  // the mappings
  mapping (address => sprout[5][5]) sprout_list;
  mapping (address => uint) balance;//account

  // the modifiers
  modifier SproutExist(uint x_id, uint y_id){
    require(sprout_list[msg.sender][x_id][y_id].isset, "location does not have sprout");
    _;
  }
  modifier EnoughBuySeed(){
    require(balance[msg.sender]> 300, "not enough money to buy random seed");
    _;
  }
  modifier SeedExist(uint x_id, uint y_id){
    uint now_stage = now.sub(getPlantTime(x_id, y_id));
    uint fullgrown_time = getFullGrownTime(x_id, y_id);
    require(now_stage > fullgrown_time.mul(102).div(100), "too early to have seeds");
    require(!sprout_list[msg.sender][x_id][y_id].seed_plug, "the seeds are already plugged.");
    _;
  }
  modifier PollenExist(uint x_id, uint y_id){
    uint now_stage = now.sub(getPlantTime(x_id, y_id));
    uint fullgrown_time = getFullGrownTime(x_id, y_id);
    require(now_stage > fullgrown_time, "too early to have pollen");
    require(now_stage < fullgrown_time.mul(102).div(100), "too late to have pollen");
    require(!sprout_list[msg.sender][x_id][y_id].pollen_plug, "the pollen are already plugged.");
    _;
  }
  modifier PollenizeReady(uint x_id, uint y_id){
    uint now_stage = now.sub(getPlantTime(x_id, y_id));
    uint fullgrown_time = getFullGrownTime(x_id, y_id);
    require(now_stage > fullgrown_time.mul(101).div(100), "too early to have pollen");
    require(now_stage < fullgrown_time.mul(102).div(100), "too late to have pollen");
    _;
  }

  /* dead and replant function wouldn't work for now, when it's dead all the price, height, width would be 
  0, but you still need to plug it manually*/
  function _triggerReplant(sprout storage _sprout) internal {
    _sprout.readytime = now + replantTime;
  }

  function _isReady(sprout storage _sprout) internal view returns (bool) {
      return (_sprout.readytime <= now);
  }


//get TRAITS
  function getFullGrownTime(uint x_id, uint y_id) internal view returns(uint){
    return sprout_list[msg.sender][x_id][y_id].g.fullgrown_time;
  }
  function getPlantTime(uint x_id,  uint y_id) internal view returns(uint){
    return sprout_list[msg.sender][x_id][y_id].planttime;
  }
  function getHeightGene(uint x_id, uint y_id) internal view returns(uint){
    return sprout_list[msg.sender][x_id][y_id].g.height_gen;
  }
  function getWidthGene(uint x_id, uint y_id) internal view returns(uint){
    return sprout_list[msg.sender][x_id][y_id].g.width_gen;
  }
  // The following traits could be seen from the players
  function getProduceGene(uint x_id, uint y_id) public view SproutExist(x_id, y_id) returns(uint){
    return sprout_list[msg.sender][x_id][y_id].g.produce_gen;
  }
  function getSeedRound(uint x_id, uint y_id) public view SproutExist(x_id, y_id) returns(bool){
    return sprout_list[msg.sender][x_id][y_id].g.seed_round;
  }
  function getSeedYellow(uint x_id, uint y_id) public view SproutExist(x_id, y_id) returns(bool){
    return sprout_list[msg.sender][x_id][y_id].g.seed_round;
  }
  function getColor(uint x_id, uint y_id) public view SproutExist(x_id, y_id) returns(uint){
    return sprout_list[msg.sender][x_id][y_id].g.color;
  }
  function getSproutHeight( uint x_id, uint y_id) public view SproutExist(x_id, y_id) returns(uint){
      uint now_stage = now.sub(getPlantTime(x_id, y_id));
      uint fullgrown_time = getFullGrownTime(x_id, y_id);
      uint height_gen =  getHeightGene(x_id, y_id);
      if(now_stage > fullgrown_time) {
        if((now_stage.sub(fullgrown_time)) < fullgrown_time.div(20)) {//before death
          return (height_gen.add(120)).mul(60).div(120);
        } else{ return 0;} 
      }else{
        if(now_stage==0){ return 0;
        } else{
           return((height_gen.add(120)).mul(60)).mul(fullgrown_time).div(120).div(now_stage);}
      }
  }
  function getSproutWidth( uint x_id, uint y_id) public view SproutExist(x_id, y_id) returns(uint){
    uint now_stage = now.sub(getPlantTime(x_id, y_id));
    uint fullgrown_time = getFullGrownTime(x_id, y_id);
    uint width_gen =getWidthGene(x_id, y_id);
      if(now_stage > fullgrown_time) {
            if((now_stage.sub(fullgrown_time)) < fullgrown_time.div(20)) {//before death
              return (width_gen.add(15)).mul(5).div(15);
            } else{ return 0;} 
        }
        else{
            if(now_stage==0){ return 0;
            } else{
              return((width_gen.add(15)).mul(5)).mul(fullgrown_time).div(15).div(now_stage);}
        }
  }
  function getSproutPrice( uint now_stage, uint fullgrown_time, uint height, uint width, uint x_id, uint y_id) 
    internal view SproutExist(x_id, y_id) returns(uint){
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
              uint price= height.mul(width).sub(color.div(10));
              if(seed_round){ price.add(5);}
              if(seed_yellow){ price.add(5);}
              return price;
            }
        }
  }
    


  
  function addSprout(uint x_id, uint y_id, uint dna1, uint dna2) internal {
    require(sprout_list[msg.sender][x_id][y_id].isset == false);
    require(_isReady(sprout_list[msg.sender][x_id][y_id]));
    gene memory g = gene(0, 0, 0, 0, 0, false, false);
    uint temp1 = dna1;
    uint temp2 = dna2;
    uint speed_gen;

    //determine genes (mendilen traits)
    g.seed_yellow = (((temp1%2) | (temp2%2)) == 1);
    temp1 = temp1 >> 1;temp2 = temp2 >> 1;
    g.seed_round = (((temp1%2) | (temp2 %2)) == 1);
    //determine genes (polygene traits)
    for (uint i =2; i <41; i++){
        if (temp1%2 == 1){g.color = g.color.add(1);}
        if (temp2%2 == 1){g.color = g.color.add(1);}
        temp1 = temp1 >> 1;temp2 = temp2 >> 1;
    }
    for (uint i =41; i <101; i++){
        if (temp1%2 == 1){g.width_gen = g.width_gen.add(1);}
        if (temp2%2 == 1){g.width_gen = g.width_gen.add(1);}
        temp1 = temp1 >> 1;temp2 = temp2 >> 1;
    }
    for (uint i =101; i <161; i++){
        if (temp1%2 == 1){g.height_gen = g.height_gen.add(1);}
        if (temp2%2 == 1){g.height_gen = g.height_gen.add(1);}
        temp1 = temp1 >> 1;temp2 = temp2 >> 1;
    }
    for (uint i =161; i <201; i++){
        if (temp1%2 == 1){g.produce_gen = g.produce_gen.add(1);}
        if (temp2%2 == 1){g.produce_gen = g.produce_gen.add(1);}
        temp1 = temp1 >> 1;temp2 = temp2 >> 1;
    }
    for (uint i =201; i <256; i++){
        if (temp1%2 == 1){speed_gen = speed_gen.add(1);}
        if (temp2%2 == 1){speed_gen = speed_gen.add(1);}
        temp1 = temp1 >> 1;temp2 = temp2 >> 1;
    }
    g.fullgrown_time = ((380-(speed_gen.mul(3).div(2)))/190)* 1 days;

    sprout_list[msg.sender][x_id][y_id] = sprout(dna1, dna2, now, 0, new uint[](0), true, false, false, g);
    emit OnAdd(x_id, y_id, dna1, dna2);
  }
  
  // plant a sprout with random dna  cost $100
  function randomAddSprout(uint x_id, uint y_id) public EnoughBuySeed(){
    uint dna1 = uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty)));
    uint dna2 = uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp)));
    addSprout(x_id, y_id, dna1, dna2);
    balance[msg.sender] = balance[msg.sender].sub(100);
  }
    
  function plugSprout(uint x_id, uint y_id) public SproutExist(x_id, y_id){
      uint now_stage = now.sub(getPlantTime(x_id, y_id));
      uint fullgrown_time = getFullGrownTime(x_id, y_id);
      uint width = getSproutWidth(x_id, y_id);
      uint height = getSproutHeight( x_id, y_id);
      uint price = getSproutPrice(now_stage, fullgrown_time, height, width, x_id, y_id);
      if(sprout_list[msg.sender][x_id][y_id].isset == true){
        sprout_list[msg.sender][x_id][y_id].isset = false;
        balance[msg.sender] = balance[msg.sender].add(price);
      }
      emit OnPlug(x_id, y_id);
    }

}

