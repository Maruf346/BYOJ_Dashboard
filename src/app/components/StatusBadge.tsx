type StatusType =
  | 'Pending'
  | 'In Progress'
  | 'In-progress'
  | 'In-production'
  | 'Processing'
  | 'Completed'
  | 'Shipped'
  | 'In-Transit'
  | 'In-transit'
  | 'Delivered'
  | 'Ready';

const statusConfig: Record<string, { bg: string; color: string; label: string }> = {
  Pending: { bg: 'rgba(212,168,75,0.15)', color: '#D4A84B', label: 'Pending' },
  'In Progress': { bg: 'rgba(108,99,255,0.15)', color: '#6C63FF', label: 'In-progress' },
  'In-progress': { bg: 'rgba(108,99,255,0.15)', color: '#6C63FF', label: 'In-progress' },
  'In-production': { bg: 'rgba(108,99,255,0.15)', color: '#6C63FF', label: 'In-production' },
  Processing: { bg: 'rgba(59,130,246,0.15)', color: '#3B82F6', label: 'Processing' },
  Completed: { bg: 'rgba(34,197,94,0.15)', color: '#22C55E', label: 'Completed' },
  Shipped: { bg: 'rgba(249,115,22,0.15)', color: '#F97316', label: 'Shipped' },
  'In-Transit': { bg: 'rgba(59,130,246,0.15)', color: '#3B82F6', label: 'In-transit' },
  'In-transit': { bg: 'rgba(59,130,246,0.15)', color: '#3B82F6', label: 'In-transit' },
  Delivered: { bg: 'rgba(34,197,94,0.15)', color: '#22C55E', label: 'Delivered' },
  Ready: { bg: 'rgba(249,115,22,0.15)', color: '#F97316', label: 'Ready' },
};

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] || { bg: 'rgba(136,136,136,0.15)', color: '#888888', label: status };
  return (
    <span
      style={{
        backgroundColor: config.bg,
        color: config.color,
        borderRadius: '20px',
        padding: '4px 12px',
        fontSize: '12px',
        fontWeight: '600',
        display: 'inline-block',
        whiteSpace: 'nowrap',
      }}
    >
      {config.label}
    </span>
  );
}
