import React, { Component } from 'react';
import SlideIn from './components/User/SlideIn';
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
      userView: false,
      toggled: false
    };
    this.toggleUserView = this.toggleUserView.bind(this);
  }

  toggleUserView(){
    this.setState((prevState)=>({
      userView: !prevState.userView,
      toggled: true
    }));
  }

  render() {
    return (
      <div className="App">
        <SlideIn userView={this.state.userView} toggled={this.state.toggled} />
        <MapView />
        <ToggleUserBtn userView={this.state.userView} toggleUserView={this.toggleUserView}/>
      </div>
    );
  }
}

export default App;
