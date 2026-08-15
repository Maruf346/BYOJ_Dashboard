export interface DesignRequest {
  id: string;
  title: string;
  customer: string;
  timeAgo: string;
  status: 'Pending' | 'In-progress' | 'Completed';
}

export const designRequests: DesignRequest[] = [
  { id: 'DR-1001', title: 'Custom Ring', customer: 'Sarah Johnson', timeAgo: '2 hours ago', status: 'Pending' },
  { id: 'DR-1002', title: 'Custom Necklace', customer: 'Michael Chen', timeAgo: '5 hours ago', status: 'In-progress' },
  { id: 'DR-1003', title: 'Diamond Tennis Bracelet', customer: 'Emma Wilson', timeAgo: '8 hours ago', status: 'Pending' },
  { id: 'DR-1004', title: 'Emerald Pendant', customer: 'James Brown', timeAgo: '1 day ago', status: 'Completed' },
  { id: 'DR-1005', title: 'Wedding Band Pair', customer: 'Ava Martinez', timeAgo: '1 day ago', status: 'In-progress' },
  { id: 'DR-1006', title: 'Ruby Statement Ring', customer: 'Noah Davis', timeAgo: '2 days ago', status: 'Pending' },
  { id: 'DR-1007', title: 'Pearl Drop Earrings', customer: 'Olivia Taylor', timeAgo: '2 days ago', status: 'Completed' },
  { id: 'DR-1008', title: 'Sapphire Halo Ring', customer: 'Liam Anderson', timeAgo: '3 days ago', status: 'In-progress' },
  { id: 'DR-1009', title: 'Custom Charm Bracelet', customer: 'Sophia Moore', timeAgo: '3 days ago', status: 'Pending' },
  { id: 'DR-1010', title: 'Gold Signet Ring', customer: 'William Thomas', timeAgo: '4 days ago', status: 'Completed' },
  { id: 'DR-1011', title: 'Art Deco Necklace', customer: 'Isabella Jackson', timeAgo: '4 days ago', status: 'Pending' },
  { id: 'DR-1012', title: 'Minimal Gold Hoops', customer: 'Benjamin White', timeAgo: '5 days ago', status: 'In-progress' },
  { id: 'DR-1013', title: 'Morganite Engagement Ring', customer: 'Mia Harris', timeAgo: '5 days ago', status: 'Completed' },
  { id: 'DR-1014', title: 'Layered Name Necklace', customer: 'Lucas Martin', timeAgo: '6 days ago', status: 'Pending' },
  { id: 'DR-1015', title: 'Oval Diamond Ring', customer: 'Charlotte Thompson', timeAgo: '6 days ago', status: 'In-progress' },
  { id: 'DR-1016', title: 'Custom Brooch', customer: 'Henry Garcia', timeAgo: '1 week ago', status: 'Pending' },
  { id: 'DR-1017', title: 'Vintage Locket', customer: 'Amelia Robinson', timeAgo: '1 week ago', status: 'Completed' },
  { id: 'DR-1018', title: 'Platinum Cufflinks', customer: 'Alexander Clark', timeAgo: '1 week ago', status: 'In-progress' },
  { id: 'DR-1019', title: 'Opal Cocktail Ring', customer: 'Harper Rodriguez', timeAgo: '8 days ago', status: 'Pending' },
  { id: 'DR-1020', title: 'Custom Anklet', customer: 'Daniel Lewis', timeAgo: '9 days ago', status: 'Completed' },
  { id: 'DR-1021', title: 'Rose Gold Stack Rings', customer: 'Evelyn Lee', timeAgo: '10 days ago', status: 'Pending' },
  { id: 'DR-1022', title: 'Princess Cut Ring', customer: 'Matthew Walker', timeAgo: '11 days ago', status: 'In-progress' },
  { id: 'DR-1023', title: 'Engraved Bar Necklace', customer: 'Abigail Hall', timeAgo: '12 days ago', status: 'Completed' },
  { id: 'DR-1024', title: 'Custom Nose Pin', customer: 'Samuel Allen', timeAgo: '13 days ago', status: 'Pending' },
];
