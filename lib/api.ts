import api from "./axios"
import type { Task, User } from "./mock-data"

// Auth Types
export interface LoginResponse {
    access_token: string
    user: User
}

export interface RegisterResponse {
    access_token: string
    user: User
}

// Tasks Types
export type CreateTaskDto = Omit<Task, "id" | "createdAt" | "updatedAt" | "userId">
export type UpdateTaskDto = Partial<Omit<Task, "id" | "createdAt" | "updatedAt" | "userId">>

export const authApi = {
    login: async (email: string, password: string) => {
        const response = await api.post<LoginResponse>("/auth/login", { email, password })
        return response.data
    },
    register: async (name: string, email: string, password: string) => {
        const response = await api.post<RegisterResponse>("/auth/register", { name, email, password })
        return response.data
    },
}

export const tasksApi = {
    getAll: async () => {
        const response = await api.get<Task[]>("/tasks")
        return response.data
    },
    create: async (task: CreateTaskDto) => {
        const response = await api.post<Task>("/tasks", task)
        return response.data
    },
    update: async (id: string, updates: UpdateTaskDto) => {
        const response = await api.patch<Task>(`/tasks/${id}`, updates)
        return response.data
    },
    delete: async (id: string) => {
        await api.delete(`/tasks/${id}`)
    },
}
