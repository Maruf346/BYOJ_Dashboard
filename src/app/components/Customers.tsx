import { useState } from 'react';
import { Eye, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { CustomerDetailModal } from './CustomerDetailModal';
import type { ActivePage } from './Sidebar';
import { customers } from '../mock/customers';

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

interface CustomersProps {
  onNavigate?: (page: ActivePage) => void;
}

const itemsPerPage = 8;

export function Customers({ onNavigate }: CustomersProps) {
  const [selectedCustomer, setSelectedCustomer] = useState<typeof customers[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const pageStart = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = filtered.slice(pageStart, pageStart + itemsPerPage);
  const visibleStart = filtered.length === 0 ? 0 : pageStart + 1;
  const visibleEnd = Math.min(pageStart + itemsPerPage, filtered.length);

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

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
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
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
              {paginatedCustomers.map((customer) => (
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
              {paginatedCustomers.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ height: '72px', color: '#888888', fontSize: '14px', textAlign: 'center', borderBottom: '1px solid #2A2A2A' }}>
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '20px',
            paddingTop: '16px',
            borderTop: '1px solid #2A2A2A',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <span style={{ color: '#888888', fontSize: '13px' }}>
            Showing <span style={{ color: '#FFFFFF' }}>{visibleStart}</span> to{' '}
            <span style={{ color: '#FFFFFF' }}>{visibleEnd}</span> of{' '}
            <span style={{ color: '#FFFFFF' }}>{filtered.length}</span> customers
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                border: '1px solid #2A2A2A',
                backgroundColor: currentPage === 1 ? '#181818' : 'transparent',
                color: currentPage === 1 ? '#555555' : '#888888',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((p) => (
              <button
                key={p}
                onClick={() => goToPage(p)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  border: currentPage === p ? 'none' : '1px solid #2A2A2A',
                  backgroundColor: currentPage === p ? '#D4A84B' : 'transparent',
                  color: currentPage === p ? '#000000' : '#888888',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: currentPage === p ? '700' : '400',
                }}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                border: '1px solid #2A2A2A',
                backgroundColor: currentPage === totalPages ? '#181818' : 'transparent',
                color: currentPage === totalPages ? '#555555' : '#888888',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ChevronRight size={14} />
            </button>
          </div>
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
