// src/components/Register.jsx
import { useState } from 'react';
import './auth.css'; // Import styling

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    
    // Check if email already exists
    // const existingEmail = localStorage.getItem('userEmail');
    // if (existingEmail) {
    //   setError('Email already registered.');
    //   return;
    // }

    // Store email and password in local storage
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);

    // Clear error and show success message
    setError('');
    alert('Registration successful! You can now log in.');
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label htmlFor="mail">Email</label><input
          type="email"
          placeholder="Email"
          name='mail'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="pwd">Password</label>
        <input
        name='pwd'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
