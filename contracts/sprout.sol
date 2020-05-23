pragma solidity ^0.5.0;

import "./ownable.sol";
import "./safemath.sol";

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
    uint readytime = 0;
    bool isset;
  }
 
  Sprout[] public sprouts;
  
  mapping (uint => address) public sproutToOwner;
  mapping (address => Sprout[10][10]) sprout_list;
  mapping (address => uint) balance;

  modifier SproutExist(uint x_id, uint y_id){
    require(sprout_map[msg.sender][x_id][y_id].isset, "location does not exist");
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
  
  function getSproutLook(address owner, uint x_id, uint y_id) external view SproutExist(x_id, y_id) 
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
        uint fullgrown_time = (380.sub(speed_gen.mul(1.5)) days).div(190);
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
        seed_yellow, seed_round, height, width, color, price = getSproutLook(msg.sender, x_id,  y_id);
        if(sprout_list[msg.sender][x_id][y_id].isset == true){
          sprout_list[msg.sender][x_id][y_id].isset = false;
          balance[msg.sender] = balance[msg.sender].add(price);
         }
         emit OnPlug(sproutId, x_id, y_id);
      }

}
