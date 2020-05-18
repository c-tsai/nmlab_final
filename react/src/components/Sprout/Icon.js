import React, {useState} from 'react';
class Icon extends React.Component {
    constructor(props){
        super(props);
        this.onClickAdd = this.onClickAdd.bind(this);
        this.state = {
            isplanted: 0,
            icon: `./img/plantit.png`
        }
    }
    
    onClickAdd(event) {
        //this.props.addSprout();
        event.preventDefault();
        if (this.state.isplanted==0){
            this.setState({isplanted: 1, icon: `./img/Mostly Sunny-2x.png`});
        }
        else {
            this.setState({isplanted: 0, icon: `./img/plantit.png`});
        }
        console.log(this.state.isplanted);
    }
    render (){
        
        return (
            <button onClick={this.onClickAdd}>
                <img height="100"  src={this.state.icon}/>
            </button>
        )
    }
}

export default Icon;
