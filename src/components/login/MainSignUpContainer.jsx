import React, { Component } from 'react';
import SignUpBody from './SignUpBody';
import Navigationmenu from '../Nav';


//Incorperate different things to make these pages more complex
class MainSignUp extends Component {
  render() {
    return (
       <div className="App">
        <Navigationmenu />
        
        <SignUpBody />
      </div>

    );
  }
}

export default MainSignUp;



