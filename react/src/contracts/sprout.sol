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
    bool isset;
  }
 
  struct trait{
    bool seed_yellow;
    bool seed_round;
    bool sprout_stage;
    uint height;
    uint width;
    uint price;
    uint color;
    uint height_gen;
    uint width_gen;
    uint speed_gen;
    uint fullgrown_time;
    uint now_stage;
  }
  
  sprout[] public sprouts;//store sprout id
  
  mapping (address => sprout[5][5]) sprout_list;
  mapping (address => uint) balance;//account

  modifier SproutExist(uint x_id, uint y_id){
    require(sprout_list[msg.sender][x_id][y_id].isset, "location does not exist");
    _;
  }
  
  function _triggerReplant(sprout storage _sprout) internal {
    _sprout.readytime = now + replantTime;
  }

  function _isReady(sprout storage _sprout) internal view returns (bool) {
      return (_sprout.readytime <= now);
  }

  function getBalance() public view returns (uint){
    return balance[msg.sender];
  }
  
  function addSprout(uint x_id, uint y_id, uint dna1, uint dna2) internal {
    require(sprout_list[msg.sender][x_id][y_id].isset == false);
    require(_isReady(sprout_list[msg.sender][x_id][y_id]));
    sprout_list[msg.sender][x_id][y_id] = sprout(dna1, dna2, now, 0, true);
    emit OnAdd(x_id, y_id, dna1, dna2);
  }
  
  function randomAddSprout(uint x_id, uint y_id) public {
    uint dna1 = uint(keccak256(abi.encodePacked(block.timestamp)));
    uint dna2 = uint(keccak256(abi.encodePacked(block.difficulty)));
    addSprout(x_id, y_id, dna1, dna2);
  }
  
  function getSproutLook( uint x_id, uint y_id)  public /*SproutExist(x_id, y_id)*/ 
    returns(bool seed_yellow, bool seed_round, uint height, uint width, uint color, uint price) {
        emit debugStage(0);
        trait memory t;
        uint temp1 = sprout_list[msg.sender][x_id][y_id].dna1;
        uint temp2 = sprout_list[msg.sender][x_id][y_id].dna2;
        uint plantime = sprout_list[msg.sender][x_id][y_id].planttime;

        //determine genes (mendilen traits)
        emit debugStage(1);
        t.seed_yellow = (((temp1%2) | (temp2%2)) == 1);
        temp1 = temp1 >> 1;temp2 = temp2 >> 1;
        t.seed_round = (((temp1%2) | (temp2 %2)) == 1);
        temp1 = temp1 >> 1;temp2 = temp2 >> 1;

        //determine genes (polygene traits)
        emit debugStage(2);
        for (uint i =2; i <41; i++){
            if (temp1%2 == 1){t.color = t.color.add(1);}
            if (temp2%2 == 1){t.color = t.color.add(1);}
            temp1 = temp1 >> 1;temp2 = temp2 >> 1;
        }
        for (uint i =41; i <101; i++){
            if (temp1%2 == 1){t.width_gen = t.width_gen.add(1);}
            if (temp2%2 == 1){t.width_gen = t.width_gen.add(1);}
            temp1 = temp1 >> 1;temp2 = temp2 >> 1;
        }
        for (uint i =101; i <161; i++){
            if (temp1%2 == 1){t.height_gen = t.height_gen.add(1);}
            if (temp2%2 == 1){t.height_gen = t.height_gen.add(1);}
            temp1 = temp1 >> 1;temp2 = temp2 >> 1;
        }
        for (uint i =161; i <256; i++){
            if (temp1%2 == 1){t.speed_gen = t.speed_gen.add(1);}
            if (temp2%2 == 1){t.speed_gen = t.speed_gen.add(1);}
            temp1 = temp1 >> 1;temp2 = temp2 >> 1;
        }

        //determine growing stage
        emit debugStage(3);
        t.fullgrown_time = ((380-(t.speed_gen.mul(3).div(2)))/190)* 1 days;
        t.now_stage = now.sub(plantime);
        t.sprout_stage = (t.now_stage < t.fullgrown_time.div(10));
        //determine height width die_stage
       if(t.now_stage > t.fullgrown_time) {
            if((t.now_stage.sub(t.fullgrown_time)) < t.fullgrown_time.div(20)){//before death
              t.price = 50;
              t.height = ((t.height_gen.add(120)).mul(60)).div(120);
              t.width = ((t.width_gen.add(15)).mul(5)).div(15);
            }
            else{
              sprout_list[msg.sender][x_id][y_id].isset = false;//die
              _triggerReplant(sprout_list[msg.sender][x_id][y_id]);
              return (false, false, 0, 0, 0, 0);
            } 
        }
        else{
            if(t.now_stage==0){
              t.height = 0;
              t.width = 0;
            } else{
              t.height = ((t.height_gen.add(120)).mul(60)).mul(t.fullgrown_time).div(120).div(t.now_stage);
              t.width = ((t.width_gen.add(15)).mul(5)).mul(t.fullgrown_time).div(15).div(t.now_stage); 
            }
            if(t.sprout_stage == true){t.price = 250;}
            else{t.price = 100;}
        }

        return (t.seed_yellow, t.seed_round, t.height, t.width, t.color, t.price);
        
    }
    
    function plugSprout(uint x_id, uint y_id) public {
        bool seed_yellow;
        bool seed_round;
        uint height;
        uint width;
        uint color;
        uint price;
        (seed_yellow, seed_round, height, width, color, price) = getSproutLook(x_id,  y_id);
        if(sprout_list[msg.sender][x_id][y_id].isset == true){
          sprout_list[msg.sender][x_id][y_id].isset = false;
          balance[msg.sender] = balance[msg.sender].add(price);
         }
         emit OnPlug(x_id, y_id);
      }

}