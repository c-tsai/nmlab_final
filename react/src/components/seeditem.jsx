import React, {Component} from 'react';

class SeedItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            seednum: this.props.seednum
        }
        this.handleSellSeed = this.handleSellSeed.bind(this);
    }
    handleSellSeed(){
        this.props.SellSeed(this.props.sprout.id)
    }
    render() {
        console.log(this.props.sprout);
        var seedicon;
        var price=this.props.sprout.price;
        if(this.props.sprout.seed_yg==0){//yellow seed
            console.log('line 17')
            if(this.props.sprout.seed_rw==0){//round
                console.log('line 18')
                seedicon = './img/stage0/0_r.png';
                
            }else{
                console.log('line 22')
                seedicon = './img/stage0/0_w.png';
                
            }
        }else{
            console.log('line 26')
            if(this.props.sprout.seed_rw==0){
                console.log('line 28')
                seedicon = './img/stage0/1_r.png';
               
            }else {
                console.log('line 31')
                seedicon = './img/stage0/1_w.png';
               
            }
        }
        var x_id = this.props.sprout.id%5;
        var y_id = (this.props.sprout.id-x_id)/5;
        return(
            <div id="shopitem" class="ts secondary segment">
                <div class="item">
                    <div class="content">
                        <div>
                            <center><img height="100" src={seedicon}/></center>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="content">
                        <div class="ts header">P({x_id}, {y_id}): {this.state.seednum}</div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default SeedItem