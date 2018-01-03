import React, { Component } from 'react';
import './Welcome.css';

class Welcome extends Component {

  constructor(props){
    super(props);
    this.removeLocation = this.removeLocation.bind(this);
    this.logout = this.logout.bind(this);
  }

  removeLocation(){
    
  }

  logout(){
    
  }

  render() {
    return (
      <div class='welcome-div'>
        <h1>Welcome</h1>
        <div class='welcome'>
          <button onClick={this.removeLocation} className='removeLocation'>Remove Location</button>
        </div>
        <div class='welcome'>
          <button onClick={this.logout} className='logout'>Logout</button>
        </div>
      </div>
    );
  }
}

export default Welcome;