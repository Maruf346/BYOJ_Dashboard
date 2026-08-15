import { LayoutDashboard, PenTool, MessageCircle, Calendar, Gem, ShoppingBag, Truck, Users, Settings, LogOut } from 'lucide-react';

export type ActivePage =
  | 'dashboard'
  | 'design-requests'
  | 'chats'
  | 'meeting-schedule'
  | 'materials'
  | 'orders'
  | 'shipping'
  | 'customers'
  | 'settings';

const navItems: { id: ActivePage; label: string; icon: React.ElementType }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'design-requests', label: 'Design Requests', icon: PenTool },
  { id: 'chats', label: 'Chats', icon: MessageCircle },
  { id: 'meeting-schedule', label: 'Meeting Schedule', icon: Calendar },
  { id: 'materials', label: 'Materials', icon: Gem },
  { id: 'orders', label: 'Orders', icon: ShoppingBag },
  { id: 'shipping', label: 'Shipping', icon: Truck },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
];

interface SidebarProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  onLogout: () => void;
}

export function Sidebar({ activePage, onNavigate, onLogout }: SidebarProps) {
  return (
    <div
      style={{
        width: '240px',
        minHeight: '100vh',
        backgroundColor: '#161616',
        borderRight: '1px solid #2A2A2A',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 16px',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        height: '100vh',
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px', padding: '0 4px' }}>
        <img src="/logo.png" alt="Logo" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
        <span style={{ color: '#FFFFFF', fontWeight: '700', fontSize: '18px' }}>BYOJ</span>
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 12px',
                borderRadius: '8px',
                backgroundColor: isActive ? '#D4A84B' : 'transparent',
                color: isActive ? '#000000' : '#888888',
                fontWeight: isActive ? '600' : '400',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'background-color 0.15s, color 0.15s',
                textAlign: 'left',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#252525';
                  (e.currentTarget as HTMLButtonElement).style.color = '#FFFFFF';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                  (e.currentTarget as HTMLButtonElement).style.color = '#888888';
                }
              }}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={onLogout}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '10px 12px',
          borderRadius: '8px',
          backgroundColor: 'transparent',
          color: '#888888',
          border: 'none',
          cursor: 'pointer',
          fontSize: '14px',
          width: '100%',
          marginTop: '8px',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = '#FFFFFF';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = '#888888';
        }}
      >
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </div>
  );
}
