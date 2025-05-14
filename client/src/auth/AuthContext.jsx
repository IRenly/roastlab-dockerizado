import React, { createContext, useEffect, useState } from 'react';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [User, setUser ] = useState([])

  
useEffect(()=>{
  const token = getCookie('token');
  if (token) {
    setIsAuthenticated(true);
  }
},[])

const getCookie = (name) => {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
};
  const login = (user) => {
    setIsAuthenticated(true);
   // console.log(user)
    setUser(user)
   
  };

  const logout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setIsAuthenticated(false);
    setUser(null)
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, getCookie, User}}>
      {children}
    </AuthContext.Provider>
  );
};
