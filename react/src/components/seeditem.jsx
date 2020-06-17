import React, {Component} from 'react';

class SeedItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            price: 0
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
        console.log(seedicon)
        return(
            <div class="ts secondary segment">
                <div class="item">
                    <div class="content">
                        <div>
                            <center><img height="100" src={seedicon}/></center>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="content">
                        <div class="ts header">Price: {price}</div>
                    </div>
                </div>
                
                <div class="item">
                    <div class="content">
                        <center><button class="ts button info" onClick={this.handleSellSeed}>Sell</button></center>
                    </div>
                </div>
            </div>
        )
    }
}

export default SeedItem