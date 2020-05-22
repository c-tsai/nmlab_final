pragma solidity ^0.5.0;

import "./ownable.sol";
import "./safemath.sol";

contract SproutFactory is Ownable {

  using SafeMath for uint256;
  using SafeMath32 for uint32;
  using SafeMath16 for uint16;

  event OnAdd(uint SproutId, uint x_id, uint y_id, uint dna1, uint dna2);
  event OnPlug(uint SproutId, uint x_id, uint y_id);

  struct Sprout {
  	uint dna1;
    uint dna2;
    uint planttime;
    bool isset;
 }
  

  Sprout[] public sprouts;
  
  mapping (uint => address) public sproutToOwner;
  mapping (address => Sprout[10][10]) sprout_list;
  
  modifier SproutExist(uint x_id, uint y_id){
  	require(sprout_list[msg.sender][x_id][y_id].isset == true, "location does not exist");
    _;
  }

  function addSprout(uint x_id, uint y_id, uint dna1, uint dna2) internal {
  	uint id = sprouts.push(Sprout()) - 1;
	sproutToOwner[id] = msg.sender;
	ownerSproutCount[msg.sender] = ownerSproutCount[msg.sender].add(1);
	emit OnAdd(x_id, y_id, dna1, dna2);
  }
  
  function plugSprout(uint x_id, uint y_id) external SproutExist(uint x_id, uint y_id) 
      returns(bool sprout_stage, bool seed_yellow, bool seed_round, uint8 height, uint8 width, uint8 color, uint8 die_stage){
          bool sprout_stage;
          bool seed_yellow;
          bool seed_round;
          uint8 height;
          uint8 width;
          uint8 color;
          uint8 die_stage;
          sprout_stage, seed_yellow, seed_round, height, width, color, die_stage = getSproutLook(owner,  x_id,  y_id) ;
          sprout_list[owner][x_id][y_id].isset = false;
          emit OnPlug(address owner, uint x_id, uint y_id);
          return(sprout_stage, seed_yellow, seed_round, height, width, color, die_stage);
    }
  
  function randomAddSprout(uint x_id, uint y_id) public {
  	uint dna1 = uint256(keccak256(block.timestamp, block.difficulty));
    uint dna2 = uint256(keccak256(block.difficulty, block.timestamp));
    addSprout(x_id, y_id, dna1, dna1);
  }
}
