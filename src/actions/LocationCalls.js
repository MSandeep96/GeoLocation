import axios from 'axios';

export function fetchLocation(after) {
  let url = 'http://127.0.0.1:3003/location';
  if(after) url += '?after=' + encodeURI(after);
  return axios.get( url , {
    headers: { 'x-auth': localStorage.getItem('auth') }
  }).then((res)=>{
    return res.data;
  });
}

export function sendLocation(userLoc) {
  userLoc.timestamp = new Date().toString();
  return axios.post('http://127.0.0.1:3003/location', userLoc, {
    headers: { 'x-auth': localStorage.getItem('auth') }
  });
}