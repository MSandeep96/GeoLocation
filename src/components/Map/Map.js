import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './MapView.css';

class Map extends Component {

  constructor(props) {
    super(props);
    this.location = {
      lat: 17.38,
      long: 78.48
    };
    this.loadMap = this.loadMap.bind(this);
    this.userLocationUpdated = this.userLocationUpdated.bind(this);
  }

  componentDidUpdate(prevProps,prevState){
    if(prevProps.google !== this.props.google){
      this.loadMap();
    }
  }

  componentDidMount(){
    this.loadMap();
  }

  loadMap() {
    if (this.props.google) {
      const { google } = this.props;
      const maps = google.maps;
      const node = ReactDOM.findDOMNode(this.mapDiv);
      
      let zoom = 14;
      const center = new maps.LatLng(this.state.lat,this.state.long);
      const mapConfig = {
        center,
        zoom
      };
      this.map = new maps.Map(node,mapConfig);
    }
  }

  userLocationUpdated(position){
    this.location.lat = position.coords.latitude;
    this.location.long = position.coords.longitude;
  }

  componentWillMount() {
    if (navigator.geolocation) {
      this.watchPosition = navigator.geolocation.watchPosition(this.userLocationUpdated);
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchPosition);
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