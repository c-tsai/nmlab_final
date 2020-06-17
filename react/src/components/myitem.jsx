import React, {Component} from "react";
import SeedItem from './seeditem';
class MyItem extends Component {
    constructor(props){
        super(props);
    }
    
    render(){
        console.log(this.props.pollenitems)
        return(
            <div class="ts segmented single line items">
                <div id="colored_bar" class="content">
                    <h2 id="white_font">My Item</h2>
                </div>
                <div id="shopitem" class="ts secondary segment">
                    <div class="item">
                        <div class="content">
                            <div>
                                <center><img height="100" src={'./img/pollen.png'}/></center>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="content">
                        <details id="actionbox" class="ts accordion" close>
                            <summary>
                                <i class="dropdown icon"></i><div class="ts header">Pollen: {this.props.pollennum}</div>
                            </summary>
                            <div id="seeditembox" class="ts single line items">
                                {this.props.pollenitems}
                            </div>
                        </details>
                        </div>
                    </div>
                    
                </div>
                
                <div id="seeditembox" class="ts single line items">
                    {this.props.seeditems}
                </div>

            </div>       
        )
    }
}

export default MyItem