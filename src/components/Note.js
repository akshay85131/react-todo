import React, { Component } from "react";
import '../../src/App.css'
class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textAreaValue: ""
    };
  }

  handleTextAreaChange(e) {
    this.setState({ textAreaValue: e.target.value });
  }

  render() {
    let noteEditStyle = {};
    if (this.props.show) {
      console.log(this.props.show);
      noteEditStyle.display = "block";
    } else {
      noteEditStyle.display = "none";
    }
    return (
      <textarea
        style={noteEditStyle}
        placeholder="Your Notes Here..."
        value={this.state.textAreaValue}
        onChange={this.handleTextAreaChange.bind(this)}
        //  onKeyDown = {this.handleNoteSave.bind(this)}
        //  style={{display : this.state.displayNotes}}
      />
      // <button onClick={}>save</button>
    );
  }
}

export default Note;
