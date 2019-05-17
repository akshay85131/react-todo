import React, { Component } from "react";
import "./App.css";
import Todos from "./components/Todos";
import Header from "./components/layouts/Header";
import AddTodo from "./components/AddTodo";
import uuid from "uuid";

class App extends Component {
  state = {
    filterTodos: [],
    currentSelected:"All",
    todos: [
      {
        id: uuid.v4(),
        title: "complete all work on focus hours",
        completed: false,
        note :"ads",
        isHidden: true,
        displayNotes: "none"
      },
      {
        id: uuid.v4(),
        title: "take rest",
        completed: false,
        note : "all ok",
        isHidden: true,
        displayNotes: "none"
      }
    ]
  };

  addTodo = title => {
    const newTodo = {
      id: uuid.v4(),
      title,
      completed: false,
      note: '',
      isHidden: true,
      displayNotes: "none"
    };

    this.setState({ todos: [...this.state.todos, newTodo]}, ()=>{
       this.filter(this.state.currentSelected)
      }
    );
  }
     

  componentDidMount(){
    this.setState({filterTodos:this.state.todos})
    
  }

  markComplete = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    }, ()=>{
      this.filter(this.state.currentSelected)
     });
    
  };

  delTodo = id => {
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)]
    }, ()=>{
      this.filter(this.state.currentSelected)
     });
   
  };


  changeCurrentSelected = newTab => {
    this.setState({
      currentSelected: newTab
    }, ()=>{
      this.filter(this.state.currentSelected)
     })
  }

  filter(newTab){
    if(newTab === 'All'){
      this.setState({filterTodos:this.state.todos})
    }
    else if(newTab === 'Completed'){
     let completedTodo= this.state.todos.filter(item=>item.completed ===true)
     console.log(completedTodo)
     this.setState({filterTodos:completedTodo})
    }
    else {
      let InCompletedTodo= this.state.todos.filter(item=>item.completed ===false)
      this.setState({filterTodos:InCompletedTodo})
     }
    

  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <Header  changeTab= {this.changeCurrentSelected}/>
          <AddTodo addTodo={this.addTodo} />
          <Todos
            todos={this.state.filterTodos}
            markComplete={this.markComplete}
            delTodo={this.delTodo}
          />
        </div>
      </div>
    );
  }
}

export default App;
