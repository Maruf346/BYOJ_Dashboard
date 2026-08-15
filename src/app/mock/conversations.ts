export interface ChatMessage {
  id: number;
  type: 'incoming' | 'outgoing';
  text: string;
  time: string;
}

export interface Conversation {
  id: string;
  name: string;
  preview: string;
  time: string;
  unread: number;
  active: boolean;
  color: string;
  messages: ChatMessage[];
}

export const conversations: Conversation[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    preview: 'Can you add more diamonds t...',
    time: '2 min ago',
    unread: 3,
    active: true,
    color: '#D4A84B',
    messages: [
      { id: 1, type: 'incoming', text: 'Hi! I wanted to ask about my ring design', time: '10:30 AM' },
      { id: 2, type: 'outgoing', text: 'Of course! What would you like to change?', time: '10:32 AM' },
      { id: 3, type: 'incoming', text: 'Can you add more diamonds to the ring?', time: '10:35 AM' },
      { id: 4, type: 'incoming', text: 'Also make it a bit smaller', time: '10:35 AM' },
    ],
  },
  {
    id: '2',
    name: 'Michael Chen',
    preview: 'Perfect! I love the design',
    time: '1 hour ago',
    unread: 0,
    active: false,
    color: '#6C63FF',
    messages: [
      { id: 1, type: 'incoming', text: 'How is my order coming along?', time: '9:00 AM' },
      { id: 2, type: 'outgoing', text: 'Great progress! The design is almost ready.', time: '9:15 AM' },
      { id: 3, type: 'incoming', text: 'Perfect! I love the design', time: '9:20 AM' },
    ],
  },
  {
    id: '3',
    name: 'Emma Wilson',
    preview: 'When can I expect delivery?',
    time: '3 hours ago',
    unread: 1,
    active: false,
    color: '#22C55E',
    messages: [
      { id: 1, type: 'outgoing', text: 'Your order has been shipped!', time: '8:00 AM' },
      { id: 2, type: 'incoming', text: 'When can I expect delivery?', time: '8:30 AM' },
    ],
  },
  {
    id: '4',
    name: 'James Brown',
    preview: 'Thanks for the update',
    time: '1 day ago',
    unread: 0,
    active: false,
    color: '#3B82F6',
    messages: [
      { id: 1, type: 'outgoing', text: 'Your bracelet and earrings have been shipped.', time: 'Yesterday' },
      { id: 2, type: 'incoming', text: 'Thanks for the update', time: 'Yesterday' },
    ],
  },
  {
    id: '5',
    name: 'Olivia Taylor',
    preview: 'Can I see the CAD preview?',
    time: '2 days ago',
    unread: 2,
    active: false,
    color: '#EC4899',
    messages: [
      { id: 1, type: 'incoming', text: 'Can I see the CAD preview?', time: 'Monday' },
      { id: 2, type: 'outgoing', text: 'Absolutely, I will send the current preview shortly.', time: 'Monday' },
    ],
  },
  {
    id: '6',
    name: 'Noah Davis',
    preview: 'The budget range works for me',
    time: '2 days ago',
    unread: 0,
    active: false,
    color: '#F97316',
    messages: [
      { id: 1, type: 'outgoing', text: 'The estimate is between $2,800 and $3,200.', time: 'Monday' },
      { id: 2, type: 'incoming', text: 'The budget range works for me', time: 'Monday' },
    ],
  },
  {
    id: '7',
    name: 'Ava Martinez',
    preview: 'Could we use rose gold?',
    time: '3 days ago',
    unread: 1,
    active: false,
    color: '#14B8A6',
    messages: [
      { id: 1, type: 'incoming', text: 'Could we use rose gold?', time: 'Sunday' },
    ],
  },
  {
    id: '8',
    name: 'William Thomas',
    preview: 'Please engrave the initials',
    time: '4 days ago',
    unread: 0,
    active: false,
    color: '#8B5CF6',
    messages: [
      { id: 1, type: 'incoming', text: 'Please engrave the initials W.T. inside the band.', time: 'Saturday' },
      { id: 2, type: 'outgoing', text: 'Noted. We will include that in the production brief.', time: 'Saturday' },
    ],
  },
  {
    id: '9',
    name: 'Mia Harris',
    preview: 'I uploaded new references',
    time: '5 days ago',
    unread: 0,
    active: false,
    color: '#06B6D4',
    messages: [
      { id: 1, type: 'incoming', text: 'I uploaded new references for the pendant.', time: 'Friday' },
    ],
  },
  {
    id: '10',
    name: 'Lucas Martin',
    preview: 'That timeline is perfect',
    time: '6 days ago',
    unread: 0,
    active: false,
    color: '#84CC16',
    messages: [
      { id: 1, type: 'outgoing', text: 'We can complete the custom chain in three weeks.', time: 'Thursday' },
      { id: 2, type: 'incoming', text: 'That timeline is perfect', time: 'Thursday' },
    ],
  },
  {
    id: '11',
    name: 'Charlotte Thompson',
    preview: 'Can we make the band thinner?',
    time: '1 week ago',
    unread: 0,
    active: false,
    color: '#EF4444',
    messages: [
      { id: 1, type: 'incoming', text: 'Can we make the band thinner?', time: 'Last week' },
      { id: 2, type: 'outgoing', text: 'Yes, we can reduce the band width and keep the stone secure.', time: 'Last week' },
    ],
  },
  {
    id: '12',
    name: 'Henry Garcia',
    preview: 'Thanks, approved from my side',
    time: '1 week ago',
    unread: 0,
    active: false,
    color: '#64748B',
    messages: [
      { id: 1, type: 'outgoing', text: 'Here is the final brooch design for approval.', time: 'Last week' },
      { id: 2, type: 'incoming', text: 'Thanks, approved from my side', time: 'Last week' },
    ],
  },
];
