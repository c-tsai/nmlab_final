import React, {Component} from 'react';

class PollenItem extends Component {
    constructor(props){
        super(props);
    }  
    render() {
        
        
        return(
            <div id="pollenitem" class="ts secondary segment">
                <div class="ts header"><center>({this.props.x_id}, {this.props.y_id})</center></div>
            </div>
        )
    }
}

export default PollenItem