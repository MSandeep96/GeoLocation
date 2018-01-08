import React, { Component } from 'react';
import './MapView.css';
import { GoogleApiWrapper } from 'google-maps-react';
import Map from './Map';

export class MapView extends Component {

  render() {
    let element = <Map google={this.props.google} userSessionExpired={this.props.userSessionExpired}/>;
    if(!this.props.loaded)
      element = <i className="fa fa-circle-o-notch fa-spin center" aria-hidden="true"></i>;
    return (
      <div id='mapView'>
        {element}
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDSu2N0iEht4AzZRJr3H-P50k23KAvx57A'
})(MapView);