import React from 'react';
import ReactDOM from 'react-dom';
import getWeb3 from "./utils/getWeb3";
import Web3 from 'web3';
import Sprout from './components/sprout';
import SproutFarm from './components/sproutfarm';
import SproutHeader from './components/sproutheader';
import User from './components/user';
import Shop from './components/shop';
import TestButton from "./components/testbutton";

import SproutContract from './build/contracts/Sprout.json'
import SproutOwnershipContract from './build/contracts/SproutOwnership.json'
//import SproutAppContract from "./build/contracts/SproutApp.json";
//import SproutContract from "./build/contracts/Sprout.json";
//import SproutOwnershipContract from "./build/contracts/SproutOwnership.json";
//import OwnershipContract from './build/contracts/Ownable.json';
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
      contract1: null,
      contract2: null,
      username: 'Goldy',
      userbalance: 20000,
    };

    this.addSprout = this.addSprout.bind(this);
    this.plugSprout = this.plugSprout.bind(this);
    this.handlePurchase = this.handlePurchase.bind(this);
    this.test_c = this.test_c.bind(this);
    this.test_j = this.test_j.bind(this);
  }

  componentDidMount = async () => {
    try {
      //const web3 = await getWeb3();
      const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();

      const deployedNetwork1 = SproutContract.networks[networkId];
      const instance1 = new web3.eth.Contract(
        SproutContract.abi,
        deployedNetwork1 && deployedNetwork1.address,
      )
      const deployedNetwork2 = SproutOwnershipContract.networks[networkId];
      const instance2 = new web3.eth.Contract(
          SproutOwnershipContract.abi,
          deployedNetwork2 && deployedNetwork2.address
      )
      this.setState({ web3, accounts, contract1: instance1, contract2: instance2});
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
      var planttime = Date.now();
      var x_id;
      var y_id;
      x_id = sproutid%5;
      y_id = (sproutid-x_id)/5;
      console.log(x_id, y_id);
      this.state.contract1.methods.randomAddSprout(x_id, y_id).send({
        from: this.state.accounts[0]
      })
      console.log('Add Sprout');
      this.state.contract1.getPastEvents({ fromBlock: 0, toBlock:'latest' }, 
      function(error, events){ console.log(events); })
  }

  plugSprout(sproutid) {
      var x_id;
      var y_id;
      x_id = sproutid%5;
      y_id = (sproutid-x_id)/5;
      console.log(x_id, y_id);
      this.state.contract1.methods.plugSprout(x_id, y_id).send({
        from: this.state.accounts[0]
      })
     console.log('Plug Sprout')
  }

  test_c(){
    console.log('Get Look');
    const receipt = this.state.contract1.methods.getSproutLook(0, 0).send({
        from: this.state.accounts[0]
    });
    console.log(receipt._events)
  }

  test_j(){
    
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
                  <TestButton test_c={this.test_c} testname='c' />
                  <TestButton test_j={this.test_j} testname='j' />
              </div>
                  <SproutFarm addSprout={this.addSprout} plugSprout={this.plugSprout} sprouts={this.state.sprouts} />
          </div>
      </div>
    );
  }
}

ReactDOM.render(<SproutApp/>, document.getElementById('root'));
