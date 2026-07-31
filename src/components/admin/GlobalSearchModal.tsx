"use client";

import React, { useState, useEffect } from "react";
import { Search, X, Users, Bike, CheckSquare, ArrowRight } from "lucide-react";
import Link from "next/link";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const mockResults = [
    { type: "Lead", title: "Carlos Villarreal", subtitle: "BMW R 1300 GS • Score: 92 (Hot)", href: "/admin/leads" },
    { type: "Moto", title: "BMW R 1300 GS Option 719", subtitle: "VIN: ...89012 • $535,000 MXN*", href: "/admin/inventory" },
    { type: "Tarea", title: "Confirmar Cita de Prueba R1300GS", subtitle: "Vence mañana • Alta prioridad", href: "/admin/tasks" },
    { type: "Cliente", title: "Roberto Garza Sada", subtitle: "Cliente Propietario • 1 Moto Adquirida", href: "/admin/customers" },
  ].filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-start justify-center pt-20 p-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full overflow-hidden">
        {/* Input */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar leads, clientes, motocicletas, tareas..."
            className="flex-1 bg-transparent text-sm font-semibold text-slate-900 focus:outline-none"
          />
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-2 text-xs">
          {mockResults.length > 0 ? (
            mockResults.map((res, idx) => (
              <Link
                key={idx}
                href={res.href}
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-sky-500 hover:bg-sky-50/50 transition-all group"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-bold text-[10px] uppercase rounded">
                      {res.type}
                    </span>
                    <span className="font-bold text-slate-900 text-sm">{res.title}</span>
                  </div>
                  <p className="text-slate-500">{res.subtitle}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all" />
              </Link>
            ))
          ) : (
            <div className="py-8 text-center text-slate-400">No se encontraron resultados para "{query}"</div>
          )}
        </div>
      </div>
    </div>
  );
};
