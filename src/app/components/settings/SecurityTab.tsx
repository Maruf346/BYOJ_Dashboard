import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

function PasswordInput({ placeholder }: { placeholder: string }) {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState('');
  return (
    <div style={{ position: 'relative' }}>
      <input
        type={show ? 'text' : 'password'}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          backgroundColor: '#1A1A1A',
          border: '1px solid #2A2A2A',
          borderRadius: '8px',
          padding: '12px 44px 12px 16px',
          color: '#FFFFFF',
          fontSize: '14px',
          outline: 'none',
          boxSizing: 'border-box',
        }}
      />
      <button
        onClick={() => setShow((v) => !v)}
        style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: '#888888', display: 'flex' }}
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}

function PasswordStrength({ value }: { value: string }) {
  const strength = value.length === 0 ? 0 : value.length < 6 ? 1 : value.length < 10 ? 2 : value.length < 14 ? 3 : 4;
  const colors = ['#2A2A2A', '#EF4444', '#F97316', '#D4A84B', '#22C55E'];
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  return (
    <div style={{ marginTop: '8px' }}>
      <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{ flex: 1, height: '4px', borderRadius: '2px', backgroundColor: i <= strength ? colors[strength] : '#2A2A2A', transition: 'background-color 0.3s' }} />
        ))}
      </div>
      {strength > 0 && <span style={{ color: colors[strength], fontSize: '12px', fontWeight: '600' }}>{labels[strength]}</span>}
    </div>
  );
}

const inputStyle = {
  width: '100%',
  backgroundColor: '#1A1A1A',
  border: '1px solid #2A2A2A',
  borderRadius: '8px',
  padding: '12px 16px',
  color: '#FFFFFF',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box' as const,
};

export function SecurityTab() {
  const [passwordValue, setPasswordValue] = useState('');

  return (
    <div style={{ backgroundColor: '#1E1E1E', borderRadius: '12px', border: '1px solid #2A2A2A', padding: '28px' }}>
      <h2 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>Change Password</h2>
      <p style={{ color: '#888888', fontSize: '14px', marginBottom: '24px' }}>Update your account password</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px', maxWidth: '480px' }}>
        <div>
          <label style={{ display: 'block', color: '#888888', fontSize: '12px', marginBottom: '6px' }}>Current Password</label>
          <PasswordInput placeholder="Enter current password" />
        </div>
        <div>
          <label style={{ display: 'block', color: '#888888', fontSize: '12px', marginBottom: '6px' }}>New Password</label>
          <div>
            <div style={{ position: 'relative' }}>
              <input type="password" value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} placeholder="Enter new password" style={{ ...inputStyle, paddingRight: '44px' }} />
            </div>
            <PasswordStrength value={passwordValue} />
          </div>
        </div>
        <div>
          <label style={{ display: 'block', color: '#888888', fontSize: '12px', marginBottom: '6px' }}>Confirm New Password</label>
          <PasswordInput placeholder="Confirm new password" />
        </div>
      </div>

      <button style={{ padding: '12px 28px', backgroundColor: '#D4A84B', border: 'none', borderRadius: '8px', color: '#000000', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
        Update Password
      </button>
    </div>
  );
}
