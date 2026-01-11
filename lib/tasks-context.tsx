"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { mockTasks, type Task } from "./mock-data"
import { useAuth } from "./auth-context"

interface TasksContextType {
  tasks: Task[]
  isLoading: boolean
  addTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt" | "userId">) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  toggleComplete: (id: string) => void
}

const TasksContext = createContext<TasksContextType | undefined>(undefined)

export function TasksProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user) {
      // Simulate loading
      setIsLoading(true)
      setTimeout(() => {
        setTasks(mockTasks.filter((t) => t.userId === user.id))
        setIsLoading(false)
      }, 500)
    } else {
      setTasks([])
      setIsLoading(false)
    }
  }, [user])

  const addTask = (taskData: Omit<Task, "id" | "createdAt" | "updatedAt" | "userId">) => {
    if (!user) return

    const newTask: Task = {
      ...taskData,
      id: String(Date.now()),
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: user.id,
    }

    setTasks((prev) => [newTask, ...prev])
    mockTasks.push(newTask)
  }

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...updates, updatedAt: new Date() } : task)))

    const taskIndex = mockTasks.findIndex((t) => t.id === id)
    if (taskIndex !== -1) {
      mockTasks[taskIndex] = { ...mockTasks[taskIndex], ...updates, updatedAt: new Date() }
    }
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))

    const taskIndex = mockTasks.findIndex((t) => t.id === id)
    if (taskIndex !== -1) {
      mockTasks.splice(taskIndex, 1)
    }
  }

  const toggleComplete = (id: string) => {
    const task = tasks.find((t) => t.id === id)
    if (task) {
      updateTask(id, { completed: !task.completed })
    }
  }

  return (
    <TasksContext.Provider value={{ tasks, isLoading, addTask, updateTask, deleteTask, toggleComplete }}>
      {children}
    </TasksContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TasksContext)
  if (context === undefined) {
    throw new Error("useTasks must be used within a TasksProvider")
  }
  return context
}
