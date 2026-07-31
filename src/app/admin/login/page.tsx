"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, Mail, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("eduardo.ibarra@motorrax.com");
  const [password, setPassword] = useState("••••••••••••");
  const [role, setRole] = useState("sales_manager");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/admin/crm");
    }, 600);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-8 sm:p-12 max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Image
              src="/images/motorrax_logo_black.png"
              alt="MOTORRAX"
              width={200}
              height={50}
              className="h-12 w-auto object-contain"
            />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Acceso Portal Administrativo</h2>
            <p className="text-xs text-slate-500 mt-1">Plataforma de Operaciones, CRM & BI BMW Monterrey</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Rol de Usuario
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-600 text-xs font-bold text-slate-900 bg-white"
            >
              <option value="superadmin">Super Admin (Acceso Total SaaS)</option>
              <option value="admin">Admin Dealership</option>
              <option value="sales_manager">Sales Manager (Eduardo Ibarra)</option>
              <option value="salesperson">Salesperson (Vendedor)</option>
              <option value="marketing">Marketing Specialist</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-600 text-xs font-medium text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-600 text-xs font-medium text-slate-900"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-slate-950 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-sky-600 transition-colors shadow-xl flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Autenticando...</span>
            ) : (
              <>
                <span>Ingresar al CRM Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 border-t border-slate-100 pt-4">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Autenticación de Alta Seguridad para BMW Monterrey</span>
        </div>
      </div>
    </div>
  );
}
