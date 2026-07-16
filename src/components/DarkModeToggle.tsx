import { Moon, Sun } from "lucide-react";

interface DarkModeToggleProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function DarkModeToggle({ darkMode, toggleDarkMode }: DarkModeToggleProps) {
  return (
    <button
      onClick={toggleDarkMode}
      className="fixed bottom-20 right-4 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg 
        bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200
        hover:shadow-xl transition-all duration-300
        border border-gray-200 dark:border-gray-700
        active:scale-95"
      aria-label={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
      style={{ bottom: "calc(5rem + env(safe-area-inset-bottom))" }}
    >
      {darkMode ? (
        <Sun size={20} className="animate-fade-in" />
      ) : (
        <Moon size={20} className="animate-fade-in" />
      )}
    </button>
  );
}
