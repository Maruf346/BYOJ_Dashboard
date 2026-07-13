import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { ActivePage } from './Sidebar';

const meetings = [
  {
    id: '1',
    date: 'Mar 15',
    time: '10:00 AM – 11:00 AM',
    client: 'Sarah Johnson',
    type: 'Design Consultation',
    confirmed: true,
  },
  {
    id: '2',
    date: 'Mar 16',
    time: '2:00 PM – 3:00 PM',
    client: 'Michael Chen',
    type: 'Order Review',
    confirmed: false,
  },
  {
    id: '3',
    date: 'Mar 18',
    time: '11:00 AM – 12:00 PM',
    client: 'Emma Wilson',
    type: 'Initial Consultation',
    confirmed: true,
  },
  {
    id: '4',
    date: 'Mar 20',
    time: '3:30 PM – 4:30 PM',
    client: 'James Brown',
    type: 'Final Approval',
    confirmed: true,
  },
];

interface MeetingScheduleProps {
  onNavigate: (page: ActivePage) => void;
}

interface ScheduleModalProps {
  onClose: () => void;
  onSave: (meeting: { date: string; time: string; client: string; type: string }) => void;
}

function ScheduleMeetingModal({ onClose, onSave }: ScheduleModalProps) {
  const [form, setForm] = useState({ date: '', time: '', client: '', type: 'Design Consultation' });

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
          width: '460px',
          padding: '28px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <span style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '700' }}>Schedule Meeting</span>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: '1px solid #2A2A2A', borderRadius: '8px', cursor: 'pointer', color: '#888888', display: 'flex', padding: '6px' }}
          >
            <X size={16} />
          </button>
        </div>
        <div style={{ borderBottom: '1px solid #2A2A2A', marginBottom: '20px' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { label: 'Client Name', key: 'client', placeholder: 'Enter client name' },
            { label: 'Date', key: 'date', placeholder: 'e.g. Mar 25' },
            { label: 'Time', key: 'time', placeholder: 'e.g. 2:00 PM – 3:00 PM' },
          ].map((field) => (
            <div key={field.key}>
              <label style={{ display: 'block', color: '#888888', fontSize: '12px', marginBottom: '6px' }}>
                {field.label}
              </label>
              <input
                value={form[field.key as keyof typeof form]}
                onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                placeholder={field.placeholder}
                style={{
                  width: '100%',
                  backgroundColor: '#1A1A1A',
                  border: '1px solid #2A2A2A',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          ))}
          <div>
            <label style={{ display: 'block', color: '#888888', fontSize: '12px', marginBottom: '6px' }}>
              Meeting Type
            </label>
            <select
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
              style={{
                width: '100%',
                backgroundColor: '#1A1A1A',
                border: '1px solid #2A2A2A',
                borderRadius: '8px',
                padding: '10px 14px',
                color: '#FFFFFF',
                fontSize: '14px',
                outline: 'none',
              }}
            >
              {['Design Consultation', 'Order Review', 'Initial Consultation', 'Final Approval'].map((t) => (
                <option key={t} value={t} style={{ backgroundColor: '#1A1A1A' }}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <button
            onClick={onClose}
            style={{
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
            Cancel
          </button>
          <button
            onClick={() => { onSave(form); onClose(); }}
            style={{
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
            Schedule
          </button>
        </div>
      </div>
    </div>
  );
}

export function MeetingSchedule({ onNavigate }: MeetingScheduleProps) {
  const [meetingList, setMeetingList] = useState(meetings);
  const [showModal, setShowModal] = useState(false);

  const handleSave = (data: { date: string; time: string; client: string; type: string }) => {
    if (!data.client) return;
    setMeetingList((prev) => [
      ...prev,
      { id: String(prev.length + 1), ...data, confirmed: false },
    ]);
  };

  return (
    <div>
      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ color: '#FFFFFF', fontSize: '28px', fontWeight: '700', marginBottom: '4px' }}>
            Meeting Schedule
          </h1>
          <p style={{ color: '#888888', fontSize: '14px' }}>All your upcoming client meetings</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
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
          Schedule Meeting
        </button>
      </div>

      {/* Meeting cards */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {meetingList.map((meeting) => (
          <div
            key={meeting.id}
            onClick={() => onNavigate('chats')}
            style={{
              backgroundColor: '#1E1E1E',
              borderRadius: '12px',
              border: '1px solid #2A2A2A',
              padding: '20px',
              minWidth: '260px',
              flex: '1',
              maxWidth: '340px',
              cursor: 'pointer',
              transition: 'border-color 0.15s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = '#D4A84B';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = '#2A2A2A';
            }}
          >
            {/* Date chip */}
            <div
              style={{
                display: 'inline-flex',
                padding: '4px 12px',
                backgroundColor: 'rgba(212,168,75,0.15)',
                borderRadius: '20px',
                color: '#D4A84B',
                fontSize: '13px',
                fontWeight: '600',
                marginBottom: '12px',
              }}
            >
              {meeting.date}
            </div>

            <div style={{ color: '#FFFFFF', fontSize: '14px', marginBottom: '4px' }}>{meeting.time}</div>
            <div style={{ color: '#FFFFFF', fontSize: '15px', fontWeight: '700', marginBottom: '4px' }}>
              {meeting.client}
            </div>
            <div style={{ color: '#888888', fontSize: '13px', marginBottom: '12px' }}>{meeting.type}</div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: meeting.confirmed ? '#22C55E' : '#D4A84B',
                }}
              />
              <span style={{ color: '#888888', fontSize: '12px' }}>
                {meeting.confirmed ? 'Confirmed' : 'Pending'}
              </span>
            </div>

            <div style={{ color: '#555555', fontSize: '12px', marginTop: '12px' }}>
              Click to view in inbox →
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <ScheduleMeetingModal onClose={() => setShowModal(false)} onSave={handleSave} />
      )}
    </div>
  );
}
