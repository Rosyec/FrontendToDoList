"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { mockUsers, type User } from "./mock-data"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem("taskflow_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const foundUser = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

    if (foundUser) {
      const userWithoutPassword = { ...foundUser, password: "" }
      setUser(userWithoutPassword as User)
      localStorage.setItem("taskflow_user", JSON.stringify(userWithoutPassword))
      return { success: true }
    }

    return { success: false, error: "Credenciales incorrectas" }
  }

  const register = async (name: string, email: string, password: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const existingUser = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase())

    if (existingUser) {
      return { success: false, error: "El email ya está registrado" }
    }

    const newUser: User = {
      id: String(mockUsers.length + 1),
      name,
      email,
      password,
      createdAt: new Date(),
    }

    mockUsers.push(newUser)
    const userWithoutPassword = { ...newUser, password: "" }
    setUser(userWithoutPassword as User)
    localStorage.setItem("taskflow_user", JSON.stringify(userWithoutPassword))

    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("taskflow_user")
  }

  return <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
