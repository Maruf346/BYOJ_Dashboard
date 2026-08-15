export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  spent: string;
  joined: string;
  color: string;
}

export const customers: Customer[] = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah@email.com', phone: '+1 555-001', orders: 3, spent: '$11,500', joined: 'Jan 2024', color: '#D4A84B' },
  { id: '2', name: 'Michael Chen', email: 'michael@email.com', phone: '+1 555-002', orders: 2, spent: '$7,800', joined: 'Feb 2024', color: '#6C63FF' },
  { id: '3', name: 'Emma Wilson', email: 'emma@email.com', phone: '+1 555-003', orders: 5, spent: '$18,200', joined: 'Dec 2023', color: '#22C55E' },
  { id: '4', name: 'James Brown', email: 'james@email.com', phone: '+1 555-004', orders: 1, spent: '$2,100', joined: 'Mar 2024', color: '#3B82F6' },
  { id: '5', name: 'Lisa Anderson', email: 'lisa@email.com', phone: '+1 555-005', orders: 4, spent: '$9,400', joined: 'Nov 2023', color: '#F97316' },
  { id: '6', name: 'Oliver Twist', email: 'oliver@email.com', phone: '+1 555-006', orders: 1, spent: '$1,200', joined: 'Apr 2024', color: '#EC4899' },
  { id: '7', name: 'Isabella Swan', email: 'isabella@email.com', phone: '+1 555-007', orders: 8, spent: '$25,000', joined: 'May 2023', color: '#14B8A6' },
  { id: '8', name: 'Lucas Scott', email: 'lucas@email.com', phone: '+1 555-008', orders: 2, spent: '$3,500', joined: 'Jun 2024', color: '#8B5CF6' },
  { id: '9', name: 'Emily White', email: 'emily@email.com', phone: '+1 555-009', orders: 3, spent: '$10,000', joined: 'Jul 2024', color: '#D4A84B' },
  { id: '10', name: 'Daniel Black', email: 'daniel@email.com', phone: '+1 555-010', orders: 4, spent: '$12,000', joined: 'Aug 2024', color: '#6C63FF' },
];
