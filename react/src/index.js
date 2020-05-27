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

import TodoHeader from './pages/TodoHeader';
import TodoForm from './pages/TodoForm';
import TodoList from './pages/TodoList';
import TestButton from './components/testbutton';
import './index.css';

var todoItems = [];
  
class TodoApp extends React.Component {
  constructor (props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);
    this.state = {todoItems: todoItems, web3: null, accounts: null, contract: null };

    this.test_c = this.test_c.bind(this);
    this.test_j = this.test_j.bind(this);
  }

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = TodoAppContract.networks[networkId];
      const instance = new web3.eth.Contract(
        TodoAppContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      this.setState({ web3, accounts, contract: instance });
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
  test_c(){
    console.log('test c');
  }

  test_j(){
    console.log('test j');
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div id="main">
        <TestButton testname="c" test_c={this.test_c}/>
        <TestButton testname="j" test_j={this.test_j}/>
      </div>
    );
  }
}

ReactDOM.render(
  <TodoApp initItems={todoItems}/>,
  document.getElementById('root')
);