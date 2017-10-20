import React, { Component } from 'react';
import UserProfileBody from './UserProfileBody.react.js';
import Navigationmenu from './Nav.react.js';


//Incorperate different things to make these pages more complex
class MainUserProfile extends Component {
  render() {
    return (
       <div className="App">
        <Navigationmenu />
        
        <UserProfileBody />
      </div>

    );
  }
}

export default MainUserProfile;



