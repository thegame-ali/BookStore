// src/components/Login.jsx
import  { useState } from 'react';
import './auth.css'; // Import styling


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Retrieve stored user details from local storage
    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');

    // Check if credentials match
    if (storedEmail === email && storedPassword === password) {
      // Save token and email to local storage
      // const token = 'dummy_token'; // Replace with actual token if needed
      // localStorage.setItem('userToken', token);

      // Clear error and show success message
      setError('');
      alert('Login successful!');
    } else {
      // Set error message if authentication fails
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
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
        <button type="submit">Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
