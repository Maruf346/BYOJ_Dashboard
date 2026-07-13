import { useState } from 'react';
import { Clock } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { DesignRequestModal } from './DesignRequestModal';
import type { ActivePage } from './Sidebar';

const allRequests = [
  { id: '1', title: 'Custom Ring', customer: 'Sarah Johnson', timeAgo: '2 hours ago', status: 'Pending' },
  { id: '2', title: 'Custom Necklace', customer: 'Michael Chen', timeAgo: '1 day ago', status: 'In-progress' },
  { id: '3', title: 'Custom Ring', customer: 'Emma Wilson', timeAgo: '3 days ago', status: 'Completed' },
  { id: '4', title: 'Custom Necklace', customer: 'James Brown', timeAgo: '5 hours ago', status: 'Pending' },
];

const tabs = ['All', 'Pending', 'In Progress', 'Completed'];

interface DesignRequestsProps {
  onNavigate?: (page: ActivePage) => void;
}

export function DesignRequests({ onNavigate }: DesignRequestsProps) {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedRequest, setSelectedRequest] = useState<typeof allRequests[0] | null>(null);

  const filtered = allRequests.filter((r) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Pending') return r.status === 'Pending';
    if (activeTab === 'In Progress') return r.status === 'In-progress';
    if (activeTab === 'Completed') return r.status === 'Completed';
    return true;
  });

  return (
    <div>
      {/* Page header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ color: '#FFFFFF', fontSize: '28px', fontWeight: '700', marginBottom: '4px' }}>
          Design Requests
        </h1>
        <p style={{ color: '#888888', fontSize: '14px' }}>Manage customer design requests</p>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '8px 20px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: activeTab === tab ? '#D4A84B' : 'transparent',
              color: activeTab === tab ? '#000000' : '#888888',
              fontSize: '14px',
              fontWeight: activeTab === tab ? '600' : '400',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Request list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filtered.map((req) => (
          <div
            key={req.id}
            style={{
              backgroundColor: '#1E1E1E',
              borderRadius: '12px',
              border: '1px solid #2A2A2A',
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            {/* Left: title + customer */}
            <div style={{ flex: 1 }}>
              <div style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                {req.title}
              </div>
              <div style={{ color: '#888888', fontSize: '13px' }}>Customer: {req.customer}</div>
            </div>

            {/* Center: time */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: '120px' }}>
              <Clock size={14} color="#888888" />
              <span style={{ color: '#888888', fontSize: '13px' }}>{req.timeAgo}</span>
            </div>

            {/* Right: status + view button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <StatusBadge status={req.status} />
              <button
                onClick={() => setSelectedRequest(req)}
                style={{
                  padding: '8px 20px',
                  backgroundColor: '#D4A84B',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#000000',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedRequest && (
        <DesignRequestModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onStartChat={() => onNavigate?.('chats')}
        />
      )}
    </div>
  );
}
