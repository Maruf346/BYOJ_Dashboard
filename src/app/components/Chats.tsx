import { ChangeEvent, useState, useRef, useEffect } from 'react';
import { Search, Send, Plus, Paperclip, PenLine, X } from 'lucide-react';

const conversations = [
  {
    id: '1',
    name: 'Sarah Johnson',
    preview: 'Can you add more diamonds t...',
    time: '2 min ago',
    unread: 3,
    active: true,
    color: '#D4A84B',
    messages: [
      { id: 1, type: 'incoming', text: 'Hi! I wanted to ask about my ring design', time: '10:30 AM' },
      { id: 2, type: 'outgoing', text: 'Of course! What would you like to change?', time: '10:32 AM' },
      { id: 3, type: 'incoming', text: 'Can you add more diamonds to the ring?', time: '10:35 AM' },
      { id: 4, type: 'incoming', text: 'Also make it a bit smaller', time: '10:35 AM' },
    ],
  },
  {
    id: '2',
    name: 'Michael Chen',
    preview: 'Perfect! I love the design',
    time: '1 hour ago',
    unread: 0,
    active: false,
    color: '#6C63FF',
    messages: [
      { id: 1, type: 'incoming', text: 'How is my order coming along?', time: '9:00 AM' },
      { id: 2, type: 'outgoing', text: 'Great progress! The design is almost ready.', time: '9:15 AM' },
      { id: 3, type: 'incoming', text: 'Perfect! I love the design', time: '9:20 AM' },
    ],
  },
  {
    id: '3',
    name: 'Emma Wilson',
    preview: 'When can I expect delivery?',
    time: '3 hours ago',
    unread: 1,
    active: false,
    color: '#22C55E',
    messages: [
      { id: 1, type: 'outgoing', text: 'Your order has been shipped!', time: '8:00 AM' },
      { id: 2, type: 'incoming', text: 'When can I expect delivery?', time: '8:30 AM' },
    ],
  },
  {
    id: '4',
    name: 'James Brown',
    preview: 'Thanks for the update',
    time: '1 day ago',
    unread: 0,
    active: false,
    color: '#3B82F6',
    messages: [
      { id: 1, type: 'outgoing', text: 'Your bracelet and earrings have been shipped.', time: 'Yesterday' },
      { id: 2, type: 'incoming', text: 'Thanks for the update', time: 'Yesterday' },
    ],
  },
];

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

export function Chats() {
  const [activeConv, setActiveConv] = useState(conversations[0]);
  const [messages, setMessages] = useState<{ id: number; type: string; text: string; time: string }[]>(conversations[0].messages);
  const [inputText, setInputText] = useState('');
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cadInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSelectConv = (conv: typeof conversations[0]) => {
    setActiveConv(conv);
    setMessages(conv.messages);
    setShowPlusMenu(false);
  };

  const handleSend = () => {
    if (!inputText.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [...prev, { id: prev.length + 1, type: 'outgoing', text: inputText, time }]);
    setInputText('');
  };

  const addMockAttachmentMessage = (file: File, kind: 'attachment' | 'cad') => {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const label = kind === 'cad' ? 'CAD design sent' : 'Attachment sent';

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        type: 'outgoing',
        text: `${label}: ${file.name}`,
        time,
      },
    ]);
  };

  const handleMockFileUpload = (event: ChangeEvent<HTMLInputElement>, kind: 'attachment' | 'cad') => {
    const file = event.target.files?.[0];
    if (!file) return;

    addMockAttachmentMessage(file, kind);
    setShowPlusMenu(false);
    event.target.value = '';
  };

  const filtered = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 56px - 64px)' }}>
      {/* Page header */}
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ color: '#FFFFFF', fontSize: '28px', fontWeight: '700', marginBottom: '4px' }}>Messages</h1>
        <p style={{ color: '#888888', fontSize: '14px' }}>Chat with your customers</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '38fr 62fr', gap: '16px', flex: 1, minHeight: 0 }}>
        {/* Left: Conversations */}
        <div
          style={{
            backgroundColor: '#1E1E1E',
            borderRadius: '12px',
            border: '1px solid #2A2A2A',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <div style={{ padding: '20px 20px 16px' }}>
            <div style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: '600', marginBottom: '14px' }}>
              Conversations
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#1A1A1A',
                border: '1px solid #2A2A2A',
                borderRadius: '8px',
                padding: '8px 12px',
              }}
            >
              <Search size={14} color="#888888" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  width: '100%',
                }}
              />
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            {filtered.map((conv) => {
              const isActive = activeConv.id === conv.id;
              return (
                <button
                  key={conv.id}
                  onClick={() => handleSelectConv(conv)}
                  style={{
                    width: '100%',
                    padding: '14px 20px',
                    backgroundColor: isActive ? 'rgba(212,168,75,0.08)' : 'transparent',
                    borderLeft: isActive ? '3px solid #D4A84B' : '3px solid transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'flex-start',
                    borderBottom: '1px solid #2A2A2A',
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: conv.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      fontSize: '14px',
                      fontWeight: '700',
                      flexShrink: 0,
                    }}
                  >
                    {getInitials(conv.name)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '600' }}>{conv.name}</span>
                      {conv.unread > 0 && (
                        <div
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            backgroundColor: '#D4A84B',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#000000',
                            fontSize: '11px',
                            fontWeight: '700',
                            flexShrink: 0,
                          }}
                        >
                          {conv.unread}
                        </div>
                      )}
                    </div>
                    <div
                      style={{
                        color: '#888888',
                        fontSize: '13px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        marginBottom: '2px',
                      }}
                    >
                      {conv.preview}
                    </div>
                    <div style={{ color: '#555555', fontSize: '11px' }}>{conv.time}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Chat */}
        <div
          style={{
            backgroundColor: '#1E1E1E',
            borderRadius: '12px',
            border: '1px solid #2A2A2A',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Chat header */}
          <div
            style={{
              padding: '16px 24px',
              borderBottom: '1px solid #2A2A2A',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: activeConv.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: '700',
                flexShrink: 0,
              }}
            >
              {getInitials(activeConv.name)}
            </div>
            <div>
              <div style={{ color: '#FFFFFF', fontSize: '15px', fontWeight: '700' }}>{activeConv.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22C55E' }} />
                <span style={{ color: '#888888', fontSize: '12px' }}>Active now</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.type === 'outgoing' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '65%',
                    padding: '12px 16px',
                    borderRadius: msg.type === 'outgoing' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    backgroundColor: msg.type === 'outgoing' ? '#D4A84B' : '#252525',
                    color: msg.type === 'outgoing' ? '#000000' : '#FFFFFF',
                    fontSize: '14px',
                    lineHeight: '1.5',
                  }}
                >
                  {msg.text}
                </div>
                <div style={{ color: '#555555', fontSize: '11px', marginTop: '4px', padding: '0 4px' }}>
                  {msg.time}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div
            style={{
              padding: '12px 16px',
              borderTop: '1px solid #2A2A2A',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              position: 'relative',
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              onChange={(event) => handleMockFileUpload(event, 'attachment')}
              style={{ display: 'none' }}
            />
            <input
              ref={cadInputRef}
              type="file"
              accept=".3dm,.3ds,.blend,.cad,.dwg,.dxf,.fbx,.iges,.igs,.obj,.sat,.skp,.step,.stl,.stp"
              onChange={(event) => handleMockFileUpload(event, 'cad')}
              style={{ display: 'none' }}
            />

            {/* Plus popup */}
            {showPlusMenu && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '60px',
                  left: '16px',
                  backgroundColor: '#252525',
                  border: '1px solid #2A2A2A',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                  zIndex: 10,
                  minWidth: '200px',
                }}
              >
                {[
                  { icon: Paperclip, label: 'Attach File' },
                  { icon: PenLine, label: 'Upload CAD Design' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      onClick={() => {
                        if (item.label === 'Attach File') {
                          fileInputRef.current?.click();
                          return;
                        }

                        cadInputRef.current?.click();
                      }}
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        borderBottom: item.label === 'Attach File' ? '1px solid #2A2A2A' : 'none',
                      }}
                    >
                      <Icon size={16} color="#D4A84B" />
                      <span style={{ color: '#FFFFFF', fontSize: '14px' }}>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}

            <button
              onClick={() => setShowPlusMenu((v) => !v)}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: showPlusMenu ? '#D4A84B' : '#252525',
                border: '1px solid #2A2A2A',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: showPlusMenu ? '#000000' : '#888888',
                flexShrink: 0,
              }}
            >
              {showPlusMenu ? <X size={16} /> : <Plus size={16} />}
            </button>

            <input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              style={{
                flex: 1,
                backgroundColor: '#1A1A1A',
                border: '1px solid #2A2A2A',
                borderRadius: '8px',
                padding: '10px 14px',
                color: '#FFFFFF',
                fontSize: '14px',
                outline: 'none',
              }}
            />

            <button
              onClick={handleSend}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: '#D4A84B',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Send size={16} color="#000000" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
