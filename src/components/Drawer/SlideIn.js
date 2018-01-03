import React, { Component } from 'react';
import './SlideIn.css'
import UserForm from './Login/UserForm';
import Welcome from './Welcome/Welcome';
/**
 * Displays login/user details when opened.
 */
class SlideIn extends Component {
  constructor(props){
    super(props);
    this.getComp = this.getComp.bind(this);
  }

  getComp(){
    if(this.props.isLoggedIn){
      return <Welcome />;
    }else{
      return <UserForm loginCallback={this.props.loginCallback}/>;
    }
  }

  render() {
    let classVal = 'slider ';
    if(this.props.toggled)
      classVal += this.props.drawerShown ?'show':'hide';
    return (
      <div className={classVal} >
        {this.getComp()}
      </div>
    );
  }
}

export default SlideIn;