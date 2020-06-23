import React, {Component} from "react";

class Sprout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sprout: this.props.sprout
        }
        this.handleAddPlug = this.handleAddPlug.bind(this);
        this.handleGetSeed = this.handleGetSeed.bind(this);
        this.handleGetPollen = this.handleGetPollen.bind(this);
        this.handlePlantSeed = this.handlePlantSeed.bind(this);
        this.handlePollination = this.handlePollination.bind(this);
    }//end constructor
    /*functions*/
    handleAddPlug(){//add or plug sprout
        if(this.state.sprout.exist==0){
            this.props.addSprout(this.state.sprout.id);
        }else{
            this.props.plugSprout(this.state.sprout.id);
        }
    }

    handleGetPollen(){
        this.props.GetPollen(this.state.sprout.id);
    }

    handleGetSeed(){
        this.props.GetSeed(this.state.sprout.id);
    }

    handlePollination(){
        this.props.Pollination(this.state.sprout.id);
    }

    handlePlantSeed(d){
        this.props.PlantSeed(this.state.sprout.id, d);
    }

    render() {
        var icon;
        if(this.state.sprout.exist==0){
            icon='./img/plantit.png';
        } else{
            var grown = Date.now()-this.state.sprout.addsprouttime;
            if(grown>this.state.sprout.fullgrowntime*1 && grown<this.state.sprout.fullgrowntime*1.05){
                icon = './img/old.png';
            } else if(grown>=this.state.sprout.fullgrowntime*1.05){
                icon = './img/dead.png';
            } else if(this.state.sprout.pollination==1){
                icon = './img/pollination.png';
            }
            //icon='./img/seed.png';
            else if(this.state.sprout.height<=10){//stage0
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
            else if(this.state.sprout.height>10 && this.state.sprout.height<=20){//stage1
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
            else if(this.state.sprout.height>20 && this.state.sprout.height<=30){//stage2
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
            else if(this.state.sprout.height>30 && this.state.sprout.height<=40){
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
            else if(this.state.sprout.height>40){
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
        }//end deciding icon

        //seed to be planted
        const listItems = this.props.seeditem_data.map((d) => 
            <div class="content">
                <button onClick={() => this.handlePlantSeed(d)} id="selectseedbox" class="ts button info" key={d.time}><center>P({d.x_id},{d.y_id}): {d.number}</center></button>
            </div>
        );
        return(
            <div class="three wide column segmented">
                <div class="ts tiny segmented single line items">
                    <div class="content">
                        <div id="sproutbox" class="ts secondary segment">
                            <center>
                                <button className="btn" onClick={this.handleAddPlug} className="btn btn-secondary">
                                    <center><img height="80" width="80" src={icon}/></center>
                                </button>
                            </center>
                        </div>
                    </div>

                    <details id="actionbox" class="ts accordion" close>
                        <summary>
                            <i class="dropdown icon"></i> Action
                        </summary>
                        <div class="content">
                            <center><p>Price: {this.state.sprout.price}</p></center>
                        </div>
                        <div class="content">
                            <center><button id="actionbutton" onClick={this.handleGetSeed} class="ts button info">Get Seed</button></center>
                        </div>
                        <div class="content">
                            <center><button id="actionbutton" onClick={this.handleGetPollen} class="ts button info">Get Pollen</button></center>
                        </div>
                        <div class="content">
                            <center><button id="actionbutton" onClick={this.handlePollination} class="ts button info">Pollination</button></center>
                        </div>
                        <div class="content">
                            <details>
                            <summary>
                            <i class="dropdown icon"></i> Plant Seed
                            </summary>
                            <div id="plantseedbox" class="ts segment">{listItems}</div>
                            </details>
                        </div>
                    </details>

                </div>
            </div>
        )
    }
}

export default Sprout