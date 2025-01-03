import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const LoginSignup = () => {
  const [currentTab, setCurrentTab] = useState('login'); 

  // Funkcja zmieniająca zakładkę na Login
  const switchToLogin = () => {
    setCurrentTab('login');
  };

  // Funkcja zmieniająca zakładkę na Register
  const switchToRegister = () => {
    setCurrentTab('register');
  };

  return (
    <div className="loginsignup">
      {currentTab === 'login' ? (
        <Login switchToRegister={switchToRegister} />
      ) : (
        <Register switchToLogin={switchToLogin} />
      )}
    </div>
  );
};

export default LoginSignup;
