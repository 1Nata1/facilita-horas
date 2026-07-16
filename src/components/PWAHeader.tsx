import { Smartphone, Moon, Sun } from "lucide-react";
import { useNetworkStatus } from "../hooks/use-network-status";

interface PWAHeaderProps {
  darkMode?: boolean;
  toggleDarkMode?: () => void;
}

export default function PWAHeader({ darkMode, toggleDarkMode }: PWAHeaderProps) {
  const isOnline = useNetworkStatus();

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center shadow-sm">
            <Smartphone className="text-primary-foreground" size={18} />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">Facilita Horas</h1>
            <p className="text-[10px] text-muted-foreground -mt-0.5">Horas Complementares</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Botão modo escuro */}
          {toggleDarkMode && (
            <button
              onClick={toggleDarkMode}
              className="w-8 h-8 rounded-lg flex items-center justify-center
                bg-accent/50 hover:bg-accent text-muted-foreground hover:text-foreground
                transition-all duration-200"
              aria-label={darkMode ? "Modo claro" : "Modo escuro"}
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          )}

          <div
            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold text-white shadow-sm ${
              isOnline ? "bg-gradient-to-r from-emerald-500 to-green-600" : "bg-gradient-to-r from-red-500 to-red-600"
            }`}
            data-testid="network-status"
          >
            <span>{isOnline ? "🟢 Online" : "🔴 Offline"}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
