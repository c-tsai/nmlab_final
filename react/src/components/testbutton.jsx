import React, {Component} from "react";

class TestButton extends Component {
    constructor(props){
        super(props);
        this.state = {
            testname: this.props.testname
        }
        this.handleTest = this.handleTest.bind(this);
    }

    handleTest(){
        if(this.state.testname==='j'){
            this.props.test_j();
        }
        else{
            this.props.test_c();
        }
    }
    render(){
        return(
            <div class="ts segmented single line items">
                <div id="colored_bar" class="content">
                    <h2 id="white_font">Test Here</h2>
                </div>
                <div class="ts single line items">
                    <div class="ts secondary segment">
                        <div class="item">
                             <div class="content">
                                <div>
                                    <center><button class="ts button info" onClick={this.handleTest}>{this.state.testname}</button></center>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        )
    }
}

export default TestButton