import React, { Component } from 'react';
import './SignForms.css';
import { signUp } from '../../../actions/UserCalls';

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pass: '',
      cpass: '',
      error: '',
      isLoading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.spanClicked = this.spanClicked.bind(this);
    this.getPassClassName = this.getPassClassName.bind(this);
    this.getCpassClassName = this.getCpassClassName.bind(this);
    this.getEmailClassName = this.getEmailClassName.bind(this);
  }

  spanClicked(e) {
    this.setState({
      error: ''
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      isLoading: true,
      error: ''
    });
    signUp({
      email: this.state.email,
      password: this.state.pass
    }).then((res) => {
      //login success
      this.props.loginCallback();
    }).catch((err) => {
      //login failed
      this.setState({
        isLoading: false,
        error: err
      });
    });
  }

  handleChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  }

  getPassClassName() {
    let val = this.state.pass;
    if (val.length === 0) {
      return '';
    } else if (val.length >= 6) {
      return 'correct';
    } else {
      return 'incorrect';
    }
  }

  getCpassClassName() {
    let val = this.state.cpass;
    let pass = this.state.pass;
    if (val.length === 0) {
      return '';
    } else if (val === pass) {
      return 'correct';
    } else {
      return 'incorrect';
    }
  }

  getEmailClassName() {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.state.email === '') {
      return '';
    } else if (re.test(this.state.email)) {
      return 'correct';
    } else {
      return 'incorrect';
    }
  }

  render() {
    var emailClass = this.getEmailClassName();
    var passClass = this.getPassClassName();
    var cpassClass = this.getCpassClassName();
    let btnDisabled = this.state.isLoading || !(emailClass === 'correct' && passClass === 'correct' && cpassClass === 'correct');
    let btnText = 'Sign Up';
    if(this.state.isLoading){
      btnText = <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>;
    }
    return (
      <form className="email-signup" onSubmit={this.handleSubmit}>
        <div className="u-form-group">
          <input name="email" className={this.getEmailClassName()}
            type="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
        </div>
        <div className="u-form-group">
          <input className={this.getPassClassName()} name="pass" type="password"
            placeholder="Password" value={this.state.pass} onChange={this.handleChange} />
        </div>
        <div className="u-form-group">
          <input className={this.getCpassClassName()} name="cpass" type="password"
            placeholder="Confirm Password" value={this.state.cpass} onChange={this.handleChange} />
        </div>
        <div className="u-form-group">
          <button disabled={btnDisabled}>{btnText}</button>
          <div className="errorSpan">
            <span onClick={this.spanClicked} className={this.state.error !== '' ? 'error' : 'hidden'}>{this.state.error}</span>
          </div>
        </div>
      </form>
    );
  }
}

export default SignUp;