import React, { Component } from 'react';
import BrowseBody from './BrowseBody';
import Navigationmenu from '../Nav';


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




