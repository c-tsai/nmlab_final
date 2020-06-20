import React from 'react';
import ReactDOM from 'react-dom';
import getWeb3 from "./utils/getWeb3";
import Web3 from 'web3';

//npm install --save sweetalert2 sweetalert2-react-content
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import Sprout from './components/sprout';
import SproutFarm from './components/sproutfarm';
import SproutHeader from './components/sproutheader';
import User from './components/user';
import Shop from './components/shop';
import MyItem from './components/myitem';
import SeedItem from './components/seeditem';
import TestButton from "./components/testbutton";
import PollenItem from './components/pollenitem';
import PollenItemButton from './components/pollenitem_button';
import SproutContract from './build/contracts/Sprout.json'
import SproutOwnershipContract from './build/contracts/SproutOwnership.json'
//import SproutAppContract from "./build/contracts/SproutApp.json";
//import SproutContract from "./build/contracts/Sprout.json";
//import SproutOwnershipContract from "./build/contracts/SproutOwnership.json";
//import OwnershipContract from './build/contracts/Ownable.json';
import './index.css';

const MySwal = withReactContent(Swal)
var sprouts = [
  {id: 0, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0, hasseed: 0},
  {id: 1, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0, hasseed: 0},
  {id: 2, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0, hasseed: 0},
  {id: 3, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0, hasseed: 0},
  {id: 4, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0, hasseed: 0},
  {id: 5, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0, hasseed: 0},
  {id: 6, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0, hasseed: 0},
  {id: 7, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0, hasseed: 0},
  {id: 8, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0, hasseed: 0},
  {id: 9, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0, hasseed: 0},
  {id: 10, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0, hasseed: 0},
  {id: 11, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0, hasseed: 0},
  {id: 12, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0, hasseed: 0},
  {id: 13, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0, hasseed: 0},
  {id: 14, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0, hasseed: 0},
  {id: 15, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0, hasseed: 0},
  {id: 16, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0, hasseed: 0},
  {id: 17, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0, hasseed: 0},
  {id: 18, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0, hasseed: 0},
  {id: 19, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0, hasseed: 0},
  {id: 20, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0, hasseed: 0},
  {id: 21, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0, hasseed: 0},
  {id: 22, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0, hasseed: 0},
  {id: 23, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0, hasseed: 0},
  {id: 24, value:0, seed_yg: 0, seed_rw: 0, color: 0, height: 0, width: 0, price: 0, hasseed: 0}
]
var users = [
  {username:'Pika' , userbalance: 20000},
  {username:'Ba', userbalance: 20000}
]

var seeditems = [];
var seeditem_data = [];
var pollenitems = [
  {id: 0, x_id:0, y_id:0, amount: 0},
  {id: 1, x_id:1, y_id:0, amount: 0},
  {id: 2, x_id:2, y_id:0, amount: 0},
  {id: 3, x_id:3, y_id:0, amount: 0},
  {id: 4, x_id:4, y_id:0, amount: 0},
  {id: 5, x_id:0, y_id:1, amount: 0},
  {id: 6, x_id:1, y_id:1, amount: 0},
  {id: 7, x_id:2, y_id:1,  amount: 0},
  {id: 8, x_id:3, y_id:1, amount: 0},
  {id: 9, x_id:4, y_id:1, amount: 0},
  {id: 10, x_id:0, y_id:2,  amount: 0},
  {id: 11, x_id:1, y_id:2, amount: 0},
  {id: 12, x_id:2, y_id:2, amount: 0},
  {id: 13, x_id:3, y_id:2, amount: 0},
  {id: 14, x_id:4, y_id:2, amount: 0},
  {id: 15, x_id:0, y_id:3, amount: 0},
  {id: 16, x_id:1, y_id:3, amount: 0},
  {id: 17, x_id:2, y_id:3, amount: 0},
  {id: 18, x_id:3, y_id:3, amount: 0},
  {id: 19, x_id:4, y_id:3, amount: 0},
  {id: 20, x_id:0, y_id:4, amount: 0},
  {id: 21, x_id:1, y_id:4, amount: 0},
  {id: 22, x_id:2, y_id:4, amount: 0},
  {id: 23, x_id:3, y_id:4, amount: 0},
  {id: 24, x_id:4, y_id:4, amount: 0}
];
var pollenitem_buttons = [];
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
      users: users,
      seeditemnum: 0,
      seeditems: seeditems, 
      seeditem_data: seeditem_data,
      pollenitems: pollenitems
    };

    this.addSprout = this.addSprout.bind(this);
    this.plugSprout = this.plugSprout.bind(this);
    this.handlePurchase = this.handlePurchase.bind(this);
    this.GetSeed = this.GetSeed.bind(this);
    this.SellSeed = this.SellSeed.bind(this);
    this.GetPollen = this.GetPollen.bind(this);
    this.PlantSeed = this.PlantSeed.bind(this);
    this.Pollination = this.Pollination.bind(this);
    

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
        deployedNetwork1.address,
      )
      
      //try to get balance of account 0
      
      this.setState({ web3: web3, accounts: accounts, contract1: instance1});
      
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
      var res = this.state.contract1.methods.randomAddSprout(x_id, y_id).send({from: this.state.accounts[0], gasPrice: '500000000'})
      .then(function(receipt){
        console.log(receipt)
      });
      /*
      this.state.contract1.methods.randomAddSprout(x_id, y_id).estimateGas({gas: 5000000}, function(error, gasAmount){
        if(gasAmount == 5000000)
            console.log('Method ran out of gas');
        else
            console.log('enough')
      });*/
      
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
      sprouttmp[sproutid].hasseed = 0;
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
  PlantSeed(sproutid) {
    if(this.state.seeditem_data.length<=0){
      MySwal.fire(`No seed to plant`)
    }
    else{
      //choose seed
    }
  }
  GetSeed(sproutid){
    console.log(sproutid);
    var seednum = 10;//should be replace with smart contract, 
    var x_id;
    var y_id;
    x_id = sproutid%5;
    y_id = (sproutid-x_id)/5;
    
    if(this.state.sprouts[sproutid].hasseed==0){
      console.log('no seed');
    }
    else{
      console.log('has seed');
      this.state.seeditems.push(<SeedItem key={this.state.seeditemnum} id={sproutid} sprout={this.state.sprouts[sproutid]} seednum={seednum} />);
      var gettime = Date.now();
      var seedobject = {id: sproutid, x_id: x_id, y_id: y_id, number: seednum, time: gettime};
      this.state.seeditem_data.push(seedobject);
      console.log(this.state.seeditem_data)
      this.setState({
        seeditemnum: this.state.seeditemnum + 1,
        seeditem_data: this.state.seeditem_data
      });
    }
  }

  

  GetPollen(sproutid){
    var x_id;
    var y_id;
    x_id = sproutid%5;
    y_id = (sproutid-x_id)/5;
    //pollenitems.push(<PollenItem key={sproutid} x_id={x_id} y_id={y_id} />);
    //pollenitem_buttons.push(<PollenItemButton key={sproutid} id={this.state.pollennum} x_id={x_id} y_id={y_id} ChoosePollen={this.ChoosePollen} />);
    var tmp = Object.assign({}, this.state.pollenitems);
    tmp[sproutid].amount = tmp[sproutid].amount+10;
    this.setState({
      pollennum: this.state.pollennum+1,
      pollenitems: tmp
    })
  }
  
  async Pollination(sproutid){
    var selected_pollenid;
    const { value: fruit } = await MySwal.fire({
      title: 'Select field validation',
      input: 'select',
      inputOptions: {
        'Pollens': {
          p0: 'P('+ this.state.pollenitems[0].x_id.toString()+',' + this.state.pollenitems[0].y_id.toString()+'): '+this.state.pollenitems[0].amount.toString() ,
          p1: 'P('+ this.state.pollenitems[1].x_id.toString()+',' + this.state.pollenitems[1].y_id.toString()+'): '+this.state.pollenitems[1].amount.toString() ,
          p2: 'P('+ this.state.pollenitems[2].x_id.toString()+',' + this.state.pollenitems[2].y_id.toString()+'): '+this.state.pollenitems[2].amount.toString() ,
          p3: 'P('+ this.state.pollenitems[3].x_id.toString()+',' + this.state.pollenitems[3].y_id.toString()+'): '+this.state.pollenitems[3].amount.toString() ,
          p4: 'P('+ this.state.pollenitems[4].x_id.toString()+',' + this.state.pollenitems[4].y_id.toString()+'): '+this.state.pollenitems[4].amount.toString() ,
          p5: 'P('+ this.state.pollenitems[5].x_id.toString()+',' + this.state.pollenitems[5].y_id.toString()+'): '+this.state.pollenitems[5].amount.toString() ,
          p6: 'P('+ this.state.pollenitems[6].x_id.toString()+',' + this.state.pollenitems[6].y_id.toString()+'): '+this.state.pollenitems[6].amount.toString() ,
          p7: 'P('+ this.state.pollenitems[7].x_id.toString()+',' + this.state.pollenitems[7].y_id.toString()+'): '+this.state.pollenitems[7].amount.toString() ,
          p8: 'P('+ this.state.pollenitems[8].x_id.toString()+',' + this.state.pollenitems[8].y_id.toString()+'): '+this.state.pollenitems[8].amount.toString() ,
          p9: 'P('+ this.state.pollenitems[9].x_id.toString()+',' + this.state.pollenitems[9].y_id.toString()+'): '+this.state.pollenitems[9].amount.toString() ,
          p10: 'P('+ this.state.pollenitems[10].x_id.toString()+',' + this.state.pollenitems[10].y_id.toString()+'): '+this.state.pollenitems[10].amount.toString() ,
          p11: 'P('+ this.state.pollenitems[11].x_id.toString()+',' + this.state.pollenitems[11].y_id.toString()+'): '+this.state.pollenitems[11].amount.toString() ,
          p12: 'P('+ this.state.pollenitems[12].x_id.toString()+',' + this.state.pollenitems[12].y_id.toString()+'): '+this.state.pollenitems[12].amount.toString() ,
          p13: 'P('+ this.state.pollenitems[13].x_id.toString()+',' + this.state.pollenitems[13].y_id.toString()+'): '+this.state.pollenitems[13].amount.toString() ,
          p14: 'P('+ this.state.pollenitems[14].x_id.toString()+',' + this.state.pollenitems[14].y_id.toString()+'): '+this.state.pollenitems[14].amount.toString() ,
          p15: 'P('+ this.state.pollenitems[15].x_id.toString()+',' + this.state.pollenitems[15].y_id.toString()+'): '+this.state.pollenitems[15].amount.toString() ,
          p16: 'P('+ this.state.pollenitems[16].x_id.toString()+',' + this.state.pollenitems[16].y_id.toString()+'): '+this.state.pollenitems[16].amount.toString() ,
          p17: 'P('+ this.state.pollenitems[17].x_id.toString()+',' + this.state.pollenitems[17].y_id.toString()+'): '+this.state.pollenitems[17].amount.toString() ,
          p18: 'P('+ this.state.pollenitems[18].x_id.toString()+',' + this.state.pollenitems[18].y_id.toString()+'): '+this.state.pollenitems[18].amount.toString() ,
          p19: 'P('+ this.state.pollenitems[19].x_id.toString()+',' + this.state.pollenitems[19].y_id.toString()+'): '+this.state.pollenitems[19].amount.toString() ,
          p20: 'P('+ this.state.pollenitems[20].x_id.toString()+',' + this.state.pollenitems[20].y_id.toString()+'): '+this.state.pollenitems[20].amount.toString() ,
          p21: 'P('+ this.state.pollenitems[21].x_id.toString()+',' + this.state.pollenitems[21].y_id.toString()+'): '+this.state.pollenitems[21].amount.toString() ,
          p22: 'P('+ this.state.pollenitems[22].x_id.toString()+',' + this.state.pollenitems[22].y_id.toString()+'): '+this.state.pollenitems[22].amount.toString() ,
          p23: 'P('+ this.state.pollenitems[23].x_id.toString()+',' + this.state.pollenitems[23].y_id.toString()+'): '+this.state.pollenitems[23].amount.toString() ,
          p24: 'P('+ this.state.pollenitems[24].x_id.toString()+',' + this.state.pollenitems[24].y_id.toString()+'): '+this.state.pollenitems[24].amount.toString()
        }
      },
      inputPlaceholder: 'Select a pollen',
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          selected_pollenid = value.slice(1);
          console.log(selected_pollenid)
          if (this.state.pollenitems[selected_pollenid].amount>0) {
            resolve()
          } else {
            resolve('No pollen here')
          }
        })
      }
    })
    
    if (fruit) {
      MySwal.fire(`You selected: P(${this.state.pollenitems[selected_pollenid].x_id}, ${this.state.pollenitems[selected_pollenid].y_id})`)
      //delete the pollen here
      var tmp = Object.assign({}, this.state.pollenitems);
      tmp[selected_pollenid].amount = tmp[selected_pollenid].amount-1;
      this.setState({
        pollenitems: tmp
      })
    }
    
  }//end pollination

  SellSeed(sproutid){
    console.log('sell seed')
    console.log(sproutid);
    console.log(this.state.seeditems)
    //todo, delete the item
    this.setState({
      userbalance: this.state.userbalance+this.state.sprouts[sproutid].price
    })
  } 

  test_c(){
    //logic for getlook
    var tmp = Object.assign({}, this.state.sprouts);
    tmp[0].value = 1;
    tmp[0].seed_yg = 0;
    tmp[0].seed_rw = 0;
    tmp[0].color = 1;
    tmp[0].width = 0;
    tmp[0].height = 0;
    tmp[0].price = 200;
    tmp[0].hasseed = 1;
    
    tmp[1].value = 1;
    tmp[1].seed_yg = 1;
    tmp[1].seed_rw = 1;
    tmp[1].color = 30;
    tmp[1].width = 10;
    tmp[1].height = 30;
    tmp[1].price = 300;
    tmp[1].hasseed = 1;

    tmp[2].value = 1;
    tmp[2].seed_yg = 1;
    tmp[2].seed_rw = 0;
    tmp[2].color = 20;
    tmp[2].width = 10;
    tmp[2].height = 50;
    tmp[2].price = 400;

    tmp[3].value = 1;
    tmp[3].seed_yg = 1;
    tmp[3].seed_rw = 1;
    tmp[3].color = 10;
    tmp[3].width = 5;
    tmp[3].height = 80;
    tmp[3].price = 500;

    tmp[4].value = 1;
    tmp[4].seed_yg = 1;
    tmp[4].seed_rw = 1;
    tmp[4].color = 10;
    tmp[4].width = 5;
    tmp[4].height = 100;
    tmp[4].price = 500;
    this.setState({sprouts: tmp});
    console.log(this.state.sprouts)
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
                  <MyItem seeditems={seeditems} pollennum={this.state.pollennum} pollenitems={this.state.pollenitems} />
                  
                  <TestButton test_c={this.test_c} testname='c' />
                  <TestButton test_j={this.test_j} testname='j' />
              </div>
                  <SproutFarm addSprout={this.addSprout} plugSprout={this.plugSprout} GetPollen={this.GetPollen} GetSeed={this.GetSeed} PlantSeed={this.PlantSeed} Pollination={this.Pollination} sprouts={this.state.sprouts} seeditem_data={this.state.seeditem_data} />
          </div>
      </div>
    );
  }
}

ReactDOM.render(<SproutApp/>, document.getElementById('root'));
