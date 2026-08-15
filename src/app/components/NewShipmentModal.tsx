import { useState, useMemo } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { orders } from '../mock/orders';
import { shipmentStatuses } from '../mock/shipments';

interface NewShipmentModalProps {
  onClose: () => void;
}

export function NewShipmentModal({ onClose }: NewShipmentModalProps) {
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [status, setStatus] = useState(shipmentStatuses[0]);
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 4)); // May 2026 as default for mock

  const customerName = useMemo(() => {
    const order = orders.find(o => o.id === selectedOrderId);
    return order ? order.customer : '';
  }, [selectedOrderId]);

  // Calendar logic
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateSelect = (day: number) => {
    setDeliveryDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
    setIsCalendarOpen(false);
  };

  const isSelectedDate = (day: number) => {
    if (!deliveryDate) return false;
    return deliveryDate.getDate() === day &&
           deliveryDate.getMonth() === currentMonth.getMonth() &&
           deliveryDate.getFullYear() === currentMonth.getFullYear();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Normally you would save the shipment here
    onClose();
  };

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
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '28px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <span style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '700' }}>New Shipment</span>
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

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Order Input */}
          <div>
            <label style={{ display: 'block', color: '#888888', fontSize: '13px', marginBottom: '6px' }}>Order</label>
            <select
              value={selectedOrderId}
              onChange={(e) => setSelectedOrderId(e.target.value)}
              required
              style={{
                width: '100%',
                backgroundColor: '#111111',
                border: '1px solid #2A2A2A',
                borderRadius: '8px',
                color: '#FFFFFF',
                padding: '10px 12px',
                fontSize: '14px',
                outline: 'none',
              }}
            >
              <option value="" disabled>Select an Order</option>
              {orders.map(order => (
                <option key={order.id} value={order.id}>{order.id} - {order.customer}</option>
              ))}
            </select>
          </div>

          {/* Customer Input */}
          <div>
            <label style={{ display: 'block', color: '#888888', fontSize: '13px', marginBottom: '6px' }}>Customer</label>
            <input
              type="text"
              value={customerName}
              disabled
              placeholder="Auto-filled from Order"
              style={{
                width: '100%',
                backgroundColor: '#111111',
                border: '1px solid #2A2A2A',
                borderRadius: '8px',
                color: '#888888',
                padding: '10px 12px',
                fontSize: '14px',
                outline: 'none',
                cursor: 'not-allowed',
              }}
            />
          </div>

          {/* Status Field */}
          <div>
            <label style={{ display: 'block', color: '#888888', fontSize: '13px', marginBottom: '6px' }}>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
              style={{
                width: '100%',
                backgroundColor: '#111111',
                border: '1px solid #2A2A2A',
                borderRadius: '8px',
                color: '#FFFFFF',
                padding: '10px 12px',
                fontSize: '14px',
                outline: 'none',
              }}
            >
              {shipmentStatuses.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Estimated Delivery (Date field with Calendar) */}
          <div style={{ position: 'relative' }}>
            <label style={{ display: 'block', color: '#888888', fontSize: '13px', marginBottom: '6px' }}>Estimated Delivery</label>
            <div
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              style={{
                width: '100%',
                backgroundColor: '#111111',
                border: '1px solid #2A2A2A',
                borderRadius: '8px',
                color: deliveryDate ? '#FFFFFF' : '#888888',
                padding: '10px 12px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
              }}
            >
              <span>{deliveryDate ? deliveryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Select Date'}</span>
              <CalendarIcon size={16} />
            </div>

            {isCalendarOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  marginTop: '8px',
                  backgroundColor: '#18181B', // Dark calendar bg
                  border: '1px solid #2A2A2A',
                  borderRadius: '12px',
                  padding: '16px',
                  width: '300px',
                  zIndex: 10,
                  boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                }}
              >
                {/* Calendar Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <button type="button" onClick={handlePrevMonth} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChevronLeft size={18} />
                  </button>
                  <div style={{ color: '#D4A84B', fontSize: '15px', fontWeight: '600' }}>
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </div>
                  <button type="button" onClick={handleNextMonth} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChevronRight size={18} />
                  </button>
                </div>

                {/* Calendar Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center' }}>
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} style={{ color: '#D4A84B', fontSize: '12px', fontWeight: '500', marginBottom: '8px' }}>
                      {day}
                    </div>
                  ))}
                  {blanks.map(blank => (
                    <div key={`blank-${blank}`} />
                  ))}
                  {days.map(day => (
                    <div
                      key={day}
                      onClick={() => handleDateSelect(day)}
                      style={{
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontSize: '14px',
                        borderRadius: '50%',
                        backgroundColor: isSelectedDate(day) ? '#D4A84B' : 'transparent',
                        color: isSelectedDate(day) ? '#000000' : '#E4E4E7',
                        fontWeight: isSelectedDate(day) ? '600' : '400',
                      }}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#D4A84B',
              border: 'none',
              borderRadius: '8px',
              color: '#000000',
              fontSize: '15px',
              fontWeight: '700',
              cursor: 'pointer',
              marginTop: '12px',
            }}
          >
            Create Shipment
          </button>
        </form>
      </div>
    </div>
  );
}
