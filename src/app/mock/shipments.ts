export interface Shipment {
  id: string;
  order: string;
  customer: string;
  tracking: string;
  status: string;
  delivery: string;
  color: string;
}

export const shipmentStatuses = ['Ready', 'Pending Pickup', 'In-transit', 'Out for Delivery', 'Delivered', 'Delayed'];

export const shipments: Shipment[] = [
  { id: 'SHIP-001', order: 'ORD-001', customer: 'Sarah Johnson', tracking: 'TRK98231', status: 'In-transit', delivery: 'Oct 24, 2026', color: '#6C63FF' },
  { id: 'SHIP-002', order: 'ORD-005', customer: 'Lisa Anderson', tracking: 'TRK21904', status: 'Delivered', delivery: 'Oct 20, 2026', color: '#22C55E' },
  { id: 'SHIP-003', order: 'ORD-012', customer: 'Charlotte Thompson', tracking: 'TRK55120', status: 'Ready', delivery: 'Oct 26, 2026', color: '#F97316' },
  { id: 'SHIP-004', order: 'ORD-015', customer: 'Alexander Clark', tracking: 'TRK88231', status: 'In-transit', delivery: 'Oct 25, 2026', color: '#3B82F6' },
  { id: 'SHIP-005', order: 'ORD-002', customer: 'Michael Chen', tracking: 'TRK10042', status: 'Ready', delivery: 'Oct 28, 2026', color: '#D4A84B' },
  { id: 'SHIP-006', order: 'ORD-003', customer: 'Emma Wilson', tracking: 'TRK44310', status: 'Delivered', delivery: 'Oct 18, 2026', color: '#EC4899' },
  { id: 'SHIP-007', order: 'ORD-006', customer: 'Olivia Taylor', tracking: 'TRK73491', status: 'Pending Pickup', delivery: 'Oct 30, 2026', color: '#14B8A6' },
  { id: 'SHIP-008', order: 'ORD-007', customer: 'Noah Davis', tracking: 'TRK66420', status: 'Delayed', delivery: 'Nov 02, 2026', color: '#EF4444' },
  { id: 'SHIP-009', order: 'ORD-008', customer: 'Ava Martinez', tracking: 'TRK59124', status: 'Out for Delivery', delivery: 'Oct 23, 2026', color: '#8B5CF6' },
  { id: 'SHIP-010', order: 'ORD-010', customer: 'Mia Harris', tracking: 'TRK81009', status: 'In-transit', delivery: 'Oct 29, 2026', color: '#06B6D4' },
  { id: 'SHIP-011', order: 'ORD-011', customer: 'Lucas Martin', tracking: 'TRK33882', status: 'Ready', delivery: 'Nov 01, 2026', color: '#84CC16' },
  { id: 'SHIP-012', order: 'ORD-014', customer: 'Amelia Robinson', tracking: 'TRK22678', status: 'Pending Pickup', delivery: 'Nov 04, 2026', color: '#64748B' },
];
