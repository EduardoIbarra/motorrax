"use client";

import React, { useState } from "react";
import { Settings, ShieldCheck, Key, Users, Check, Database } from "lucide-react";

export default function SettingsPage() {
  const [dbStatus, setDbStatus] = useState("Conectado a Neon PostgreSQL");
  const [resendStatus, setResendStatus] = useState("API Key Activa");

  const roles = [
    { name: "Super Admin", desc: "Acceso total a configuración, finanzas y base de datos Neon", usersCount: 1 },
    { name: "Admin Dealership", desc: "Gestión completa de showroom, vendedores y reportes", usersCount: 2 },
    { name: "Sales Manager", desc: "Gestión de pipeline Kanban, asignación de leads y comisiones", usersCount: 1 },
    { name: "Salesperson (Vendedor)", desc: "Acceso a leads asignados, tareas, citas y entrega digital", usersCount: 5 },
    { name: "Marketing", desc: "Campañas publicitaria, atribución UTM, Resend y contenidos CMS", usersCount: 2 },
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="border-b border-slate-200 pb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Configuración Global</span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Ajustes & Permisos SaaS</h1>
          <p className="text-xs text-slate-500 mt-1">Control de acceso basado en roles (RBAC), claves de API e integraciones.</p>
        </div>
      </div>

      {/* Database & System Integrations Status */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-sky-400" />
            <h3 className="font-bold text-sm">Estado de Integraciones del Sistema</h3>
          </div>
          <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 font-mono text-[10px] rounded font-bold border border-emerald-500/30">
            SISTEMA OPERATIVO 100%
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700">
            <span className="text-slate-400 block font-semibold">Base de Datos Principal</span>
            <span className="font-bold text-white block mt-0.5">Neon PostgreSQL (AWS US-East-2)</span>
          </div>
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700">
            <span className="text-slate-400 block font-semibold">Proveedor de Email</span>
            <span className="font-bold text-white block mt-0.5">Resend Transactional Engine</span>
          </div>
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700">
            <span className="text-slate-400 block font-semibold">Almacenamiento de Archivos</span>
            <span className="font-bold text-white block mt-0.5">Cloudflare R2 Object Storage</span>
          </div>
        </div>
      </div>

      {/* Role-Based Permissions Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
          Roles de Usuario y Permisos (RBAC)
        </h3>

        <div className="divide-y divide-slate-100 text-xs">
          {roles.map((r, idx) => (
            <div key={idx} className="py-4 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 text-sm block">{r.name}</span>
                <span className="text-slate-500">{r.desc}</span>
              </div>
              <span className="px-3 py-1 bg-slate-100 text-slate-700 font-bold text-[10px] uppercase rounded-full">
                {r.usersCount} Usuarios
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
