import { ArrowLeft, Bell, Check, X, Settings, Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLocation } from 'wouter';
import { useState } from 'react';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

const initialNotifications: Notification[] = [
  {
    id: '1',
    title: 'Bem-vindo ao Facilita Horas!',
    message: 'Explore todos os recursos disponíveis para gerenciar suas horas complementares.',
    time: '2h atrás',
    read: false,
    type: 'info'
  },
  {
    id: '2',
    title: 'App instalado com sucesso',
    message: 'Agora você pode acessar o app da sua tela inicial.',
    time: '1d atrás',
    read: true,
    type: 'success'
  },
  {
    id: '3',
    title: 'Nova atualização disponível',
    message: 'Versão 1.1.0 com melhorias de performance.',
    time: '3d atrás',
    read: false,
    type: 'info'
  }
];

const typeIcons: Record<string, { icon: any; bg: string }> = {
  info: { icon: Info, bg: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' },
  success: { icon: CheckCircle, bg: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400' },
  warning: { icon: AlertTriangle, bg: 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400' },
  error: { icon: XCircle, bg: 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400' },
};

export default function Notifications() {
  const [, setLocation] = useLocation();
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const markAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, read: true }
        : notification
    ));
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(notifications.filter(notification => notification.id !== notificationId));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <main className="px-4 py-6 pb-20 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setLocation('/')}
            data-testid="button-back"
            className="mr-1"
          >
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h2 className="text-xl font-bold">Notificações</h2>
            {unreadCount > 0 && (
              <p className="text-xs text-muted-foreground mt-0.5">{unreadCount} não lida{unreadCount > 1 ? 's' : ''}</p>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          {unreadCount > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={markAllAsRead}
              data-testid="button-mark-all-read"
              className="rounded-lg text-xs border-gray-200 dark:border-gray-700"
            >
              <Check size={14} className="mr-1" />
              Marcar todas
            </Button>
          )}
          <Button variant="outline" size="sm" data-testid="button-notification-settings"
            className="rounded-lg border-gray-200 dark:border-gray-700">
            <Settings size={14} />
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => {
          const typeInfo = typeIcons[notification.type] || typeIcons.info;
          const TypeIcon = typeInfo.icon;

          return (
            <Card 
              key={notification.id} 
              className={`border-0 shadow-sm transition-all duration-200 ${
                !notification.read 
                  ? 'ring-1 ring-primary/20 bg-gradient-to-r from-primary/[0.02] to-transparent' 
                  : 'opacity-80'
              }`}
              data-testid={`card-notification-${notification.id}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1 min-w-0">
                    <div className={`w-9 h-9 rounded-xl ${typeInfo.bg} flex items-center justify-center shrink-0`}>
                      <TypeIcon size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-medium text-sm">{notification.title}</h3>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full shrink-0"></div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-1.5 line-clamp-2">{notification.message}</p>
                      <p className="text-[11px] text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                  <div className="flex space-x-1 ml-2 shrink-0">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                        data-testid={`button-read-${notification.id}`}
                        className="h-8 w-8 p-0 rounded-lg"
                      >
                        <Check size={14} />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteNotification(notification.id)}
                      data-testid={`button-delete-${notification.id}`}
                      className="h-8 w-8 p-0 rounded-lg text-muted-foreground hover:text-destructive"
                    >
                      <X size={14} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-16">
          <Bell className="mx-auto text-muted-foreground mb-4 opacity-50" size={48} />
          <p className="text-muted-foreground font-medium">Nenhuma notificação</p>
          <p className="text-sm text-muted-foreground mt-1">Você está em dia com todas as notificações.</p>
        </div>
      )}
    </main>
  );
}
