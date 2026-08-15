import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { DesignRequestModal } from './DesignRequestModal';
import type { ActivePage } from './Sidebar';
import { designRequests } from '../mock/designRequests';

const tabs = ['All', 'Pending', 'In Progress', 'Completed'];
const itemsPerPage = 6;

interface DesignRequestsProps {
  onNavigate?: (page: ActivePage) => void;
}

export function DesignRequests({ onNavigate }: DesignRequestsProps) {
  const [activeTab, setActiveTab] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState<typeof designRequests[0] | null>(null);

  const filtered = designRequests.filter((r) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Pending') return r.status === 'Pending';
    if (activeTab === 'In Progress') return r.status === 'In-progress';
    if (activeTab === 'Completed') return r.status === 'Completed';
    return true;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const pageStart = (currentPage - 1) * itemsPerPage;
  const paginatedRequests = filtered.slice(pageStart, pageStart + itemsPerPage);
  const visibleStart = filtered.length === 0 ? 0 : pageStart + 1;
  const visibleEnd = Math.min(pageStart + itemsPerPage, filtered.length);

  const tabCounts = useMemo(() => ({
    All: designRequests.length,
    Pending: designRequests.filter((r) => r.status === 'Pending').length,
    'In Progress': designRequests.filter((r) => r.status === 'In-progress').length,
    Completed: designRequests.filter((r) => r.status === 'Completed').length,
  }), []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  return (
    <div>
      {/* Page header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ color: '#FFFFFF', fontSize: '28px', fontWeight: '700', marginBottom: '4px' }}>
          Design Requests
        </h1>
        <p style={{ color: '#888888', fontSize: '14px' }}>Manage customer design requests</p>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            style={{
              padding: '8px 20px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: activeTab === tab ? '#D4A84B' : 'transparent',
              color: activeTab === tab ? '#000000' : '#888888',
              fontSize: '14px',
              fontWeight: activeTab === tab ? '600' : '400',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {tab} <span style={{ opacity: activeTab === tab ? 0.75 : 0.6 }}>({tabCounts[tab as keyof typeof tabCounts]})</span>
          </button>
        ))}
      </div>

      {/* Request list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {paginatedRequests.map((req) => (
          <div
            key={req.id}
            style={{
              backgroundColor: '#1E1E1E',
              borderRadius: '12px',
              border: '1px solid #2A2A2A',
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            {/* Left: title + customer */}
            <div style={{ flex: 1 }}>
              <div style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                {req.title}
              </div>
              <div style={{ color: '#888888', fontSize: '13px' }}>Customer: {req.customer}</div>
            </div>

            {/* Center: time */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: '120px' }}>
              <Clock size={14} color="#888888" />
              <span style={{ color: '#888888', fontSize: '13px' }}>{req.timeAgo}</span>
            </div>

            {/* Right: status + view button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <StatusBadge status={req.status} />
              <button
                onClick={() => setSelectedRequest(req)}
                style={{
                  padding: '8px 20px',
                  backgroundColor: '#D4A84B',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#000000',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div
        style={{
          marginTop: '20px',
          padding: '16px 0 4px',
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
          <span style={{ color: '#FFFFFF' }}>{filtered.length}</span> requests
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
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
            aria-label="Next page"
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

      {selectedRequest && (
        <DesignRequestModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onStartChat={() => onNavigate?.('chats')}
        />
      )}
    </div>
  );
}
