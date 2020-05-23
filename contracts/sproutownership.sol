pragma solidity ^0.5.0;

import "./erc721.sol";
import "./safemath.sol";

contract ZombieOwnership is ERC721 {

  using SafeMath for uint256;

  mapping (uint => address) sproutApprovals;

  function balanceOf(address _owner) external view returns (uint256) {
    return ownerZombieCount[_owner];
  }

  function ownerOf(uint _tokenId) external view returns (address) {
    return sproutToOwner[_tokenId];
  }

  function _transfer(address _from, address _to, uint256 _tokenId) private {
    ownerZombieCount[_to] = ownerZombieCount[_to].add(1);
    ownerZombieCount[msg.sender] = ownerZombieCount[msg.sender].sub(1);
    zombieToOwner[_tokenId] = _to;
    emit Transfer(_from, _to, _tokenId);
  }

  function transferFrom(address _from, address _to, uint _tokenId) external payable {
      require (sproutToOwner[_tokenId] == msg.sender || sproutApprovals[_tokenId] == msg.sender);
      _transfer(_from, _to, _tokenId);
    }

  function approve(address _approved, uint _tokenId) external payable onlyOwnerOf(_tokenId) {
      sproutApprovals[_tokenId] = _approved;
      emit Approval(msg.sender, _approved, _tokenId);
    }

}
