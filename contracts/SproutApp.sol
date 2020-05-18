pragma solidity ^0.5.0;

contract SproutApp {
    
    struct Sprout {
        uint planttime;
    }
    Sprout[] sprout_list;
    event OnAdd(uint sproutId);
    // random dna is impossible to be genrated inside contract
    function addSprout(uint _planttime) public {
        Sprout memory sprout = Sprout(_planttime);
        uint sproutId = sprout_list.push(sprout) - 1;
        emit OnAdd(sproutId);
    }
}