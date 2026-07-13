import { X } from 'lucide-react';
import { useState } from 'react';

interface Order {
  id: string;
  customer: string;
  items: string;
  status: string;
  total: string;
  date: string;
}

interface OrderDetailModalProps {
  order: Order;
  onClose: () => void;
}

const statusOptions = ['Pending', 'In Progress', 'Processing', 'Completed', 'Shipped'];

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

export function OrderDetailModal({ order, onClose }: OrderDetailModalProps) {
  const [selectedStatus, setSelectedStatus] = useState(order.status);

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
          width: '520px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '28px',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <span style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '700' }}>Order Details</span>
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

        {/* Client info */}
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
            {getInitials(order.customer)}
          </div>
          <div>
            <div style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: '600' }}>{order.customer}</div>
            <div style={{ color: '#888888', fontSize: '12px' }}>Customer</div>
          </div>
        </div>

        {/* Item Requested */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ color: '#888888', fontSize: '12px', marginBottom: '4px' }}>Item Requested</div>
          <div style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '600' }}>{order.items}</div>
        </div>

        {/* Metal & Material */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <div>
            <div style={{ color: '#888888', fontSize: '12px', marginBottom: '4px' }}>Metal Type</div>
            <div style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '600' }}>18K Yellow Gold</div>
          </div>
          <div>
            <div style={{ color: '#888888', fontSize: '12px', marginBottom: '4px' }}>Stone</div>
            <div style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '600' }}>Diamond</div>
          </div>
        </div>

        {/* Designer Fee */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ color: '#888888', fontSize: '12px', marginBottom: '8px' }}>Selected Plan</div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '8px 16px',
              border: '1px solid #D4A84B',
              borderRadius: '8px',
              backgroundColor: 'rgba(212,168,75,0.08)',
              color: '#D4A84B',
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            Starter Plan — $450
          </div>
        </div>

        {/* Status Change */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ color: '#888888', fontSize: '12px', marginBottom: '10px' }}>Update Status</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {statusOptions.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedStatus(s)}
                style={{
                  padding: '6px 16px',
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

        {/* Save button */}
        <button
          onClick={onClose}
          style={{
            width: '100%',
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
          Save Changes
        </button>
      </div>
    </div>
  );
}
