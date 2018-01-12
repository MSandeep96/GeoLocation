import axios from 'axios';

export function signUp(user) {
  return axios.post('/user/signup', user)
    .then((res) => {
      localStorage.setItem('auth', res.headers['x-auth']);
      return res.data;
    })
    .catch((err) => {
      if(err.response.status < 500)
        return Promise.reject(err.response.data.error);
      else
        return Promise.reject('Something went wrong');
    });
}

export function signIn(user){
  return axios.post('/user/login', user)
  .then((res) => {
    localStorage.setItem('auth', res.headers['x-auth']);
    return res.data;
  })
  .catch((err) => {
    if(err.response.status < 500)
      return Promise.reject(err.response.data.error);
    else
      return Promise.reject('Something went wrong');
  });
}

export function signOut(){
  axios.post('/user/logout',{},{
    headers: {'x-auth':localStorage.getItem('auth')}
  });
  localStorage.removeItem('auth');
}