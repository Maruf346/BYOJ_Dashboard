import { useState } from 'react';
import { Eye, Plus, Search, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { ShippingDetailModal } from './ShippingDetailModal';
import { NewShipmentModal } from './NewShipmentModal';
import { shipments } from '../mock/shipments';

const statCards = [
  { label: 'Total Shipments', value: '1,284', sub: '+12% this month', subColor: '#22C55E' },
  { label: 'In-Transit', value: '42', sub: 'Currently on the road', subColor: '#888888' },
  { label: 'Delivered Today', value: '18', sub: 'All items on schedule', subColor: '#22C55E' },
  { label: 'Pending Pickups', value: '7', sub: 'Ready for courier', subColor: '#888888' },
];

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

const itemsPerPage = 5;

export function Shipping() {
  const [selectedShipment, setSelectedShipment] = useState<typeof shipments[0] | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredShipments = shipments.filter((ship) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;

    return [
      ship.id,
      ship.order,
      ship.customer,
      ship.tracking,
      ship.status,
    ].some((value) => value.toLowerCase().includes(query));
  });

  const totalPages = Math.max(1, Math.ceil(filteredShipments.length / itemsPerPage));
  const pageStart = (currentPage - 1) * itemsPerPage;
  const paginatedShipments = filteredShipments.slice(pageStart, pageStart + itemsPerPage);
  const visibleStart = filteredShipments.length === 0 ? 0 : pageStart + 1;
  const visibleEnd = Math.min(pageStart + itemsPerPage, filteredShipments.length);

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  return (
    <div>
      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ color: '#FFFFFF', fontSize: '28px', fontWeight: '700', marginBottom: '4px' }}>Shipping</h1>
          <p style={{ color: '#888888', fontSize: '14px' }}>Track and manage your jewelry shipments worldwide.</p>
        </div>
        <button
          onClick={() => setIsNewModalOpen(true)}
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
          New Shipment
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
            <div style={{ color: '#FFFFFF', fontSize: '28px', fontWeight: '700', marginBottom: '6px' }}>{card.value}</div>
            <div style={{ color: card.subColor, fontSize: '12px' }}>{card.sub}</div>
          </div>
        ))}
      </div>

      {/* Shipments table */}
      <div
        style={{
          backgroundColor: '#1E1E1E',
          borderRadius: '12px',
          border: '1px solid #2A2A2A',
          padding: '24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
          <h2 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '600' }}>Active Shipments</h2>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#1A1A1A',
                border: '1px solid #2A2A2A',
                borderRadius: '8px',
                padding: '9px 12px',
                width: '260px',
              }}
            >
              <Search size={15} color="#888888" />
              <input
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search shipments..."
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
            {/* <button
              style={{
                padding: '9px 16px',
                backgroundColor: 'transparent',
                border: '1px solid #2A2A2A',
                borderRadius: '8px',
                color: '#FFFFFF',
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <SlidersHorizontal size={14} /> Filters
            </button> */}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['SHIPMENT ID', 'ORDER', 'CUSTOMER', 'TRACKING', 'STATUS', 'EST. DELIVERY', 'ACTION'].map((h) => (
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
              {paginatedShipments.map((ship) => (
                <tr key={ship.id}>
                  <td style={{ padding: '0 16px', height: '60px', color: '#D4A84B', fontSize: '14px', fontWeight: '600', borderBottom: '1px solid #2A2A2A' }}>
                    {ship.id}
                  </td>
                  <td style={{ padding: '0 16px', height: '60px', color: '#CCCCCC', fontSize: '14px', borderBottom: '1px solid #2A2A2A' }}>
                    {ship.order}
                  </td>
                  <td style={{ padding: '0 16px', height: '60px', borderBottom: '1px solid #2A2A2A' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: ship.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFFFFF',
                          fontSize: '11px',
                          fontWeight: '700',
                          flexShrink: 0,
                        }}
                      >
                        {getInitials(ship.customer)}
                      </div>
                      <span style={{ color: '#FFFFFF', fontSize: '14px' }}>{ship.customer}</span>
                    </div>
                  </td>
                  <td style={{ padding: '0 16px', height: '60px', color: '#888888', fontSize: '14px', borderBottom: '1px solid #2A2A2A' }}>
                    {ship.tracking}
                  </td>
                  <td style={{ padding: '0 16px', height: '60px', borderBottom: '1px solid #2A2A2A' }}>
                    <StatusBadge status={ship.status} />
                  </td>
                  <td style={{ padding: '0 16px', height: '60px', color: '#888888', fontSize: '14px', borderBottom: '1px solid #2A2A2A' }}>
                    {ship.delivery}
                  </td>
                  <td style={{ padding: '0 16px', height: '60px', borderBottom: '1px solid #2A2A2A' }}>
                    <button
                      onClick={() => setSelectedShipment(ship)}
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
              {paginatedShipments.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ height: '72px', color: '#888888', fontSize: '14px', textAlign: 'center', borderBottom: '1px solid #2A2A2A' }}>
                    No shipments found
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
            <span style={{ color: '#FFFFFF' }}>{filteredShipments.length}</span> active shipments
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

      {selectedShipment && (
        <ShippingDetailModal shipment={selectedShipment} onClose={() => setSelectedShipment(null)} />
      )}
      {isNewModalOpen && (
        <NewShipmentModal onClose={() => setIsNewModalOpen(false)} />
      )}
    </div>
  );
}
