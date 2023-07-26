import React, { createContext, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const AxiosContext = createContext();
const { Provider } = AxiosContext;
const baseServerURL = 'http://192.168.8.173:8000/api/';


const AxiosProvider = ({ children }) => {
  const authContext = useContext(AuthContext);

  const authAxios = axios.create({
    baseURL: baseServerURL,
  });

  authAxios.interceptors.request.use(
    config => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `${authContext.getAccessToken()}`;
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  const publicAxios = axios.create({
    baseURL: baseServerURL,
  });


  return (
    <Provider
      value={{
        authAxios,
        publicAxios,
      }}>
      {children}
    </Provider>
  );
};

export { AxiosContext, AxiosProvider };