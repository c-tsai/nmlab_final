pragma solidity ^0.5.0;

import "github.com/OpenZeppelin/zeppelin-solidity/contracts/math/SafeMath.sol";
import "github.com/OpenZeppelin/zeppelin-solidity/contracts/math/SafeMath8.sol";

/*I design the DNA to have two strains(dna1, dna2 uint256), 
    The following is the representative of each gene (in LSB order)
        0 -> seed yellow (dominant), green(recessive) [mendilan trait]
        1 -> seed round (dominant), wrinkled(recessive) [mendilan trait]
        2~40 -> whole color (from pale yellow to dark green) [polygenic trait]
        41~100 ->  stem width [polygenic trait]
        101~160 ->  stem height [polygenic trait]
        161~256 ->  grow speed [polygenic trait]

        *mendilan trait: 
        output is a bool= (bit1|bit2 == 1), recessive trait=false, domminent trait= True
        *polygenetic trait:
        output is uint8, represent the amount of 1 among the corresponding bits
        
About Traits:
     height(uint): the full grown height of height gene=0 is 60 cm, gene=120 is 180 cm
     width(uint): the full grown width of width gene=0 is 5 mm, gene=120 is 20 mm
     color(uint): I guess I will directly return the gene(cause I don't really know how to present color with 1 dim...)
     It take 2 days to reach full grown for speed gene=0, half day for speed gene = 190
     (though the actual game won't be that long because we'd like to plug it up before the sprout get too green and stiff)
     mendilan trait(bool): directly return the bool 

About Growing:
    1. before the reaching 10% of full growth, the seed would shown, but slowly sinking into ground
        (it's the perfect time to plug the sprout!, giving true for sprout stage (bool))
    2. the color I guess should be turning greener and greener (though I don't really know how to design this part) 
    3. all the growing before full grown is linear
    4. after full grown, it use 5% of the full grown time to die off, all the other feature would remain same in this period
        (represent by another uint die_stage, det defaultly highest to 10)
    5. The bean can only be planted at (x, y) where 0 <= x <10, 0 <= y < 10



Notes:
    1. The reason I have such a lengthy design for the whole bean lifespan is because I originally thought of designing the 
        feature of the whole reproducing process and maybe cultivate or trading seeds(which I don't really know if we have time for)
        If it would be implemented, there's definately more parameter to be set.
    3. I'm also thinking of some level up species could be represented as mendilen trait
        (which would be always 1/0 before reaching a certain level)
    4. In addition to the current polygene traits, I'm also consider adding some other such as disease resistence, productivity, etc.
    5. Feel free to let me know if you think any design is impractical or what parameter is wierd or any other helpful advice :)


    
*/
contract SproutApp {

    using SafeMath for uint;
    using SafeMath8 for uint8

    event OnAdd(address owner, uint x_id, uint y_id, uint dna1, uint dna2);
    event OnPlug(address owner, uint x_id, uint y_id,;
    
    struct Sprout {
        uint dna1;
        uint dna2;
        uint planttime;
        address owner;
        bool isset;
    }
    
    // I defined the whole list into a 2-dim array, which make intutiive correlation to physical location
    mapping (address => Sprout[10][10]) sprout_list;//default len is 10

    modifier SproutExist(address owner, uint x_id, uint y_id){
        require(sprout_map[owner][x_id][y_id].isset, "location does not exist");
        _;
    }

    // the design for now is more tend to update continuouslly, the running speed might be a great concern
    // Perhaps could be solved by storing data locally
    function getSproutLook(address owner, uint x_id, uint y_id) public view SproutExist(owner, x_id, y_id) 
    returns(bool sprout_stage, bool seed_yellow, bool seed_round, uint8 height, uint8 width, uint8 color, uint8 die_stage) {
        uint color;
        uint height;
        uint width;
        uint die_stage= 0;
        uint height_gen= 0;
        uint width_gen= 0;
        uint speed_gen= 0;
        uint temp1 = sprout_list[owner][x_id][y_id].dna1;
        uint temp2 = sprout_list[owner][x_id][y_id].dna2;

        //determine genes (mendilen traits)
        bool seed_yellow = (((temp1%2) & (temp2%2)) == 1);
        temp1 = temp1 >> 1;
        temp2 = temp2 >> 1;
        bool seed_round = (((temp1%2) & (temp2%2)) == 1);

        //determine genes (polygene traits)
        for (uint8 i =2; i <41; i++){
            if (temp1%2 == 1){color++;}
            if (temp2%2 == 1){color++;}
            temp1 = temp1 >> 1;temp2 = temp2 >> 1;
        }
        for (uint8 i =41; i <101; i++){
            if (temp1%2 == 1){width_gen++;}
            if (temp2%2 == 1){width_gen++;}
            temp1 = temp1 >> 1;temp2 = temp2 >> 1;
        }
        for (uint8 i =101; i <161; i++){
            if (temp1%2 == 1){height_gen++;}
            if (temp2%2 == 1){height_gen++;}
            temp1 = temp1 >> 1;temp2 = temp2 >> 1;
        }
        for (uint8 i =160; i <255; i++){
            if (temp1%2 == 1){speed_gen++;}
            if (temp2%2 == 1){speed_gen++;}
            temp1 = temp1 >> 1;temp2 = temp2 >> 1;
        }

        //determine growing stage
        uint fullgrown_time = (380.sub(speed_gen.mul(1.5)) days).div(190);
        uint now_stage = now.sub(sprout_list[owner][x_id][y_id].planttime);
        bool sprout_stage = (now_stage < fullgrown_time.div(10));
        //determine height width die_stage
        if(now_stage > fullgrown_time) {
            die_stage = (now_stage.sub(fullgrown_time)).mul(10).div(fullgrown_time);
            height = (height_gen.mul(60).add(120)).div(height_gen);
            width = (width_gen.mul(5).add(15)).div(width_gen);
        }
        else{
            height = (height_gen.mul(60).add(120)).mul(fullgrown_time).div(height_gen).div(now_stage);
            width = (width_gen.mul(5).add(15)).mul(fullgrown_time).div(width_gen).div(now_stage);
        }


        return (sprout_stage, seed_yellow, seed_round, height, width, color, die_stage)

    }
    // not completed function
    function getAllid() public view returns(uint[] memory x, bool[] memory y) {

        uint[] memory ids = new uint[](len);
        bool[] memory isCompletes = new bool[](len);
        for (uint i = 0; i < len; i++) {
            uint id = valids[i];
            ids[i] = id;
            isCompletes[i] = todos[id].isComplete;
        }
        return (ids, isCompletes);
    }

    //the smart contract is impossible to generate complete randomness, 
    //so I leave this part to the front ends, just call the random generated uint256 number
    //before hand
    function addSprout(address owner, uint x_id, uint y_id, uint dna1, uint dna2) public {
        sprout_list[owner][x_id][y_id] = Sprout(dna1, dna2, now, true, owner)
        emit OnAdd(address owner, uint x_id, uint y_id, uint dna1, uint dna2);
    }

    function plugSprout(address owner, uint x_id, uint y_id) public SproutExist(address owner, uint x_id, uint y_id) 
    returns(bool sprout_stage, bool seed_yellow, bool seed_round, uint8 height, uint8 width, uint8 color, uint8 die_stage){
        bool sprout_stage;
        bool seed_yellow;
        bool seed_round;
        uint8 height;
        uint8 width;
        uint8 color;
        uint8 die_stage;
        sprout_stage, seed_yellow, seed_round, height, width, color, die_stage = getSproutLook(owner,  x_id,  y_id) ;
        sprout_list[owner][x_id][y_id].isset = false
        emit OnPlug(address owner, uint x_id, uint y_id);
        return(sprout_stage, seed_yellow, seed_round, height, width, color, die_stage)
    }


    // Private methods
    function _getSetSprouts() private view returns(uint length) {
        uint[] memory validTodos = new uint[](todos.length);
        uint count = 0;
        for (uint i = 0; i < todos.length; i++) {
            if (isTodoValid(i)) {
                validTodos[count] = i;
                count++;
            }
        }
        return(validTodos, count);
    }
}