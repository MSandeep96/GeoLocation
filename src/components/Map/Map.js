import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './MapView.css';
import LocationHelper from '../../actions/LocationHelper';
/**
 * Handles map operations using class LocationHelper
 */
class Map extends Component {

  constructor(props) {
    super(props);
    this.locationHelper = new LocationHelper(this);
    this.loadMap = this.loadMap.bind(this);
  }

  //when mounted, load the map
  componentDidMount() {
    this.loadMap();
  }

  //remove listeners
  componentWillUnmount() {
    this.locationHelper.cleanUpListeners();
  }

  loadMap() {
    if (this.props.google) {
      const { google } = this.props;
      const maps = google.maps;
      const node = ReactDOM.findDOMNode(this.mapDiv);
      const center = new maps.LatLng(0,0);
      let zoom = 14;
      const mapConfig = {
        center,
        zoom
      };
      this.map = new maps.Map(node, mapConfig);
      this.map.setOptions({minZoom: 3, maxZoom: 15});
      this.locationHelper.setGoogle(google);
      this.locationHelper.setMap(this.map);
    }
  }

  render() {
    return (
      <div className='mapContainer' ref={(mapDiv) => { this.mapDiv = mapDiv }}>
        <i className="fa fa-circle-o-notch fa-spin center" aria-hidden="true"></i>
      </div>
    );
  }
}

export default Map;