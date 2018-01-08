import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './MapView.css';
import * as Location from '../../actions/LocationCalls';
import { setInterval, clearInterval } from 'timers';

/**
 * Properties
 * {
 * userLocations : stores other users' locations
 * location : user's locatoin
 * location.updated: has got reply from navigator
 * watchPosition: listener for navigator
 * lastCall : when last call was made
 * }
 */
class Map extends Component {

  constructor(props) {
    super(props);
    this.usersLocations = {};
    this.location = {
      lat: 17.38,
      long: 78.48,
      updated: false
    };
    this.loadMap = this.loadMap.bind(this);
    this.userLocationUpdated = this.userLocationUpdated.bind(this);
    this.getUsersLocations = this.getUsersLocations.bind(this);
    this.handleUserLocations = this.handleUserLocations.bind(this);
    this.cleanUp = this.cleanUp.bind(this);
    this.setUp = this.setUp.bind(this);
  }

  //watch user's location
  componentWillMount() {
    this.getUsersLocations();
    if (navigator.geolocation) {
      this.watchPosition = navigator.geolocation.watchPosition(this.userLocationUpdated);
    }
    this.sender = setInterval(this.sendLocation, 10000);
  }

  //remove listeners
  componentWillUnmount() {
    cleanUp(false);
    navigator.geolocation.clearWatch(this.watchPosition);
  }

  //when mounted, load the map
  componentDidMount() {
    this.loadMap();
  }

  cleanUp(logout){
    if(logout){
      this.props.userSessionExpired();
      usersLocations.forEach((e)=>{
        e.marker.setMap(null);
      });
    }
    clearInterval(this.sender);
    if (this.fetcher) clearInterval(this.fetcher);
  }

  loadMap() {
    if (this.props.google) {
      const { google } = this.props;
      const maps = google.maps;
      const node = ReactDOM.findDOMNode(this.mapDiv);

      let zoom = 14;
      const center = new maps.LatLng(this.location.lat, this.location.long);
      const mapConfig = {
        center,
        zoom
      };
      this.map = new maps.Map(node, mapConfig);
    }
  }

  userLocationUpdated(position) {
    this.location.lat = position.coords.latitude;
    this.location.long = position.coords.longitude;
    this.location.updated = true;
  }

  sendLocation() {
    if (!this.location.updated) return;
    let loc = this.location;
    delete loc.updated;
    Location.sendLocation(loc).catch((err) => {
      if (err.response.status === 401) {
        this.cleanUp(true);
      }
    });
  }

  getUsersLocations() {
    this.lastCall = new Date().toISOString();
    Location.fetchLocation().then((res) => {
      this.handleUserLocations(res);
    }).catch((err) => {
      if (err.response.status === 401) {
        this.cleanUp(true);
      }
    });
  }

  handleUserLocations(res) {
    res.forEach((e) => {
      this.usersLocations[e.userId] = e;
      this.usersLocations[e.userId].marker = new this.props.google.maps.Marker({
        position: {
          lat: e.latitude,
          lng: e.longitude
        },
        map: this.map
      });
    });
    this.fetcher = setInterval(this.fetchUpdates, 10000);
  }

  fetchUpdates() {
    let timeNow = new Date().toISOString();
    Location.fetchLocation(this.lastCall).then(handleUpdates)
      .catch((err) => {
        if (err.response.status === 401) {
          this.cleanUp(true);
        }
      });
    this.lastCall = timeNow;
  }

  handleUpdates(res) {
    const { map } = this.props.google;
    res.forEach((e) => {
      if (e.userId in this.usersLocations) {
        if (this.usersLocations[e.userId].latitude !== e.latitude ||
          this.usersLocations[e.userId].longitude !== e.longitude) {
          this.usersLocations[e.userId].marker.setPosition(new map.LatLng(e.latitude, e.longitude));
        }
      } else {
        this.usersLocations[e.userId] = e;
        this.usersLocations[e.userId].marker = new this.props.google.maps.Marker({
          position: {
            lat: e.latitude,
            lng: e.longitude
          },
          map
        });
      }
    });
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