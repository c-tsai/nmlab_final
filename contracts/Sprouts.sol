pragma solidity ^0.5.0;

// Reference: https://github.com/pomelyu/EthereumTodo
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
     height(uint8): the full grown height of height gene=0 is 60 cm, gene=120 is 180 cm
     width(uint8): the full grown width of width gene=0 is 5 cm, gene=120 is 20 cm
     color(uint8): I guess I will directly return the gene(cause I don't really know how to present color with 1 dim...)
     It take 2 days to reach full grown for speed gene=0, half day for speed gene = 190
     (though the actual game won't be that long because we'd like to plug it up before the sprout get too green and stiff)
     mendilan trait(bool): directly return the bool 

About Growing:
    1. before the reaching 10% of full growth, the seed would shown, but slowly sinking into ground
        (it's the perfect time to plug the sprout!)
    2. the color I guess should be turning greener and greener (though I don't really know how to design this part) 
    2. all the growing before full grown is linear
    3. after full grown, it use 5% of the full grown time to die off, all the other feature would remain same in this period
        (represent by another uint8 die_stage,)



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

    event OnTodoAdded(uint todoId);
    event OnTodoDeleted(uint todoId);
    event OnTodoCompleted(uint todoId);
    event OnTodoUndone(uint todoId);

    
    struct Sprout {
        uint dna1;
        uint dna2;
        uint planttime;
        bool isset;
    }
    
    // I defined the whole list into a 2-dim array, which make intutiive correlation to physical location
    Sprout[][] sprout_map;

    modifier locationExist(uint x_id, uint y_id){
        require(sprout_map[x_id][y_id].isset, "location does not exist");
        _;
    }

    // the design for now is more tend to update continuouslly, the running speed might be a great concern
    function getSproutLook(uint x_id, uint y_id) public view locationExist(x_id, y_id) 
    returns(bool seed_yellow, bool seed_round, uint8 height, uint8 width, uint color) {
        bool seed_yellow;
        bool seed_round;
        uint8 color;
        uint8 height;
        uint8 width;
        uint8 
    }

    function getTodoList() public view returns(uint[] memory, bool[] memory) {
        uint len;
        uint[] memory valids;

        (valids, len) = _getValidTodos();

        uint[] memory ids = new uint[](len);
        bool[] memory isCompletes = new bool[](len);
        for (uint i = 0; i < len; i++) {
            uint id = valids[i];
            ids[i] = id;
            isCompletes[i] = todos[id].isComplete;
        }
        return (ids, isCompletes);
    }

    function addTodo(string memory _taskName) public {
        Todo memory todo = Todo(_taskName, false, true);
        uint todoId = todos.push(todo) - 1;

        emit OnTodoAdded(todoId);
    }

    function deleteTodo(uint _todoId) public isValidTodo(_todoId) {
        todos[_todoId].isValid = false;

        emit OnTodoDeleted(_todoId);
    }

    function completeTodo(uint _todoId) public isValidTodo(_todoId) {
        todos[_todoId].isComplete = true;

        emit OnTodoCompleted(_todoId);
    }

    function undoneTodo(uint _todoId) public isValidTodo(_todoId) {
        todos[_todoId].isComplete = false;

        emit OnTodoUndone(_todoId);
    }

    // Private methods
    function _getSetSprouts() private view returns(uint[] memory valids, uint length) {
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