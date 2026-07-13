import { Bell, User, Search } from 'lucide-react';

export function Navbar() {
  return (
    <div
      style={{
        height: '56px',
        backgroundColor: '#161616',
        borderBottom: '1px solid #2A2A2A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Search bar centered */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#1A1A1A',
            border: '1px solid #2A2A2A',
            borderRadius: '20px',
            padding: '8px 16px',
            width: '280px',
          }}
        >
          <Search size={14} color="#888888" />
          <input
            placeholder="Search..."
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#888888',
              fontSize: '14px',
              width: '100%',
            }}
          />
        </div>
      </div>

      {/* Right icons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: '#888888',
            display: 'flex',
            alignItems: 'center',
            padding: '4px',
          }}
        >
          <Bell size={20} />
        </button>
        <button
          style={{
            background: '#1A1A1A',
            border: '1px solid #2A2A2A',
            cursor: 'pointer',
            color: '#888888',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
          }}
        >
          <User size={16} />
        </button>
      </div>
    </div>
  );
}
