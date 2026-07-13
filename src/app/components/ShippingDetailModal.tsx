import { X, Copy, CheckCircle2, Circle } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

interface Shipment {
  id: string;
  order: string;
  customer: string;
  tracking: string;
  status: string;
  delivery: string;
}

interface ShippingDetailModalProps {
  shipment: Shipment;
  onClose: () => void;
}

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

const avatarColors: Record<string, string> = {
  'Alice Johnson': '#6C63FF',
  'Bob Smith': '#22C55E',
  'Charlie Brown': '#F97316',
  'Diana Prince': '#3B82F6',
  'Ethan Wright': '#D4A84B',
};

const timeline = [
  { label: 'Order Packed', date: 'Oct 20', done: true },
  { label: 'Picked Up', date: 'Oct 21', done: true },
  { label: 'In Transit', date: 'Oct 22', done: false, active: true },
  { label: 'Out for Delivery', date: 'Oct 23', done: false },
  { label: 'Delivered', date: 'Oct 24', done: false },
];

export function ShippingDetailModal({ shipment, onClose }: ShippingDetailModalProps) {
  const avatarColor = avatarColors[shipment.customer] || '#D4A84B';

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
          <span style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '700' }}>Shipment Details</span>
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

        {/* Shipment ID */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ color: '#888888', fontSize: '12px', marginBottom: '4px' }}>Shipment ID</div>
          <div style={{ color: '#D4A84B', fontSize: '22px', fontWeight: '700' }}>{shipment.id}</div>
        </div>

        {/* Details grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <div style={{ color: '#888888', fontSize: '12px', marginBottom: '4px' }}>Linked Order</div>
            <div style={{ color: '#D4A84B', fontSize: '14px', fontWeight: '600' }}>{shipment.order}</div>
          </div>
          <div>
            <div style={{ color: '#888888', fontSize: '12px', marginBottom: '4px' }}>Customer</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: avatarColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontSize: '11px',
                  fontWeight: '700',
                  flexShrink: 0,
                }}
              >
                {getInitials(shipment.customer)}
              </div>
              <span style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '600' }}>{shipment.customer}</span>
            </div>
          </div>
          <div>
            <div style={{ color: '#888888', fontSize: '12px', marginBottom: '4px' }}>Tracking Number</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '600' }}>{shipment.tracking}</span>
              <button
                style={{
                  background: 'transparent',
                  border: '1px solid #2A2A2A',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  color: '#888888',
                  display: 'flex',
                  padding: '4px',
                }}
              >
                <Copy size={12} />
              </button>
            </div>
          </div>
          <div>
            <div style={{ color: '#888888', fontSize: '12px', marginBottom: '4px' }}>Carrier / Courier</div>
            <div style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '600' }}>FedEx International</div>
          </div>
          <div>
            <div style={{ color: '#888888', fontSize: '12px', marginBottom: '4px' }}>Current Status</div>
            <StatusBadge status={shipment.status} />
          </div>
          <div>
            <div style={{ color: '#888888', fontSize: '12px', marginBottom: '4px' }}>Estimated Delivery</div>
            <div style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '600' }}>{shipment.delivery}</div>
          </div>
        </div>

        {/* Shipping Address */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ color: '#888888', fontSize: '12px', marginBottom: '4px' }}>Shipping Address</div>
          <div style={{ color: '#CCCCCC', fontSize: '13px', lineHeight: '1.6' }}>
            123 Main Street, Apt 4B<br />
            New York, NY 10001<br />
            United States
          </div>
        </div>

        {/* Tracking Timeline */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ color: '#888888', fontSize: '12px', marginBottom: '12px' }}>Tracking Timeline</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {timeline.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', position: 'relative' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: step.done ? '#22C55E' : step.active ? '#3B82F6' : '#2A2A2A',
                      border: step.active ? '2px solid #3B82F6' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {step.done && <CheckCircle2 size={14} color="#FFFFFF" />}
                    {step.active && <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FFFFFF' }} />}
                    {!step.done && !step.active && <Circle size={14} color="#2A2A2A" />}
                  </div>
                  {i < timeline.length - 1 && (
                    <div
                      style={{
                        width: '2px',
                        height: '28px',
                        backgroundColor: step.done ? '#22C55E' : '#2A2A2A',
                      }}
                    />
                  )}
                </div>
                <div style={{ paddingBottom: i < timeline.length - 1 ? '8px' : '0' }}>
                  <div style={{ color: step.done || step.active ? '#FFFFFF' : '#555555', fontSize: '14px', fontWeight: step.active ? '600' : '400' }}>
                    {step.label}
                  </div>
                  <div style={{ color: '#888888', fontSize: '12px' }}>{step.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: 'transparent',
            border: '1px solid #2A2A2A',
            borderRadius: '8px',
            color: '#FFFFFF',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
