import React, {Component} from 'react';

class SeedItemData extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div class="content">
                <center>
                    <button id="transferbox" class="ts button info">
                        P({this.props.seeditem.x_id}, {this.props.seeditem.y_id}): {this.props.seeditems.number}
                    </button>
                </center>
            </div>
        )
    }
}

export default SeedItemData