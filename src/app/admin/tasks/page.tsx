"use client";

import React, { useState } from "react";
import { CheckSquare, Square, Plus, Calendar, AlertCircle } from "lucide-react";

export default function TasksPage() {
  const [taskList, setTaskList] = useState([
    {
      id: "task-1",
      title: "Confirmar Cita para Prueba de Manejo R1300GS",
      description: "Llamar a Carlos Villarreal para horario en showroom San Pedro.",
      dueDate: "2026-07-31",
      priority: "high",
      done: false,
      lead: "Carlos Villarreal",
    },
    {
      id: "task-2",
      title: "Enviar Avalúo de Moto a Cuenta (R 1250 GS 2021)",
      description: "Revisión técnica realizada por taller autorizador.",
      dueDate: "2026-07-31",
      priority: "urgent",
      done: false,
      lead: "Carlos Villarreal",
    },
    {
      id: "task-3",
      title: "Seguimiento a Solicitud de Crédito BMW Select",
      description: "Verificar estatus en portal de servicios financieros.",
      dueDate: "2026-08-01",
      priority: "medium",
      done: true,
      lead: "Mauricio Sada",
    },
  ]);

  const toggleTask = (id: string) => {
    setTaskList((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="border-b border-slate-200 pb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Productividad</span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Gestión de Tareas & Pendientes</h1>
          <p className="text-xs text-slate-500 mt-1">Tareas comerciales asignadas con fechas límite y prioridades.</p>
        </div>
      </div>

      <div className="space-y-3 max-w-4xl">
        {taskList.map((task) => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={`p-4 rounded-2xl border transition-all flex items-start gap-4 cursor-pointer text-xs ${
              task.done ? "bg-slate-50 border-slate-200 opacity-60" : "bg-white border-slate-200 shadow-sm"
            }`}
          >
            {task.done ? (
              <CheckSquare className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            ) : (
              <Square className="w-5 h-5 text-slate-300 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className={`font-bold text-sm ${task.done ? "line-through text-slate-500" : "text-slate-900"}`}>
                  {task.title}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                    task.priority === "urgent"
                      ? "bg-rose-100 text-rose-800"
                      : task.priority === "high"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-sky-100 text-sky-800"
                  }`}
                >
                  {task.priority}
                </span>
              </div>
              <p className="text-slate-500 text-xs">{task.description}</p>
              <div className="flex items-center gap-4 text-[10px] text-slate-400 font-semibold pt-1">
                <span>Lead: {task.lead}</span>
                <span>Vence: {task.dueDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
