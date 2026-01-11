export interface User {
  id: string
  name: string
  email: string
  password?: string
  accessToken?: string
  createdAt: Date
}

export interface Task {
  id: string
  title: string
  description?: string
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED"
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
    status: "PENDING",
    priority: "high",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    userId: "1",
  },
  {
    id: "2",
    title: "Preparar presentación",
    description: "Crear slides para la reunión del viernes",
    status: "COMPLETED",
    priority: "medium",
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-15"),
    userId: "1",
  },
  {
    id: "3",
    title: "Llamar al cliente",
    description: "Confirmar detalles del proyecto",
    status: "PENDING",
    priority: "high",
    createdAt: new Date("2024-01-13"),
    updatedAt: new Date("2024-01-13"),
    userId: "1",
  },
  {
    id: "4",
    title: "Actualizar documentación",
    status: "PENDING",
    priority: "low",
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-12"),
    userId: "1",
  },
  {
    id: "5",
    title: "Revisar código del equipo",
    description: "Code review de los PRs pendientes",
    status: "COMPLETED",
    priority: "medium",
    createdAt: new Date("2024-01-11"),
    updatedAt: new Date("2024-01-14"),
    userId: "1",
  },
]
