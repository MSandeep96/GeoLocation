import { axios } from 'axios';

function fetchLocation(after) {
  return axios.get('http://127.0.0.1:3003/location', { after }, {
    headers: { 'x-auth': localStorage.getItem('auth') }
  });
}

function sendLocation(userLoc) {
  userLoc.timestamp = new Date().toString();
  return axios.post('http://127.0.0.1:3003/location', userLoc, {
    headers: { 'x-auth': localStorage.getItem('auth') }
  });
}