import { useState } from 'react';
import { Eye, Search } from 'lucide-react';
import { CustomerDetailModal } from './CustomerDetailModal';
import type { ActivePage } from './Sidebar';

const customers = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah@email.com', phone: '+1 555-001', orders: 3, spent: '$11,500', joined: 'Jan 2024', color: '#D4A84B' },
  { id: '2', name: 'Michael Chen', email: 'michael@email.com', phone: '+1 555-002', orders: 2, spent: '$7,800', joined: 'Feb 2024', color: '#6C63FF' },
  { id: '3', name: 'Emma Wilson', email: 'emma@email.com', phone: '+1 555-003', orders: 5, spent: '$18,200', joined: 'Dec 2023', color: '#22C55E' },
  { id: '4', name: 'James Brown', email: 'james@email.com', phone: '+1 555-004', orders: 1, spent: '$2,100', joined: 'Mar 2024', color: '#3B82F6' },
  { id: '5', name: 'Lisa Anderson', email: 'lisa@email.com', phone: '+1 555-005', orders: 4, spent: '$9,400', joined: 'Nov 2023', color: '#F97316' },
];

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

interface CustomersProps {
  onNavigate?: (page: ActivePage) => void;
}

export function Customers({ onNavigate }: CustomersProps) {
  const [selectedCustomer, setSelectedCustomer] = useState<typeof customers[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ color: '#FFFFFF', fontSize: '28px', fontWeight: '700', marginBottom: '4px' }}>Customers</h1>
          <p style={{ color: '#888888', fontSize: '14px' }}>Manage and view all your customers</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#1E1E1E',
              border: '1px solid #2A2A2A',
              borderRadius: '8px',
              padding: '8px 14px',
            }}
          >
            <Search size={14} color="#888888" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search customers..."
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#FFFFFF',
                fontSize: '14px',
                width: '180px',
              }}
            />
          </div>
          <button
            style={{
              padding: '8px 16px',
              backgroundColor: 'transparent',
              border: '1px solid #2A2A2A',
              borderRadius: '8px',
              color: '#FFFFFF',
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            Export
          </button>
        </div>
      </div>

      {/* Customers table */}
      <div
        style={{
          backgroundColor: '#1E1E1E',
          borderRadius: '12px',
          border: '1px solid #2A2A2A',
          padding: '24px',
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['CUSTOMER', 'EMAIL', 'PHONE', 'TOTAL ORDERS', 'SPENT', 'JOINED', 'ACTION'].map((h) => (
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
              {filtered.map((customer) => (
                <tr key={customer.id}>
                  <td style={{ padding: '0 16px', height: '60px', borderBottom: '1px solid #2A2A2A' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          backgroundColor: customer.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFFFFF',
                          fontSize: '12px',
                          fontWeight: '700',
                          flexShrink: 0,
                        }}
                      >
                        {getInitials(customer.name)}
                      </div>
                      <span style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '600' }}>{customer.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '0 16px', height: '60px', color: '#CCCCCC', fontSize: '14px', borderBottom: '1px solid #2A2A2A' }}>
                    {customer.email}
                  </td>
                  <td style={{ padding: '0 16px', height: '60px', color: '#CCCCCC', fontSize: '14px', borderBottom: '1px solid #2A2A2A' }}>
                    {customer.phone}
                  </td>
                  <td style={{ padding: '0 16px', height: '60px', color: '#CCCCCC', fontSize: '14px', borderBottom: '1px solid #2A2A2A' }}>
                    {customer.orders} {customer.orders === 1 ? 'order' : 'orders'}
                  </td>
                  <td style={{ padding: '0 16px', height: '60px', color: '#FFFFFF', fontSize: '14px', fontWeight: '600', borderBottom: '1px solid #2A2A2A' }}>
                    {customer.spent}
                  </td>
                  <td style={{ padding: '0 16px', height: '60px', color: '#888888', fontSize: '14px', borderBottom: '1px solid #2A2A2A' }}>
                    {customer.joined}
                  </td>
                  <td style={{ padding: '0 16px', height: '60px', borderBottom: '1px solid #2A2A2A' }}>
                    <button
                      onClick={() => setSelectedCustomer(customer)}
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

      {selectedCustomer && (
        <CustomerDetailModal
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          onChat={() => onNavigate?.('chats')}
        />
      )}
    </div>
  );
}
