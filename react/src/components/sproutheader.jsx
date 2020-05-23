import React, {Component} from "react";
import Sprout from "./sprout"
import SprutFarm from "./sproutfarm"

class SproutHeader extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div class="ts large link attached inverted info menu">
                <div id="mynavbar" class="ts container">
                    <h1 id="white_font">Sprout Farm!</h1>
                </div>
            </div>
        )
    }
}

export default SproutHeader