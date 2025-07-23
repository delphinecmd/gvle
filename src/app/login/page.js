'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './page.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const text = await res.text();
      if (!res.ok) {
        setError('Server error. See console for details.');
        return;
      }

      const data = JSON.parse(text);
      if (!data.token) {
        setError('No token returned. Please try again.');
        return;
      }

      localStorage.setItem('gvle_token', data.token);
      setSuccess('Login successful!');

      const verifyRes = await fetch('http://localhost:4000/api/verify', {
        headers: { Authorization: `Bearer ${data.token}` },
      });

      const verifyData = await verifyRes.json();
      const role = verifyData.user.role.toLowerCase();

      if (role === 'student') return router.push('/student-dashboard');
      if (role === 'lecturer') return router.push('/lecturer-dashboard');
      if (role === 'admin') return router.push('/dashboard');
    } catch (err) {
      console.error('[Login Error]', err);
      setError('Server error. Please try again.');
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    router.push('/reset-password');
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: "url('/assets/login-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh'
      }}
    >
      <div className="login-form">
        <img src="/assets/gimpa.png" alt="GIMPA Logo" className="logo" />
        <h2>GIMPA VLE</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="show-password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button type="submit">Login</button>
          <p>
            <button onClick={handleReset} className="reset-link" type="button">
              Password Reset
            </button>
          </p>
        </form>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
    </div>
  );
}
