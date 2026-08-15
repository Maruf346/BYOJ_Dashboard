export interface Order {
  id: string;
  customer: string;
  items: string;
  status: string;
  total: string;
  date: string;
}

export const orders: Order[] = [
  { id: 'ORD-001', customer: 'Sarah Johnson', items: 'Custom Ring + Setting', status: 'Processing', total: '$3,500', date: '2024-03-15' },
  { id: 'ORD-002', customer: 'Michael Chen', items: 'Wedding Band Pair', status: 'In-production', total: '$2,800', date: '2024-03-14' },
  { id: 'ORD-003', customer: 'Emma Wilson', items: 'Diamond Necklace', status: 'Completed', total: '$5,200', date: '2024-03-13' },
  { id: 'ORD-004', customer: 'James Brown', items: 'Bracelet + Earrings', status: 'Shipped', total: '$2,100', date: '2024-03-12' },
  { id: 'ORD-005', customer: 'Lisa Anderson', items: 'Custom Pendant', status: 'Pending', total: '$1,800', date: '2024-03-11' },
  { id: 'ORD-006', customer: 'Olivia Taylor', items: 'Pearl Drop Earrings', status: 'Processing', total: '$1,250', date: '2024-03-10' },
  { id: 'ORD-007', customer: 'Noah Davis', items: 'Ruby Statement Ring', status: 'In-production', total: '$4,400', date: '2024-03-09' },
  { id: 'ORD-008', customer: 'Ava Martinez', items: 'Rose Gold Bracelet', status: 'Pending', total: '$1,950', date: '2024-03-08' },
  { id: 'ORD-009', customer: 'William Thomas', items: 'Gold Signet Ring', status: 'Completed', total: '$2,350', date: '2024-03-07' },
  { id: 'ORD-010', customer: 'Mia Harris', items: 'Emerald Pendant', status: 'Shipped', total: '$3,100', date: '2024-03-06' },
  { id: 'ORD-011', customer: 'Lucas Martin', items: 'Layered Name Necklace', status: 'Processing', total: '$980', date: '2024-03-05' },
  { id: 'ORD-012', customer: 'Charlotte Thompson', items: 'Oval Diamond Ring', status: 'Pending', total: '$6,850', date: '2024-03-04' },
  { id: 'ORD-013', customer: 'Henry Garcia', items: 'Custom Brooch', status: 'In-production', total: '$1,700', date: '2024-03-03' },
  { id: 'ORD-014', customer: 'Amelia Robinson', items: 'Vintage Locket', status: 'Completed', total: '$1,450', date: '2024-03-02' },
  { id: 'ORD-015', customer: 'Alexander Clark', items: 'Platinum Cufflinks', status: 'Shipped', total: '$2,600', date: '2024-03-01' },
];
