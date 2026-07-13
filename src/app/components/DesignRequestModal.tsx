import { X, ImageIcon } from 'lucide-react';
import { useState } from 'react';

interface DesignRequest {
  id: string;
  title: string;
  customer: string;
  timeAgo: string;
  status: string;
}

interface DesignRequestModalProps {
  request: DesignRequest;
  onClose: () => void;
  onStartChat?: () => void;
}

const statusOptions = ['Pending', 'In Progress', 'Processing', 'Completed', 'Shipped'];

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

export function DesignRequestModal({ request, onClose, onStartChat }: DesignRequestModalProps) {
  const [selectedStatus, setSelectedStatus] = useState(request.status);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          backgroundColor: '#1E1E1E',
          borderRadius: '16px',
          border: '1px solid #2A2A2A',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
          width: '560px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '28px',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <span style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '700' }}>Design Request Details</span>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: '1px solid #2A2A2A',
              borderRadius: '8px',
              cursor: 'pointer',
              color: '#888888',
              display: 'flex',
              padding: '6px',
            }}
          >
            <X size={16} />
          </button>
        </div>
        <div style={{ borderBottom: '1px solid #2A2A2A', marginBottom: '20px' }} />

        {/* Customer Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#252525',
              border: '2px solid #D4A84B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#D4A84B',
              fontSize: '16px',
              fontWeight: '700',
              flexShrink: 0,
            }}
          >
            {getInitials(request.customer)}
          </div>
          <div>
            <div style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: '600' }}>{request.customer}</div>
            <div style={{ color: '#888888', fontSize: '12px' }}>Customer</div>
          </div>
        </div>

        {/* Item Type */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ color: '#888888', fontSize: '12px', marginBottom: '4px' }}>Item Type</div>
          <div style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '600' }}>{request.title}</div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ color: '#888888', fontSize: '12px', marginBottom: '4px' }}>Description</div>
          <div style={{ color: '#CCCCCC', fontSize: '14px', lineHeight: '1.6' }}>
            Customer wants a custom solitaire engagement ring with a 1.5ct round diamond, white gold band, 6-prong setting.
          </div>
        </div>

        {/* Reference Images */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ color: '#888888', fontSize: '12px', marginBottom: '8px' }}>Reference Images</div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  width: '80px',
                  height: '80px',
                  border: '1px dashed #D4A84B',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  backgroundColor: 'rgba(212,168,75,0.05)',
                }}
              >
                <ImageIcon size={20} color="#D4A84B" />
                <span style={{ color: '#888888', fontSize: '10px' }}>No image</span>
              </div>
            ))}
          </div>
        </div>

        {/* Details grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <div style={{ color: '#888888', fontSize: '12px', marginBottom: '4px' }}>Preferred Metal</div>
            <div style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '600' }}>18K White Gold</div>
          </div>
          <div>
            <div style={{ color: '#888888', fontSize: '12px', marginBottom: '4px' }}>Budget</div>
            <div style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '600' }}>$3,500 – $5,000</div>
          </div>
          <div>
            <div style={{ color: '#888888', fontSize: '12px', marginBottom: '4px' }}>Timeline</div>
            <div style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '600' }}>3–4 weeks</div>
          </div>
          <div>
            <div style={{ color: '#888888', fontSize: '12px', marginBottom: '4px' }}>Deadline</div>
            <div style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '600' }}>2024-04-15</div>
          </div>
        </div>

        {/* Status */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ color: '#888888', fontSize: '12px', marginBottom: '10px' }}>Update Status</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {statusOptions.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedStatus(s)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: selectedStatus === s ? 'none' : '1px solid #2A2A2A',
                  backgroundColor: selectedStatus === s ? '#D4A84B' : '#252525',
                  color: selectedStatus === s ? '#000000' : '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <button
            onClick={() => { onStartChat?.(); onClose(); }}
            style={{
              padding: '12px',
              backgroundColor: 'transparent',
              border: '1px solid #D4A84B',
              borderRadius: '8px',
              color: '#D4A84B',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Start Chat
          </button>
          <button
            onClick={onClose}
            style={{
              padding: '12px',
              backgroundColor: '#D4A84B',
              border: 'none',
              borderRadius: '8px',
              color: '#000000',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
            }}
          >
            Accept Request
          </button>
        </div>
      </div>
    </div>
  );
}
