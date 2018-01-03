import React, { Component } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import './UserForm.css';
/**
 * Change between signin and singup
 */
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
        <div className='loginInfo'>
          <button className={this.state.signUpMode?'active':'other'} onClick={this.toggleMode}>Register</button>
          <button className={this.state.signUpMode?'other':'active'} onClick={this.toggleMode}>Login</button>
        </div>
        {this.state.signUpMode?(
          <SignUp loginCallback={this.props.loginCallback}/>
        ):(
          <SignIn loginCallback={this.props.loginCallback}/>
        )}
      </div>
    );
  }
}

export default UserForm;