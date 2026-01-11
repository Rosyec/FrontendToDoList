export interface User {
  id: string
  name: string
  email: string
  password: string
  createdAt: Date
}

export interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  priority: "low" | "medium" | "high"
  createdAt: Date
  updatedAt: Date
  userId: string
}

// Mock users database
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Usuario Demo",
    email: "demo@taskflow.com",
    password: "demo123",
    createdAt: new Date("2024-01-01"),
  },
]

// Mock tasks database
export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Revisar correos pendientes",
    description: "Revisar y responder correos importantes del día",
    completed: false,
    priority: "high",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    userId: "1",
  },
  {
    id: "2",
    title: "Preparar presentación",
    description: "Crear slides para la reunión del viernes",
    completed: true,
    priority: "medium",
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-15"),
    userId: "1",
  },
  {
    id: "3",
    title: "Llamar al cliente",
    description: "Confirmar detalles del proyecto",
    completed: false,
    priority: "high",
    createdAt: new Date("2024-01-13"),
    updatedAt: new Date("2024-01-13"),
    userId: "1",
  },
  {
    id: "4",
    title: "Actualizar documentación",
    completed: false,
    priority: "low",
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-12"),
    userId: "1",
  },
  {
    id: "5",
    title: "Revisar código del equipo",
    description: "Code review de los PRs pendientes",
    completed: true,
    priority: "medium",
    createdAt: new Date("2024-01-11"),
    updatedAt: new Date("2024-01-14"),
    userId: "1",
  },
]
