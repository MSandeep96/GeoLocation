import React, { Component } from 'react';
import './User.css'
/**
 * Displays login/user details when opened. 
 * Doesn't render if not in user view.
 */
class User extends Component {
  render() {
    console.log(this.props);
    let classVal = 'slider ';
    if(this.props.toggled)
      classVal += this.props.userView?'show':'hide';
    return (
      <div className={classVal} >
        <h1>Hello</h1>
      </div>
    );
  }
}

export default User;