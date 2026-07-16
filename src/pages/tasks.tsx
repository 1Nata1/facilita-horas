import {
  ArrowLeft,
  Plus,
  CheckCircle,
  Clock,
  Pencil,
  Trash2,
  Target,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import type { InsertActivity } from "@shared/schema";
import { ActivityGroup, GROUPS } from "@/mocks/activityCategories";

type ActivityTask = InsertActivity & {
  id: string;
  group: ActivityGroup;
  time?: string;
  eventDate?: string;
};

const initialTasks: ActivityTask[] = [
  {
    id: "1",
    group: "group1",
    title: "Participação em palestras, seminários e eventos sociais",
    category: "Participação em palestras, seminários e eventos sociais",
    description: "Palestra sobre inovação tecnológica",
    quantity: "4",
    points: "2",
    maxPoints: "10",
    unit: "evento",
    activityDate: new Date("2024-01-14"),
    time: "14:00",
    certificate: "palestra.pdf",
    status: "registered",
  },
  {
    id: "2",
    group: "group2",
    title: "Doação de sangue",
    category: "Doação de sangue",
    description: "Doação realizada no hemocentro",
    quantity: "1",
    points: "5",
    maxPoints: "20",
    unit: "doação",
    activityDate: new Date("2024-01-20"),
    time: "13:00",
    certificate: "doacao.pdf",
    status: "registered",
  },
  {
    id: "3",
    group: "group3",
    title: "Curso de fundamento técnico, científico ou de gestão",
    category: "Curso de fundamento técnico, científico ou de gestão",
    description: "Curso de fundamentos de React",
    quantity: "6",
    points: "3",
    maxPoints: "20",
    unit: "hora",
    activityDate: new Date("2024-01-25"),
    time: "19:00",
    certificate: "react.pdf",
    status: "registered",
  },
];

const groupColors = {
  group1: { bg: "bg-blue-50 dark:bg-blue-950/30", text: "text-blue-600 dark:text-blue-400", border: "border-blue-200 dark:border-blue-800", dot: "bg-blue-500" },
  group2: { bg: "bg-emerald-50 dark:bg-emerald-950/30", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-200 dark:border-emerald-800", dot: "bg-emerald-500" },
  group3: { bg: "bg-purple-50 dark:bg-purple-950/30", text: "text-purple-600 dark:text-purple-400", border: "border-purple-200 dark:border-purple-800", dot: "bg-purple-500" },
};

export default function Tasks() {
  const [, setLocation] = useLocation();
  const [tasks, setTasks] = useState<ActivityTask[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<ActivityGroup>("group1");

  useEffect(() => {
    const savedTasks = JSON.parse(
      localStorage.getItem("facilita-tasks") || "[]"
    );
    if (savedTasks.length === 0) {
      localStorage.setItem("facilita-tasks", JSON.stringify(initialTasks));
      setTasks(initialTasks);
    } else {
      setTasks(savedTasks);
    }
  }, []);

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem(
      "facilita-tasks",
      JSON.stringify(updatedTasks.filter((task) => !["1", "2", "3"].includes(task.id)))
    );
  };

  const filteredTasks = tasks.filter((task) => task.group === selectedGroup);
  const totalActivities = filteredTasks.length;
  const totalPoints = filteredTasks.reduce((sum, t) => sum + Number(t.points), 0);
  const progressPercentage =
    GROUPS[selectedGroup].minPoints > 0
      ? Math.min((totalPoints / GROUPS[selectedGroup].minPoints) * 100, 100)
      : 0;

  const colors = groupColors[selectedGroup];

  return (
    <main className="px-4 py-6 pb-20 max-w-5xl mx-auto space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={() => setLocation("/")} className="mr-1">
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-bold">Minhas Atividades</h1>
        </div>

        <Button size="sm" onClick={() => setLocation("/new-task")}
          className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-600/20">
          <Plus size={16} className="mr-1" />
          Adicionar
        </Button>
      </div>

      {/* Grupos de Atividades */}
      <div className="grid grid-cols-3 gap-2">
        {(["group1", "group2", "group3"] as const).map((g) => {
          const c = groupColors[g];
          return (
            <Button
              key={g}
              variant={selectedGroup === g ? "default" : "secondary"}
              onClick={() => setSelectedGroup(g)}
              className={`rounded-xl text-sm font-medium h-auto py-2.5 ${
                selectedGroup === g
                  ? `${c.bg} ${c.text} border-2 ${c.border}`
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-xs font-bold">GRUPO</span>
                <span className="text-lg font-black">{g.replace("group", "")}</span>
              </div>
            </Button>
          );
        })}
      </div>

      {/* Mini Dashboard */}
      <Card className={`border-0 shadow-sm overflow-hidden ${colors.bg}`}>
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-base">{GROUPS[selectedGroup].title}</h3>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors.bg} ${colors.text}`}>
              {totalPoints}/{GROUPS[selectedGroup].minPoints} pts mín
            </span>
          </div>

          <div className="w-full bg-white/60 dark:bg-white/10 rounded-full h-3 overflow-hidden shadow-inner">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${colors.dot}`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>{progressPercentage.toFixed(0)}% do mínimo exigido</span>
            {totalPoints >= GROUPS[selectedGroup].minPoints && (
              <span className="text-green-600 dark:text-green-400 font-semibold">✓ Mínimo atingido</span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="text-center bg-white/50 dark:bg-white/5 rounded-xl py-3">
              <CheckCircle className={`mx-auto mb-1 ${colors.text}`} size={20} />
              <p className="text-lg font-bold">{totalActivities}</p>
              <p className="text-[11px] text-muted-foreground">Atividades</p>
            </div>
            <div className="text-center bg-white/50 dark:bg-white/5 rounded-xl py-3">
              <Target className="mx-auto mb-1 text-orange-500" size={20} />
              <p className="text-lg font-bold">{progressPercentage.toFixed(0)}%</p>
              <p className="text-[11px] text-muted-foreground">Meta</p>
            </div>
            <div className="text-center bg-white/50 dark:bg-white/5 rounded-xl py-3">
              <Award className={`mx-auto mb-1 ${colors.text}`} size={20} />
              <p className="text-lg font-bold">{totalPoints}</p>
              <p className="text-[11px] text-muted-foreground">Pontos</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Atividades */}
      <div className="space-y-3">
        {filteredTasks.map((task, idx) => (
          <Card key={task.id} className="border-0 shadow-sm hover:shadow-md transition-all duration-200 animate-slide-up" style={{ animationDelay: `${idx * 50}ms` }}>
            <CardContent className="p-4">
              <div className="flex justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm leading-snug">{task.title}</h3>

                  {task.description && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {task.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Award size={12} />
                      {task.points} pontos
                    </span>
                    {task.quantity && (
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {task.quantity} {task.unit}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <CalendarIcon size={12} />
                      {new Date(task.eventDate || task.activityDate).toLocaleDateString("pt-BR")}
                      {task.time && ` às ${task.time}`}
                    </span>
                  </div>

                  {task.certificate && (
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 flex items-center gap-1">
                      📎 {task.certificate}
                    </p>
                  )}

                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setLocation(`/edit-task/${task.id}`)}
                      className="rounded-lg h-8 text-xs border-gray-200 dark:border-gray-700"
                    >
                      <Pencil size={12} className="mr-1" />
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteTask(task.id)}
                      className="rounded-lg h-8 text-xs border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50"
                    >
                      <Trash2 size={12} className="mr-1" />
                      Excluir
                    </Button>
                  </div>
                </div>

                <Badge variant="secondary" className={`h-fit whitespace-nowrap rounded-lg text-xs font-bold ${colors.bg} ${colors.text} border-0`}>
                  {task.points}/{task.maxPoints} pts
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Estado vazio */}
      {filteredTasks.length === 0 && (
        <div className="text-center py-16">
          <Target className="mx-auto text-muted-foreground mb-4 opacity-50" size={48} />
          <p className="text-muted-foreground font-medium">Nenhuma atividade cadastrada</p>
          <p className="text-sm text-muted-foreground mt-1">Adicione atividades para acompanhar seu progresso.</p>
          <Button className="mt-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600" onClick={() => setLocation("/new-task")}>
            <Plus size={16} className="mr-1" />
            Adicionar atividade
          </Button>
        </div>
      )}
    </main>
  );
}

function CalendarIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  );
}
