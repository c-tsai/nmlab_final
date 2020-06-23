import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Web3 from 'web3';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

//Contracts
import SproutContract from './build/contracts/Sprout.json';

//Components
import Header from './components/header';
import User from './components/user';
import MyItem from './components/myitembox'
import SproutFarm from './components/sproutfarm';
import SeedItem from './components/seeditem';

const MySwal = withReactContent(Swal)
/*init sprouts*/
var seeditem_data = [];
var seeditems = [];
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
var sprouts = [
  {id:0, exist:0, x_id:0, y_id:0, dna1:0 , dna2:0 , addsprouttime: 0, fullgrowntime: 0, seed_yg:0, seed_rw:0, color:0, height: 0, width: 0, price: 0, hasseed: 0, haspollen: 0, seed_dna1: 0, seed_dna2: 0, pollination: 0},
  {id:1, exist:0, x_id:1, y_id:0, dna1:0 , dna2:0 , addsprouttime: 0, fullgrowntime: 0, seed_yg:0, seed_rw:0, color:0, height: 0, width: 0, price: 0, hasseed: 0, haspollen: 0, seed_dna1: 0, seed_dna2: 0, pollination: 0},
  {id:2, exist:0, x_id:2, y_id:0, dna1:0 , dna2:0 , addsprouttime: 0, fullgrowntime: 0, seed_yg:0, seed_rw:0, color:0, height: 0, width: 0, price: 0, hasseed: 0, haspollen: 0, seed_dna1: 0, seed_dna2: 0, pollination: 0},
  {id:3, exist:0, x_id:3, y_id:0, dna1:0 , dna2:0 , addsprouttime: 0, fullgrowntime: 0, seed_yg:0, seed_rw:0, color:0, height: 0, width: 0, price: 0, hasseed: 0, haspollen: 0, seed_dna1: 0, seed_dna2: 0, pollination: 0},
  {id:4, exist:0, x_id:4, y_id:0, dna1:0 , dna2:0 , addsprouttime: 0, fullgrowntime: 0, seed_yg:0, seed_rw:0, color:0, height: 0, width: 0, price: 0, hasseed: 0, haspollen: 0, seed_dna1: 0, seed_dna2: 0, pollination: 0},
  {id:5, exist:0, x_id:0, y_id:1, dna1:0 , dna2:0 , addsprouttime: 0, fullgrowntime: 0, seed_yg:0, seed_rw:0, color:0, height: 0, width: 0, price: 0, hasseed: 0, haspollen: 0, seed_dna1: 0, seed_dna2: 0, pollination: 0},
  {id:6, exist:0, x_id:1, y_id:1, dna1:0 , dna2:0 , addsprouttime: 0, fullgrowntime: 0, seed_yg:0, seed_rw:0, color:0, height: 0, width: 0, price: 0, hasseed: 0, haspollen: 0, seed_dna1: 0, seed_dna2: 0, pollination: 0},
  {id:7, exist:0, x_id:2, y_id:1, dna1:0 , dna2:0 , addsprouttime: 0, fullgrowntime: 0, seed_yg:0, seed_rw:0, color:0, height: 0, width: 0, price: 0, hasseed: 0, haspollen: 0, seed_dna1: 0, seed_dna2: 0, pollination: 0},
  {id:8, exist:0, x_id:3, y_id:1, dna1:0 , dna2:0 , addsprouttime: 0, fullgrowntime: 0, seed_yg:0, seed_rw:0, color:0, height: 0, width: 0, price: 0, hasseed: 0, haspollen: 0, seed_dna1: 0, seed_dna2: 0, pollination: 0},
  {id:9, exist:0, x_id:4, y_id:1, dna1:0 , dna2:0 , addsprouttime: 0, fullgrowntime: 0, seed_yg:0, seed_rw:0, color:0, height: 0, width: 0, price: 0, hasseed: 0, haspollen: 0, seed_dna1: 0, seed_dna2: 0, pollination: 0},
  {id:10, exist:0, x_id:0, y_id:2, dna1:0 , dna2:0 , addsprouttime: 0, fullgrowntime: 0, seed_yg:0, seed_rw:0, color:0, height: 0, width: 0, price: 0, hasseed: 0, haspollen: 0, seed_dna1: 0, seed_dna2: 0, pollination: 0},
  {id:11, exist:0, x_id:1, y_id:2, dna1:0 , dna2:0 , addsprouttime: 0, fullgrowntime: 0, seed_yg:0, seed_rw:0, color:0, height: 0, width: 0, price: 0, hasseed: 0, haspollen: 0, seed_dna1: 0, seed_dna2: 0, pollination: 0},
  {id:12, exist:0, x_id:2, y_id:2, dna1:0 , dna2:0 , addsprouttime: 0, fullgrowntime: 0, seed_yg:0, seed_rw:0, color:0, height: 0, width: 0, price: 0, hasseed: 0, haspollen: 0, seed_dna1: 0, seed_dna2: 0, pollination: 0},
  {id:13, exist:0, x_id:3, y_id:2, dna1:0 , dna2:0 , addsprouttime: 0, fullgrowntime: 0, seed_yg:0, seed_rw:0, color:0, height: 0, width: 0, price: 0, hasseed: 0, haspollen: 0, seed_dna1: 0, seed_dna2: 0, pollination: 0},
  {id:14, exist:0, x_id:4, y_id:2, dna1:0 , dna2:0 , addsprouttime: 0, fullgrowntime: 0, seed_yg:0, seed_rw:0, color:0, height: 0, width: 0, price: 0, hasseed: 0, haspollen: 0, seed_dna1: 0, seed_dna2: 0, pollination: 0},
  {id:15, exist:0, x_id:0, y_id:3, dna1:0 , dna2:0 , addsprouttime: 0, fullgrowntime: 0, seed_yg:0, seed_rw:0, color:0, height: 0, width: 0, price: 0, hasseed: 0, haspollen: 0, seed_dna1: 0, seed_dna2: 0, pollination: 0},
  {id:16, exist:0, x_id:1, y_id:3, dna1:0 , dna2:0 , addsprouttime: 0, fullgrowntime: 0, seed_yg:0, seed_rw:0, color:0, height: 0, width: 0, price: 0, hasseed: 0, haspollen: 0, seed_dna1: 0, seed_dna2: 0, pollination: 0},
  {id:17, exist:0, x_id:2, y_id:3, dna1:0 , dna2:0 , addsprouttime: 0, fullgrowntime: 0, seed_yg:0, seed_rw:0, color:0, height: 0, width: 0, price: 0, hasseed: 0, haspollen: 0, seed_dna1: 0, seed_dna2: 0, pollination: 0},
  {id:18, exist:0, x_id:3, y_id:3, dna1:0 , dna2:0 , addsprouttime: 0, fullgrowntime: 0, seed_yg:0, seed_rw:0, color:0, height: 0, width: 0, price: 0, hasseed: 0, haspollen: 0, seed_dna1: 0, seed_dna2: 0, pollination: 0},
  {id:19, exist:0, x_id:4, y_id:3, dna1:0 , dna2:0 , addsprouttime: 0, fullgrowntime: 0, seed_yg:0, seed_rw:0, color:0, height: 0, width: 0, price: 0, hasseed: 0, haspollen: 0, seed_dna1: 0, seed_dna2: 0, pollination: 0},
  {id:20, exist:0, x_id:0, y_id:4, dna1:0 , dna2:0 , addsprouttime: 0, fullgrowntime: 0, seed_yg:0, seed_rw:0, color:0, height: 0, width: 0, price: 0, hasseed: 0, haspollen: 0, seed_dna1: 0, seed_dna2: 0, pollination: 0},
  {id:21, exist:0, x_id:1, y_id:4, dna1:0 , dna2:0 , addsprouttime: 0, fullgrowntime: 0, seed_yg:0, seed_rw:0, color:0, height: 0, width: 0, price: 0, hasseed: 0, haspollen: 0, seed_dna1: 0, seed_dna2: 0, pollination: 0},
  {id:22, exist:0, x_id:2, y_id:4, dna1:0 , dna2:0 , addsprouttime: 0, fullgrowntime: 0, seed_yg:0, seed_rw:0, color:0, height: 0, width: 0, price: 0, hasseed: 0, haspollen: 0, seed_dna1: 0, seed_dna2: 0, pollination: 0},
  {id:23, exist:0, x_id:3, y_id:4, dna1:0 , dna2:0 , addsprouttime: 0, fullgrowntime: 0, seed_yg:0, seed_rw:0, color:0, height: 0, width: 0, price: 0, hasseed: 0, haspollen: 0, seed_dna1: 0, seed_dna2: 0, pollination: 0},
  {id:24, exist:0, x_id:4, y_id:4, dna1:0 , dna2:0 , addsprouttime: 0, fullgrowntime: 0, seed_yg:0, seed_rw:0, color:0, height: 0, width: 0, price: 0, hasseed: 0, haspollen: 0, seed_dna1: 0, seed_dna2: 0, pollination: 0}
]

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      web3: null,
      accounts: null,
      current_time: null,
      username: null,
      userbalance: null,
      contract: null,
      sprouts: sprouts,
      seeditems: seeditems,
      seeditem_data: seeditem_data,
      pollenitems: pollenitems
    }
    this.handleClick = this.handleClick.bind(this);
    this.testContract = this.testContract.bind(this);
    this.dataupdatetest = this.dataupdatetest.bind(this);
    this.updatesproutlook = this.updatesproutlook.bind(this);

    this.addSprout = this.addSprout.bind(this);
    this.plugSprout = this.plugSprout.bind(this);
    this.GetSeed = this.GetSeed.bind(this);
    this.PlantSeed = this.PlantSeed.bind(this);
    this.GetPollen = this.GetPollen.bind(this);
    this.Pollination = this.Pollination.bind(this);
  }//end constructor
  componentDidMount = async() =>  {
    try {
      const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();

      const deployNetwork = SproutContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SproutContract.abi,
        deployNetwork.address
      )
      this.setState({
        web3: web3,
        accounts: accounts,
        contract: instance
      });
      this.interval = setInterval(this.dataupdatetest.bind(), 1000);
      
      /*Register here*/
      const { value: username } = await MySwal.fire({
        title: 'Enter your user name',
        input: 'text',
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'You need to write something!'
          }
        }
      })
      if (username) {
        MySwal.fire(`Hello ${username}`);
        this.setState({username: username});
        var res2 = await this.state.contract.methods.Register(this.state.accounts[0]).send({from: this.state.accounts[0]});
        console.log(res2)
        var res = await this.state.contract.methods.balanceOf(this.state.accounts[0]).call({from: this.state.accounts[0]});
        this.setState({userbalance: Number(res)})
        
      }
      //end register
      //update information about every sprout here
      //this.interval = setInterval(this.updatesproutlook.bind(), 1000);
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };//end componetdidmount
  //this is for contract testing
  async testContract(){
    //make seed and pollen available for sprout 0
    let sprouttmp = Object.assign({}, this.state.sprouts);
    sprouttmp[0].hasseed = 1;
    sprouttmp[0].haspollen = 1;
    this.setState({sprouts: sprouttmp});
  }
  dataupdatetest() {
    var tmp = new Date(Date.now()).toLocaleString();
    this.setState({ current_time: tmp});
  }

  async updatesproutlook(){
    var i;
    let sprouttmp = Object.assign({}, this.state.sprouts);
    var cur_time = Date.now();
    for (i = 0; i < 25; i++) {
      if (sprouttmp[i].exist==0) {
         continue;
      }else{
        var x_id = sprouttmp[i].x_id;
        var y_id = sprouttmp[i].y_id;
        var hei = await this.state.contract.methods.getSproutHeight(x_id, y_id, cur_time).call({from: this.state.accounts[0]});
        var wid = await this.state.contract.methods.getSproutWidth(x_id, y_id, cur_time).call({from: this.state.accounts[0]});
        var nowstage = await this.state.contract.methods.getGrownTime(x_id, y_id, cur_time).call({from: this.state.accounts[0]});
        var fullgrowntime = await this.state.contract.methods.getFullGrownTime(x_id, y_id).call({from: this.state.accounts[0]});
        var price = await this.state.contract.methods.getSproutPrice(Number(nowstage),Number(fullgrowntime), Number(hei), Number(wid), x_id, y_id).call({from: this.state.accounts[0]});
        
        sprouttmp[i].width = Number(wid);
        sprouttmp[i].height = Number(hei);
        sprouttmp[i].price = Number(price);
        console.log('sprout', i);
        console.log('sprout price: ', sprouttmp[i].price)
      } 
    }//end for
    //this.setState({sprouts: sprouttmp});
    console.log('sproutlook updated')
  }
  async handleClick(){
    let sprouttmp = Object.assign({}, this.state.sprouts);
    var cur_time = Date.now();
    var hei = await this.state.contract.methods.getSproutHeight(0, 0, cur_time).call({from: this.state.accounts[0]});
    console.log('height', hei);
    var wid = await this.state.contract.methods.getSproutWidth(0, 0, cur_time).call({from: this.state.accounts[0]});
    console.log('width', wid);
    var nowstage = await this.state.contract.methods.getGrownTime(0, 0, cur_time).call({from: this.state.accounts[0]});
    console.log('nowstage', nowstage);
    var fullgrowntime = await this.state.contract.methods.getFullGrownTime(0, 0).call({from: this.state.accounts[0]});
    console.log('fullgrowntime', fullgrowntime);
    var price = await this.state.contract.methods.getSproutPrice(Number(nowstage),Number(fullgrowntime), Number(hei), Number(wid), 0, 0).call({from: this.state.accounts[0]});
    console.log('price', price)
    sprouttmp[0].height = hei;
    sprouttmp[0].width = wid;
    sprouttmp[0].price = price;
    this.setState({sprouts: sprouttmp});
  }

  /*Functions*/
  async addSprout(sproutid) {
    //check user balance
    var currentbalance = await this.state.contract.methods.balanceOf(this.state.accounts[0]).call({from: this.state.accounts[0]});
    if(Number(currentbalance<300)){
      MySwal.fire(`Must have at least $300 to plant sprout!`);
    }
    else{
      let sprouttmp = Object.assign({}, this.state.sprouts);
      var x_id = this.state.sprouts[sproutid].x_id;
      var y_id = this.state.sprouts[sproutid].y_id;
      //add sprout (smart contract)
      var dna1 = Math.floor((Math.random() * 2**20) + 1);
      var dna2 = Math.floor((Math.random() * 2**20) + 1);
      var addsprouttime = Date.now();

      console.log(this.state.contract.methods)
      var res1 = await this.state.contract.methods.addSprout1(x_id, y_id, dna1, dna2).send({from: this.state.accounts[0], gasPrice: '5000000'});
      console.log(res1);
      var res2 = await this.state.contract.methods.addSprout2(x_id, y_id, addsprouttime).send({from: this.state.accounts[0], gasPrice: '5000000'});
      console.log(res2)
      var res3 = await this.state.contract.methods.addSprout3(x_id, y_id, dna1, dna2).send({from: this.state.accounts[0], gasPrice: '5000000'});
      console.log(res3)
      //get sprout look
      var seedyellow = await this.state.contract.methods.getSeedYellow(x_id, y_id).call({from: this.state.accounts[0]});
      console.log('seedyellow', seedyellow);
      var seedround = await this.state.contract.methods.getSeedRound(x_id, y_id).call({from: this.state.accounts[0]});
      console.log('seedround', seedround);
      var color = await this.state.contract.methods.getColor(x_id, y_id).call({from: this.state.accounts[0]});
      console.log('color', color)
      var hei = await this.state.contract.methods.getSproutHeight(x_id, y_id, addsprouttime).call({from: this.state.accounts[0]});
      console.log('height', hei);
      var wid = await this.state.contract.methods.getSproutWidth(x_id, y_id, addsprouttime).call({from: this.state.accounts[0]});
      console.log('width', wid);
      var nowstage = await this.state.contract.methods.getGrownTime(x_id, y_id, addsprouttime).call({from: this.state.accounts[0]});
      console.log('nowstage', nowstage);
      var fullgrowntime = await this.state.contract.methods.getFullGrownTime(x_id, y_id).call({from: this.state.accounts[0]});
      console.log('fullgrowntime', fullgrowntime);
      var price = await this.state.contract.methods.getSproutPrice(Number(nowstage),Number(fullgrowntime), Number(hei), Number(wid), x_id, y_id).call({from: this.state.accounts[0]});
      console.log('price', price)

      var newbalance = await this.state.contract.methods.balanceOf(this.state.accounts[0]).call({from: this.state.accounts[0]});
      console.log(newbalance)
      this.setState({userbalance: Number(newbalance)});
      sprouttmp[sproutid].exist = 1;
      sprouttmp[sproutid].dna1 = dna1;
      sprouttmp[sproutid].dna2 = dna2;
      if(seedyellow==true){
        sprouttmp[sproutid].seed_yg = 0;
      }else{
        sprouttmp[sproutid].seed_yg = 1;
      }
      if(seedround==true){
        sprouttmp[sproutid].seed_rw = 0;
      }else{
        sprouttmp[sproutid].seed_rw = 1;
      }
      sprouttmp[sproutid].color = Math.floor(Number(color)/2);
      sprouttmp[sproutid].width = Number(wid);
      sprouttmp[sproutid].height = Number(hei);
      sprouttmp[sproutid].price = Number(price);
      sprouttmp[sproutid].seed_dna1 = dna1;
      sprouttmp[sproutid].seed_dna2 = dna2;
      sprouttmp[sproutid].addsprouttime = addsprouttime;
      sprouttmp[sproutid].fullgrowntime = fullgrowntime;
      sprouttmp[sproutid].hasseed = 1;//this is for test
      sprouttmp[sproutid].haspollen = 1;//this is for test
      this.setState({sprouts: sprouttmp});
    }
  }

  async plugSprout(sproutid) {
    let sprouttmp = Object.assign({}, this.state.sprouts);
    //transfer money to account
    var x_id = this.state.sprouts[sproutid].x_id;
    var y_id = this.state.sprouts[sproutid].y_id;
    //var res = await this.state.contract.methods.transfer(this.state.accounts[0], sprouttmp[sproutid].price).send({from: this.state.accounts[0]});
    var cur_time = Date.now();
    //plug the sprout(smart contract)
    //get sprout look
    var hei = await this.state.contract.methods.getSproutHeight(x_id, y_id, cur_time).call({from: this.state.accounts[0]});
    console.log('height', hei);
    var wid = await this.state.contract.methods.getSproutWidth(x_id, y_id, cur_time).call({from: this.state.accounts[0]});
    console.log('width', wid);
    var nowstage = await this.state.contract.methods.getGrownTime(x_id, y_id, cur_time).call({from: this.state.accounts[0]});
    console.log('nowstage', nowstage);
    var fullgrowntime = await this.state.contract.methods.getFullGrownTime(x_id, y_id).call({from: this.state.accounts[0]});
    console.log('fullgrowntime', fullgrowntime);
    var price = await this.state.contract.methods.getSproutPrice(Number(nowstage),Number(fullgrowntime), Number(hei), Number(wid), x_id, y_id).call({from: this.state.accounts[0]});
    console.log('price', price);
    var res1 = await this.state.contract.methods.plugSprout(x_id, y_id, Number(price)).send({from: this.state.accounts[0]});
    console.log(res1)
    var newbalance = await  this.state.contract.methods.balanceOf(this.state.accounts[0]).call({from: this.state.accounts[0]});
    this.setState({userbalance: Number(newbalance)});
    
    //var res3 = await this.state.contract.methods.plugSprout3(x_id, y_id).send({from: this.state.accounts[0]});
    //console.log(res3)
    //var res4 = await this.state.contract.methods.plugSprout4(x_id, y_id).send({from: this.state.accounts[0]});
    //console.log(res4)
    
    
    /*var res2 = await this.state.contract.methods.plugSprout2(x_id, y_id).send({from: this.state.accounts[0]});
    console.log(res2)
    var res3 = await this.state.contract.methods.plugSprout3(x_id, y_id).send({from: this.state.accounts[0]});
    console.log(res3)*/
    sprouttmp[sproutid].exist = 0;
    sprouttmp[sproutid].dna1 = 0;
    sprouttmp[sproutid].dna2 = 0;
    sprouttmp[sproutid].seed_yg = 0;
    sprouttmp[sproutid].seed_rw = 0;
    sprouttmp[sproutid].color = 0;
    sprouttmp[sproutid].width = 0;
    sprouttmp[sproutid].height = 0;
    sprouttmp[sproutid].price = 0;
    sprouttmp[sproutid].hasseed = 0;
    sprouttmp[sproutid].haspollen = 0;
    
  }

  GetSeed(sproutid){
    var seednum = 10;
    var x_id = this.state.sprouts[sproutid];
    var y_id = this.state.sprouts[sproutid];
    //call smart contract, check plugseed
    if(this.state.sprouts[sproutid].hasseed==0){
      console.log('no seed');
      MySwal.fire(`No seed here`)
    }
    else{
      let sprouttmp = Object.assign({}, this.state.sprouts);
      sprouttmp[sproutid].hasseed = 0;
      console.log('has seed');
      var gettime = Date.now();
      var seedobject = {id: sproutid, x_id: this.state.sprouts[sproutid].x_id, y_id: this.state.sprouts[sproutid].y_id, number: seednum, time: gettime, sprout: this.state.sprouts[sproutid]};
      this.state.seeditem_data.push(seedobject);
      this.state.seeditems.push(<SeedItem key={gettime} id={sproutid} sprout={this.state.sprouts[sproutid]} seeditemdata={this.state.seeditem_data[this.state.seeditem_data.length-1]}/>);
      this.setState({
        seeditem_data: this.state.seeditem_data
      });
    }
  }

  async PlantSeed(sproutid, seeddata){
    if(this.state.sprouts[sproutid].exist==1){
      MySwal.fire(`Can't plant here`);
    } else{
      console.log('line 375 seeddata.price', seeddata.price);
      let sprouttmp = Object.assign({}, this.state.sprouts);
      var x_id = this.state.sprouts[sproutid].x_id;
      var y_id = this.state.sprouts[sproutid].y_id;
      var dna1 = seeddata.sprout.seed_dna1;
      var dna2 = seeddata.sprout.seed_dna2;
      var addsprouttime = Date.now();
      //call smart contract
      var res1 = await this.state.contract.methods.addSprout1(x_id, y_id, dna1, dna2).send({from: this.state.accounts[0]});
      console.log(res1);
      var res2 = await this.state.contract.methods.addSprout2(x_id, y_id, addsprouttime).send({from: this.state.accounts[0]});
      console.log(res2);
      var res3 = await this.state.contract.methods.addSprout4plantSeed(x_id, y_id, dna1, dna2).send({from: this.state.accounts[0]});
      console.log(res3);

      //get sprout look
      var seedyellow = await this.state.contract.methods.getSeedYellow(x_id, y_id).call({from: this.state.accounts[0]});
      console.log('seedyellow', seedyellow);
      var seedround = await this.state.contract.methods.getSeedRound(x_id, y_id).call({from: this.state.accounts[0]});
      console.log('seedround', seedround);
      var color = await this.state.contract.methods.getColor(x_id, y_id).call({from: this.state.accounts[0]});
      console.log('color', color)
      var hei = await this.state.contract.methods.getSproutHeight(x_id, y_id, addsprouttime).call({from: this.state.accounts[0]});
      console.log('height', hei);
      var wid = await this.state.contract.methods.getSproutWidth(x_id, y_id, addsprouttime).call({from: this.state.accounts[0]});
      console.log('width', wid);
      var nowstage = await this.state.contract.methods.getGrownTime(x_id, y_id, addsprouttime).call({from: this.state.accounts[0]});
      console.log('nowstage', nowstage);
      var fullgrowntime = await this.state.contract.methods.getFullGrownTime(x_id, y_id).call({from: this.state.accounts[0]});
      console.log('fullgrowntime', fullgrowntime);
      var price = await this.state.contract.methods.getSproutPrice(Number(nowstage),Number(fullgrowntime), Number(hei), Number(wid), x_id, y_id).call({from: this.state.accounts[0]});
      console.log('price', price)

      console.log('line 407 seeddata.price', seeddata.sprout.price);
      sprouttmp[sproutid].exist = 1;
      sprouttmp[sproutid].dna1 = dna1;
      sprouttmp[sproutid].dna2 = dna2;
      sprouttmp[sproutid].seed_dna1 = dna1;
      sprouttmp[sproutid].seed_dna2 = dna2;
      sprouttmp[sproutid].addsprouttime = addsprouttime;
      sprouttmp[sproutid].fullgrowntime = fullgrowntime;
      if(seedyellow==true){
        sprouttmp[sproutid].seed_yg = 0;
      }else{
        sprouttmp[sproutid].seed_yg = 1;
      }
      if(seedround==true){
        sprouttmp[sproutid].seed_rw = 0;
      }else{
        sprouttmp[sproutid].seed_rw = 1;
      }
      
      sprouttmp[sproutid].color = Math.floor(Number(color)/2);
      sprouttmp[sproutid].width = Number(wid);
      sprouttmp[sproutid].height = Number(hei);
      sprouttmp[sproutid].price = Number(price);
      this.setState({sprouts: sprouttmp});
      
      const isseed= (element) => element.time == seeddata.time;
      var ind = this.state.seeditem_data.findIndex(isseed);
      var tmp = Object.assign({}, this.state.seeditem_data);
      tmp[ind].number = tmp[ind].number-1;
      if(tmp[ind].number==0){
        const data = this.state.seeditem_data.filter(i => i.time != seeddata.time);
        this.setState({seeditem_data: data});
        console.log(this.state.seeditems)
        const data2 = this.state.seeditems.filter(i => i.props.seeditemdata.time != seeddata.time);
        console.log(data2);
        this.setState({seeditems: data2});
      }
    }
  }

  GetPollen(sproutid) {
    if(this.state.sprouts[sproutid].haspollen==0){
      MySwal.fire(`No pollen here`);
    } else {
      var tmp = Object.assign({}, this.state.pollenitems);
      tmp[sproutid].amount = tmp[sproutid].amount+10;
      this.setState({
        pollenitems: tmp
      })
    }
  }

  async Pollination(sproutid){
    var selected_pollenid;
    if(this.state.sprouts[sproutid].exist==0){
      MySwal.fire(`No sprout here!`);
    }
    else{
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
        //modify seed_dna1, seed_dna2
        var sprouttmp = Object.assign({}, this.state.sprouts);
        var dna1 = sprouttmp[sproutid].dna1+sprouttmp[selected_pollenid].dna1;
        var dna2 = sprouttmp[sproutid].dna1+sprouttmp[selected_pollenid].dna2;
        sprouttmp[sproutid].seed_dna1 = dna1;
        sprouttmp[sproutid].seed_dna2 = dna2;
        sprouttmp[sproutid].pollination = 1;
        sprouttmp[sproutid].hasseed = 1;
        this.setState({sprouts: sprouttmp});
      }
    }
    
  }//end pollination
  
  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    this.updatesproutlook()
    return(
      <div>
        <Header current_time={this.state.current_time}/>
        
        <div id="main_container" class="ts container grid very">
          <div class="four wide column segment">
              <User username={this.state.username} userbalance={this.state.userbalance} />
              <MyItem seeditems={this.state.seeditems} pollenitems={this.state.pollenitems} />
              
          </div>
          <SproutFarm addSprout={this.addSprout} plugSprout={this.plugSprout} GetSeed={this.GetSeed} PlantSeed={this.PlantSeed} GetPollen={this.GetPollen} Pollination={this.Pollination} sprouts={this.state.sprouts} seeditem_data={this.state.seeditem_data} />
        </div>
      </div>
    )
  }
} 

ReactDOM.render(<App/>, document.getElementById('root'));
