pragma solidity ^0.5.0;


import "./OwnerItem.sol";

contract SproutMarket is OwnerItem {

    /*A Place where player can sell their seeds or other products.
    */

    event OnProductAdded(uint Id);
    event OnProductDeleted(uint Id);
    
    struct Product {
        string producType;
        string description;
        uint value_each;
        uint num;
        uint[] content;
        address owner;
        bool isValid;
    }
    Product[] _MarketList;


    // Modifier
    modifier isValidProduct(uint _Id) {
        require(isProductValid(_Id), "item must be valid to call");
        _;
    }
    modifier isProductOwner(uint _Id) {
        require(msg.sender == _MarketList[_Id].owner);
        _;
    }
    


    // Public function
    // basic functions for show market list
    function isProductValid(uint _Id) public view returns(bool isValid) {
        return _MarketList[_Id].isValid;
    }
    function getProduct(uint _Id) public view isValidProduct(_Id) returns(string memory, string memory, uint, address) {
        return (_MarketList[_Id].producType, _MarketList[_Id].description, _MarketList[_Id].num, _MarketList[_Id].owner);
    }

    function getProductList() public view returns(uint[] memory, uint[] memory) {
        uint len;
        uint[] memory valids;

        (valids, len) = _getValidProducts();

        uint[] memory ids = new uint[](len);
        uint[] memory nums = new uint[](len);
        for (uint i = 0; i < len; i++) {
            uint id = valids[i];
            ids[i] = id;
            nums[i] = _ItemList[msg.sender][id].num;
        }
        return (ids, nums);
    }

    // a portion of the items in the player's item list put onto the market place waited for sail.
    // Be aware of that the items put on market list won't be able to put back to your own item list again.
    function sellItem(uint id, uint num, uint value, string memory description) public isValidItem(id){
        require(num <= getItemNum(id), "not enough item");
        Product memory product = Product(_ItemList[msg.sender][id].itemName, description, value, num, 
            _ItemList[msg.sender][id].content, msg.sender, true);
        uint Id = _MarketList.push(product) - 1;
        spendItem(id, num);

        emit OnProductAdded(Id);
    }
    function buyProduct(uint _Id, uint num) public isValidProduct(_Id){
        require(num <= _MarketList[_Id].num, "not enough item on the market");
        uint total = num.mul(_MarketList[_Id].value_each);
        require(balanceOf(msg.sender) >= total, "not enough money");
        transfer(_MarketList[_Id].owner, total);
        addItem(_MarketList[_Id].producType, num, _MarketList[_Id].content);
    }
    // used when you no longer want to sell an item
    function deleteProduct(uint _Id) public isValidProduct(_Id) isProductOwner( _Id){
        _MarketList[_Id].isValid = false;
        emit OnProductDeleted(_Id);
    }



    // private function
    function _getValidProducts() private view returns(uint[] memory valids, uint length) {
        uint[] memory validProducts = new uint[](_MarketList.length);
        uint count = 0;
        for (uint i = 0; i < _MarketList.length; i++) {
            if (isProductValid(i)) {
                validProducts[count] = i;
                count++;
            }
        }
        return(validProducts, count);
    }
}