pragma solidity ^0.5.0;

contract SproutApp {
    event OnSproutAdded(uint sproutId);

    struct Sprout {
       uint id;
       bool isPlanted;
    }
    
    Sprout[25] sprouts;
    function addSprout(uint _id) public {
        sprouts[_id].id = _id;
        sprouts[_id].isPlanted = true;
        
        emit OnSproutAdded(_id);
    }
}