import React, {Component} from 'react';

class PollenItem extends Component {
    constructor(props){
        super(props);
    }  
    render() {    
        return(
            <div id="pollenitem" class="ts secondary segment">
                <div class="ts header"><center>({this.props.pollen.x_id}, {this.props.pollen.y_id}): {this.props.pollen.amount}</center></div>
            </div>
        )
    }
}

export default PollenItem