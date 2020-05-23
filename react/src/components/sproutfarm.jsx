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
                            
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} value={this.state.sprouts[0].value} id={this.state.sprouts[0].id}/>
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} value={this.state.sprouts[1].value} id={this.state.sprouts[1].id}/>
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} value={this.state.sprouts[2].value} id={this.state.sprouts[2].id}/>
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} value={this.state.sprouts[3].value} id={this.state.sprouts[3].id}/>
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} value={this.state.sprouts[4].value} id={this.state.sprouts[4].id}/>
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} value={this.state.sprouts[5].value} id={this.state.sprouts[5].id}/>
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} value={this.state.sprouts[6].value} id={this.state.sprouts[6].id}/>
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} value={this.state.sprouts[7].value} id={this.state.sprouts[7].id}/>
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} value={this.state.sprouts[8].value} id={this.state.sprouts[8].id}/>
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} value={this.state.sprouts[9].value} id={this.state.sprouts[9].id}/>
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} value={this.state.sprouts[10].value} id={this.state.sprouts[10].id}/>
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} value={this.state.sprouts[11].value} id={this.state.sprouts[11].id}/>
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} value={this.state.sprouts[12].value} id={this.state.sprouts[12].id}/>
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} value={this.state.sprouts[13].value} id={this.state.sprouts[13].id}/>
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} value={this.state.sprouts[14].value} id={this.state.sprouts[14].id}/>
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} value={this.state.sprouts[15].value} id={this.state.sprouts[15].id}/>
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} value={this.state.sprouts[16].value} id={this.state.sprouts[16].id}/>
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} value={this.state.sprouts[17].value} id={this.state.sprouts[17].id}/>
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} value={this.state.sprouts[18].value} id={this.state.sprouts[18].id}/>
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} value={this.state.sprouts[19].value} id={this.state.sprouts[19].id}/>
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} value={this.state.sprouts[20].value} id={this.state.sprouts[20].id}/>
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} value={this.state.sprouts[21].value} id={this.state.sprouts[21].id}/>
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} value={this.state.sprouts[22].value} id={this.state.sprouts[22].id}/>
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} value={this.state.sprouts[23].value} id={this.state.sprouts[23].id}/>
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} value={this.state.sprouts[24].value} id={this.state.sprouts[24].id}/>
                            
                        </div>
                    </div>   
                </div>
            </div>   
        
        );
    }
}

export default SproutFarm