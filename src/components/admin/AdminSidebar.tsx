"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Kanban,
  CheckSquare,
  Calendar,
  Bike,
  UserCog,
  DollarSign,
  Truck,
  Megaphone,
  FileText,
  Mail,
  Workflow,
  PieChart,
  BarChart3,
  Share2,
  Settings,
  ChevronRight,
} from "lucide-react";

export const AdminSidebar = () => {
  const pathname = usePathname();

  const menuGroups = [
    {
      title: "Principal",
      items: [
        { label: "Dashboard Ejecutivo", href: "/admin/dashboard", icon: LayoutDashboard },
      ],
    },
    {
      title: "CRM & Ventas",
      items: [
        { label: "Leads & Prospectos", href: "/admin/leads", icon: Users },
        { label: "Clientes & Ownership", href: "/admin/customers", icon: UserCheck },
        { label: "Pipeline (Kanban)", href: "/admin/crm", icon: Kanban },
        { label: "Tareas & Pendientes", href: "/admin/tasks", icon: CheckSquare },
        { label: "Calendario & Citas", href: "/admin/calendar", icon: Calendar },
      ],
    },
    {
      title: "Operaciones",
      items: [
        { label: "Catálogo & Modelos", href: "/admin/models", icon: Bike },
        { label: "Inventario Motos", href: "/admin/inventory", icon: Bike },
        { label: "Equipo de Ventas", href: "/admin/salespeople", icon: UserCog },
        { label: "Comisiones", href: "/admin/commissions", icon: DollarSign },
        { label: "Checklist Entregas", href: "/admin/delivery", icon: Truck },
      ],
    },
    {
      title: "Marketing & Growth",
      items: [
        { label: "Campañas & ROI", href: "/admin/marketing", icon: Megaphone },
        { label: "CMS & Contenidos", href: "/admin/content", icon: FileText },
        { label: "Email Center", href: "/admin/email-center", icon: Mail },
        { label: "Automatizaciones", href: "/admin/automations", icon: Workflow },
        { label: "Atribución YouTube/UTM", href: "/admin/attribution", icon: Share2 },
      ],
    },
    {
      title: "Inteligencia & Sistema",
      items: [
        { label: "Reportes Ejecutivo", href: "/admin/reports", icon: PieChart },
        { label: "Analítica & Tráfico", href: "/admin/analytics", icon: BarChart3 },
        { label: "Configuración & Roles", href: "/admin/settings", icon: Settings },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-slate-950 text-slate-400 border-r border-slate-800 flex flex-col h-screen sticky top-0 z-30 flex-shrink-0">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <Link href="/admin/dashboard" className="flex items-center space-x-2">
          <Image
            src="/images/motorrax_logo_white.png"
            alt="MOTORRAX Admin"
            width={140}
            height={35}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>
        <span className="px-2 py-0.5 bg-sky-500/10 text-sky-400 text-[10px] font-mono font-bold rounded border border-sky-500/20">
          SaaS
        </span>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 text-xs">
        {menuGroups.map((group, idx) => (
          <div key={idx} className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3">
              {group.title}
            </span>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                      isActive
                        ? "bg-sky-600 text-white font-bold shadow-md shadow-sky-600/20"
                        : "hover:bg-slate-900 hover:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                      <span>{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-white" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User Footer Card */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center text-xs">
            EI
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-xs font-bold text-white block truncate">Eduardo Ibarra</span>
            <span className="text-[10px] text-emerald-400 font-mono block truncate">Super Admin</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
