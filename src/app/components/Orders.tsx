import { useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, Search } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { OrderDetailModal } from './OrderDetailModal';
import { orders } from '../mock/orders';

const statCards = [
  { label: 'Total Orders', value: '245', color: '#FFFFFF' },
  { label: 'Pending', value: '12', color: '#D4A84B' },
  { label: 'In Production', value: '8', color: '#6C63FF' },
  { label: 'Revenue', value: '$289K', color: '#D4A84B' },
];

const ordersPerPage = 5;

export function Orders() {
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredOrders = orders.filter((order) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;

    return [
      order.id,
      order.customer,
      order.items,
      order.status,
      order.total,
      order.date,
    ].some((value) => value.toLowerCase().includes(query));
  });
  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / ordersPerPage));
  const pageStart = (currentPage - 1) * ordersPerPage;
  const paginatedOrders = filteredOrders.slice(pageStart, pageStart + ordersPerPage);
  const visibleStart = filteredOrders.length === 0 ? 0 : pageStart + 1;
  const visibleEnd = Math.min(pageStart + ordersPerPage, filteredOrders.length);

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  return (
    <div>
      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ color: '#FFFFFF', fontSize: '28px', fontWeight: '700' }}>Orders</h1>
          <p style={{ color: '#888888', fontSize: '14px' }}>View and manage all orders</p>
        </div>
        {/* <button
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
        </button> */}
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <h2 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '600', margin: 0 }}>Recent Orders</h2>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#1A1A1A',
              border: '1px solid #2A2A2A',
              borderRadius: '8px',
              padding: '9px 12px',
              width: 'min(100%, 320px)',
            }}
          >
            <Search size={15} color="#888888" />
            <input
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search orders..."
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
              {paginatedOrders.map((order) => (
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
              {paginatedOrders.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ height: '72px', color: '#888888', fontSize: '14px', textAlign: 'center', borderBottom: '1px solid #2A2A2A' }}>
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ color: '#888888', fontSize: '13px' }}>
            Showing <span style={{ color: '#FFFFFF' }}>{visibleStart}</span> to{' '}
            <span style={{ color: '#FFFFFF' }}>{visibleEnd}</span> of{' '}
            <span style={{ color: '#FFFFFF' }}>{filteredOrders.length}</span> orders
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous orders page"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                border: '1px solid #2A2A2A',
                backgroundColor: currentPage === 1 ? '#181818' : '#1E1E1E',
                color: currentPage === 1 ? '#555555' : '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              }}
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => {
              const isActive = page === currentPage;
              return (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  aria-current={isActive ? 'page' : undefined}
                  style={{
                    minWidth: '36px',
                    height: '36px',
                    padding: '0 12px',
                    borderRadius: '8px',
                    border: isActive ? 'none' : '1px solid #2A2A2A',
                    backgroundColor: isActive ? '#D4A84B' : '#1E1E1E',
                    color: isActive ? '#000000' : '#888888',
                    fontSize: '14px',
                    fontWeight: isActive ? '700' : '500',
                    cursor: 'pointer',
                  }}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next orders page"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                border: '1px solid #2A2A2A',
                backgroundColor: currentPage === totalPages ? '#181818' : '#1E1E1E',
                color: currentPage === totalPages ? '#555555' : '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {selectedOrder && (
        <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </div>
  );
}
