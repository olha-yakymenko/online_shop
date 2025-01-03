import React, { useState } from 'react';
import { useMutation } from 'react-query';  

const registerUserApi = async (userData) => {
  const response = await fetch('http://localhost:5001/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Error during registration');
  }

  return result;
};

const Register = ({ switchToLogin }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const { mutate, isLoading, isError, error: queryError } = useMutation(registerUserApi, {
    onSuccess: () => {
      alert('Registration successful!');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError(null);
    },
    onError: (error) => {
      setError(error.message || 'Error during registration');
    },
  });

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert("Password must be at least 8 characters long and contain a letter and a number.");
      return;
    }

    const userData = { firstName, lastName, email, password };

    mutate(userData);
  };

  return (
    <div className="loginsignup-container">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div className="loginsignup-fields">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {isLoading && <p>Loading...</p>} 
        {isError && <p style={{ color: 'red' }}>{queryError.message}</p>}  
        <button type="submit" disabled={isLoading}>Register</button>
      </form>
      <p className="loginsignup-login">
        Already have an account? <span onClick={switchToLogin}>Login</span>
      </p>
    </div>
  );
};

export default Register;
