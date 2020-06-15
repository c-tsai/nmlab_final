pragma solidity ^0.5.0;


import "./token.sol";

contract OwnerItem is SproutOwnership {

    /*Edit the Owner Item List into */

    event OnItemAdded(uint Id);
    event OnItemDeleted(uint Id);
    event OnRegister(address account);

    struct Item {
        string itemName;
        bool isValid;
    }
    mapping (address => Item[]) private _ItemList;


    // Modifier
    modifier isValidItem(uint _Id) {
        require(isItemValid(_Id), "item must be valid to call");
        _;
    }


    // Public function

    function Register() public {
        balance[msg.sender] = 100;
        emit OnRegister(msg.sender);
    }
    function isItemValid(uint _Id) public view returns(bool isValid) {
        return _ItemList[msg.sender][_Id].isValid;
    }

    function getItem(uint _Id) public view isValidItem(_Id) returns(string memory) {
        return _ItemList[msg.sender][_Id].itemName;
    }

    function getItemList() public view returns(uint[] memory) {
        uint len;
        uint[] memory valids;

        (valids, len) = _getValidItems();

        uint[] memory ids = new uint[](len);
        for (uint i = 0; i < len; i++) {
            uint id = valids[i];
            ids[i] = id;
        }
        return ids;
    }

    function addItem(string memory _itemName) public {
        Item memory item = Item(_itemName, true);
        uint Id = _ItemList[msg.sender].push(item) - 1;

        emit OnItemAdded(Id);
    }

    function deleteItem(uint _Id) public isValidItem(_Id) {
        _ItemList[msg.sender][_Id].isValid = false;

        emit OnItemDeleted(_Id);
    }


    // Private methods
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