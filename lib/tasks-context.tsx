"use client";

import { createContext, useContext, type ReactNode } from "react";
import { type Task } from "./mock-data";
import { useAuthStore } from "@/lib/store/auth-store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksApi, type CreateTaskDto, type UpdateTaskDto } from "./api";

interface TasksContextType {
  tasks: Task[];
  isLoading: boolean;
  addTask: (task: CreateTaskDto) => void;
  updateTask: (id: string, updates: UpdateTaskDto) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useAuthStore();
  const queryClient = useQueryClient();

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: tasksApi.getAll,
    enabled: isAuthenticated, // Only fetch calls if user is logged in
  });

  const createTaskMutation = useMutation({
    mutationFn: tasksApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: UpdateTaskDto }) =>
      tasksApi.update(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: tasksApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const addTask = (taskData: CreateTaskDto) => {
    if (!user) return;
    createTaskMutation.mutate(taskData);
  };

  const updateTask = (id: string, updates: UpdateTaskDto) => {
    updateTaskMutation.mutate({ id, updates });
  };

  const deleteTask = (id: string) => {
    deleteTaskMutation.mutate(id);
  };

  const toggleComplete = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      const newStatus = task.status === "COMPLETED" ? "PENDING" : "COMPLETED";
      updateTask(id, { status: newStatus });
    }
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        isLoading,
        addTask,
        updateTask,
        deleteTask,
        toggleComplete,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
}
