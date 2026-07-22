import React, { useMemo, useState } from 'react';
import {
  Bell,
  CheckCheck,
  Trash2,
  ShoppingCart,
  MessageSquare,
  Star,
  ShieldCheck,
  Clock,
  Sparkles
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Mock notifications data
const mockNotifications = [
  {
    id: '1',
    type: 'order',
    title: 'New Order #1234',
    description: 'Rahim Uddin bought Organic Vegetables for ৳850',
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    isRead: false
  },
  {
    id: '2',
    type: 'order',
    title: 'Low Stock Alert',
    description: 'Fresh Mangoes have only 12 kg left',
    timestamp: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
    isRead: false
  },
  {
    id: '3',
    type: 'review',
    title: 'New Review',
    description: 'A customer left 5-star review for Premium Rice',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    isRead: true
  }
];

export const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.isRead).length;
  }, [notifications]);

  // Icon selector based on type
  const getNotificationIcon = (type: string) => {
    if (type === 'order') return ShoppingCart;
    if (type === 'message') return MessageSquare;
    if (type === 'review') return Star;
    return ShieldCheck;
  };

  const handleMarkRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, isRead: true } : n));
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to delete all in-app notifications?")) {
      setNotifications([]);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">Notifications</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            Audit store events, live checkout warnings, and backend monitoring logs.
          </p>
        </div>

        {notifications.length > 0 && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleMarkAllRead}>
              <CheckCheck className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
            <Button variant="destructive" size="sm" onClick={handleClearAll}>
              <Trash2 className="w-4 h-4 mr-2" />
              Wipe Log
            </Button>
          </div>
        )}
      </div>

      {/* 2. Content */}
      {notifications.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center text-center p-12 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm gap-4">
          <div className="p-4 bg-zinc-100 dark:bg-zinc-900 rounded-2xl text-zinc-400 animate-pulse">
            <Bell className="w-8 h-8" />
          </div>
          <div className="max-w-xs">
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">All caught up!</h3>
            <p className="text-xs text-zinc-500 mt-1">There are no unread system alarms, review postings, or transaction alerts logged.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3.5">
          {notifications.map((n, idx) => {
            const Icon = getNotificationIcon(n.type);
            return (
              <div
                key={n.id}
                className={`p-4 rounded-2xl border flex items-start justify-between gap-4 transition-all bg-white dark:bg-zinc-950 ${
                  !n.isRead
                    ? 'border-green-100 dark:border-primary/40 shadow-sm shadow-green-50/10 dark:shadow-none'
                    : 'border-zinc-200 dark:border-zinc-800'
                }`}
              >
                <div className="flex gap-4 items-start flex-1 min-w-0">
                  <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                    n.type === 'order' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400' :
                    n.type === 'message' ? 'bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-400' :
                    n.type === 'review' ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400' :
                    'bg-zinc-50 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-zinc-900 dark:text-zinc-50 block leading-tight">
                        {n.title}
                      </span>
                      {!n.isRead && (
                        <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full shrink-0" />
                      )}
                    </div>

                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-normal font-medium">
                      {n.description}
                    </p>

                    <span className="text-[10px] text-zinc-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      {new Date(n.timestamp).toLocaleDateString()} at {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>

                {!n.isRead && (
                  <button
                    onClick={() => handleMarkRead(n.id)}
                    className="p-1 px-2 text-[10px] font-bold bg-green-50 hover:bg-green-100 text-green-600 dark:bg-green-950/30 dark:hover:bg-green-900/40 dark:text-green-400 rounded-lg shrink-0 transition-colors cursor-pointer"
                  >
                    Mark Read
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
