import React, {Component} from "react";
import PollenItem from "./pollenitem";

class MyItem extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div class="ts segmented single line items">
                <div id="colored_bar" class="content">
                    <h2 id="white_font">My Item</h2>
                </div>
                <div id="myitems" class="ts secondary segment">
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
                                <i class="dropdown icon"></i><div class="ts header">Pollen</div>
                            </summary>
                            <div id="seeditembox" class="ts single line items">
                                
                                <PollenItem pollen={this.props.pollenitems[0]} />
                                <PollenItem pollen={this.props.pollenitems[1]} />
                                <PollenItem pollen={this.props.pollenitems[2]} />
                                <PollenItem pollen={this.props.pollenitems[3]} />
                                <PollenItem pollen={this.props.pollenitems[4]} />

                                <PollenItem pollen={this.props.pollenitems[5]} />
                                <PollenItem pollen={this.props.pollenitems[6]} />
                                <PollenItem pollen={this.props.pollenitems[7]} />
                                <PollenItem pollen={this.props.pollenitems[8]} />
                                <PollenItem pollen={this.props.pollenitems[9]} />

                                <PollenItem pollen={this.props.pollenitems[10]} />
                                <PollenItem pollen={this.props.pollenitems[11]} />
                                <PollenItem pollen={this.props.pollenitems[12]} />
                                <PollenItem pollen={this.props.pollenitems[13]} />
                                <PollenItem pollen={this.props.pollenitems[14]} />

                                <PollenItem pollen={this.props.pollenitems[15]} />
                                <PollenItem pollen={this.props.pollenitems[16]} />
                                <PollenItem pollen={this.props.pollenitems[17]} />
                                <PollenItem pollen={this.props.pollenitems[18]} />
                                <PollenItem pollen={this.props.pollenitems[19]} />

                                <PollenItem pollen={this.props.pollenitems[20]} />
                                <PollenItem pollen={this.props.pollenitems[21]} />
                                <PollenItem pollen={this.props.pollenitems[22]} />
                                <PollenItem pollen={this.props.pollenitems[23]} />
                                <PollenItem pollen={this.props.pollenitems[24]} />
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