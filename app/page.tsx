import type React from "react"
import Link from "next/link"
import { CheckCircle2, ArrowRight, Zap, Shield, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg text-foreground">TaskFlow</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Características
            </Link>
            <Link href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Acerca de
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Iniciar Sesión
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">
                Registrarse
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm mb-6">
            <Zap className="w-4 h-4" />
            Productividad simplificada
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance max-w-4xl mx-auto leading-tight">
            Organiza tus tareas con
            <span className="text-primary"> elegancia y eficiencia</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty">
            TaskFlow te ayuda a gestionar tus tareas de forma intuitiva y profesional. Simplifica tu flujo de trabajo y
            alcanza tus objetivos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Comenzar gratis
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                Ya tengo cuenta
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Todo lo que necesitas</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Herramientas poderosas diseñadas para maximizar tu productividad
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<CheckCircle2 className="w-6 h-6" />}
              title="Gestión Simple"
              description="Crea, edita y organiza tus tareas con una interfaz intuitiva y minimalista."
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6" />}
              title="Seguro y Confiable"
              description="Tus datos están protegidos con las mejores prácticas de seguridad."
            />
            <FeatureCard
              icon={<BarChart3 className="w-6 h-6" />}
              title="Seguimiento Visual"
              description="Visualiza tu progreso y mantén el control de tus objetivos diarios."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/50">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 TaskFlow. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors">
      <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center text-primary mb-4">{icon}</div>
      <h3 className="font-semibold text-lg text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  )
}
