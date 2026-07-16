import { Route, useLocation } from "wouter";
import { TooltipProvider } from "./components/ui/tooltip";
import { useEffect, useState } from "react";

// Componentes usados
import PWAHeader from "./components/PWAHeader";
import BottomNavigation from "./components/BottomNavigation";
import OfflineMessage from "./components/OfflineMessage";
import DarkModeToggle from "./components/DarkModeToggle";

// Pages
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Events from "./pages/events";
import Tasks from "./pages/tasks";
import Profile from "./pages/profile";
import Settings from "./pages/profileSettings";
import NewTask from "./pages/newTask";
import EditTask from "./pages/editTask";
import NewEvent from "./pages/newEvent";
import EditEvent from "./pages/editEvent";
import Explore from "./pages/explore";

function Router({ user }: { user: any }) {
  // Rotas públicas
  if (!user) {
    return (
      <>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Login} />
      </>
    );
  }

  // Rotas privadas
  return (
    <>
      <Route path="/" component={Home} />
      <Route path="/events" component={Events} />
      {user.role !== "teacher" && (
        <>
          <Route path="/tasks" component={Tasks} />
          <Route path="/new-task" component={NewTask} />
          <Route path="/edit-task/:id" component={EditTask} />
        </>
      )}
      <Route path="/profile" component={Profile} />
      <Route path="/profileSettings" component={Settings} />
      <Route path="/new-event" component={NewEvent} />
      <Route path="/edit-event/:id" component={EditEvent} />
      <Route path="/explore" component={Explore} />
    </>
  );
}

export default function App() {
  const [location, setLocation] = useLocation();
  const [user, setUser] = useState<any>(null);

  // Gerenciamento do tema escuro
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("facilita-dark-mode");
    if (saved !== null) return saved === "true";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("facilita-dark-mode", String(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // Recupera usuário salvo
  useEffect(() => {
    const savedUser = localStorage.getItem("facilita-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const isAuthPage = location === "/login" || location === "/signup";

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        {/* Header apenas quando logado */}
        {user && !isAuthPage && <PWAHeader />}

        <OfflineMessage />

        <Router user={user} />

        {/* Botão flutuante de modo escuro */}
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        {/* Navegação inferior apenas quando logado */}
        {user && !isAuthPage && <BottomNavigation onNavigate={setLocation} />}
      </div>
    </TooltipProvider>
  );
}
