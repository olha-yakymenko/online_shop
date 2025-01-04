import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const LoginSignup = () => {
  const [currentTab, setCurrentTab] = useState('login'); 

  const switchToLogin = () => {
    setCurrentTab('login');
  };

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
