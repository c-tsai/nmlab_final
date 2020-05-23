import React from 'react';
import ReactDOM from 'react-dom';
import getWeb3 from "./utils/getWeb3";
import Sprout from './components/sprout';
import SproutFarm from './components/sproutfarm';
import SproutHeader from './components/sproutheader';
import User from './components/user';
import Shop from './components/shop';
import SproutAppContract from "./build/contracts/SproutApp.json"
import './index.css';

var sprouts = [
  {id: 0, value:0},
  {id: 1, value:0},
  {id: 2, value:0},
  {id: 3, value:0},
  {id: 4, value:0},
  {id: 5, value:0},
  {id: 6, value:0},
  {id: 7, value:0},
  {id: 8, value:0},
  {id: 9, value:0},
  {id: 10, value:0},
  {id: 11, value:0},
  {id: 12, value:0},
  {id: 13, value:0},
  {id: 14, value:0},
  {id: 15, value:0},
  {id: 16, value:0},
  {id: 17, value:0},
  {id: 18, value:0},
  {id: 19, value:0},
  {id: 20, value:0},
  {id: 21, value:0},
  {id: 22, value:0},
  {id: 23, value:0},
  {id: 24, value:0}
]
class SproutApp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      sprouts: sprouts,
      web3: null, 
      accounts: null, 
      contract: null, 
      username: 'Goldy',
      userbalance: 20000,
    };

    this.addSprout = this.addSprout.bind(this);
    this.plugSprout = this.plugSprout.bind(this);
    this.handlePurchase = this.handlePurchase.bind(this);
  }

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SproutAppContract.networks[networkId];
      const instance = new web3.eth.Contract(  
        SproutAppContract.abi,
        deployedNetwork && deployedNetwork.address,
      )
      this.setState({ web3, accounts, contract: instance});
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handlePurchase(itemcost){
    this.setState({userbalance: this.state.userbalance-itemcost});
  }

  addSprout(sproutid){
      this.state.sprouts[sproutid].value = 1;
      this.setState({sprouts: sprouts});
      //contract.methods.completeTodo(itemIndex).send({from: accounts[0]});
      this.state.contract.methods.addSprout(sproutid).send({from: this.state.accounts[0]});
      console.log('index.js addSprout');
  }

  plugSprout(sproutid) {
      this.state.sprouts[sproutid].value = 0;
      this.setState({sprouts: sprouts});
      console.log('index.js plugSprout');
  }
  
  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div>
          <SproutHeader/>
          <div id="main_container" class="ts container grid very">
              <div class="four wide column segment">
                  <User username={this.state.username} userbalance={this.state.userbalance} />
                  <Shop handlePurchase={this.handlePurchase} />
              </div>   
                  <SproutFarm addSprout={this.addSprout} plugSprout={this.plugSprout} sprouts={this.state.sprouts} />
          </div>
      </div>
    );
  }
}

ReactDOM.render(<SproutApp/>, document.getElementById('root'));
