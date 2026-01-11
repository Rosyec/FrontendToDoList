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
  priority: "LOW" | "MEDIUM" | "HIGH"
  createdAt: Date
  updatedAt: Date
  userId: string
}
