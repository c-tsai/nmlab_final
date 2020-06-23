import React, {Component} from "react";
import Sprout from "./sprout";

class SproutFarm extends Component {
    constructor(props){
        super(props);
        this.state = {
            sprouts: this.props.sprouts
        };
    }//end constructor
    
    render() {
        return (
            <div class="twelve wide column segment">
                <div class="ts segmented single line items">
                    <div id="colored_bar" class="content">
                        <h2 id="white_font">My Sprout Farm</h2>
                    </div>
                    <div class="ts single line items">
                        <div id="sprout_container" class="ts container grid very">
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} GetSeed={this.props.GetSeed}  GetPollen={this.props.GetPollen} PlantSeed={this.props.PlantSeed} Pollination={this.props.Pollination} sprout={this.props.sprouts[0]} seeditem_data={this.props.seeditem_data} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} GetSeed={this.props.GetSeed}  GetPollen={this.props.GetPollen} PlantSeed={this.props.PlantSeed} Pollination={this.props.Pollination} sprout={this.props.sprouts[1]} seeditem_data={this.props.seeditem_data} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} GetSeed={this.props.GetSeed}  GetPollen={this.props.GetPollen} PlantSeed={this.props.PlantSeed} Pollination={this.props.Pollination} sprout={this.props.sprouts[2]} seeditem_data={this.props.seeditem_data} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} GetSeed={this.props.GetSeed}  GetPollen={this.props.GetPollen} PlantSeed={this.props.PlantSeed} Pollination={this.props.Pollination} sprout={this.props.sprouts[3]} seeditem_data={this.props.seeditem_data} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} GetSeed={this.props.GetSeed}  GetPollen={this.props.GetPollen} PlantSeed={this.props.PlantSeed} Pollination={this.props.Pollination} sprout={this.props.sprouts[4]} seeditem_data={this.props.seeditem_data} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} GetSeed={this.props.GetSeed}  GetPollen={this.props.GetPollen} PlantSeed={this.props.PlantSeed} Pollination={this.props.Pollination} sprout={this.props.sprouts[5]} seeditem_data={this.props.seeditem_data} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} GetSeed={this.props.GetSeed}  GetPollen={this.props.GetPollen} PlantSeed={this.props.PlantSeed} Pollination={this.props.Pollination} sprout={this.props.sprouts[6]} seeditem_data={this.props.seeditem_data} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} GetSeed={this.props.GetSeed}  GetPollen={this.props.GetPollen} PlantSeed={this.props.PlantSeed} Pollination={this.props.Pollination} sprout={this.props.sprouts[7]} seeditem_data={this.props.seeditem_data} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} GetSeed={this.props.GetSeed}  GetPollen={this.props.GetPollen} PlantSeed={this.props.PlantSeed} Pollination={this.props.Pollination} sprout={this.props.sprouts[8]} seeditem_data={this.props.seeditem_data} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} GetSeed={this.props.GetSeed}  GetPollen={this.props.GetPollen} PlantSeed={this.props.PlantSeed} Pollination={this.props.Pollination} sprout={this.props.sprouts[9]} seeditem_data={this.props.seeditem_data} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} GetSeed={this.props.GetSeed}  GetPollen={this.props.GetPollen} PlantSeed={this.props.PlantSeed} Pollination={this.props.Pollination} sprout={this.props.sprouts[10]} seeditem_data={this.props.seeditem_data} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} GetSeed={this.props.GetSeed}  GetPollen={this.props.GetPollen} PlantSeed={this.props.PlantSeed} Pollination={this.props.Pollination} sprout={this.props.sprouts[11]} seeditem_data={this.props.seeditem_data} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} GetSeed={this.props.GetSeed}  GetPollen={this.props.GetPollen} PlantSeed={this.props.PlantSeed} Pollination={this.props.Pollination} sprout={this.props.sprouts[12]} seeditem_data={this.props.seeditem_data} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} GetSeed={this.props.GetSeed}  GetPollen={this.props.GetPollen} PlantSeed={this.props.PlantSeed} Pollination={this.props.Pollination} sprout={this.props.sprouts[13]} seeditem_data={this.props.seeditem_data} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} GetSeed={this.props.GetSeed}  GetPollen={this.props.GetPollen} PlantSeed={this.props.PlantSeed} Pollination={this.props.Pollination} sprout={this.props.sprouts[14]} seeditem_data={this.props.seeditem_data} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} GetSeed={this.props.GetSeed}  GetPollen={this.props.GetPollen} PlantSeed={this.props.PlantSeed} Pollination={this.props.Pollination} sprout={this.props.sprouts[15]} seeditem_data={this.props.seeditem_data} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} GetSeed={this.props.GetSeed}  GetPollen={this.props.GetPollen} PlantSeed={this.props.PlantSeed} Pollination={this.props.Pollination} sprout={this.props.sprouts[16]} seeditem_data={this.props.seeditem_data} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} GetSeed={this.props.GetSeed}  GetPollen={this.props.GetPollen} PlantSeed={this.props.PlantSeed} Pollination={this.props.Pollination} sprout={this.props.sprouts[17]} seeditem_data={this.props.seeditem_data} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} GetSeed={this.props.GetSeed}  GetPollen={this.props.GetPollen} PlantSeed={this.props.PlantSeed} Pollination={this.props.Pollination} sprout={this.props.sprouts[18]} seeditem_data={this.props.seeditem_data} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} GetSeed={this.props.GetSeed}  GetPollen={this.props.GetPollen} PlantSeed={this.props.PlantSeed} Pollination={this.props.Pollination} sprout={this.props.sprouts[19]} seeditem_data={this.props.seeditem_data} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} GetSeed={this.props.GetSeed}  GetPollen={this.props.GetPollen} PlantSeed={this.props.PlantSeed} Pollination={this.props.Pollination} sprout={this.props.sprouts[20]} seeditem_data={this.props.seeditem_data} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} GetSeed={this.props.GetSeed}  GetPollen={this.props.GetPollen} PlantSeed={this.props.PlantSeed} Pollination={this.props.Pollination} sprout={this.props.sprouts[21]} seeditem_data={this.props.seeditem_data} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} GetSeed={this.props.GetSeed}  GetPollen={this.props.GetPollen} PlantSeed={this.props.PlantSeed} Pollination={this.props.Pollination} sprout={this.props.sprouts[22]} seeditem_data={this.props.seeditem_data} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} GetSeed={this.props.GetSeed}  GetPollen={this.props.GetPollen} PlantSeed={this.props.PlantSeed} Pollination={this.props.Pollination} sprout={this.props.sprouts[23]} seeditem_data={this.props.seeditem_data} />
                            <Sprout addSprout={this.props.addSprout} plugSprout={this.props.plugSprout} GetSeed={this.props.GetSeed}  GetPollen={this.props.GetPollen} PlantSeed={this.props.PlantSeed} Pollination={this.props.Pollination} sprout={this.props.sprouts[24]} seeditem_data={this.props.seeditem_data} />
                           
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SproutFarm