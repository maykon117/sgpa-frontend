import React from 'react';
import { Info, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Notification } from '@/types';
import { timeAgo } from '@/utils/format';

interface NotificationCardProps {
  notification: Notification;
  onClick?: (n: Notification) => void;
}

const iconByType = {
  info: { Icon: Info, className: 'bg-primary-50 text-primary-600' },
  sucesso: { Icon: CheckCircle2, className: 'bg-emerald-50 text-emerald-600' },
  alerta: { Icon: AlertTriangle, className: 'bg-amber-50 text-amber-600' },
};

export function NotificationCard({ notification, onClick }: NotificationCardProps) {
  const { Icon, className } = iconByType[notification.type];

  return (
    <button
      onClick={() => onClick?.(notification)}
      className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors ${
        notification.read ? 'border-line bg-white' : 'border-primary-100 bg-primary-50/40'
      } hover:border-primary-200`}
    >
      <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${className}`}>
        <Icon size={15} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="truncate text-sm font-semibold text-ink">{notification.title}</span>
          {!notification.read && (
            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-600" aria-hidden="true" />
          )}
        </span>
        <span className="mt-0.5 block text-xs text-ink-soft">{notification.message}</span>
        <span className="mt-1 block text-[11px] text-slate-400">{timeAgo(notification.date)}</span>
      </span>
    </button>
  );
}
