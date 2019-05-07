import React from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from './TodoList'
function App() {
  return (
    <div className="App">
     class App extends Component {
  constructor() {
    super()
    this.sate = {
      items: [],
      currentItem: {text:'', key:''},
    }
  }
  handleInput = e => {
    console.log('Hello Input')
  }
  addItem = () => {
    console.log('Hello Add Item')
  }
  render() {
    return (
      <div className="App">
        <TodoList addItem={this.addItem} />
      </div>
      <TodoList
          addItem={this.addItem}
          inputElement={this.inputElement}
          handleInput={this.handleInput}
          currentItem={this.state.currentItem}
        />
    )
  }
}

export default App
    </div>
  );
}

export default App;
