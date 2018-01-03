import React, { Component } from 'react';
import './ToggleUserBtn.css';

/**
 * Displays 'x' when drawer is open
 * and '>' when closed.
 * Toggles the drawer.
 */
class ToggleUserBtn extends Component {
  
  render() {
    let btnSym = this.props.drawerShown?'fa-times' : 'fa-angle-right';
    return (
      <button className='toggleBtn' onClick={this.props.toggleUserView}>
        <i className={'fa '+btnSym}></i>
      </button>
    );
  }
}

export default ToggleUserBtn;