import { useState } from 'react';
import { X, MessageCircle, ShoppingBag, ArrowLeft } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { orders } from '../mock/orders';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  spent: string;
  joined: string;
  color: string;
}

interface CustomerDetailModalProps {
  customer: Customer;
  onClose: () => void;
  onChat?: () => void;
}

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

export function CustomerDetailModal({ customer, onClose, onChat }: CustomerDetailModalProps) {
  const [showAllOrders, setShowAllOrders] = useState(false);
  
  const orderCount = customer.orders;
  const totalSpent = customer.spent;
  const avgValue = `$${Math.round(parseInt(totalSpent.replace(/[$,]/g, '')) / Math.max(orderCount, 1)).toLocaleString()}`;

  // Generate mock orders to match the customer's total order count
  const customerOrders = Array.from({ length: customer.orders }, (_, i) => {
    const template = orders[i % orders.length];
    return {
      id: `ORD-${customer.id}${String(i + 1).padStart(3, '0')}`,
      items: template.items,
      status: template.status,
      total: template.total,
      date: template.date,
    };
  });

  const recentOrders = customerOrders.slice(0, 3);

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
          width: showAllOrders ? '800px' : '540px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '28px',
          transition: 'width 0.3s ease',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {showAllOrders && (
              <button
                onClick={() => setShowAllOrders(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#888888',
                  display: 'flex',
                  padding: '4px',
                }}
              >
                <ArrowLeft size={18} />
              </button>
            )}
            <span style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '700' }}>
              {showAllOrders ? `All Orders - ${customer.name}` : 'Customer Profile'}
            </span>
          </div>
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

        {!showAllOrders ? (
          <>
            {/* Customer header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: customer.color,
                  border: '3px solid #D4A84B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontSize: '22px',
                  fontWeight: '700',
                  flexShrink: 0,
                }}
              >
                {getInitials(customer.name)}
              </div>
              <div>
                <div style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '700' }}>{customer.name}</div>
                <div style={{ color: '#888888', fontSize: '13px' }}>Customer since {customer.joined}</div>
              </div>
            </div>

            {/* Contact */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div>
                <div style={{ color: '#888888', fontSize: '12px', marginBottom: '4px' }}>Email</div>
                <div style={{ color: '#FFFFFF', fontSize: '14px' }}>{customer.email}</div>
              </div>
              <div>
                <div style={{ color: '#888888', fontSize: '12px', marginBottom: '4px' }}>Phone</div>
                <div style={{ color: '#FFFFFF', fontSize: '14px' }}>{customer.phone}</div>
              </div>
            </div>

            {/* Stats row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '12px',
                marginBottom: '24px',
                padding: '16px',
                backgroundColor: '#252525',
                borderRadius: '12px',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#D4A84B', fontSize: '20px', fontWeight: '700' }}>{orderCount}</div>
                <div style={{ color: '#888888', fontSize: '12px' }}>Total Orders</div>
              </div>
              <div style={{ textAlign: 'center', borderLeft: '1px solid #2A2A2A', borderRight: '1px solid #2A2A2A' }}>
                <div style={{ color: '#D4A84B', fontSize: '20px', fontWeight: '700' }}>{totalSpent}</div>
                <div style={{ color: '#888888', fontSize: '12px' }}>Total Spent</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#D4A84B', fontSize: '20px', fontWeight: '700' }}>{avgValue}</div>
                <div style={{ color: '#888888', fontSize: '12px' }}>Avg. Order Value</div>
              </div>
            </div>

            {/* Recent Orders */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ color: '#888888', fontSize: '12px', marginBottom: '12px' }}>Recent Orders</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px',
                      backgroundColor: '#252525',
                      borderRadius: '8px',
                    }}
                  >
                    <div>
                      <div style={{ color: '#D4A84B', fontSize: '13px', fontWeight: '600' }}>{order.id}</div>
                      <div style={{ color: '#CCCCCC', fontSize: '13px' }}>{order.items}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <StatusBadge status={order.status} />
                      <span style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '600' }}>{order.total}</span>
                    </div>
                  </div>
                ))}
                {recentOrders.length === 0 && (
                  <div style={{ color: '#888888', fontSize: '13px', padding: '12px', textAlign: 'center', backgroundColor: '#252525', borderRadius: '8px' }}>
                    No recent orders found.
                  </div>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button
                onClick={() => { onChat?.(); onClose(); }}
                style={{
                  padding: '12px',
                  backgroundColor: '#D4A84B',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#000000',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <MessageCircle size={16} />
                Send Message
              </button>
              <button
                onClick={() => setShowAllOrders(true)}
                style={{
                  padding: '12px',
                  backgroundColor: 'transparent',
                  border: '1px solid #2A2A2A',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <ShoppingBag size={16} />
                View All Orders
              </button>
            </div>
          </>
        ) : (
          /* All Orders View */
          <div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['ORDER ID', 'ITEMS', 'STATUS', 'TOTAL', 'DATE'].map((h) => (
                    <th
                      key={h}
                      style={{
                        color: '#888888',
                        fontSize: '11px',
                        fontWeight: '600',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        textAlign: 'left',
                        padding: '0 16px 12px',
                        borderBottom: '1px solid #2A2A2A',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {customerOrders.map((order) => (
                  <tr key={order.id}>
                    <td style={{ padding: '0 16px', height: '60px', color: '#D4A84B', fontSize: '14px', fontWeight: '600', borderBottom: '1px solid #2A2A2A' }}>
                      {order.id}
                    </td>
                    <td style={{ padding: '0 16px', height: '60px', color: '#CCCCCC', fontSize: '14px', borderBottom: '1px solid #2A2A2A' }}>
                      {order.items}
                    </td>
                    <td style={{ padding: '0 16px', height: '60px', borderBottom: '1px solid #2A2A2A' }}>
                      <StatusBadge status={order.status} />
                    </td>
                    <td style={{ padding: '0 16px', height: '60px', color: '#FFFFFF', fontSize: '14px', fontWeight: '600', borderBottom: '1px solid #2A2A2A' }}>
                      {order.total}
                    </td>
                    <td style={{ padding: '0 16px', height: '60px', color: '#888888', fontSize: '14px', borderBottom: '1px solid #2A2A2A' }}>
                      {order.date}
                    </td>
                  </tr>
                ))}
                {customerOrders.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ height: '72px', color: '#888888', fontSize: '14px', textAlign: 'center', borderBottom: '1px solid #2A2A2A' }}>
                      No orders found for this customer.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
