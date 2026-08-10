import React from 'react';
import { BellOff } from 'lucide-react';
import { Notification } from '@/types';
import { NotificationCard } from './NotificationCard';
import { EmptyState } from './EmptyState';

interface NotificationsPanelProps {
  open: boolean;
  notifications: Notification[];
  onClose: () => void;
  onMarkAllRead: () => void;
  onSelect: (n: Notification) => void;
}

export function NotificationsPanel({
  open,
  notifications,
  onClose,
  onMarkAllRead,
  onSelect,
}: NotificationsPanelProps) {
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} aria-hidden="true" />
      <div className="absolute right-0 top-full z-50 mt-2 max-h-[70vh] w-[calc(100vw-2rem)] max-w-sm animate-slide-up overflow-hidden rounded-2xl border border-line bg-white shadow-popover sm:w-96">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <h3 className="text-sm font-semibold text-ink">Notificações</h3>
          <button
            onClick={onMarkAllRead}
            className="text-xs font-medium text-primary-600 hover:text-primary-700"
          >
            Marcar todas como lidas
          </button>
        </div>
        <div className="max-h-[55vh] overflow-y-auto p-2">
          {notifications.length === 0 ? (
            <div className="py-6">
              <EmptyState
                icon={BellOff}
                title="Nenhuma notificação"
                description="Você está em dia! Novas notificações aparecerão aqui."
              />
            </div>
          ) : (
            <div className="space-y-1.5">
              {notifications.map((n) => (
                <NotificationCard key={n.id} notification={n} onClick={onSelect} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
