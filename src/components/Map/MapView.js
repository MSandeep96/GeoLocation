import React, { Component } from 'react';
import './MapView.css';
import { GoogleApiWrapper } from 'google-maps-react';
import Map from './Map';

export class MapView extends Component {

  render() {
    return (
      <div id='mapView'>
        <Map google={this.props.google} />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDSu2N0iEht4AzZRJr3H-P50k23KAvx57A'
})(MapView);