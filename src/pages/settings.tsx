import { ArrowLeft, Bell, Moon, Globe, Shield, HelpCircle, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useLocation } from 'wouter';
import { useState, useEffect } from 'react';

interface SettingItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  type: 'toggle' | 'action';
  value?: boolean;
}

const settingIcons: Record<string, string> = {
  notifications: '🔔',
  darkMode: '🌙',
  language: '🌐',
  privacy: '🛡️',
  help: '❓',
};

export default function Settings() {
  const [, setLocation] = useLocation();
  const [settings, setSettings] = useState<Record<string, boolean>>({
    notifications: true,
    darkMode: false,
    autoUpdate: true,
    analytics: false
  });

  // Sync dark mode from App
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setSettings(prev => ({ ...prev, darkMode: isDark }));
  }, []);

  const settingsItems: SettingItem[] = [
    {
      id: 'notifications',
      title: 'Notificações',
      description: 'Receber notificações push',
      icon: Bell,
      type: 'toggle',
      value: settings.notifications
    },
    {
      id: 'darkMode',
      title: 'Modo escuro',
      description: 'Usar tema escuro',
      icon: Moon,
      type: 'toggle',
      value: settings.darkMode
    },
    {
      id: 'language',
      title: 'Idioma',
      description: 'Português (Brasil)',
      icon: Globe,
      type: 'action'
    },
    {
      id: 'privacy',
      title: 'Privacidade',
      description: 'Configurações de privacidade',
      icon: Shield,
      type: 'action'
    },
    {
      id: 'help',
      title: 'Ajuda e suporte',
      description: 'Central de ajuda',
      icon: HelpCircle,
      type: 'action'
    }
  ];

  const toggleSetting = (settingId: string) => {
    if (settingId === 'darkMode') {
      // Toggle via the class and dispatch event
      const isDark = !document.documentElement.classList.contains('dark');
      document.documentElement.classList.toggle('dark', isDark);
      localStorage.setItem('facilita-dark-mode', String(isDark));
      setSettings(prev => ({ ...prev, darkMode: isDark }));
      return;
    }
    setSettings(prev => ({
      ...prev,
      [settingId]: !prev[settingId]
    }));
  };

  return (
    <main className="px-4 py-6 pb-20 animate-fade-in">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLocation('/')}
          data-testid="button-back"
          className="mr-1"
        >
          <ArrowLeft size={20} />
        </Button>
        <h2 className="text-xl font-bold">Configurações</h2>
      </div>

      <div className="space-y-3">
        {settingsItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Card
              key={item.id}
              className="border-0 shadow-sm card-hover"
              data-testid={`card-setting-${item.id}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-11 h-11 bg-accent rounded-xl flex items-center justify-center shrink-0">
                      <IconComponent className="text-accent-foreground" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{item.title}</h3>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  {item.type === 'toggle' ? (
                    <Switch
                      checked={item.value || false}
                      onCheckedChange={() => toggleSetting(item.id)}
                      data-testid={`switch-${item.id}`}
                    />
                  ) : (
                    <div className="text-muted-foreground">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground text-center">
          Facilita Horas v1.0.0
        </p>
      </div>
    </main>
  );
}
