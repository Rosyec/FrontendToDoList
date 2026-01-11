"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock, CheckCircle2, Loader2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const result = await login(email, password)

    if (result.success) {
      router.push("/dashboard")
    } else {
      setError(result.error || "Error al iniciar sesión")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">TaskFlow</span>
          </div>
          <h1 className="text-4xl xl:text-5xl font-bold text-foreground mb-6 leading-tight">Bienvenido de nuevo</h1>
          <p className="text-lg text-muted-foreground max-w-md">
            Accede a tu cuenta y continúa gestionando tus tareas de manera eficiente.
          </p>
          <div className="mt-12 flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-accent border-2 border-background flex items-center justify-center text-xs font-medium text-accent-foreground"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">+2,500</span> usuarios activos
            </p>
          </div>
        </div>
        {/* Decorative shapes */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-primary/10" />
        <div className="absolute top-20 -right-10 w-40 h-40 rounded-full bg-primary/5" />
      </div>

      {/* Right side - form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>

          <Card className="border-border/50 shadow-lg">
            <CardHeader className="space-y-1">
              <div className="flex items-center gap-2 lg:hidden mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-semibold text-foreground">TaskFlow</span>
              </div>
              <CardTitle className="text-2xl font-bold">Iniciar Sesión</CardTitle>
              <CardDescription>Ingresa tus credenciales para acceder a tu cuenta</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}

                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Iniciando sesión...
                    </>
                  ) : (
                    "Iniciar Sesión"
                  )}
                </Button>
              </form>

              <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border/50">
                <p className="text-xs text-muted-foreground mb-2">Credenciales de prueba:</p>
                <p className="text-sm font-mono">demo@taskflow.com</p>
                <p className="text-sm font-mono">demo123</p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm text-muted-foreground">
                ¿No tienes cuenta?{" "}
                <Link href="/register" className="text-primary hover:underline font-medium">
                  Regístrate aquí
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
