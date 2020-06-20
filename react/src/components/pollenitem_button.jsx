import React, {Component} from 'react';

class PollenItemButton extends Component {
    constructor(props){
        super(props);
        this.handleChoosePollen = this.handleChoosePollen.bind(this);
    }  

    handleChoosePollen(pollen){
        console.log(pollen.id)
        this.props.ChoosePollen(pollen.x_id, pollen.y_id, pollen.id);
    }
    render() {
        return(
            
            <div>
                <button id="pollenitembtn" onClick={this.handleChoosePollen(this.props.pollenitems[0])} class="ts button info">
                    <center>({this.props.pollenitems[0].x_id}, {this.props.pollenitems[0].y_id}): {this.props.pollenitems[0].amount}</center>
                </button>
                <button id="pollenitembtn" onClick={this.handleChoosePollen(this.props.pollenitems[1])} class="ts button info">
                    <center>({this.props.pollenitems[1].x_id}, {this.props.pollenitems[1].y_id}): {this.props.pollenitems[1].amount}</center>
                </button>
                <button id="pollenitembtn" onClick={this.handleChoosePollen(this.props.pollenitems[2])} class="ts button info">
                    <center>({this.props.pollenitems[2].x_id}, {this.props.pollenitems[2].y_id}): {this.props.pollenitems[2].amount}</center>
                </button>
                <button id="pollenitembtn" onClick={this.handleChoosePollen(this.props.pollenitems[3])} class="ts button info">
                    <center>({this.props.pollenitems[3].x_id}, {this.props.pollenitems[3].y_id}): {this.props.pollenitems[3].amount}</center>
                </button>
                <button id="pollenitembtn" onClick={this.handleChoosePollen(this.props.pollenitems[4])} class="ts button info">
                    <center>({this.props.pollenitems[4].x_id}, {this.props.pollenitems[4].y_id}): {this.props.pollenitems[4].amount}</center>
                </button>
                <button id="pollenitembtn" onClick={this.handleChoosePollen(this.props.pollenitems[5])} class="ts button info">
                    <center>({this.props.pollenitems[5].x_id}, {this.props.pollenitems[5].y_id}): {this.props.pollenitems[5].amount}</center>
                </button>
                <button id="pollenitembtn" onClick={this.handleChoosePollen(this.props.pollenitems[6])} class="ts button info">
                    <center>({this.props.pollenitems[6].x_id}, {this.props.pollenitems[6].y_id}): {this.props.pollenitems[6].amount}</center>
                </button>
                <button id="pollenitembtn" onClick={this.handleChoosePollen(this.props.pollenitems[7])} class="ts button info">
                    <center>({this.props.pollenitems[7].x_id}, {this.props.pollenitems[7].y_id}): {this.props.pollenitems[7].amount}</center>
                </button>
                <button id="pollenitembtn" onClick={this.handleChoosePollen(this.props.pollenitems[8])} class="ts button info">
                    <center>({this.props.pollenitems[8].x_id}, {this.props.pollenitems[8].y_id}): {this.props.pollenitems[8].amount}</center>
                </button>
                <button id="pollenitembtn" onClick={this.handleChoosePollen(this.props.pollenitems[9])} class="ts button info">
                    <center>({this.props.pollenitems[9].x_id}, {this.props.pollenitems[9].y_id}): {this.props.pollenitems[9].amount}</center>
                </button>
                <button id="pollenitembtn" onClick={this.handleChoosePollen(this.props.pollenitems[10])} class="ts button info">
                    <center>({this.props.pollenitems[10].x_id}, {this.props.pollenitems[10].y_id}): {this.props.pollenitems[10].amount}</center>
                </button>
                <button id="pollenitembtn" onClick={this.handleChoosePollen(this.props.pollenitems[11])} class="ts button info">
                    <center>({this.props.pollenitems[11].x_id}, {this.props.pollenitems[11].y_id}): {this.props.pollenitems[11].amount}</center>
                </button>
                <button id="pollenitembtn" onClick={this.handleChoosePollen(this.props.pollenitems[12])} class="ts button info">
                    <center>({this.props.pollenitems[12].x_id}, {this.props.pollenitems[12].y_id}): {this.props.pollenitems[12].amount}</center>
                </button>
                <button id="pollenitembtn" onClick={this.handleChoosePollen(this.props.pollenitems[13])} class="ts button info">
                    <center>({this.props.pollenitems[13].x_id}, {this.props.pollenitems[13].y_id}): {this.props.pollenitems[13].amount}</center>
                </button>
                <button id="pollenitembtn" onClick={this.handleChoosePollen(this.props.pollenitems[14])} class="ts button info">
                    <center>({this.props.pollenitems[14].x_id}, {this.props.pollenitems[14].y_id}): {this.props.pollenitems[14].amount}</center>
                </button>
                <button id="pollenitembtn" onClick={this.handleChoosePollen(this.props.pollenitems[15])} class="ts button info">
                    <center>({this.props.pollenitems[15].x_id}, {this.props.pollenitems[15].y_id}): {this.props.pollenitems[15].amount}</center>
                </button>
                <button id="pollenitembtn" onClick={this.handleChoosePollen(this.props.pollenitems[16])} class="ts button info">
                    <center>({this.props.pollenitems[16].x_id}, {this.props.pollenitems[16].y_id}): {this.props.pollenitems[16].amount}</center>
                </button>
                <button id="pollenitembtn" onClick={this.handleChoosePollen(this.props.pollenitems[17])} class="ts button info">
                    <center>({this.props.pollenitems[17].x_id}, {this.props.pollenitems[17].y_id}): {this.props.pollenitems[17].amount}</center>
                </button>
                <button id="pollenitembtn" onClick={this.handleChoosePollen(this.props.pollenitems[18])} class="ts button info">
                    <center>({this.props.pollenitems[18].x_id}, {this.props.pollenitems[18].y_id}): {this.props.pollenitems[18].amount}</center>
                </button>
                <button id="pollenitembtn" onClick={this.handleChoosePollen(this.props.pollenitems[19])} class="ts button info">
                    <center>({this.props.pollenitems[19].x_id}, {this.props.pollenitems[19].y_id}): {this.props.pollenitems[19].amount}</center>
                </button>
                <button id="pollenitembtn" onClick={this.handleChoosePollen(this.props.pollenitems[20])} class="ts button info">
                    <center>({this.props.pollenitems[20].x_id}, {this.props.pollenitems[20].y_id}): {this.props.pollenitems[20].amount}</center>
                </button>
                <button id="pollenitembtn" onClick={this.handleChoosePollen(this.props.pollenitems[21])} class="ts button info">
                    <center>({this.props.pollenitems[21].x_id}, {this.props.pollenitems[21].y_id}): {this.props.pollenitems[21].amount}</center>
                </button>
                <button id="pollenitembtn" onClick={this.handleChoosePollen(this.props.pollenitems[22])} class="ts button info">
                    <center>({this.props.pollenitems[22].x_id}, {this.props.pollenitems[22].y_id}): {this.props.pollenitems[22].amount}</center>
                </button>
                <button id="pollenitembtn" onClick={this.handleChoosePollen(this.props.pollenitems[23])} class="ts button info">
                    <center>({this.props.pollenitems[23].x_id}, {this.props.pollenitems[23].y_id}): {this.props.pollenitems[23].amount}</center>
                </button>
                <button id="pollenitembtn" onClick={this.handleChoosePollen(this.props.pollenitems[24])} class="ts button info">
                    <center>({this.props.pollenitems[24].x_id}, {this.props.pollenitems[24].y_id}): {this.props.pollenitems[24].amount}</center>
                </button>
            </div>
            
        )
    }
}

export default PollenItemButton