import React, { Component } from 'react';
import './ToggleUserBtn.css';

class ToggleUserBtn extends Component {
  render() {
    return (
      <button className='toggleBtn' onClick={this.props.toggleUserView}>
        <i className='material-icons'>
          {this.props.userView?'close':'navigate_next'}
        </i>
      </button>
    );
  }
}

export default ToggleUserBtn;