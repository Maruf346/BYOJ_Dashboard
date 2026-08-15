import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, User, Search, CreditCard, Users2, Check, ShieldCheck } from 'lucide-react';
import { mockNotifications, type AppNotification } from '../mock/notifications';

function notifIcon(notification_type: string) {
  const baseStyle = { width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 };
  switch (notification_type) {
    case 'subscription': return <div style={{ ...baseStyle, backgroundColor: 'rgba(212, 168, 75, 0.15)' }}><CreditCard size={14} color="#D4A84B" strokeWidth={1.8} /></div>;
    case 'welcome':
    case 'user':         return <div style={{ ...baseStyle, backgroundColor: 'rgba(56, 189, 248, 0.15)' }}><Users2    size={14} color="#38bdf8" strokeWidth={1.8} /></div>;
    case 'payment':      return <div style={{ ...baseStyle, backgroundColor: 'rgba(52, 211, 153, 0.15)' }}><Check     size={14} color="#34d399" strokeWidth={2.5} /></div>;
    case 'pass_changed':
    case 'system':
    default:             return <div style={{ ...baseStyle, backgroundColor: 'rgba(136, 136, 136, 0.15)' }}><ShieldCheck size={14} color="#888888" strokeWidth={1.8} /></div>;
  }
}

export function Navbar() {
  const [notifs, setNotifs] = useState<AppNotification[]>(mockNotifications);
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelPos, setPanelPos] = useState({ top: 0, right: 0 });

  const bellBtnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifs.filter((n) => !n.is_read).length;

  useEffect(() => {
    if (!panelOpen) return;
    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!panelRef.current?.contains(target) && !bellBtnRef.current?.contains(target)) {
        setPanelOpen(false);
      }
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [panelOpen]);

  const togglePanel = () => {
    if (!bellBtnRef.current) return;
    if (!panelOpen) {
      const rect = bellBtnRef.current.getBoundingClientRect();
      setPanelPos({
        top: Math.round(rect.bottom + 10),
        right: Math.round(Math.max(12, window.innerWidth - rect.right - 8)),
      });
    }
    setPanelOpen((o) => !o);
  };

  const markRead = (id: string) => {
    setNotifs((current) => current.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
  };

  const markAllRead = () => {
    setNotifs((current) => current.map((n) => ({ ...n, is_read: true })));
  };

  const clearRead = () => {
    setNotifs((current) => current.filter((n) => !n.is_read));
  };

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
        <div style={{ position: 'relative' }}>
          <button
            ref={bellBtnRef}
            onClick={togglePanel}
            style={{
              background: panelOpen ? '#252525' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: panelOpen ? '#FFFFFF' : '#888888',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              transition: 'background 0.2s, color 0.2s',
              position: 'relative',
            }}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#D4A84B',
                  border: '1.5px solid #161616',
                }}
              />
            )}
          </button>

          {createPortal(
            <AnimatePresence>
              {panelOpen && (
                <motion.div
                  ref={panelRef}
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: 'fixed',
                    top: panelPos.top,
                    right: panelPos.right,
                    zIndex: 99999,
                    width: '320px',
                    borderRadius: '12px',
                    backgroundColor: '#1E1E1E',
                    border: '1px solid #2A2A2A',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid #2A2A2A' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#FFFFFF', fontWeight: '600', fontSize: '14px' }}>Notifications</span>
                      {unreadCount > 0 && (
                        <span style={{ backgroundColor: '#D4A84B', color: '#000000', padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: '700' }}>
                          {unreadCount}
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        onClick={markAllRead}
                        disabled={unreadCount === 0}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: unreadCount === 0 ? '#555555' : '#888888',
                          fontSize: '11px',
                          cursor: unreadCount === 0 ? 'not-allowed' : 'pointer',
                        }}
                      >
                        Mark read
                      </button>
                      <button
                        onClick={clearRead}
                        disabled={notifs.every((n) => !n.is_read)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: notifs.every((n) => !n.is_read) ? '#555555' : '#e53e3e',
                          fontSize: '11px',
                          cursor: notifs.every((n) => !n.is_read) ? 'not-allowed' : 'pointer',
                        }}
                      >
                        Clear read
                      </button>
                    </div>
                  </div>

                  <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
                    {notifs.length === 0 ? (
                      <div style={{ padding: '40px 0', textAlign: 'center' }}>
                        <Bell size={24} color="#333333" style={{ margin: '0 auto 8px' }} />
                        <p style={{ color: '#666666', fontSize: '12px' }}>No notifications</p>
                      </div>
                    ) : (
                      notifs.map((n, idx) => {
                        const dateObj = new Date(n.created_at);
                        const timeStr = dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                        return (
                          <button
                            key={n.id}
                            onClick={() => markRead(n.id)}
                            style={{
                              width: '100%',
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '12px',
                              padding: '16px',
                              background: 'transparent',
                              border: 'none',
                              borderBottom: idx < notifs.length - 1 ? '1px solid #2A2A2A' : 'none',
                              textAlign: 'left',
                              cursor: 'pointer',
                              transition: 'background 0.2s',
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#252525';
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                            }}
                          >
                            {notifIcon(n.notification_type)}
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                                <span style={{ color: n.is_read ? '#AAAAAA' : '#FFFFFF', fontWeight: n.is_read ? '400' : '600', fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                  {n.title}
                                </span>
                                {!n.is_read && <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#D4A84B', flexShrink: 0 }} />}
                              </div>
                              <p style={{ color: '#888888', fontSize: '12px', marginTop: '4px', lineHeight: '1.4' }}>
                                {n.body}
                              </p>
                              <p style={{ color: '#666666', fontSize: '10px', marginTop: '6px' }}>{timeStr}</p>
                            </div>
                          </button>
                        );
                      })
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>,
            document.body
          )}
        </div>
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

