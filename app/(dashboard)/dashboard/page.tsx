import { Suspense } from "react"
import { DashboardContent } from "@/components/dashboard-content"

function DashboardLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-muted-foreground">Cargando...</span>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardContent />
    </Suspense>
  )
}
