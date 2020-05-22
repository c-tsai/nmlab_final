pragma solidity ^0.5.0;

import "./ownable.sol";
import "./safemath.sol";

contract SproutFactory is Ownable {

  using SafeMath for uint256;
  using SafeMath32 for uint32;

  event OnAdd(uint SproutId, uint x_id, uint y_id, uint dna1, uint dna2);
  //event OnPlug(uint SproutId, uint x_id, uint y_id);

  struct Sprout {
    uint dna1;
    uint dna2;
    uint32 planttime;
    bool isset;
 }
  

  Sprout[] public sprouts;
  
  mapping (uint => address) public sproutToOwner;
  mapping (address => Sprout[10][10]) sprout_list;

  function addSprout(uint x_id, uint y_id, uint dna1, uint dna2) internal {
    require(sprout_list[msg.sender][x_id][y_id].isset == false);
    uint id = sprouts.push(Sprout(dna1, dna2, now, true)) - 1;
    sproutToOwner[id] = msg.sender;
    sprout_list[msg.sender][x_id][y_id] = Sprout(dna1, dna2, now, true);
    ownerSproutCount[msg.sender] = ownerSproutCount[msg.sender].add(1);
    emit OnAdd(x_id, y_id, dna1, dna2);
  }
  
  function randomAddSprout(uint x_id, uint y_id) public {
    uint dna1 = uint256(keccak256(block.timestamp, block.difficulty));
    uint dna2 = uint256(keccak256(block.difficulty, block.timestamp));
    addSprout(x_id, y_id, dna1, dna1);
  }
}
