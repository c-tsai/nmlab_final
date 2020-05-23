import React, {Component} from "react";

class ShopItem extends Component {
    constructor(props){
        super(props);
        this.PurchaseItem = this.PurchaseItem.bind(this);
        this.state = {
            itemname: this.props.itemname,
            cost: this.props.cost
        }
    }

    PurchaseItem(){
        console.log('item purchased');
        this.props.handlePurchase(this.state.cost);
    }

    render() {
        var icon;
        if(this.props.itemname=="Fertilizer"){
            icon = './img/fertilizer.png';
        }
        if(this.props.itemname=="Pesticide"){
            icon = './img/pesticide.png';
        }
        return(
            <div id="shopitem" class="ts secondary segment">
                <div class="item">
                    <div class="content">
                        <div>
                            <center><img height="100" src={icon}/></center>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="content">
                        <div class="ts header">Product: {this.props.itemname}</div>
                    </div>
                </div>
                <div class="item">
                    <div class="content">
                        <div class="ts header">Cost: {this.state.cost} $ </div>
                    </div>
                </div>
                <div class="item">
                    <div class="content">
                        <center><button class="ts button info" onClick={this.PurchaseItem}>Purchase</button></center>
                    </div>
                </div>
            </div>
        )
    }
}

export default ShopItem