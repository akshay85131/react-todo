import React, { Component } from "react";
import TodoItem from "./TodoItems";
import PropTypes from "prop-types";

class Todos extends Component {
 
  render() {
    
    return this.props.todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        markComplete={this.props.markComplete}
        delTodo={this.props.delTodo}
        saveTitle={this.props.saveTitle}
      />
    ));
  }
}

// PropTypes
Todos.propTypes = {
  todos: PropTypes.array.isRequired,
  markComplete: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired,
  editTodo:PropTypes.func.isRequired
};

export default Todos;
