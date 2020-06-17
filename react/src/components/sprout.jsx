import React, {Component} from 'react';

class Sprout extends Component {
    constructor(props){
        super(props);
        this.handleAddPlug = this.handleAddPlug.bind(this);
        this.handleAppendItem = this.handleAppendItem.bind(this);
        this.handleGetPollen= this.handleGetPollen.bind(this);
        this.handlePollination = this.handlePollination.bind(this);
        this.state = {
            id: this.props.id,
            value: this.props.value,
            sprout: this.props.sprout, 
            trasferto: ''
        };
        
    }

    handleAddPlug(){
        if(this.state.value==0){
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
    
    handleAppendItem(){
        this.props.AppendItem(this.state.id);
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
                var namearr = ['./img/stage3/', this.state.sprout.color];
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
                               <center><button id="transferbox" onClick={this.handleAppendItem} class="ts button info">Collect</button></center>
                            </div>
                            <div class="content">
                               <center><button id="transferbox" onClick={this.handleGetPollen} class="ts button info">Pollen</button></center>
                            </div>
                            <div class="content">
                               <center><button id="transferbox" onClick={this.handlePollination} class="ts button info">Pollination</button></center>
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