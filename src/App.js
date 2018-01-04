import React, { Component } from 'react';
import SlideIn from './components/Drawer/SlideIn';
import MapView from './components/Map/MapView';
import ToggleUserBtn from './components/ToggleUserBtn';
import './App.css';

/**
 * Handles drawer state
 * userView -> drawer is shown
 * toggled -> drawer settings are toggled for animation
 */
class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      drawerShown: false,
      toggled: false,
      isLoggedIn: false
    };
    this.userLoggedIn = this.userLoggedIn.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  componentWillMount(){
    var auth = localStorage.getItem('auth');
    console.log('mo',auth);
    if(auth!==null){
      this.setState({
        isLoggedIn: true,
        auth
      });
    }
  }

  userLoggedIn(){
    console.log('here');
    this.setState({
      isLoggedIn: true,
      auth: localStorage.getItem('auth')
    });
  }

  toggleDrawer(){
    this.setState((prevState)=>({
      drawerShown: !prevState.drawerShown,
      toggled: true
    }));
  }

  render() {
    return (
      <div className="App">
        <SlideIn drawerShown={this.state.drawerShown} toggled={this.state.toggled} 
          isLoggedIn={this.state.isLoggedIn} loginCallback={this.userLoggedIn} />
        <ToggleUserBtn drawerShown={this.state.drawerShown} toggleDrawer={this.toggleDrawer}/>
        <MapView loggedIn={this.state.isLoggedIn}/>
      </div>
    );
  }
}

export default App;
