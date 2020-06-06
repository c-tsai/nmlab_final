pragma solidity ^0.5.0;

import "./erc20.sol";
import "./safemath.sol";
import "./sprout.sol";

contract SproutOwnership is Sprout, ERC20 {

  using SafeMath for uint256;

  mapping (address => mapping (address => uint256)) private _allowances;

  uint256 private _totalSupply = 0;

  function _transfer(address sender, address recipient, uint256 amount) internal {
    require(sender != address(0), "ERC20: transfer from the zero address");
    require(recipient != address(0), "ERC20: transfer to the zero address");
    balance[sender] = balance[sender].sub(amount);
    balance[recipient] = balance[recipient].add(amount);
    _totalSupply = _totalSupply.add(amount);
    emit Transfer(sender, recipient, amount);
  }

  function _approve(address owner, address spender, uint256 amount) internal {
    require(owner != address(0), "ERC20: approve from the zero address");
    require(spender != address(0), "ERC20: approve to the zero address");
    _allowances[owner][spender] = amount;
    emit Approval(owner, spender, amount);
  }

  function totalSupply() public view returns (uint256) {
        return _totalSupply;
  }

  function balanceOf(address account) public view returns (uint256) {
        return balance[account];
  }
  
  function transfer(address _to, uint256 value) public returns (bool) {
        _transfer(msg.sender, _to, value);
        return true;
  }
  
  function transferFrom(address sender, address recipient, uint256 amount) public returns (bool) {
        _transfer(sender, recipient, amount);
        _approve(sender, msg.sender, _allowances[sender][msg.sender].sub(amount));
        return true;
   }
   
   function approve(address spender, uint256 amount) public returns (bool) {
        _approve(msg.sender, spender, amount);
        return true;
    }
    
    function allowance(address owner, address spender) public view returns (uint256) {
        return _allowances[owner][spender];
    }
}