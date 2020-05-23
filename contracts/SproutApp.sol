pragma solidity ^0.5.0;

contract SproutApp {
    event OnSproutAdded(uint sproutId);

    struct Sprout {
       uint id;
       uint planttime;
       bool isPlanted;
    }
    
    Sprout[25] sprouts;
    function AddSprout(uint _id, uint _planttime) public {
        sprouts[_id].id = _id;
        sprouts[_id].planttime = _planttime;
        sprouts[_id].isPlanted = true;
        
        emit OnSproutAdded(_id);
    }
}