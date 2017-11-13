/** Created by Andrew Rottier
  * This is where the homepage content should go
  */
import React, { Component } from 'react';
import './css/App.css';
import HomePageBody from './components/home/HomePageBody';
import Navigationmenu from './components/Nav';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigationmenu />
        
        <HomePageBody />
      </div>
    );
  }
}



export default App;
