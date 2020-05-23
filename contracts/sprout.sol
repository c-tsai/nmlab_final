pragma solidity ^0.5.0;

import "./ownable.sol";
import "./safemath.sol";

/*I design the DNA to have two strains(dna1, dna2 uint256), 
    The following is the representative of each gene (in LSB order)
        0 -> seed yellow (dominant), green(recessive) [mendilan trait]
        1 -> seed round (dominant), wrinkled(recessive) [mendilan trait]
        2~40 -> whole color (from pale yellow to dark green) [polygenic trait]
        41~100 ->  stem width [polygenic trait]
        101~160 ->  stem height [polygenic trait]
        161~256 ->  grow speed [polygenic trait]

        *mendilan trait: 
        output is a bool= (bit1|bit2 == 1), recessive trait=false, domminent trait= True
        *polygenetic trait:
        output is uint8, represent the amount of 1 among the corresponding bits
        
About Traits:
     height(uint): the full grown height of height gene=0 is 60 cm, gene=120 is 180 cm
     width(uint): the full grown width of width gene=0 is 5 mm, gene=120 is 20 mm
     color(uint): I guess I will directly return the gene(cause I don't really know how to present color with 1 dim...)
     It take 2 days to reach full grown for speed gene=0, half day for speed gene = 190
     (though the actual game won't be that long because we'd like to plug it up before the sprout get too green and stiff)
     mendilan trait(bool): directly return the bool 

About Growing:
    1. before the reaching 10% of full growth, the seed would shown, but slowly sinking into ground
        (it's the perfect time to plug the sprout!, giving true for sprout stage (bool))
    2. the color I guess should be turning greener and greener (though I don't really know how to design this part) 
    3. all the growing before full grown is linear
    4. after full grown, it use 5% of the full grown time to die off, all the other feature would remain same in this period
        (represent by another uint die_stage, det defaultly highest to 10)
    5. The bean can only be planted at (x, y) where 0 <= x <10, 0 <= y < 10



Notes:
    1. The reason I have such a lengthy design for the whole bean lifespan is because I originally thought of designing the 
        feature of the whole reproducing process and maybe cultivate or trading seeds(which I don't really know if we have time for)
        If it would be implemented, there's definately more parameter to be set.
    3. I'm also thinking of some level up species could be represented as mendilen trait
        (which would be always 1/0 before reaching a certain level)
    4. In addition to the current polygene traits, I'm also consider adding some other such as disease resistence, productivity, etc.
    5. Feel free to let me know if you think any design is impractical or what parameter is wierd or any other helpful advice :)


    
*/
contract Sprout is Ownable {

  using SafeMath for uint256;
  using SafeMath8 for uint8;

  event OnAdd(uint sproutId, uint x_id, uint y_id, uint dna1, uint dna2);
  event OnPlug(uint sproutId, uint x_id, uint y_id);

  uint replantTime = 12 hours;
  
  struct Sprout {
    uint dna1;
    uint dna2;
    uint planttime;
    uint readytime;
    bool isset;
  }
 
  Sprout[] public sprouts;
  
  mapping (uint => address) public sproutToOwner;
  mapping (address => Sprout[10][10]) sprout_list;
  mapping (address => uint) balance;

  modifier SproutExist(uint x_id, uint y_id){
    require(sprout_list[msg.sender][x_id][y_id].isset, "location does not exist");
    _;
  }
  
  function _triggerReplant(Sprout storage _sprout) internal {
    _sprout.readytime = now + replantTime;
  }

  function _isReady(Sprout storage _sprout) internal view returns (bool) {
      return (_sprout.readytime <= now);
  }
  
  function addSprout(uint x_id, uint y_id, uint dna1, uint dna2) internal {
    require(sprout_list[msg.sender][x_id][y_id].isset == false);
    require(_isReady(sprout_list[msg.sender][x_id][y_id]));
    uint id = sprouts.push(Sprout(dna1, dna2, now, 0, true)) - 1;
    sproutToOwner[id] = msg.sender;
    sprout_list[msg.sender][x_id][y_id] = Sprout(dna1, dna2, now, 0, true);
    emit OnAdd(id, x_id, y_id, dna1, dna2);
  }
  
  function randomAddSprout(uint x_id, uint y_id) public {
    uint dna1 = uint256(keccak256(block.timestamp, block.difficulty));
    uint dna2 = uint256(keccak256(block.difficulty, block.timestamp));
    addSprout(x_id, y_id, dna1, dna1);
  }
  
  function getSproutLook(address owner, uint x_id, uint y_id) public view SproutExist(x_id, y_id) 
    returns(bool seed_yellow, bool seed_round, uint8 height, uint8 width, uint8 color, uint price) {
        uint8 color;
        uint8 height;
        uint8 width;
        uint price;
        uint8 height_gen= 0;
        uint8 width_gen= 0;
        uint8 speed_gen= 0;
        uint temp1 = sprout_list[owner][x_id][y_id].dna1;
        uint temp2 = sprout_list[owner][x_id][y_id].dna2;

        //determine genes (mendilen traits)
        bool seed_yellow = (((temp1%2) | (temp2%2)) == 1);
        temp1 = temp1 >> 1;temp2 = temp2 >> 1;
        bool seed_round = (((temp1%2) | (temp2%2)) == 1);
        temp1 = temp1 >> 1;temp2 = temp2 >> 1;

        //determine genes (polygene traits)
        for (uint i =2; i <41; i++){
            if (temp1%2 == 1){color++;}
            if (temp2%2 == 1){color++;}
            temp1 = temp1 >> 1;temp2 = temp2 >> 1;
        }
        for (uint i =41; i <101; i++){
            if (temp1%2 == 1){width_gen++;}
            if (temp2%2 == 1){width_gen++;}
            temp1 = temp1 >> 1;temp2 = temp2 >> 1;
        }
        for (uint i =101; i <161; i++){
            if (temp1%2 == 1){height_gen++;}
            if (temp2%2 == 1){height_gen++;}
            temp1 = temp1 >> 1;temp2 = temp2 >> 1;
        }
        for (uint i =161; i <256; i++){
            if (temp1%2 == 1){speed_gen++;}
            if (temp2%2 == 1){speed_gen++;}
            temp1 = temp1 >> 1;temp2 = temp2 >> 1;
        }

        //determine growing stage
        uint fullgrown_time = ((380.sub(speed_gen.mul(1.5))).div(190)) * 1 days;
        uint now_stage = now.sub(sprout_list[owner][x_id][y_id].planttime);
        bool sprout_stage = (now_stage < fullgrown_time.div(10));
        //determine height width die_stage
        if(now_stage > fullgrown_time) {
            if((now_stage.sub(fullgrown_time)) < fullgrown_time.div(20)){
              price = 50;
              height = ((height_gen.add(120)).mul(60)).div(120);
              width = ((width_gen.add(15)).mul(5)).div(15);
            }
            else{
              sprout_list[owner][x_id][y_id].isset = false;
              _triggerReplant(sprout_list[owner][x_id][y_id]);
              return(false, false, 0, 0, 0, 0);
            } 
        }
        else{
            height = ((height_gen.add(120)).mul(60)).mul(fullgrown_time).div(120).div(now_stage);
            width = ((width_gen.add(15)).mul(5)).mul(fullgrown_time).div(15).div(now_stage);
            if(sprout_stage == true){price = 250;}
            else{price = 100;}
        }

        return (seed_yellow, seed_round, height, width, color, price);
    }
    
    function plugSprout(uint sproutId, uint x_id, uint y_id) external {
        require (msg.sender == sproutToOwner[sproutId]);
        bool seed_yellow;
        bool seed_round;
        uint8 height;
        uint8 width;
        uint8 color;
        uint price;
        (seed_yellow, seed_round, height, width, color, price) = getSproutLook(msg.sender, x_id,  y_id);
        if(sprout_list[msg.sender][x_id][y_id].isset == true){
          sprout_list[msg.sender][x_id][y_id].isset = false;
          balance[msg.sender] = balance[msg.sender].add(price);
         }
         emit OnPlug(sproutId, x_id, y_id);
      }

}
