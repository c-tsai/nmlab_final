import React, {Component} from "react";
import Sprout from "./sprout";

class SproutFarm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sprouts: this.props.sprouts
        };
    }
    
    render() {
        return (
            <div class="twelve wide column segment">
                <div class="ts segmented single line items">
                    <div id="colored_bar" class="content">
                        <h2 id="white_font">My Sprout Farm</h2>
                    </div>
                    <div class="ts single line items">
                        <div id="sprout_container" class="ts container grid very">
                            
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} TransferPika={this.props.TransferPika} TransferBa={this.props.TransferBa} value={this.state.sprouts[0].value} id={this.state.sprouts[0].id} sprout={this.props.sprouts[0]} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} TransferPika={this.props.TransferPika} TransferBa={this.props.TransferBa} value={this.state.sprouts[1].value} id={this.state.sprouts[1].id} sprout={this.props.sprouts[1]} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} TransferPika={this.props.TransferPika} TransferBa={this.props.TransferBa} value={this.state.sprouts[2].value} id={this.state.sprouts[2].id} sprout={this.props.sprouts[2]} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} TransferPika={this.props.TransferPika} TransferBa={this.props.TransferBa} value={this.state.sprouts[3].value} id={this.state.sprouts[3].id} sprout={this.props.sprouts[3]} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} TransferPika={this.props.TransferPika} TransferBa={this.props.TransferBa} value={this.state.sprouts[4].value} id={this.state.sprouts[4].id} sprout={this.props.sprouts[4]} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} TransferPika={this.props.TransferPika} TransferBa={this.props.TransferBa} value={this.state.sprouts[5].value} id={this.state.sprouts[5].id} sprout={this.props.sprouts[5]} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} TransferPika={this.props.TransferPika} TransferBa={this.props.TransferBa} value={this.state.sprouts[6].value} id={this.state.sprouts[6].id} sprout={this.props.sprouts[6]} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} TransferPika={this.props.TransferPika} TransferBa={this.props.TransferBa} value={this.state.sprouts[7].value} id={this.state.sprouts[7].id} sprout={this.props.sprouts[7]} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} TransferPika={this.props.TransferPika} TransferBa={this.props.TransferBa} value={this.state.sprouts[8].value} id={this.state.sprouts[8].id} sprout={this.props.sprouts[8]} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} TransferPika={this.props.TransferPika} TransferBa={this.props.TransferBa} value={this.state.sprouts[9].value} id={this.state.sprouts[9].id} sprout={this.props.sprouts[9]} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} TransferPika={this.props.TransferPika} TransferBa={this.props.TransferBa} value={this.state.sprouts[10].value} id={this.state.sprouts[10].id} sprout={this.props.sprouts[10]} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} TransferPika={this.props.TransferPika} TransferBa={this.props.TransferBa} value={this.state.sprouts[11].value} id={this.state.sprouts[11].id} sprout={this.props.sprouts[11]} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} TransferPika={this.props.TransferPika} TransferBa={this.props.TransferBa} value={this.state.sprouts[12].value} id={this.state.sprouts[12].id} sprout={this.props.sprouts[12]} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} TransferPika={this.props.TransferPika} TransferBa={this.props.TransferBa} value={this.state.sprouts[13].value} id={this.state.sprouts[13].id} sprout={this.props.sprouts[13]} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} TransferPika={this.props.TransferPika} TransferBa={this.props.TransferBa} value={this.state.sprouts[14].value} id={this.state.sprouts[14].id} sprout={this.props.sprouts[14]} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} TransferPika={this.props.TransferPika} TransferBa={this.props.TransferBa} value={this.state.sprouts[15].value} id={this.state.sprouts[15].id} sprout={this.props.sprouts[15]} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} TransferPika={this.props.TransferPika} TransferBa={this.props.TransferBa} value={this.state.sprouts[16].value} id={this.state.sprouts[16].id} sprout={this.props.sprouts[16]} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} TransferPika={this.props.TransferPika} TransferBa={this.props.TransferBa} value={this.state.sprouts[17].value} id={this.state.sprouts[17].id} sprout={this.props.sprouts[17]} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} TransferPika={this.props.TransferPika} TransferBa={this.props.TransferBa} value={this.state.sprouts[18].value} id={this.state.sprouts[18].id} sprout={this.props.sprouts[18]} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} TransferPika={this.props.TransferPika} TransferBa={this.props.TransferBa} value={this.state.sprouts[19].value} id={this.state.sprouts[19].id} sprout={this.props.sprouts[19]} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} TransferPika={this.props.TransferPika} TransferBa={this.props.TransferBa} value={this.state.sprouts[20].value} id={this.state.sprouts[20].id} sprout={this.props.sprouts[20]} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} TransferPika={this.props.TransferPika} TransferBa={this.props.TransferBa} value={this.state.sprouts[21].value} id={this.state.sprouts[21].id} sprout={this.props.sprouts[21]} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} TransferPika={this.props.TransferPika} TransferBa={this.props.TransferBa} value={this.state.sprouts[22].value} id={this.state.sprouts[22].id} sprout={this.props.sprouts[22]} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} TransferPika={this.props.TransferPika} TransferBa={this.props.TransferBa} value={this.state.sprouts[23].value} id={this.state.sprouts[23].id} sprout={this.props.sprouts[23]} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} TransferPika={this.props.TransferPika} TransferBa={this.props.TransferBa} value={this.state.sprouts[24].value} id={this.state.sprouts[24].id} sprout={this.props.sprouts[24]} />
                            
                        </div>
                    </div>   
                </div>
            </div>   
        
        );
    }
}

export default SproutFarm