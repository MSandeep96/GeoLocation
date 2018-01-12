import * as Location from './LocationCalls';

class LocationHelper {

  constructor(mapComponent) {
    this.mapComponent = mapComponent;
    this.usersLocations = {};
    this.location = {};
    this.ownLocationUpdated = this.ownLocationUpdated.bind(this);
    this.errorCallback = this.errorCallback.bind(this);
  }

  setGoogle(google){
    this.google = google;
  }

  setMap(map) {
    this.map = map;
    this.getUsersLocations();
    this.setUpListeners();
  }

  setUpListeners() {
    this.pulse = setInterval(this.sendPulse, 10000);
    this.fetcher = setInterval(this.fetchUpdates, 10000);
    if (navigator.geolocation) {
      this.watchPosition = navigator.geolocation.watchPosition(this.ownLocationUpdated);
    }
  }

  cleanUpListeners(){
    clearInterval(this.pulse);
    clearInterval(this.fetcher);
    if(this.watchPosition){
      navigator.geolocation.clearWatch(this.watchPosition);
    }
  }

  getMarker(pos){
    return new this.google.maps.Marker({
      position: {
        lat: pos.latitude,
        lng: pos.longitude
      },
      map: this.map,
      icon: ' ',
      label: {
        fontFamily: 'Fontawesome',
        text: '\uf007'
      }
    });
  }
  
  markUser() {
    this.ownMarker = new this.google.maps.Marker({
      position: {
        lat: this.location.latitude,
        lng: this.location.longitude
      },
      map: this.map
    });
  }

  // ------- Fetch location first time ----------------
  getUsersLocations() {
    this.lastCall = new Date().toISOString();
    Location.fetchLocation().then((res) => {
      this.handleUserLocations(res);
    }).catch(this.errorCallback);
  }

  handleUserLocations(res) {
    res.forEach((e) => {
      this.usersLocations[e.userId] = e;
      this.usersLocations[e.userId].marker = this.getMarker(e,false);
    });
    this.fetcher = setInterval(this.fetchUpdates, 10000);
  }
  //-------------------------------------------------------

  //--------Updates of user's location--------
  ownLocationUpdated(position) {
    this.location.latitude = position.coords.latitude;
    this.location.longitude = position.coords.longitude;
    if(!this.hasCentered){
      let center = new this.google.maps.LatLng(this.location.latitude,this.location.longitude);
      this.map.setCenter(center);
      this.hasCentered = true;
    }
    this.sendPulse(this.location);    //send pulse with location
    this.markUser();
  }

  //--------------Send pulse to show user's online--------------
  sendPulse(location) {
    if(!location) location={};
    Location.sendLocation(location).catch(this.errorCallback);
  }

  //--------------------Fetch pulses of other users and handle them----------------------
  fetchUpdates() {
    let timeNow = new Date().toISOString();
    Location.fetchLocation(this.lastCall).then(this.handleUpdates)
      .catch(this.errorCallback);
    this.lastCall = timeNow;
  }

  handleUpdates(res) {
    const {maps} = this.props.google;
    res.forEach((e) => {
      if (e.userId in this.usersLocations) {
        if(!this.isEqual(this.usersLocations[e.userId],e)) {
          this.usersLocations[e.userId].marker.setPosition(new maps.LatLng(e.latitude, e.longitude));
          this.usersLocations[e.userId].marker.getLabel().color = 'green';
        }
      } else {
        this.usersLocations[e.userId] = e;
        this.usersLocations[e.userId].marker = this.getMarker(e);
      }
    });
  }
  //------------------------------------------------

  errorCallback(err) {
    if (!err.status) {
      //network error
    }
    if (err.response && err.response.status === 401) {
      this.mapComponent.props.userSessionExpired();
    }
  }

  isEqual(l1, l2) {
    return l1.latitude === l2.latitude && l1.longitude === l2.longitude;
  }
}

export default LocationHelper;