import React, { Component } from "react";
import Todos from "./components/Todos";
import Header from "./components/layouts/Header";
import AddTodo from "./components/AddTodo";
import uuid from "uuid"
import "./App.css";
let  todos = window.localStorage.getItem('todos') ? (JSON.parse(window.localStorage.getItem('todos'))) : []

class App extends Component {
  state = {
    currentSelected: "All",
    todos:
    [  
      // {
      //   id: uuid.v4(),
      //   title: "complete all work on focus hours",
      //   completed: false,
      //   note: "ads",
      //   isHidden: true,
      //   displayNotes: "none"
      // },
      // {
      //   id: uuid.v4(),
      //   title: "take rest",
      //   completed: false,
      //   note: "all ok",
      //   isHidden: true,
      //   displayNotes: "none"
      // }
    ]
   

  };
componentDidMount(){
   let  allTodos = JSON.parse(window.localStorage.getItem('todo'))
 this.setState({todos: allTodos })
}

  addTodo = title => {
    const newTodo = {
      id: uuid.v4(),
      title,
      completed: false,
      note: "",
      isHidden: true,
      displayNotes: "none"
    };
    window.localStorage.setItem('todo', JSON.stringify([...this.state.todos, newTodo]))
    this.setState({ todos: [...this.state.todos, newTodo] })
  };

  markComplete = id => {
    const todos= Array.from(this.state.todos)
    // let mTodos = JSON.parse(window.localStorage.getItem('todo'))
    // console.log(todos)
    // const todos1 = Array.from(mTodos)
        this.setState(
      {
        todos: todos.map(todo => {
          if (todo.id === id) {
            todo.completed = !todo.completed;
          }
          window.localStorage.setItem('todo', JSON.stringify(todos))
          return todo;
        })
      }
    );
  };
  saveTitle = newText =>{
    console.log(newText)
    const todos= Array.from(this.state.todos)
    for(let todo of todos){
      if(todo.id === newText.id)
      {
        todo.title = newText.title
        break;
      }
    }
    window.localStorage.setItem('todo', JSON.stringify(todos))

    this.setState({
      todos
    })
  }

  delTodo = id => {
    
    this.setState(
      {
        todos:( [...this.state.todos.filter(todo => todo.id !== id)])
      },
      // () => {
      //   this.filter(this.state.currentSelected);
      // },
      window.localStorage.setItem('todo', JSON.stringify(todos))

    );
    // console.log(todos)

  };

  changeCurrentSelected = newTab => {
    this.setState(
      {
        currentSelected: newTab
      },
      () => {
        this.filter(this.state.currentSelected);
      }
    );
  };

  filter(newTab) {
    if (this.state.currentSelected === "All") {
     return this.state.todos
    }
     else if (this.state.currentSelected === "Completed") {
      let completedTodo = this.state.todos.filter(
        item => item.completed === true
      );
  return completedTodo
    } else {
      let InCompletedTodo = this.state.todos.filter(
        item => item.completed === false
      );
      return InCompletedTodo
    }
   
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <Header changeTab={this.changeCurrentSelected} />
          <AddTodo addTodo={this.addTodo} />
          <Todos
            todos={this.filter()}
            markComplete={this.markComplete}
            delTodo={this.delTodo}
            saveTitle={this.saveTitle}
          />
        </div>
      </div>
    );
  }
}

export default App;
