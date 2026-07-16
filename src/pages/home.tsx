import { Calendar, BarChart3, HelpCircle, LogOut, TrendingUp, Target, Award } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";

const allMenuItems = [
  {
    id: "events",
    title: "Eventos",
    description: "Encontre eventos para suas horas complementares",
    icon: Calendar,
    path: "/events",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/40",
  },
  {
    id: "activities",
    title: "Minhas Atividades",
    description: "Acompanhe suas atividades cadastradas",
    icon: BarChart3,
    path: "/tasks",
    color: "from-emerald-500 to-green-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/40",
  },
  {
    id: "faq",
    title: "FAQ",
    description: "Tire suas dúvidas sobre horas complementares",
    icon: HelpCircle,
    path: "/explore",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/40",
  },
];

export default function Home() {
  const [, setLocation] = useLocation();

  const [user, setUser] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("facilita-user") || "{}");
    setUser(savedUser);

    const savedTasks = localStorage.getItem("facilita-tasks");
    setTasks(savedTasks ? JSON.parse(savedTasks) : []);
  }, []);

  const totalPoints = tasks.reduce(
    (sum: number, task: any) => sum + Number(task.points || 0),
    0
  );

  const recentTasks = [...tasks].slice(-3).reverse();

  const COURSE_GOAL = 70;
  const progressPercentage = Math.min((totalPoints / COURSE_GOAL) * 100, 100);

  const menuItems = allMenuItems.filter((item) => {
    if (user?.role === "teacher" && item.id === "activities") return false;
    return true;
  });

  return (
    <main className="px-4 py-6 pb-20 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold">
            Olá, {user?.username?.split(" ")[0]} 👋
          </h1>
          <p className="text-muted-foreground mt-0.5 text-sm">
            Bem-vindo ao Facilita Horas
          </p>
        </div>
      </div>

      {/* Resumo Geral */}
      {user?.role !== "teacher" && (
        <Card className="border-0 bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 text-white shadow-xl shadow-blue-600/20 animate-slide-up">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-100 text-sm font-medium">Progresso Geral</p>
                <h2 className="text-3xl font-bold mt-1">{totalPoints} pts</h2>
              </div>
              <div className="text-right">
                <p className="text-blue-100 text-sm">Meta do curso</p>
                <p className="text-xl font-bold mt-1">{COURSE_GOAL} pts</p>
              </div>
            </div>

            <div className="w-full bg-white/20 rounded-full h-3 mt-5 overflow-hidden">
              <div
                className="bg-white h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            <div className="flex justify-between mt-2 text-sm text-blue-100">
              <span>{progressPercentage.toFixed(0)}% concluído</span>
              {totalPoints >= COURSE_GOAL && (
                <span className="font-medium text-white">✓ Meta atingida!</span>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-3 gap-3 animate-fade-in">
        {user?.role !== "teacher" ? (
          <>
            <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/30">
              <CardContent className="p-4 text-center">
                <Award className="mx-auto text-blue-500 dark:text-blue-400 mb-1" size={22} />
                <p className="text-2xl font-bold">{tasks.length}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Atividades</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/40 dark:to-emerald-900/30">
              <CardContent className="p-4 text-center">
                <Target className="mx-auto text-emerald-500 dark:text-emerald-400 mb-1" size={22} />
                <p className="text-2xl font-bold">{totalPoints}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Pontos</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/30">
              <CardContent className="p-4 text-center">
                <TrendingUp className="mx-auto text-purple-500 dark:text-purple-400 mb-1" size={22} />
                <p className="text-2xl font-bold">{progressPercentage.toFixed(0)}%</p>
                <p className="text-xs text-muted-foreground mt-0.5">Progresso</p>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="border-0 shadow-sm col-span-3 bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-950/40 dark:to-orange-900/30">
            <CardContent className="p-5 text-center">
              <p className="text-lg font-semibold">👨‍🏫 Painel do Professor</p>
              <p className="text-sm text-muted-foreground mt-2">
                Acesso às informações e orientações sobre atividades complementares
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Atalhos */}
      <section className="animate-slide-up">
        <h2 className="text-lg font-semibold mb-3">Atalhos</h2>
        <div className={`grid gap-3 ${user?.role === "teacher" ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.id}
                className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-all duration-200 group overflow-hidden"
                onClick={() => setLocation(item.path)}
              >
                <CardContent className="p-0">
                  <div className="flex items-center gap-3 p-4">
                    <div className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className="text-foreground" size={22} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Últimas Atividades */}
      {user?.role !== "teacher" && (
        <section className="animate-fade-in">
          <h2 className="text-lg font-semibold mb-3">Últimas atividades</h2>
          {recentTasks.length > 0 ? (
            <div className="space-y-2">
              {recentTasks.map((task: any) => (
                <Card key={task.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm truncate">{task.title}</p>
                        {task.description && (
                          <p className="text-xs text-muted-foreground truncate mt-0.5">
                            {task.description}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          {task.activityDate ? new Date(task.activityDate).toLocaleDateString("pt-BR") : ""}
                        </p>
                      </div>
                      <div className="text-right ml-3 shrink-0">
                        <div className="bg-primary/10 dark:bg-primary/20 text-primary font-bold text-sm px-3 py-1 rounded-lg">
                          {task.points} pts
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8 text-center text-muted-foreground">
                <BarChart3 className="mx-auto mb-3 opacity-50" size={36} />
                <p className="text-sm">Nenhuma atividade cadastrada ainda.</p>
                <p className="text-xs mt-1">Adicione sua primeira atividade para começar!</p>
              </CardContent>
            </Card>
          )}
        </section>
      )}
    </main>
  );
}
