// import { create } from "zustand";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksApi, type CreateTaskDto, type UpdateTaskDto } from "./api";

// Hook personalizado que combina React Query con tu lógica
export function useTasks() {
  const queryClient = useQueryClient();

  // Query para obtener tareas
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: tasksApi.getAll,
  });

  // Mutación para crear
  const createMutation = useMutation({
    mutationFn: tasksApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // Mutación para actualizar
  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: UpdateTaskDto }) =>
      tasksApi.update(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // Mutación para eliminar
  const deleteMutation = useMutation({
    mutationFn: tasksApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // Funciones auxiliares
  const addTask = (taskData: CreateTaskDto) => {
    createMutation.mutate(taskData);
  };

  const updateTask = (id: string, updates: UpdateTaskDto) => {
    updateMutation.mutate({ id, updates });
  };

  const deleteTask = (id: string) => {
    deleteMutation.mutate(id);
  };

  const toggleComplete = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      const newStatus = task.status === "COMPLETED" ? "PENDING" : "COMPLETED";
      updateTask(id, { status: newStatus });
    }
  };

  return {
    tasks,
    isLoading,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
