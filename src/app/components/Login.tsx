import { FormEvent, useState } from 'react';
import { Lock, LogIn, Mail, ShieldCheck } from 'lucide-react';

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
    <>
      <style>
        {`
          @media (max-width: 760px) {
            .byoj-login-card {
              grid-template-columns: 1fr !important;
              min-height: auto !important;
            }

            .byoj-login-visual {
              display: none !important;
            }

            .byoj-login-form-panel {
              padding: 32px 24px !important;
            }
          }
        `}
      </style>
      <div
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, #080808 0%, #111111 42%, #17120A 100%)',
        color: '#FFFFFF',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '28px',
      }}
    >
      <div
        className="byoj-login-card"
        style={{
          width: '100%',
          maxWidth: '960px',
          minHeight: '560px',
          backgroundColor: '#161616',
          border: '1px solid #2A2A2A',
          borderRadius: '8px',
          boxShadow: '0 28px 100px rgba(0, 0, 0, 0.42)',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(360px, 408px)',
          overflow: 'hidden',
        }}
      >
        <div
          className="byoj-login-visual"
          style={{
            position: 'relative',
            minHeight: '560px',
            padding: '32px',
            background:
              'linear-gradient(160deg, rgba(212, 168, 75, 0.18) 0%, rgba(255, 255, 255, 0.03) 46%, rgba(0, 0, 0, 0.12) 100%)',
            borderRight: '1px solid #2A2A2A',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/logo.png" alt="Logo" style={{ width: '42px', height: '42px', objectFit: 'contain' }} />
            <div>
              <div style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '22px', lineHeight: '28px' }}>BYOJ</div>
              <div style={{ color: '#A6A6A6', fontSize: '13px', lineHeight: '18px' }}>Admin Dashboard</div>
            </div>
          </div>

          <div
            style={{
              alignSelf: 'center',
              width: 'min(78%, 320px)',
              aspectRatio: '1',
              borderRadius: '50%',
              background:
                'linear-gradient(145deg, rgba(212, 168, 75, 0.26), rgba(42, 42, 42, 0.4))',
              border: '1px solid rgba(212, 168, 75, 0.28)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'inset 0 0 60px rgba(212, 168, 75, 0.08), 0 22px 70px rgba(0, 0, 0, 0.34)',
            }}
          >
            <div
              style={{
                width: '70%',
                aspectRatio: '1',
                borderRadius: '50%',
                backgroundColor: '#121212',
                border: '1px solid #3A3120',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img src="/logo.png" alt="Logo" style={{ width: '58%', height: '58%', objectFit: 'contain' }} />
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '10px',
            }}
          >
            {[
              ['Where', 'Luxury Begins'],
              ['Make', 'It Truly Yours'],
              ['Crafted', 'Your Way'],
            ].map(([value, label]) => (
              <div
                key={label}
                style={{
                  backgroundColor: 'rgba(10, 10, 10, 0.52)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '8px',
                  padding: '12px',
                }}
              >
                <div style={{ color: '#D4A84B', fontWeight: 800, fontSize: '20px', lineHeight: '24px' }}>{value}</div>
                <div style={{ color: '#888888', fontSize: '12px', lineHeight: '16px', marginTop: '2px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="byoj-login-form-panel" style={{ padding: '44px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ marginBottom: '28px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: '#211A0E',
                border: '1px solid #4B3B1B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#D4A84B',
                marginBottom: '18px',
              }}
            >
              <ShieldCheck size={20} />
            </div>
            <h1 style={{ margin: '0 0 8px', fontSize: '28px', lineHeight: '36px', fontWeight: 800 }}>
              Welcome Back
            </h1>
            <p style={{ margin: 0, color: '#888888', fontSize: '14px', lineHeight: '20px' }}>
              Sign in to continue to the BYOJ admin dashboard.
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
                  height: '46px',
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
                  height: '46px',
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
                height: '46px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#D4A84B',
                color: '#000000',
                fontWeight: 800,
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '8px',
                boxShadow: '0 12px 30px rgba(212, 168, 75, 0.2)',
              }}
            >
              <LogIn size={16} />
              <span>Login</span>
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
