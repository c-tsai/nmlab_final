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
  {id: 0, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0},
  {id: 1, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0},
  {id: 2, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0},
  {id: 3, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0},
  {id: 4, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0},
  {id: 5, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0},
  {id: 6, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0},
  {id: 7, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0},
  {id: 8, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0},
  {id: 9, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0},
  {id: 10, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0},
  {id: 11, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0},
  {id: 12, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0},
  {id: 13, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0},
  {id: 14, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0},
  {id: 15, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0},
  {id: 16, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0},
  {id: 17, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0},
  {id: 18, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0},
  {id: 19, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0},
  {id: 20, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0},
  {id: 21, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0},
  {id: 22, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0},
  {id: 23, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0},
  {id: 24, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0}
]
var users = [
  {username:'Pika' , userbalance: 20000},
  {username:'Ba', userbalance: 20000}
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
      users: users
    };

    this.addSprout = this.addSprout.bind(this);
    this.plugSprout = this.plugSprout.bind(this);
    this.handlePurchase = this.handlePurchase.bind(this);
    this.TransferPika = this.TransferPika.bind(this);
    this.TransferBa = this.TransferBa.bind(this);
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

  async addSprout(sproutid){
      let sprouttmp = Object.assign({}, this.state.sprouts);
      sprouttmp[sproutid].value = 1;
      sprouttmp[sproutid].seed_yg = 0;
      sprouttmp[sproutid].seed_rw = 0;
      sprouttmp[sproutid].color = 1;
      sprouttmp[sproutid].width = 0;
      sprouttmp[sproutid].height = 0;
      sprouttmp[sproutid].price = 200;
      this.setState({sprouts: sprouttmp});
      var planttime = Date.now();
      var x_id;
      var y_id;
      x_id = sproutid%5;
      y_id = (sproutid-x_id)/5;
      console.log(x_id, y_id);
      var tx_hash = await this.state.contract1.methods.randomAddSprout(x_id, y_id).send({
        from: this.state.accounts[0]
      }).then(function(receipt){
        console.log(receipt)
      })
      this.state.contract1.getPastEvents('OnAdd', {
        fromBlock:0, toBlock:'latest'
      }, function(err, events){console.log(events)})
      
  }

  plugSprout(sproutid) {
      let sprouttmp = Object.assign({}, this.state.sprouts);

      this.setState({userbalance: this.state.userbalance+sprouttmp[sproutid].price});
      sprouttmp[sproutid].value = 0;
      sprouttmp[sproutid].seed_yg = 0;
      sprouttmp[sproutid].seed_rw = 0;
      sprouttmp[sproutid].color = 0;
      sprouttmp[sproutid].width = 0;
      sprouttmp[sproutid].height = 0;
      sprouttmp[sproutid].price = 0;
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

  onTransfer(sproutid){
    console.log('On transfer')
    console.log(sproutid)
  }

  TransferPika(sproutid)  {
    //event.preventDefault();
    let sprouttmp = Object.assign({}, this.state.sprouts);
    var tmp = Object.assign({}, this.state.users);
    tmp[0].userbalance = tmp[0].userbalance+sprouttmp[sproutid].price;
    sprouttmp[sproutid].value = 0;
    sprouttmp[sproutid].seed_yg = 0;
    sprouttmp[sproutid].seed_rw = 0;
    sprouttmp[sproutid].color = 0;
    sprouttmp[sproutid].width = 0;
    sprouttmp[sproutid].height = 0;
    sprouttmp[sproutid].price = 0;
    this.setState({users: users});
    this.setState({sprouts: sprouttmp});
  }

  TransferBa(sproutid){
    let sprouttmp = Object.assign({}, this.state.sprouts);
    var tmp = Object.assign({}, this.state.users);
    tmp[1].userbalance = tmp[1].userbalance+sprouttmp[sproutid].price;
    sprouttmp[sproutid].value = 0;
    sprouttmp[sproutid].seed_yg = 0;
    sprouttmp[sproutid].seed_rw = 0;
    sprouttmp[sproutid].color = 0;
    sprouttmp[sproutid].width = 0;
    sprouttmp[sproutid].height = 0;
    sprouttmp[sproutid].price = 0;
    this.setState({users: users});
    this.setState({sprouts: sprouttmp});
  }

  test_c(){
    //logic for getlook
    var tmp = Object.assign({}, this.state.sprouts);
    tmp[1].value = 1;
    tmp[1].seed_yg = 0;
    tmp[1].seed_rw = 0;
    tmp[1].color = 1;
    tmp[1].width = 0;
    tmp[1].height = 0;
    tmp[1].price = 200;
    
    tmp[2].value = 1;
    tmp[2].seed_yg = 1;
    tmp[2].seed_rw = 1;
    tmp[2].color = 30;
    tmp[2].width = 10;
    tmp[2].height = 10;
    tmp[2].price = 300;

    tmp[3].value = 1;
    tmp[3].seed_yg = 1;
    tmp[3].seed_rw = 0;
    tmp[3].color = 20;
    tmp[3].width = 10;
    tmp[3].height = 30;
    tmp[3].price = 400;

    tmp[4].value = 1;
    tmp[4].seed_yg = 1;
    tmp[4].seed_rw = 1;
    tmp[4].color = 10;
    tmp[4].width = 5;
    tmp[4].height = 50;
    tmp[4].price = 500;
    console.log(this.state.sprouts)
    this.setState({sprouts: tmp});
  }

  test_j(){
    //test incrementing other users' balance
    var users = Object.assign({}, this.state.users);
    console.log(users[0].userbalance)
    users[0].username = 'Pika'
    users[0].userbalance = users[0].userbalance+100;
    this.setState({users: users});
  }
  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div>
          <div id="usersidebar" class="ts static visible left sidebar">
            <div class="ts header">
                <h2>Users</h2>
            </div>
            <div id="userbox" class="ts segment">
                <div  class="item">
                    <div class="content">
                        <div>
                        <center><img id="userimg" src="./img/pika.png" width="80" height="80"  ></img></center>
                        </div>  
                    </div>
                </div>
                <div  class="item">
                    <div class="content">
                        <div class="ts">
                          <p>{this.state.users[0].username}</p>
                          <p>{this.state.users[0].userbalance} $</p>
                        </div>  
                    </div>
                </div>
            </div>
            <div id="userbox" class="ts segment">
                <div  class="item">
                    <div class="content">
                        <div>
                        <center><img id="userimg" src="./img/ba.png" width="80" height="80"  ></img></center>
                        </div>  
                    </div>
                </div>
                <div  class="item">
                    <div class="content">
                        <div class="ts">
                          <p>{this.state.users[1].username}</p>
                          <p>{this.state.users[1].userbalance} $</p>
                        </div>  
                    </div>
                </div>
            </div>
          </div>
          <SproutHeader/>
          <div id="main_container" class="ts container grid very">
              <div class="four wide column segment">
                  <User username={this.state.username} userbalance={this.state.userbalance} />
                  <Shop handlePurchase={this.handlePurchase} />
                  <TestButton test_c={this.test_c} testname='c' />
                  <TestButton test_j={this.test_j} testname='j' />
              </div>
                  <SproutFarm addSprout={this.addSprout} plugSprout={this.plugSprout} TransferPika={this.TransferPika} TransferBa={this.TransferBa} sprouts={this.state.sprouts} />
          </div>
      </div>
    );
  }
}

ReactDOM.render(<SproutApp/>, document.getElementById('root'));
