export interface Meeting {
  id: string;
  date: string;
  time: string;
  client: string;
  type: string;
  confirmed: boolean;
}

export const meetings: Meeting[] = [
  {
    id: 'MT-1001',
    date: 'Mar 15',
    time: '10:00 AM - 11:00 AM',
    client: 'Sarah Johnson',
    type: 'Design Consultation',
    confirmed: true,
  },
  {
    id: 'MT-1002',
    date: 'Mar 16',
    time: '2:00 PM - 3:00 PM',
    client: 'Michael Chen',
    type: 'Order Review',
    confirmed: false,
  },
  {
    id: 'MT-1003',
    date: 'Mar 18',
    time: '11:00 AM - 12:00 PM',
    client: 'Emma Wilson',
    type: 'Initial Consultation',
    confirmed: true,
  },
  {
    id: 'MT-1004',
    date: 'Mar 20',
    time: '3:30 PM - 4:30 PM',
    client: 'James Brown',
    type: 'Final Approval',
    confirmed: true,
  },
  {
    id: 'MT-1005',
    date: 'Mar 22',
    time: '9:30 AM - 10:15 AM',
    client: 'Olivia Taylor',
    type: 'CAD Review',
    confirmed: false,
  },
  {
    id: 'MT-1006',
    date: 'Mar 24',
    time: '1:00 PM - 2:00 PM',
    client: 'Noah Davis',
    type: 'Budget Discussion',
    confirmed: true,
  },
  {
    id: 'MT-1007',
    date: 'Mar 26',
    time: '4:00 PM - 4:45 PM',
    client: 'Ava Martinez',
    type: 'Material Selection',
    confirmed: false,
  },
  {
    id: 'MT-1008',
    date: 'Mar 28',
    time: '12:30 PM - 1:15 PM',
    client: 'William Thomas',
    type: 'Production Update',
    confirmed: true,
  },
  {
    id: 'MT-1009',
    date: 'Mar 29',
    time: '4:00 PM - 4:45 PM',
    client: 'Ava Martinez',
    type: 'Material Selection',
    confirmed: false,
  },
  {
    id: 'MT-1010',
    date: 'Mar 30',
    time: '12:30 PM - 1:15 PM',
    client: 'William Thomas',
    type: 'Production Update',
    confirmed: true,
  },
];
