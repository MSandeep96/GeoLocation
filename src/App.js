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
    this.toggleUserView = this.toggleUserView.bind(this);
  }

  componentWillMount(){
    var auth = localStorage.getItem('auth');
    if(auth!==null){
      this.setState({
        isLoggedIn: true,
        auth
      });
    }
  }

  userLoggedIn(){
    this.setState({
      isLoggedIn: true,
      userView: false,
      toggled: true,
      auth: localStorage.getItem('auth')
    });
  }

  toggleUserView(){
    this.setState((prevState)=>({
      drawerShown: !prevState.drawerShown,
      toggled: true
    }));
  }

  render() {
    return (
      <div className="App">
        <SlideIn drawerShown={this.state.drawerShown} toggled={this.state.toggled} 
          loggedIn={this.state.isLoggedIn} loginCallback={this.userLoggedIn} />
        <ToggleUserBtn drawerShown={this.state.drawerShown} toggleUserView={this.toggleUserView}/>
        <MapView loggedIn={this.state.isLoggedIn}/>
      </div>
    );
  }
}

export default App;
