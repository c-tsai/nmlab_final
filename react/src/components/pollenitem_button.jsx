import React, {Component} from 'react';

class PollenItemButton extends Component {
    constructor(props){
        super(props);
        this.handleChoosePollen = this.handleChoosePollen.bind(this);
    }  

    handleChoosePollen(){
        console.log(this.props.id)
        this.props.ChoosePollen(this.props.x_id, this.props.y_id, this.props.id);
    }
    render() {
        return(
            
            <center>
                <button id="pollenitembtn" onClick={this.handleChoosePollen} class="ts button info">
                    <center>({this.props.x_id}, {this.props.y_id})</center>
                </button>
            </center>
            
        )
    }
}

export default PollenItemButton