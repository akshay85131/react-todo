// import React from "react";

import React, { Component } from 'react'

 class Header extends Component {
   changeTab=(filterType)=>{
     this.props.changeTab(filterType)
   }
  render() {
    return (
     <div>
       <header style={headerStyle}>
         <h1>TodoList</h1>
       </header>
       <div className="filters">
         <button onClick={()=>this.changeTab('All')}  >all</button>
         <button onClick={()=>this.changeTab('Completed')}>completed</button>
         <button onClick={()=>this.changeTab('Active')}>active</button>
       </div>
     </div>
    )
  }
}


// function Header() {
//   return (
//     <div>
//       <header style={headerStyle}>
//         <h1>TodoList</h1>
//       </header>
//       <div className="filters">
//         <button onClick={this.changeTab}>all</button>
//         <button>completed</button>
//         <button>active</button>
//       </div>
//     </div>
//   );
// }

const headerStyle = {
  background: "#333",
  color: "#fff",
  textAlign: "center",
  padding: "10px"
};

export default Header;
