import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from './AdminContext';
import { Lock, Mail, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import './admin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 700)); // fake loading feel
    const ok = login(email, password);
    setLoading(false);
    if (ok) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials. Please check your email and password.');
    }
  };

  return (
    <div className="admin-login-page">
      {/* Animated background blobs */}
      <div className="admin-blob admin-blob-1" />
      <div className="admin-blob admin-blob-2" />
      <div className="admin-blob admin-blob-3" />

      <div className="admin-login-card">
        {/* Logo / branding */}
        <div className="admin-login-logo">
          <div className="admin-logo-icon">
            <ShieldCheck size={32} color="#fff" />
          </div>
          <div>
            <h1 className="admin-login-title">Klyrex Admin</h1>
            <p className="admin-login-sub">Control Panel</p>
          </div>
        </div>

        <div className="admin-login-divider" />

        <p className="admin-login-desc">Sign in to manage your website content, colors, reviews &amp; videos.</p>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-input-group">
            <Mail size={18} className="admin-input-icon" />
            <input
              id="admin-email"
              type="text"
              placeholder="Email / Username"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="admin-input"
              autoComplete="username"
              required
            />
          </div>

          <div className="admin-input-group">
            <Lock size={18} className="admin-input-icon" />
            <input
              id="admin-password"
              type={showPass ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="admin-input"
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              className="admin-eye-btn"
              onClick={() => setShowPass(!showPass)}
              tabIndex={-1}
            >
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && (
            <div className="admin-login-error">
              <span>⚠</span> {error}
            </div>
          )}

          <button type="submit" className="admin-login-btn" disabled={loading}>
            {loading ? (
              <span className="admin-spinner" />
            ) : (
              'Sign In →'
            )}
          </button>
        </form>

        <p className="admin-login-footer">
          Klyrex Media · Secure Admin Area
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
