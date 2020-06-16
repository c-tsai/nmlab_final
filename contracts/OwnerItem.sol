pragma solidity ^0.5.0;


import "./token.sol";

contract OwnerItem is SproutOwnership {

    /*To each user, there's a list contain the thing they currently have. The things in the list could be sold or used.
      For now, the items could only be seeds.
      The seeds can be plugged when the sprout (or the beanstalk) is older than 1.01 of its fullgrown_time

      In addition, each person start with balance = $1000
      (I'm considering using onlyOwner in register to prevent malicious use, don't know if it's necessary.)
    */

    event OnItemAdded(uint Id);
    event OnItemDeleted(uint Id);
    event OnRegister(address account);

    struct Item {
        string itemName;
        uint num;
        uint[] content;
        bool isValid;
    }
    mapping (address => Item[]) _ItemList;


    // Modifier
    modifier isValidItem(uint _Id) {
        require(isItemValid(_Id), "item must be valid to call");
        _;
    }
    modifier isSeedItem(uint _Id){
        uint temp1 = uint(keccak256(abi.encodePacked(_ItemList[msg.sender][_Id].itemName)));
        uint temp2 = uint(keccak256(abi.encodePacked("seed")));
        require(temp1 == temp2, "not a seed item");
        _;
    }
    modifier isPollenItem(uint _Id){
        uint temp1 = uint(keccak256(abi.encodePacked(_ItemList[msg.sender][_Id].itemName)));
        uint temp2 = uint(keccak256(abi.encodePacked("pollen")));
        require(temp1 == temp2, "not a pollen item");
        _;
    }


    // Public function

    // when a player enter the game, he or she should be registered by the contract owner (us) first
    function Register(address new_player) public onlyOwner(){
        balance[new_player] = 1000;
        emit OnRegister(new_player);
    }
    //when you plug the pollen from a beanstalk, it's immediately add to your item list
    function PlugPollen(uint x_id, uint y_id) public SproutExist(x_id, y_id) PollenExist(x_id, y_id){
        sprout_list[msg.sender][x_id][y_id].pollen_plug = true;
        addItem("pollen", 10, new uint[](0));
        uint _Id = _ItemList[msg.sender].length -1;
        _ItemList[msg.sender][_Id].content.push(sprout_list[msg.sender][x_id][y_id].dna1);
        _ItemList[msg.sender][_Id].content.push(sprout_list[msg.sender][x_id][y_id].dna2);
    }
    // The seed Items could be used to plant a new sprout at (x_id, y_id)
    function UsePollenItem(uint x_id, uint y_id, uint _Id) public 
    isValidItem(_Id) isPollenItem( _Id) SproutExist(x_id, y_id) PollenizeReady(x_id, y_id){
        if(!sprout_list[msg.sender][x_id][y_id].pollen_plug){
            sprout_list[msg.sender][x_id][y_id].pollen.push(sprout_list[msg.sender][x_id][y_id].dna1);
            sprout_list[msg.sender][x_id][y_id].pollen.push(sprout_list[msg.sender][x_id][y_id].dna2);
        }
        sprout_list[msg.sender][x_id][y_id].pollen.push(_ItemList[msg.sender][_Id].content[0]);
        sprout_list[msg.sender][x_id][y_id].pollen.push(_ItemList[msg.sender][_Id].content[1]);
    }


    //when you plug the seeds from a beanstalk, it's immediately add to your item list
    function PlugSeed(uint x_id, uint y_id) public SproutExist(x_id, y_id) SeedExist(x_id, y_id){
        sprout_list[msg.sender][x_id][y_id].seed_plug = true;
        uint num = getProduceGene(x_id, y_id).div(2).add(10);
        addItem("seed", num, new uint[](0));
        uint _Id = _ItemList[msg.sender].length -1;
        _ItemList[msg.sender][_Id].content.push(sprout_list[msg.sender][x_id][y_id].dna1);
        _ItemList[msg.sender][_Id].content.push(sprout_list[msg.sender][x_id][y_id].dna2);
        if(!sprout_list[msg.sender][x_id][y_id].pollen_plug){
            _ItemList[msg.sender][_Id].content.push(sprout_list[msg.sender][x_id][y_id].dna1);
            _ItemList[msg.sender][_Id].content.push(sprout_list[msg.sender][x_id][y_id].dna2);
        }
        uint len = sprout_list[msg.sender][x_id][y_id].pollen.length;
        for (uint i=0; i < len ; i++){
            _ItemList[msg.sender][_Id].content.push(sprout_list[msg.sender][x_id][y_id].pollen[i]);
        }
    }
    // The seed Items could be used to plant a new sprout at (x_id, y_id)
    function UseSeedItem(uint x_id, uint y_id, uint _Id) public isValidItem(_Id) isSeedItem( _Id){
        uint num = (_ItemList[msg.sender][_Id].content.length.div(2)).sub(1);
        uint num_f = uint(keccak256(abi.encodePacked(block.timestamp))) % (num);
        uint rand_m = uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty)));
        uint rand_f = uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp)));
        uint dna1 = rand_m & (_ItemList[msg.sender][_Id].content[0]);
        dna1 = dna1.add(~rand_m & (_ItemList[msg.sender][_Id].content[1]));
        uint dna2 = rand_f & (_ItemList[msg.sender][_Id].content[num_f.mul(2).add(2)]);
        dna2 = dna2.add(~rand_f & (_ItemList[msg.sender][_Id].content[num_f.mul(2).add(3)]));
        addSprout(x_id, y_id, dna1, dna2);
        spendItem(_Id, 1);
    }
    //Basic functions for showing list
    function isItemValid(uint _Id) public view returns(bool isValid) {
        return _ItemList[msg.sender][_Id].isValid;
    }
    function getItemNum(uint _Id) public view isValidItem(_Id) returns(uint) {
        return _ItemList[msg.sender][_Id].num;
    }
    function getItem(uint _Id) public view isValidItem(_Id) returns(string memory, uint) {
        return (_ItemList[msg.sender][_Id].itemName, _ItemList[msg.sender][_Id].num);
    }

    function getItemList() public view returns(uint[] memory, uint[] memory) {
        uint len;
        uint[] memory valids;

        (valids, len) = _getValidItems();

        uint[] memory ids = new uint[](len);
        uint[] memory nums = new uint[](len);
        for (uint i = 0; i < len; i++) {
            uint id = valids[i];
            ids[i] = id;
            nums[i] = _ItemList[msg.sender][id].num;
        }
        return (ids, nums);
    }



    // private function
    // add all kinds of Item in general
    function addItem(string memory itemName, uint num, uint[] memory content) internal {
        Item memory item = Item(itemName, num, content, true);
        uint Id = _ItemList[msg.sender].push(item) - 1;

        emit OnItemAdded(Id);
    }
    //remove some number of the Item
    function spendItem(uint _Id, uint num) internal isValidItem(_Id){
        require(num <= getItemNum(_Id), "not enough item");
        if (num == getItemNum(_Id)){deleteItem(_Id);}
        else{_ItemList[msg.sender][_Id].num -= num;}
    }
    // remove the whole Item
    function deleteItem(uint _Id) internal isValidItem(_Id) {
        _ItemList[msg.sender][_Id].isValid = false;

        emit OnItemDeleted(_Id);
    }

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