import React, {Component} from 'react';
import SeedItemData from './seeditemdata';
var seeditems = []; //local seed item initialized by seeditem_data
class Sprout extends Component {
    constructor(props){
        super(props);
        this.handleAddPlug = this.handleAddPlug.bind(this);
        this.handleGetSeed= this.handleGetSeed.bind(this);
        this.handleGetPollen= this.handleGetPollen.bind(this);
        this.handlePlantSeed = this.handlePlantSeed.bind(this);
        this.handlePollination = this.handlePollination.bind(this);
        this.state = {
            id: this.props.sprout.id,
            value: this.props.sprout.value,
            sprout: this.props.sprout,
            seeditems: seeditems
        };
        
    }
    
    handleAddPlug(){
        console.log('sprout.jsx handle add plug', this.state.sprout.value)
        if(this.state.sprout.value==0){
            this.props.addSprout(this.state.id);
            this.setState({value: 1});
        }
        else{
            this.props.plugSprout(this.state.id);
            this.setState({value: 0})
        }
    };
    handleGetPollen(){
        this.props.GetPollen(this.state.id);
    }
    
    handleGetSeed(){
        this.props.GetSeed(this.state.id);
    }
    handlePlantSeed(d){
        console.log(d)
        this.props.PlantSeed(this.state.id, d);
    }
    handlePollination(){
        this.props.Pollination(this.state.id);
    }
    render() {
        var icon;
        if(this.state.sprout.value==0){
            icon='./img/plantit.png';
        } else{
            //icon='./img/seed.png';
            if(this.state.sprout.height<=24){//stage0
                var namearr = ['./img/stage0/'];
                if(this.state.sprout.seed_yg==0){//yellow seed
                    namearr.push('0_');
                } else{
                    namearr.push('1_');
                }
                if(this.state.sprout.seed_rw==0){
                    namearr.push('r.png');
                }else{
                    namearr.push('w.png');
                }
                icon = namearr.join("")
            }
            else if(this.state.sprout.height>24 && this.state.sprout.height<=48){//stage1
                var namearr = ['./img/stage1/'];
                if(this.state.sprout.seed_yg==0){//yellow seed
                    namearr.push('0_');
                } else{
                    namearr.push('1_');
                }
                if(this.state.sprout.seed_rw==0){
                    namearr.push('r.png');
                }else{
                    namearr.push('w.png');
                }
                icon = namearr.join("");
            }
            else if(this.state.sprout.height>48 && this.state.sprout.height<=72){//stage2
                var namearr = ['./img/stage2/', this.state.sprout.color];
                if(this.state.sprout.seed_yg==0){
                    namearr.push('_y');
                }else{
                    namearr.push('_g');
                }
                if(this.state.sprout.seed_rw==0){
                    namearr.push('_r');
                }else{
                    namearr.push('_w');
                }
                if(this.state.sprout.width<=5){
                    namearr.push('_w1.png');
                }else if(this.state.sprout.width>5 && this.state.width<=13){
                    namearr.push('_w2.png');
                }else{
                    namearr.push('_w3.png');
                }
                icon = namearr.join("");
            }
            else if(this.state.sprout.height>72 && this.state.sprout.height<=96){
                var namearr = ['./img/stage3/', this.state.sprout.color];
                if(this.state.sprout.seed_yg==0){
                    namearr.push('_y');
                }else{
                    namearr.push('_g');
                }
                if(this.state.sprout.seed_rw==0){
                    namearr.push('_r');
                }else{
                    namearr.push('_w');
                }
                if(this.state.sprout.width<=5){
                    namearr.push('_w1.png');
                }else if(this.state.sprout.width>5 && this.state.width<=13){
                    namearr.push('_w2.png');
                }else{
                    namearr.push('_w3.png');
                }
                icon = namearr.join("");
            }
            else if(this.state.sprout.height>96 && this.state.sprout.height<120){
                var namearr = ['./img/stage4/', this.state.sprout.color];
                if(this.state.sprout.width<=5){
                    namearr.push('_w1.png');
                }else if(this.state.sprout.width>5 && this.state.width<=13){
                    namearr.push('_w2.png');
                }else{
                    namearr.push('_w3.png');
                }
                icon = namearr.join("");
            }
        }
        
        const listItems = this.props.seeditem_data.map((d) => 
        <div class="content">
            <button onClick={() => this.handlePlantSeed(d)} id="selectseedbox" class="ts button info" key={d.time}><center>P({d.x_id},{d.y_id}): {d.number}</center></button>
        </div>
        );
        return (      
            
            <div class="three wide column segmented">
                <div class="ts tiny segmented single line items">
                    <div class="content">
                        <div  id="sproutbox" class="ts secondary segment">
                            <center>
                                <button className="btn" onClick={this.handleAddPlug} className="btn btn-secondary">
                                    <center><img height="80" width="80" src={icon}/></center>
                                </button>
                            </center>
                        </div>
                        
                        <details id="actionbox" class="ts accordion" close>
                            <summary>
                                <i class="dropdown icon"></i> Action
                            </summary>
                            <div class="content">
                                <center><p>Price: {this.state.sprout.price}</p></center>
                            </div>
                            <div class="content">
                               <center><button id="transferbox" onClick={this.handleGetSeed} class="ts button info">Get Seed</button></center>
                            </div>
                            <div class="content">
                               <center><button id="transferbox" onClick={this.handleGetPollen} class="ts button info">Get Pollen</button></center>
                            </div>
                            <div class="content">
                               <center><button id="transferbox" onClick={this.handlePollination} class="ts button info">Pollination</button></center>
                            </div>
                            <div class="content">
                                <details>
                                <summary>
                                <i class="dropdown icon"></i> Plant Seed
                                </summary>
                                <div id="plantseedbox scrollspySegment" class="ts segment">{listItems}</div>
                                </details>
                            </div>
                        </details>
                        
                    </div>
                </div>
            </div>
                
        );
    }
    formatCount() {
        const {value} = this.state;
        return value===0 ? "Zero" : value;
    }
}

export default Sprout