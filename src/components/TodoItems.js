import React, { Component } from "react";
import PropTypes from "prop-types";
// import Todos from './Todos'
import Note from './Note'

export class TodoItem extends Component {
  getStyle = () => {
    return {
      background: "#f4f4f4",
      padding: "10px",
      resize: "both",
      borderBottom: "1px #ccc dotted",
      textDecoration: this.props.todo.completed ? "line-through" : "none"
    };
  };
  constructor(props) {
    super(props);
    this.state = { editing: false, showNote: false,changedText:this.props.todo.title };
  }
  // componentDidMount() {
  //   this.setState({ changedText: this.props.todo.title });
  // }
  handleEditing(event) {
    
    this.setState({ editing: true,  changedText: event.target.value});

    // this.setState({ editing: true });
  }
  handleEditingDone(event) {
    if (event.keyCode === 13) {
      this.setState({ editing: false })
    
      const id = this.props.todo.id;
    const newtext = {
      title:this.state.changedText,
      id
    };
    this.props.saveTitle(newtext);
    // this.setState({ editing: false })
  }
  }
  handleEditingChange(event) {
    this.setState({ changedText : event.target.value });
  }

  handleNote(e) {
    this.setState(prev => ({
      showNote: !prev.showNote
    }));
  }

  render() {
    const { id, title } = this.props.todo;
    let viewStyle = {};
    let editStyle = {};

    if (this.state.editing) {
      viewStyle.display = "none";
    } else {
      editStyle.display = "none";
    }
    return (
      <div style={this.getStyle()}>
        <p>
          <div style={viewStyle} onDoubleClick={this.handleEditing.bind(this)}>
            <input
              className="checkBox"
              type="checkbox"
              onChange={this.props.markComplete.bind(this, id)}
              // onchange = { this.props.handleDone.bind(null,todo.id)}
            />
            {"  "}
            {this.state.changedText}
            <button
              onClick={this.props.delTodo.bind(this, id)}
              style={btnStyle}
            >
              x
            </button>
            <button style={btnStyle} onClick={this.handleNote.bind(this)}>
              note
            </button>
            <Note  show={this.state.showNote} />
          </div>
          <input
            type="text "
            style={editStyle}
            value={this.state.changedText}
            onChange={this.handleEditingChange.bind(this)}
            onKeyDown={this.handleEditingDone.bind(this)}
           
          />
        </p>
      </div>
    );
  }
}

// PropTypes
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  markComplete: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired
};

const btnStyle = {
  background: "#ff0000",
  color: "#fff",
  border: "none",
  padding: "5px 9px",
  borderRadius: "50%",
  cursor: "pointer",
  float: "right"
};

export default TodoItem;
// onClick={toggleState.bind(this, id, title)}
