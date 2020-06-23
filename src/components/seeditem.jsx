import React, {Component} from 'react';

class SeedItem extends Component {
    constructor(props){
        super(props);
    }
    render() {
        var seedicon;
        var price=this.props.sprout.price;
        if(this.props.sprout.seed_yg==0){//yellow seed
            if(this.props.sprout.seed_rw==0){//round
                seedicon = './img/stage0/0_r.png';
                
            }else{
                seedicon = './img/stage0/0_w.png';
            }
        }else{
            if(this.props.sprout.seed_rw==0){
                seedicon = './img/stage0/1_r.png';
            }else {
                seedicon = './img/stage0/1_w.png';
            }
        }

        return(
            <div id="myitems" class="ts secondary segment">
                <div class="item">
                    <div class="content">
                        <div>
                            <center><img height="100" src={seedicon}/></center>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="content">
                        <div class="ts header"><center>P({this.props.seeditemdata.x_id}, {this.props.seeditemdata.y_id})</center></div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default SeedItem