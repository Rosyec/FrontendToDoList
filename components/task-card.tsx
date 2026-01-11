"use client";

import {
  CheckCircle2,
  Circle,
  MoreHorizontal,
  Edit3,
  Trash2,
  Flag,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Task } from "@/lib/mock-data";

interface TaskCardProps {
  task: Task;
  view: "grid" | "list";
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const priorityColors = {
  LOW: "bg-blue-500/10 text-blue-600 border-blue-200",
  MEDIUM: "bg-amber-500/10 text-amber-600 border-amber-200",
  HIGH: "bg-red-500/10 text-red-600 border-red-200",
};

const priorityLabels = {
  LOW: "Baja",
  MEDIUM: "Media",
  HIGH: "Alta",
};

export function TaskCard({
  task,
  view,
  onToggle,
  onEdit,
  onDelete,
}: TaskCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "short",
    }).format(new Date(date));
  };

  if (view === "grid") {
    return (
      <div
        className={`p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all ${
          task.status === "COMPLETED" ? "opacity-60" : ""
        }`}
      >
        <div className="flex items-start justify-between mb-3">
          <button
            onClick={onToggle}
            className="flex-shrink-0 mt-0.5 text-muted-foreground hover:text-primary transition-colors"
          >
            {task.status === "COMPLETED" ? (
              <CheckCircle2 className="w-5 h-5 text-primary" />
            ) : (
              <Circle className="w-5 h-5" />
            )}
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit}>
                <Edit3 className="w-4 h-4 mr-2" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onDelete} className="text-destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <h3
          className={`font-medium text-foreground mb-2 ${
            task.status === "COMPLETED"
              ? "line-through text-muted-foreground"
              : ""
          }`}
        >
          {task.title}
        </h3>

        {task.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {task.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${
              priorityColors[task.priority]
            }`}
          >
            <Flag className="w-3 h-3" />
            {priorityLabels[task.priority]}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            {formatDate(task.createdAt)}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all ${
        task.status === "COMPLETED" ? "opacity-60" : ""
      }`}
    >
      <button
        onClick={onToggle}
        className="flex-shrink-0 text-muted-foreground hover:text-primary transition-colors"
      >
        {task.status === "COMPLETED" ? (
          <CheckCircle2 className="w-5 h-5 text-primary" />
        ) : (
          <Circle className="w-5 h-5" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3
            className={`font-medium text-foreground truncate ${
              task.status === "COMPLETED"
                ? "line-through text-muted-foreground"
                : ""
            }`}
          >
            {task.title}
          </h3>
          <span
            className={`hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${
              priorityColors[task.priority]
            }`}
          >
            <Flag className="w-3 h-3" />
            {priorityLabels[task.priority]}
          </span>
        </div>
        {task.description && (
          <p className="text-sm text-muted-foreground truncate">
            {task.description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <span className="hidden md:inline-flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          {formatDate(task.createdAt)}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEdit}>
              <Edit3 className="w-4 h-4 mr-2" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onDelete} className="text-destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
