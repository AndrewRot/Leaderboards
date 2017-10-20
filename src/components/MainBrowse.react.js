import React, { Component } from 'react';
import BrowseBody from './BrowseBody.react.js';
import Navigationmenu from './Nav.react.js';


//Incorperate different things to make these pages more complex
class MainBrowse extends Component {
  render() {
    return (
       <div className="App">
        <Navigationmenu />
        <h1> Browse </h1>
        
        <BrowseBody />
      </div>

    );
  }
}

export default MainBrowse;




