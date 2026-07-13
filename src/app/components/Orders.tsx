import { useState } from 'react';
import { Eye, Plus } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { OrderDetailModal } from './OrderDetailModal';

const orders = [
  { id: 'ORD-001', customer: 'Sarah Johnson', items: 'Custom Ring + Setting', status: 'Processing', total: '$3,500', date: '2024-03-15' },
  { id: 'ORD-002', customer: 'Michael Chen', items: 'Wedding Band Pair', status: 'In-production', total: '$2,800', date: '2024-03-14' },
  { id: 'ORD-003', customer: 'Emma Wilson', items: 'Diamond Necklace', status: 'Completed', total: '$5,200', date: '2024-03-13' },
  { id: 'ORD-004', customer: 'James Brown', items: 'Bracelet + Earrings', status: 'Shipped', total: '$2,100', date: '2024-03-12' },
  { id: 'ORD-005', customer: 'Lisa Anderson', items: 'Custom Pendant', status: 'Pending', total: '$1,800', date: '2024-03-11' },
];

const statCards = [
  { label: 'Total Orders', value: '245', color: '#FFFFFF' },
  { label: 'Pending', value: '12', color: '#D4A84B' },
  { label: 'In Production', value: '8', color: '#6C63FF' },
  { label: 'Revenue', value: '$289K', color: '#D4A84B' },
];

export function Orders() {
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);

  return (
    <div>
      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ color: '#FFFFFF', fontSize: '28px', fontWeight: '700' }}>Orders</h1>
          <p style={{ color: '#888888', fontSize: '14px' }}>View and manage all orders</p>
        </div>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            backgroundColor: '#D4A84B',
            border: 'none',
            borderRadius: '8px',
            color: '#000000',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer',
          }}
        >
          <Plus size={16} />
          New Order
        </button>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {statCards.map((card) => (
          <div
            key={card.label}
            style={{
              backgroundColor: '#1E1E1E',
              borderRadius: '12px',
              border: '1px solid #2A2A2A',
              padding: '24px',
            }}
          >
            <div style={{ color: '#888888', fontSize: '13px', marginBottom: '8px' }}>{card.label}</div>
            <div style={{ color: card.color, fontSize: '32px', fontWeight: '700' }}>{card.value}</div>
          </div>
        ))}
      </div>

      {/* Orders table */}
      <div
        style={{
          backgroundColor: '#1E1E1E',
          borderRadius: '12px',
          border: '1px solid #2A2A2A',
          padding: '24px',
        }}
      >
        <h2 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Recent Orders</h2>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['ORDER ID', 'CUSTOMER', 'ITEMS', 'STATUS', 'TOTAL', 'DATE', 'ACTION'].map((h) => (
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
              {orders.map((order) => (
                <tr key={order.id}>
                  <td style={{ padding: '0 16px', height: '60px', color: '#D4A84B', fontSize: '14px', fontWeight: '600', borderBottom: '1px solid #2A2A2A' }}>
                    {order.id}
                  </td>
                  <td style={{ padding: '0 16px', height: '60px', color: '#FFFFFF', fontSize: '14px', borderBottom: '1px solid #2A2A2A' }}>
                    {order.customer}
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
                  <td style={{ padding: '0 16px', height: '60px', borderBottom: '1px solid #2A2A2A' }}>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      style={{
                        background: 'rgba(212,168,75,0.1)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#D4A84B',
                      }}
                    >
                      <Eye size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedOrder && (
        <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </div>
  );
}
