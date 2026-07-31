"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Search, Bell, Plus, Sparkles, User, LogOut, ChevronDown } from "lucide-react";
import Link from "next/link";

interface AdminHeaderProps {
  onOpenSearch: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onOpenSearch }) => {
  const pathname = usePathname();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Generate breadcrumb titles from pathname
  const pathSegments = pathname.split("/").filter(Boolean);
  const breadcrumbText = pathSegments.map((segment) => {
    if (segment === "admin") return "Admin";
    if (segment === "crm") return "Pipeline Kanban";
    if (segment === "dashboard") return "Dashboard Ejecutivo";
    if (segment === "leads") return "Leads & Prospectos";
    if (segment === "customers") return "Clientes & Ownership";
    if (segment === "tasks") return "Tareas";
    if (segment === "calendar") return "Calendario";
    if (segment === "inventory") return "Inventario";
    if (segment === "salespeople") return "Equipo de Ventas";
    if (segment === "commissions") return "Comisiones";
    if (segment === "marketing") return "Campañas";
    if (segment === "content") return "CMS & Contenidos";
    if (segment === "email-center") return "Email Center";
    if (segment === "automations") return "Automatizaciones";
    if (segment === "reports") return "Reportes";
    if (segment === "analytics") return "Analítica";
    if (segment === "attribution") return "Atribución YouTube/UTM";
    if (segment === "settings") return "Configuración";
    return segment;
  });

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-20 shadow-sm">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
        <span>MOTORRAX</span>
        <span>/</span>
        {breadcrumbText.map((text, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <span>/</span>}
            <span className={idx === breadcrumbText.length - 1 ? "text-slate-900 font-bold" : ""}>
              {text}
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* Center / Right Toolbar */}
      <div className="flex items-center space-x-4">
        {/* Global Search Button */}
        <button
          onClick={onOpenSearch}
          className="flex items-center space-x-3 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-xl text-xs transition-colors border border-slate-200"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="font-medium">Buscar leads, motos, tareas...</span>
          <kbd className="px-1.5 py-0.5 bg-white rounded text-[10px] font-mono text-slate-400 border border-slate-200">
            ⌘K
          </kbd>
        </button>

        {/* Quick Action Button */}
        <Link
          href="/admin/leads"
          className="px-3 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md shadow-sky-600/20 flex items-center space-x-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Nuevo Lead</span>
        </Link>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 relative transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-1.5 right-1.5 ring-2 ring-white"></span>
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-slate-200 shadow-2xl p-4 space-y-3 z-50 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-bold text-slate-900">Notificaciones Recientes</span>
                <span className="text-[10px] text-sky-600 font-semibold">Limpiar</span>
              </div>
              <div className="space-y-2">
                <div className="p-2.5 bg-sky-50 rounded-xl border border-sky-100">
                  <span className="font-bold text-slate-900 block">Nuevo Lead Recibido</span>
                  <span className="text-[11px] text-slate-600">Carlos Villarreal cotizó BMW R 1300 GS desde YouTube</span>
                </div>
                <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100">
                  <span className="font-bold text-slate-900 block">Cita Confirmada</span>
                  <span className="text-[11px] text-slate-600">Prueba de manejo agendada para mañana 11:00 AM</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Badge */}
        <Link
          href="/admin/settings"
          className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
            EI
          </div>
        </Link>
      </div>
    </header>
  );
};
