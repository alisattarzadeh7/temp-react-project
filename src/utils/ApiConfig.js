import axios from 'axios';
import moment from 'moment';
import axiosRetry from 'axios-retry';
import starkString from 'starkstring';
import { createBrowserHistory } from 'history';
import { Store } from '../redux/store';
import { setJwtToken, setRefreshTokenTime } from '../redux/actions/LoginActions';
import getEnv from './helpers/getEnv';


export const baseUrl = `https://enduserapi.${getEnv()}.ir`;
export const refreshTokenUrl = '/Token/Refresh';

const requestHeader = axios.create({
  baseURL: `${baseUrl}/api/v1`,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept-language': 'fa-IR',
    'Access-Control-Allow-Origin': '*',
  },
});

export const isAuthRoutes = (route) => {
  switch (route) {
    case '/login':
      return true;
    case '/register':
      return true;
    case '/reset-password':
      return true;
    default:
      return false;
  }
};

export default requestHeader;

export const defaultApi = () => {
  delete requestHeader.defaults.headers.common.authorization;
  return requestHeader;
};

export const satrexApi = () => requestHeader;



axiosRetry(axios, {
  retries: 3, // number of retries
  retryDelay: (retryCount) => retryCount * 2000, // time interval between retries
  retryCondition: (error) =>
     error.response.status === 401 || !window.navigator.onLine
  ,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

 requestHeader.interceptors.request.use(
  (config) => {
      let token = null;
      if (Store.getState().login.token && Store.getState().login.token.token) {
        token = `Bearer ${Store.getState().login.token.token}`;
      } else if (localStorage.getItem('bearerToken')) {
        token = `Bearer ${localStorage.getItem('bearerToken')}`;
      }
      config.headers.authorization = (isAuthRoutes(createBrowserHistory().location.pathname) || config.url === refreshTokenUrl) ? null : token;

    return config;
  },
);

satrexApi().interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    if (!window.navigator.onLine) {
      createBrowserHistory().push('/no-internet');
      originalRequest._retry = false;
      setTimeout(() => {
        satrexApi()(originalRequest);
      }, 10000);
    }

    if (error.response !== undefined && error.response.status === 401 && !originalRequest._retry && Store.getState().login.token && Store.getState().login.token.token) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.authorization = `Bearer ${token}`;
            return axios(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;
      originalRequest._retry = true;

      return new Promise((resolve, reject) => {
        requestHeader
          .post(refreshTokenUrl, {
            refreshToken: Store.getState().login.token.refreshToken || localStorage.getItem('refreshToken'),
          },
            {
              headers: {
                authorization: '',
              },
            })
          .then((res) => {
            if (res.status === 201 || res.status === 200) {
              localStorage.removeItem('refreshToken');
              if (!res.data.isSuccess) {
                processQueue(error, null);
                localStorage.removeItem('bearerToken');
                localStorage.removeItem('refreshToken');
                Store.dispatch(setJwtToken(
                  null,
                  null,
                ));
                delete axios.defaults.headers.common.authorization;
                createBrowserHistory().push('/login');
                reject();
              } else {
                localStorage.setItem(
                  'bearerToken',
                  res.data.data.jwtToken.tokenValue,
                );
                Store.dispatch(setJwtToken(
                  res.data.data.jwtToken.tokenValue,
                  res.data.data.refreshToken.tokenValue,
                ));
                Store.dispatch(setRefreshTokenTime(
                  starkString(
                    moment()
                      .add(
                        res.data.data.jwtToken.expiresInSeconds + 120,
                        'seconds',
                      )
                      .format('DD/MM/YYYY HH:mm:ss'),
                  )
                    .englishNumber()
                    .toString(),
                ));
                localStorage.setItem(
                  'expirationDate',
                  starkString(
                    moment()
                      .add(
                        res.data.data.jwtToken.expiresInSeconds + 120,
                        'seconds',
                      )
                      .format('DD/MM/YYYY HH:mm:ss'),
                  )
                    .englishNumber()
                    .toString(),
                );

                localStorage.setItem(
                  'refreshToken',
                  res.data.data.refreshToken.tokenValue,
                );
                originalRequest.headers.authorization = `Bearer ${res.data.data.jwtToken.tokenValue}`;
                processQueue(null, res.data.data.jwtToken.tokenValue);
                resolve(requestHeader(originalRequest));
              }
            } else {
              localStorage.removeItem('bearerToken');
              localStorage.removeItem('refreshToken');
              requestHeader.defaults.headers.common.authorization = null;
              createBrowserHistory().push('/login');
            }
          })
          .catch((err) => {
            localStorage.removeItem('bearerToken');
            localStorage.removeItem('refreshToken');
            delete axios.defaults.headers.common.authorization;
            createBrowserHistory().push('/login');
          })
          .then(() => {
            isRefreshing = false;
          });
      });
    }
    return Promise.reject(error);
  },
);
