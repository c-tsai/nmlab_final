pragma solidity ^0.5.0;

import "./ownable.sol";
import "./safemath.sol";

contract SproutFactory is Ownable {

  using SafeMath for uint256;
  using SafeMath32 for uint32;

  event OnAdd(uint sproutId, uint x_id, uint y_id, uint dna1, uint dna2);
  event OnPlug(uint sproutId, uint x_id, uint y_id);

  struct Sprout {
    uint dna1;
    uint dna2;
    uint32 planttime;
    bool isset;
 }
  

  Sprout[] public sprouts;
  
  mapping (uint => address) public sproutToOwner;
  mapping (address => Sprout[10][10]) sprout_list;

  modifier SproutExist(uint x_id, uint y_id){
    require(sprout_map[msg.sender][x_id][y_id].isset, "location does not exist");
    _;
  }
  
  function addSprout(uint x_id, uint y_id, uint dna1, uint dna2) internal {
    require(sprout_list[msg.sender][x_id][y_id].isset == false);
    uint id = sprouts.push(Sprout(dna1, dna2, now, true)) - 1;
    sproutToOwner[id] = msg.sender;
    sprout_list[msg.sender][x_id][y_id] = Sprout(dna1, dna2, now, true);
    emit OnAdd(id, x_id, y_id, dna1, dna2);
  }
  
  function randomAddSprout(uint x_id, uint y_id) public {
    uint dna1 = uint256(keccak256(block.timestamp, block.difficulty));
    uint dna2 = uint256(keccak256(block.difficulty, block.timestamp));
    addSprout(x_id, y_id, dna1, dna1);
  }
  
  function getSproutLook(address owner, uint x_id, uint y_id) external view SproutExist(x_id, y_id) 
    returns(bool sprout_stage, bool seed_yellow, bool seed_round, uint8 height, uint8 width, uint8 color, uint8 die_stage) {
        uint color;
        uint height;
        uint width;
        uint die_stage= 0;
        uint height_gen= 0;
        uint width_gen= 0;
        uint speed_gen= 0;
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
            die_stage = (now_stage.sub(fullgrown_time)).mul(10).div(fullgrown_time);
            height = (height_gen.mul(60).add(120)).div(height_gen);
            width = (width_gen.mul(5).add(15)).div(width_gen);
        }
        else{
            height = (height_gen.mul(60).add(120)).mul(fullgrown_time).div(height_gen).div(now_stage);
            width = (width_gen.mul(5).add(15)).mul(fullgrown_time).div(width_gen).div(now_stage);
        }

        return (sprout_stage, seed_yellow, seed_round, height, width, color, die_stage);
    }
    
    function plugSprout(uint sproutId, uint x_id, uint y_id) external SproutExist(x_id, y_id) 
    returns(bool sprout_stage, bool seed_yellow, bool seed_round, uint8 height, uint8 width, uint8 color, uint8 die_stage){
        require (msg.sender == sproutToOwner[sproutId]);
        bool sprout_stage;
        bool seed_yellow;
        bool seed_round;
        uint8 height;
        uint8 width;
        uint8 color;
        uint8 die_stage;
        sprout_stage, seed_yellow, seed_round, height, width, color, die_stage = getSproutLook(x_id,  y_id) ;
        sprout_list[msg.sender][x_id][y_id].isset = false;
        emit OnPlug(sproutId, uint x_id, uint y_id);
        return(sprout_stage, seed_yellow, seed_round, height, width, color, die_stage);
    }

}
