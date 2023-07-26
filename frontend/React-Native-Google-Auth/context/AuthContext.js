import React, {createContext, useState} from 'react';

const AuthContext = createContext(null);
const {Provider} = AuthContext;

const AuthProvider = ({children}) => {
    const [authState, setAuthState] = useState({
      accessToken: null,
      authenticated: false,
      username: null,
      loading: false,
      phone_number: null,
      secrets: null
    });

    const getAccessToken = () => {
      return authState.accessToken;
    };

  
      const logout = async () => {
        setAuthState({
          accessToken: null,
          authenticated: false,
          username: null,
          loading: false,
          phone_number: null,
          secrets: null
        });
      };

      return (
        <Provider
          value={{
            authState,
            getAccessToken,
            setAuthState,
            logout,
          }}>
          {children}
        </Provider>
      );
}
export  {AuthContext, AuthProvider};