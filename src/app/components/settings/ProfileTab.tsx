import { useState } from 'react';
import { Camera, Edit2 } from 'lucide-react';


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

export function ProfileTab() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({ firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '+1 (555) 123-4567' });
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [passwordValue, setPasswordValue] = useState('');

  const handlePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setProfilePic(ev.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const cardStyle = {
    backgroundColor: '#1E1E1E',
    borderRadius: '12px',
    border: '1px solid #2A2A2A',
    padding: '28px',
    marginBottom: '24px',
  };

  return (
    <div>
      {/* Profile Information */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <h2 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>Profile Information</h2>
            <p style={{ color: '#888888', fontSize: '14px' }}>Update your personal details</p>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: 'transparent', border: '1px solid #2A2A2A', borderRadius: '8px', color: '#FFFFFF', cursor: 'pointer', fontSize: '14px' }}
            >
              <Edit2 size={16} /> Edit Profile
            </button>
          )}
        </div>

        {/* Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
          <div style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#2A2A2A', overflow: 'hidden', border: '2px solid #D4A84B', flexShrink: 0 }}>
            {profilePic
              ? <img src={profilePic} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#D4A84B', fontSize: '24px', fontWeight: 'bold' }}>{profile.firstName[0]}{profile.lastName[0]}</span>
            }
            {isEditing && (
              <label style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Camera size={22} color="#FFFFFF" />
                <input type="file" accept="image/*" onChange={handlePicChange} style={{ display: 'none' }} />
              </label>
            )}
          </div>
          {isEditing && <p style={{ color: '#888888', fontSize: '13px' }}>Click the avatar to upload a new picture.</p>}
        </div>

        {/* Fields */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label style={{ display: 'block', color: '#888888', fontSize: '12px', marginBottom: '6px' }}>First Name</label>
            <input value={profile.firstName} onChange={(e) => setProfile((p) => ({ ...p, firstName: e.target.value }))} style={{ ...inputStyle, opacity: isEditing ? 1 : 0.6 }} disabled={!isEditing} />
          </div>
          <div>
            <label style={{ display: 'block', color: '#888888', fontSize: '12px', marginBottom: '6px' }}>Last Name</label>
            <input value={profile.lastName} onChange={(e) => setProfile((p) => ({ ...p, lastName: e.target.value }))} style={{ ...inputStyle, opacity: isEditing ? 1 : 0.6 }} disabled={!isEditing} />
          </div>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', color: '#888888', fontSize: '12px', marginBottom: '6px' }}>Email</label>
          <input value={profile.email} onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))} style={{ ...inputStyle, opacity: isEditing ? 1 : 0.6 }} disabled={!isEditing} />
        </div>
        <div style={{ marginBottom: '28px' }}>
          <label style={{ display: 'block', color: '#888888', fontSize: '12px', marginBottom: '6px' }}>Phone</label>
          <input value={profile.phone} onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))} style={{ ...inputStyle, opacity: isEditing ? 1 : 0.6 }} disabled={!isEditing} />
        </div>

        {isEditing && (
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => setIsEditing(false)} style={{ padding: '12px 28px', backgroundColor: '#D4A84B', border: 'none', borderRadius: '8px', color: '#000000', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
              Save Changes
            </button>
            <button onClick={() => setIsEditing(false)} style={{ padding: '12px 28px', backgroundColor: 'transparent', border: '1px solid #2A2A2A', borderRadius: '8px', color: '#FFFFFF', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
