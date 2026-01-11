"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Flag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTasks } from "@/lib/tasks-context"
import type { Task } from "@/lib/mock-data"

interface TaskDialogProps {
  open: boolean
  onClose: () => void
  task: Task | null
}

export function TaskDialog({ open, onClose, task }: TaskDialogProps) {
  const { addTask, updateTask } = useTasks()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium")

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDescription(task.description || "")
      setPriority(task.priority)
    } else {
      setTitle("")
      setDescription("")
      setPriority("medium")
    }
  }, [task, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) return

    if (task) {
      updateTask(task.id, {
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
      })
    } else {
      addTask({
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        completed: false,
      })
    }

    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{task ? "Editar Tarea" : "Nueva Tarea"}</DialogTitle>
          <DialogDescription>
            {task ? "Modifica los detalles de tu tarea" : "Agrega una nueva tarea a tu lista"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              placeholder="¿Qué necesitas hacer?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción (opcional)</Label>
            <Textarea
              id="description"
              placeholder="Añade más detalles..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Prioridad</Label>
            <Select value={priority} onValueChange={(v) => setPriority(v as typeof priority)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">
                  <div className="flex items-center gap-2">
                    <Flag className="w-4 h-4 text-blue-500" />
                    Baja
                  </div>
                </SelectItem>
                <SelectItem value="medium">
                  <div className="flex items-center gap-2">
                    <Flag className="w-4 h-4 text-amber-500" />
                    Media
                  </div>
                </SelectItem>
                <SelectItem value="high">
                  <div className="flex items-center gap-2">
                    <Flag className="w-4 h-4 text-red-500" />
                    Alta
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">{task ? "Guardar Cambios" : "Crear Tarea"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
