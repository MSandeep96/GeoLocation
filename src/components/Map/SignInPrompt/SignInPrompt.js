import React, { Component } from 'react';
import './SignInPrompt.css';

class SignInPrompt extends Component {
  render() {
    return (
      <div className="signin-dialog">
        <h2>Welcome</h2>
        <h1>Login for access</h1>
        <button onClick={this.props.toggleDrawer}>Login</button>
      </div>
    );
  }
}

export default SignInPrompt;