import { Home, Compass, Bell, User } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  path: string;
}

interface BottomNavigationProps {
  onNavigate: (path: string) => void;
}

export default function BottomNavigation({ onNavigate }: BottomNavigationProps) {
  const [location] = useLocation();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("facilita-user") || "{}";
    setUser(JSON.parse(savedUser));
  }, []);

  const allNavItems: NavItem[] = [
    { id: "home", label: "Início", icon: Home, path: "/" },
    { id: "events", label: "Eventos", icon: Compass, path: "/events" },
    { id: "activities", label: "Atividades", icon: Bell, path: "/tasks" },
    { id: "profile", label: "Perfil", icon: User, path: "/profile" },
  ];

  const navItems = allNavItems.filter(
    (item) => !(user?.role === "teacher" && item.path === "/tasks")
  );

  if (!user) return null;

  return (
    <nav className="bottom-nav fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border px-2 py-1 z-40">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location === item.path;
          const IconComponent = item.icon;

          return (
            <button
              key={item.id}
              className={`flex flex-col items-center py-2 px-4 transition-all duration-200 rounded-xl relative ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => onNavigate(item.path)}
              data-testid={`nav-${item.id}`}
            >
              {isActive && (
                <div className="absolute -top-0.5 w-8 h-1 bg-primary rounded-full" />
              )}
              <IconComponent
                size={22}
                className={`mb-0.5 transition-transform duration-200 ${
                  isActive ? "scale-110" : ""
                }`}
              />
              <span className={`text-[10px] font-medium ${
                isActive ? "font-bold" : ""
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
