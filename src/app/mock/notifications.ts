export type NotificationType = 'subscription' | 'welcome' | 'user' | 'payment' | 'system';

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  notification_type: NotificationType;
  is_read: boolean;
  created_at: string;
}

export const mockNotifications: AppNotification[] = [
  {
    id: '1',
    title: 'New User Registered',
    body: 'John Doe has just joined the platform.',
    notification_type: 'user',
    is_read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
  },
  {
    id: '2',
    title: 'Payment Received',
    body: 'Payment of $450 received from Jane Smith for Order #4021.',
    notification_type: 'payment',
    is_read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: '3',
    title: 'System Update',
    body: 'The dashboard will undergo maintenance at 2 AM EST.',
    notification_type: 'system',
    is_read: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    id: '4',
    title: 'New Subscription',
    body: 'Acme Corp upgraded to the Premium plan.',
    notification_type: 'subscription',
    is_read: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
  },
];
