import React, {Component} from 'react';

class Sprout extends Component {
    constructor(props){
        super(props);
        this.handleAddPlug = this.handleAddPlug.bind(this);
        
        this.state = {
            id: this.props.id,
            value: this.props.value
        };
        
    }
    handleAddPlug(){
        if(this.state.value==0){
            this.props.addSprout(this.state.id);
            this.setState({value: 1});
        }
        else{
            this.props.plugSprout(this.state.id);
            this.setState({value: 0})
        }
        
    };
    
    
    render() {
        var icon;
        if(this.state.value==0){
            icon='./img/plantit.png';
        } else{
            icon='./img/seed.png';
        }

        return (      
            
            <div class="three wide column segmented">
                <div class="ts tiny segmented single line items">
                    <div class="content">
                        <div class="ts secondary segment">
                            <center>
                                <button className="btn" onClick={this.handleAddPlug} className="btn btn-secondary">
                                    <center><img height="80" width="80" src={icon}/></center>
                                </button>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
                
        );
    }
    formatCount() {
        const {value} = this.state;
        return value===0 ? "Zero" : value;
    }
}

export default Sprout