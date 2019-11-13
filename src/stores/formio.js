import axios from 'axios';

let formioToken = null;
let tokenRefreshing = false;
let tokenRefreshCall = null;

const formio = axios.create({
  baseURL: 'http://localhost:3001',
});

formio.interceptors.request.use(
  config => {
    if (!config.headers['x-jwt-token'] && formioToken) {
      config.headers['x-jwt-token'] = formioToken;
    }
    return config;
  },
  error => Promise.reject(error)
);

function refreshToken() {
  if (tokenRefreshing) {
    return tokenRefreshCall;
  }
  tokenRefreshing = true;
  tokenRefreshCall = axios
    .create({
      baseURL: 'http://localhost:3001',
    })
    .post('/user/login', {
      data: {
        email: '123@163.com',
        password: '123',
      }
    })
    .then(({ headers: { 'x-jwt-token': token } }) => {
      formioToken = token;
      tokenRefreshing = false;
      tokenRefreshCall = null;
    });
  return tokenRefreshCall;
}

formio.interceptors.response.use(
  response => response.data,
  error => {
    const { response: errorResponse } = error;
    if (errorResponse.status === 401) {
      return refreshToken().then(() => {
        errorResponse.config.headers['x-jwt-token'] = formioToken;
        return axios(errorResponse.config);
      });
    }
    return Promise.reject(error);
  }
);
export default formio;
