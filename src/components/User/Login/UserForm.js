import React, { Component } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

class UserForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      signUpMode: true
    };
    this.toggleMode = this.toggleMode.bind(this);
  }

  toggleMode(){
    this.setState((prevState)=>({
      signUpMode: !prevState.signUpMode
    }));
  }

  render() {
    return (
      <div>
        <div>
          <button className={this.state.signUpMode?'active':''} onClick={this.toggleMode}>Sign Up</button>
          <button className={this.state.signUpMode?'':'active'} onClick={this.toggleMode}>Sign In</button>
        </div>
        {this.state.signUpMode?(
          <SignUp />
        ):(
          <SignIn />
        )}
      </div>
    );
  }
}

export default UserForm;