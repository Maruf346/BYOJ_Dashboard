import { FormEvent, useState } from 'react';
import { Lock, LogIn, Mail } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      return;
    }

    onLogin();
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0D0D0D',
        color: '#FFFFFF',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '408px',
          backgroundColor: '#161616',
          border: '1px solid #2A2A2A',
          borderRadius: '8px',
          padding: '28px',
          boxShadow: '0 24px 80px rgba(0, 0, 0, 0.35)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
          <img src="/logo.png" alt="Logo" style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
          <span style={{ color: '#FFFFFF', fontWeight: '700', fontSize: '20px' }}>BYOJ</span>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ margin: '0 0 8px', fontSize: '24px', lineHeight: '32px', fontWeight: 700 }}>
            Admin Login
          </h1>
          <p style={{ margin: 0, color: '#888888', fontSize: '14px', lineHeight: '20px' }}>
            Enter any email and password to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#D6D6D6', fontSize: '13px' }}>
            Email
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: '#1A1A1A',
                border: '1px solid #2A2A2A',
                borderRadius: '8px',
                padding: '0 12px',
                height: '44px',
              }}
            >
              <Mail size={16} color="#888888" />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@byoj.com"
                autoComplete="email"
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#FFFFFF',
                  fontSize: '14px',
                }}
              />
            </div>
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#D6D6D6', fontSize: '13px' }}>
            Password
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: '#1A1A1A',
                border: '1px solid #2A2A2A',
                borderRadius: '8px',
                padding: '0 12px',
                height: '44px',
              }}
            >
              <Lock size={16} color="#888888" />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                autoComplete="current-password"
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#FFFFFF',
                  fontSize: '14px',
                }}
              />
            </div>
          </label>

          <button
            type="submit"
            style={{
              height: '44px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#D4A84B',
              color: '#000000',
              fontWeight: 700,
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '4px',
            }}
          >
            <LogIn size={16} />
            <span>Login</span>
          </button>
        </form>
      </div>
    </div>
  );
}
