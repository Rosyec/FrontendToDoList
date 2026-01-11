"use client";

import type React from "react";

import { useState } from "react";
import {
  CheckCircle2,
  Circle,
  Plus,
  LogOut,
  Search,
  Filter,
  LayoutGrid,
  List,
  Flag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/lib/store/auth-store";
import { useTasks } from "@/lib/tasks-context";
import { TaskDialog } from "@/components/task-dialog";
import { TaskCard } from "@/components/task-card";
import type { Task } from "@/lib/mock-data";

type FilterType = "all" | "pending" | "completed";
type ViewType = "grid" | "list";

export function DashboardContent() {
  const { user, logout } = useAuthStore();
  const { tasks, isLoading, toggleComplete, deleteTask } = useTasks();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [view, setView] = useState<ViewType>("list");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase());

    if (filter === "pending")
      return matchesSearch && task.status !== "COMPLETED";
    if (filter === "completed")
      return matchesSearch && task.status === "COMPLETED";
    return matchesSearch;
  });

  const stats = {
    today: tasks.length, // Just placeholder if needed, or keeping total
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "COMPLETED").length,
    pending: tasks.filter((t) => t.status !== "COMPLETED").length,
    highPriority: tasks.filter(
      (t) => t.priority === "high" && t.status !== "COMPLETED"
    ).length,
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg text-foreground">
              TaskFlow
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-xs font-medium text-primary">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-muted-foreground">{user?.name}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              title="Cerrar sesión"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome section */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            ¡Hola, {user?.name?.split(" ")[0]}!
          </h1>
          <p className="text-muted-foreground">
            Gestiona tus tareas y mantente productivo
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<LayoutGrid className="w-5 h-5" />}
            label="Total"
            value={stats.total}
            color="bg-primary/10 text-primary"
          />
          <StatCard
            icon={<CheckCircle2 className="w-5 h-5" />}
            label="Completadas"
            value={stats.completed}
            color="bg-green-500/10 text-green-600"
          />
          <StatCard
            icon={<Circle className="w-5 h-5" />}
            label="Pendientes"
            value={stats.pending}
            color="bg-amber-500/10 text-amber-600"
          />
          <StatCard
            icon={<Flag className="w-5 h-5" />}
            label="Alta prioridad"
            value={stats.highPriority}
            color="bg-red-500/10 text-red-600"
          />
        </div>

        {/* Actions bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar tareas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setFilter("all")}>
                  <LayoutGrid className="w-4 h-4 mr-2" />
                  Todas
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("pending")}>
                  <Circle className="w-4 h-4 mr-2" />
                  Pendientes
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("completed")}>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Completadas
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="hidden sm:flex border border-border rounded-lg p-1">
              <Button
                variant={view === "list" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setView("list")}
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant={view === "grid" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setView("grid")}
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
            </div>

            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Nueva Tarea
            </Button>
          </div>
        </div>

        {/* Filter badge */}
        {filter !== "all" && (
          <div className="mb-4 flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Filtro:</span>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              {filter === "pending" ? "Pendientes" : "Completadas"}
              <button
                onClick={() => setFilter("all")}
                className="hover:bg-primary/20 rounded-full p-0.5"
              >
                ×
              </button>
            </span>
          </div>
        )}

        {/* Tasks list */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              {searchQuery ? "No se encontraron tareas" : "No hay tareas"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery
                ? "Intenta con otros términos de búsqueda"
                : "Crea tu primera tarea para comenzar"}
            </p>
            {!searchQuery && (
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Crear tarea
              </Button>
            )}
          </div>
        ) : (
          <div
            className={
              view === "grid"
                ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
                : "space-y-3"
            }
          >
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                view={view}
                onToggle={() => toggleComplete(task.id)}
                onEdit={() => handleEdit(task)}
                onDelete={() => deleteTask(task.id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Task dialog */}
      <TaskDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        task={editingTask}
      />
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="p-4 rounded-xl bg-card border border-border/50">
      <div
        className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center mb-3`}
      >
        {icon}
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
