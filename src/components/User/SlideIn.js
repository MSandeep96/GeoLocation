import React, { Component } from 'react';
import './SlideIn.css'
import UserForm from './Login/UserForm';
/**
 * Displays login/user details when opened.
 */
class SlideIn extends Component {
  render() {
    let classVal = 'slider ';
    if(this.props.toggled)
      classVal += this.props.userView?'show':'hide';
    return (
      <div className={classVal} >
        <UserForm />
      </div>
    );
  }
}

export default SlideIn;