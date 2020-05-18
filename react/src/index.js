/* Reference: https://codepen.io/marekdano/pen/bVNYpq
Todo app structure

TodoApp
	- TodoHeader
	- TodoList
    - TodoListItem #1
		- TodoListItem #2
		  ...
		- TodoListItem #N
	- TodoForm
*/

import React from 'react';
import ReactDOM from 'react-dom';
import getWeb3 from "./utils/getWeb3";

import TodoAppContract from "./build/contracts/TodoApp.json"
import SproutAppContract from "./build/contracts/SproutApp.json"
import TodoHeader from './pages/TodoHeader';
import TodoForm from './pages/TodoForm';
import TodoList from './pages/TodoList';
import './index.css';

import SproutCard from './components/Sprout/SproutCard.js'
import Farm from './components/Sprout/farm.js'
import UserCard from './components/User/UserCard.js'
var todoItems = [];
var sprouts = [];//mycode
class TodoApp extends React.Component {
  constructor (props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);
    this.addSprout = this.addSprout.bind(this);//mycode
    this.state = {todoItems: todoItems, web3: null, accounts: null, contract: null, sprouts: sprouts};
  }

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = TodoAppContract.networks[networkId];
      const deployedNetwork2 = SproutAppContract.networks[networkId];
      const instance = new web3.eth.Contract(
        TodoAppContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      const instance2 = new web3.eth.Contract(  
        SproutAppContract.abi,
        deployedNetwork2 && deployedNetwork2.address,
      )
      this.setState({ web3, accounts, contract1: instance , contract2: instance2});
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  /* YOUR CODE HERE */
  // Maybe you sould take a look at https://github.com/truffle-box/react-box



  addItem (todoItem) {
    todoItems.unshift({
      index: todoItems.length+1,
      value: todoItem.newItemValue,
      done: false
    });
    this.setState({todoItems: todoItems});
  }

  addSprout(){
    var d = new Date();
    var n = d.getTime();
    sprouts.unshift({
      index: sprouts.length+1,
      value: n,
      done: false
    });
  }
  removeItem (itemIndex) {
    todoItems.splice(itemIndex, 1);
    this.setState({todoItems: todoItems});
  }
  markTodoDone(itemIndex) {
    var todo = todoItems[itemIndex];
    todoItems.splice(itemIndex, 1);
    if (todo.done) {

    } else {

    }
    todo.done = !todo.done;
    todo.done ? todoItems.push(todo) : todoItems.unshift(todo);
    this.setState({todoItems: todoItems});
  }
  /* END OF YOUR CODE */
  /*Sprout functions*/
  
  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div id="main_content" class="ts container grid">
        <TodoHeader/>
        <UserCard/>
        <Farm/>
      </div>
    );
  }
}

ReactDOM.render(
  <TodoApp initItems={todoItems}/>,
  document.getElementById('root')
);
