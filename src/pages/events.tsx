import { mockEvents, Event } from "@/mocks/events";
import {
  ArrowLeft,
  Search,
  Calendar,
  MapPin,
  Plus,
  Pencil,
  Trash2,
  Clock,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";

const statusLabels: Record<Event["status"], string> = {
  ongoing: "Em andamento",
  upcoming: "Próximo",
  completed: "Finalizado",
};

const statusColors: Record<Event["status"], string> = {
  ongoing: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  upcoming: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  completed: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
};

export default function Events() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<any>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<Event["status"] | "">("");
  const [selectedGroup, setSelectedGroup] = useState<0 | 1 | 2 | 3>(0);

  useEffect(() => {
    const savedUser = localStorage.getItem("facilita-user");
    if (savedUser) setUser(JSON.parse(savedUser));

    const savedEvents = JSON.parse(
      localStorage.getItem("facilita-events") || "[]"
    );
    if (savedEvents.length === 0) {
      localStorage.setItem("facilita-events", JSON.stringify(mockEvents));
      setEvents(mockEvents);
    } else {
      setEvents(savedEvents);
    }
  }, []);

  const deleteEvent = (id: string) => {
    const confirmed = window.confirm("Deseja realmente excluir este evento?");
    if (!confirmed) return;
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
    localStorage.setItem("facilita-events", JSON.stringify(updatedEvents));
  };

  const handleParticipate = (event: Event) => {
    if (user?.role !== "student") {
      alert("Apenas alunos podem participar de eventos.");
      return;
    }

    const existingTasks = JSON.parse(
      localStorage.getItem("facilita-tasks") || "[]"
    );
    const alreadyRegistered = existingTasks.some(
      (task: any) =>
        task.category === "Evento" &&
        task.description === `Participação no evento: ${event.title}`
    );

    if (alreadyRegistered) {
      alert("Você já está inscrito neste evento.");
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      group: `group${event.group}`,
      title: "Participação em evento",
      category: "Evento",
      description: `Participação no evento: ${event.title}`,
      points: event.points.toString(),
      maxPoints: event.maxPoints?.toString() || "0",
      unit: event.unit || "",
      activityDate: new Date(),
      eventDate: event.date,
      time: event.time,
      certificate: "",
      status: "registered",
    };

    existingTasks.push(newTask);
    localStorage.setItem("facilita-tasks", JSON.stringify(existingTasks));
    alert("Participação registrada em Atividades!");
  };

  const categories = [...new Set(events.map((event) => event.category))];

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      !searchQuery ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || event.category === selectedCategory;
    const matchesStatus = !selectedStatus || event.status === selectedStatus;
    const matchesGroup = selectedGroup === 0 || event.group === selectedGroup;
    return matchesSearch && matchesCategory && matchesStatus && matchesGroup;
  });

  return (
    <main className="px-4 py-6 pb-20 max-w-5xl mx-auto space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={() => setLocation("/")} className="mr-1">
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-bold">
            {user?.role === "teacher" ? "Gerenciamento de Eventos" : "Eventos"}
          </h1>
        </div>

        {user?.role === "teacher" && (
          <Button size="sm" onClick={() => setLocation("/new-event")} className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-600/20">
            <Plus size={16} className="mr-1" />
            Adicionar
          </Button>
        )}
      </div>

      {/* Busca */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <Input
          placeholder="Buscar eventos..."
          className="pl-10 h-11 rounded-xl border-gray-200 dark:border-gray-700"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        {/* Grupo */}
        <div className="flex gap-1.5">
          {[0, 1, 2, 3].map((g) => (
            <Button
              key={g}
              size="sm"
              variant={selectedGroup === g ? "default" : "secondary"}
              onClick={() => setSelectedGroup(g as typeof selectedGroup)}
              className={`rounded-full text-xs px-3 ${
                selectedGroup === g
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {g === 0 ? "Todos" : `Grupo ${g}`}
            </Button>
          ))}
        </div>

        {/* Categorias */}
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          <Button
            size="sm"
            variant={selectedCategory === "" ? "default" : "secondary"}
            onClick={() => setSelectedCategory("")}
            className={`rounded-full text-xs px-3 whitespace-nowrap ${
              selectedCategory === ""
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Todas
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              size="sm"
              variant={selectedCategory === cat ? "default" : "secondary"}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full text-xs px-3 whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Status */}
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          <Button
            size="sm"
            variant={selectedStatus === "" ? "default" : "secondary"}
            onClick={() => setSelectedStatus("")}
            className={`rounded-full text-xs px-3 whitespace-nowrap ${
              selectedStatus === ""
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Todos Status
          </Button>
          {Object.entries(statusLabels).map(([value, label]) => (
            <Button
              key={value}
              size="sm"
              variant={selectedStatus === value ? "default" : "secondary"}
              onClick={() => setSelectedStatus(value as Event["status"])}
              className={`rounded-full text-xs px-3 whitespace-nowrap ${
                selectedStatus === value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Lista */}
      {filteredEvents.length > 0 ? (
        <div className="space-y-3">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="border-0 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
              <CardContent className="p-0">
                {/* Barra de cor indicativa do status */}
                <div className={`h-1 w-full ${
                  event.status === "ongoing" ? "bg-emerald-500" :
                  event.status === "upcoming" ? "bg-blue-500" : "bg-gray-400"
                }`} />
                
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-start gap-3">
                    <h3 className="font-semibold text-base leading-tight">{event.title}</h3>
                    <Badge className={`shrink-0 text-xs font-medium px-2.5 py-0.5 rounded-full border-0 ${statusColors[event.status]}`}>
                      {statusLabels[event.status]}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {event.description}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} className="shrink-0" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="shrink-0" />
                      <span>{new Date(event.date).toLocaleDateString("pt-BR")} às {event.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="shrink-0" />
                      <span>{event.points} ponto(s) • Limite {event.maxPoints} pts</span>
                    </div>
                  </div>

                  <div className="flex gap-1.5 flex-wrap">
                    <Badge variant="outline" className="text-xs rounded-full border-gray-200 dark:border-gray-700">
                      {event.category}
                    </Badge>
                    <Badge variant="secondary" className="text-xs rounded-full bg-secondary text-secondary-foreground">
                      Grupo {event.group}
                    </Badge>
                  </div>

                  <div className="flex gap-2 pt-1 flex-wrap">
                    {user?.role === "student" && (
                      <Button size="sm" onClick={() => handleParticipate(event)}
                        className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-600/20">
                        <Users size={14} className="mr-1" />
                        Participar
                      </Button>
                    )}
                    {user?.role === "teacher" && (
                      <>
                        <Button size="sm" variant="outline" onClick={() => setLocation(`/edit-event/${event.id}`)}
                          className="rounded-lg border-gray-200 dark:border-gray-700">
                          <Pencil size={14} className="mr-1" />
                          Editar
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => deleteEvent(event.id)}
                          className="rounded-lg border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50">
                          <Trash2 size={14} className="mr-1" />
                          Excluir
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Calendar className="mx-auto text-muted-foreground mb-4 opacity-50" size={48} />
          <p className="text-muted-foreground font-medium">Nenhum evento disponível</p>
          <p className="text-sm text-muted-foreground mt-1">Tente ajustar os filtros ou criar um novo evento.</p>
        </div>
      )}
    </main>
  );
}
