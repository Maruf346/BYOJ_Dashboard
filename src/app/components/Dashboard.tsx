import { useState } from 'react';
import { Eye } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { StatusBadge } from './StatusBadge';
import { OrderDetailModal } from './OrderDetailModal';
import type { ActivePage } from './Sidebar';

const revenueData = [
  { name: '0', revenue: 8000 },
  { name: '1', revenue: 22000 },
  { name: '2', revenue: 14000 },
  { name: '3', revenue: 33000 },
  { name: '4', revenue: 18000 },
  { name: '5', revenue: 38000 },
];

const recentActivity = [
  { text: 'New order received', time: '2 hours ago' },
  { text: 'Design request from Emma Wilson', time: '4 hours ago' },
  { text: 'Quote sent to John Smith', time: '1 day ago' },
  { text: 'Material shipment received', time: '2 days ago' },
];

const orders = [
  { id: 'ORD-001', customer: 'Sarah Johnson', items: 'Custom Ring + Setting', status: 'Processing', total: '$3,500', date: '2024-03-15' },
  { id: 'ORD-002', customer: 'Michael Chen', items: 'Wedding Band Pair', status: 'In-production', total: '$2,800', date: '2024-03-14' },
  { id: 'ORD-003', customer: 'Emma Wilson', items: 'Diamond Necklace', status: 'Completed', total: '$5,200', date: '2024-03-13' },
  { id: 'ORD-004', customer: 'James Brown', items: 'Bracelet + Earrings', status: 'Shipped', total: '$2,100', date: '2024-03-12' },
  { id: 'ORD-005', customer: 'Lisa Anderson', items: 'Custom Pendant', status: 'Pending', total: '$1,800', date: '2024-03-11' },
];

interface DashboardProps {
  onNavigate: (page: ActivePage) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);

  return (
    <div>
      {/* Page header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ color: '#FFFFFF', fontSize: '28px', fontWeight: '700', marginBottom: '4px' }}>
          Welcome back
        </h1>
        <p style={{ color: '#888888', fontSize: '14px' }}>Here's your business overview</p>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total Orders', value: '124', emoji: '📦' },
          { label: 'Design Requests', value: '23', emoji: '✏️' },
          { label: 'Active Customers', value: '18', emoji: '👥' },
        ].map((card) => (
          <div
            key={card.label}
            style={{
              backgroundColor: '#1E1E1E',
              borderRadius: '12px',
              border: '1px solid #2A2A2A',
              padding: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: '#888888', fontSize: '13px' }}>{card.label}</span>
              <span style={{ fontSize: '24px' }}>{card.emoji}</span>
            </div>
            <div style={{ color: '#FFFFFF', fontSize: '32px', fontWeight: '700' }}>{card.value}</div>
          </div>
        ))}
      </div>

      {/* Middle row: Chart + Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '65fr 35fr', gap: '16px', marginBottom: '24px' }}>
        {/* Revenue Trend */}
        <div
          style={{
            backgroundColor: '#1E1E1E',
            borderRadius: '12px',
            border: '1px solid #2A2A2A',
            padding: '24px',
          }}
        >
          <h2 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4A84B" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#D4A84B" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
              <XAxis dataKey="name" stroke="#555555" tick={{ fill: '#888888', fontSize: 12 }} />
              <YAxis
                stroke="#555555"
                tick={{ fill: '#888888', fontSize: 12 }}
                tickFormatter={(v) => `${v / 1000}k`}
                domain={[0, 40000]}
                ticks={[0, 10000, 20000, 30000, 40000]}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#252525', border: '1px solid #2A2A2A', borderRadius: '8px' }}
                labelStyle={{ color: '#888888' }}
                itemStyle={{ color: '#D4A84B' }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
              />
              <Legend
                wrapperStyle={{ color: '#888888', fontSize: '13px' }}
                formatter={() => 'revenue'}
                iconType="square"
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#D4A84B"
                strokeWidth={2}
                fill="url(#revenueGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div
          style={{
            backgroundColor: '#1E1E1E',
            borderRadius: '12px',
            border: '1px solid #2A2A2A',
            padding: '24px',
          }}
        >
          <h2 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>Recent Activity</h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {recentActivity.map((item, i) => (
              <div key={i}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0' }}>
                  <div style={{ flex: 1, paddingRight: '12px' }}>
                    <div style={{ color: '#FFFFFF', fontSize: '14px', marginBottom: '2px' }}>{item.text}</div>
                    <div style={{ color: '#888888', fontSize: '12px' }}>{item.time}</div>
                  </div>
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#D4A84B',
                      flexShrink: 0,
                    }}
                  />
                </div>
                {i < recentActivity.length - 1 && (
                  <div style={{ height: '1px', backgroundColor: '#2A2A2A' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div
        style={{
          backgroundColor: '#1E1E1E',
          borderRadius: '12px',
          border: '1px solid #2A2A2A',
          padding: '24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '600' }}>Recent Orders</h2>
          <button
            onClick={() => onNavigate('orders')}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#D4A84B',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            View All
          </button>
        </div>

        {/* Table */}
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
