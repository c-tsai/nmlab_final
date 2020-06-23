import React, {Component} from "react";

class Header extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div class="ts large link attached inverted info menu">
                <div id="mynavbar" class="ts container">
                    <div class="ts center aligned twelve column grid">
                        <div id="sproutheader">Sprout Farm</div>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default Header