"use client";

import React, { useState, useEffect } from "react";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { getLeadsAction } from "@/actions/leads";
import {
  Users,
  Search,
  Filter,
  Download,
  Upload,
  Plus,
  Flame,
  Zap,
  Snowflake,
  X,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  Share2,
  RefreshCw,
} from "lucide-react";

export default function LeadsPage() {
  const [leadsList, setLeadsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState<any>(null);

  const fetchLeads = async () => {
    setLoading(true);
    const res = await getLeadsAction();
    if (res.success && res.leads) {
      setLeadsList(res.leads);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filteredLeads = leadsList.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.desiredModel.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase())
  );

  const exportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Nombre,Email,Telefono,Modelo,Presupuesto,Score,Estado"].join(",") +
      "\n" +
      leadsList.map((e) => `${e.name},${e.email},${e.phone},${e.desiredModel},${e.budgetMxn},${e.score},${e.status}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "leads_motorrax.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-6 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Gestión de Clientes Potenciales</span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Leads & Prospectos</h1>
          <p className="text-xs text-slate-500 mt-1">
            Administra, califica y convierte los contactos registrados desde la página web, YouTube y campañas.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchLeads}
            disabled={loading}
            className="px-4 py-2.5 bg-sky-50 border border-sky-200 hover:bg-sky-100 text-sky-700 text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Actualizar
          </button>
          <button
            onClick={exportCSV}
            className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            Exportar CSV
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre, correo o modelo..."
            className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-sky-600"
          />
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Mostrando <span className="font-bold text-slate-900">{filteredLeads.length}</span> prospectos
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-4">Lead</th>
                <th className="p-4">Modelo Deseado</th>
                <th className="p-4">Presupuesto</th>
                <th className="p-4">Lead Score</th>
                <th className="p-4">Canal / Atribución</th>
                <th className="p-4">Estado</th>
                <th className="p-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-sky-600" />
                    Cargando prospectos en tiempo real desde PostgreSQL...
                  </td>
                </tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500 font-medium">
                    No se encontraron contactos registrados en la base de datos.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-slate-900 text-sm">{lead.name}</div>
                    <div className="text-[11px] text-slate-400">{lead.phone} • {lead.email}</div>
                  </td>
                  <td className="p-4 font-semibold text-slate-800">{lead.desiredModel}</td>
                  <td className="p-4">
                    <PriceDisplay amount={lead.budgetMxn} className="text-xs font-bold text-slate-900" showDisclaimerNote={false} />
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        lead.scoreLabel === "hot"
                          ? "bg-rose-100 text-rose-800"
                          : lead.scoreLabel === "warm"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-sky-100 text-sky-800"
                      }`}
                    >
                      {lead.scoreLabel === "hot" ? (
                        <Flame className="w-3 h-3 text-rose-600" />
                      ) : (
                        <Zap className="w-3 h-3 text-amber-600" />
                      )}
                      Score: {lead.score}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-bold">
                      {lead.utmSource}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-800 font-extrabold text-[10px] uppercase rounded-md">
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedLead(lead)}
                      className="px-3 py-1.5 bg-slate-900 text-white rounded-lg font-bold text-[10px] uppercase hover:bg-sky-600 transition-colors"
                    >
                      Ver Detalle
                    </button>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Drawer Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-lg bg-white h-full p-6 shadow-2xl overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase text-sky-600">Perfil de Lead</span>
                <h3 className="text-xl font-bold text-slate-900">{selectedLead.name}</h3>
              </div>
              <button onClick={() => setSelectedLead(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Contact Info Box */}
              <div className="bg-slate-900 text-white p-4 rounded-xl space-y-3 shadow-md">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 block">Información de Contacto</span>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-white">{selectedLead.phone}</span>
                  </div>
                  <a
                    href={`https://wa.me/52${selectedLead.phone}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] uppercase font-bold text-emerald-400 hover:underline"
                  >
                    WhatsApp
                  </a>
                </div>
                <div className="flex items-center justify-between text-xs border-t border-slate-800 pt-2">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Mail className="w-4 h-4 text-sky-400" />
                    <span className="font-bold text-white break-all">{selectedLead.email}</span>
                  </div>
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="text-[10px] uppercase font-bold text-sky-400 hover:underline ml-2"
                  >
                    Correo
                  </a>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-bold uppercase">Modelo Deseado</span>
                  <span className="font-bold text-slate-900">{selectedLead.desiredModel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-bold uppercase">Presupuesto Proyectado</span>
                  <PriceDisplay amount={selectedLead.budgetMxn} className="font-bold text-slate-900" showDisclaimerNote={false} />
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-bold uppercase">Tiene Moto a Cuenta (Trade-in)</span>
                  <span className="font-bold text-slate-900">{selectedLead.hasTradeIn ? "Sí (Evaluación requerida)" : "No"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-bold uppercase">Requiere Financiamiento</span>
                  <span className="font-bold text-slate-900">{selectedLead.requiresFinancing ? "Sí (BMW Select)" : "No"}</span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-2">
                <h4 className="font-bold text-slate-900">Historial & Touchpoints de Atribución</h4>
                <div className="p-3 bg-sky-50 text-sky-900 rounded-xl text-[11px] space-y-1">
                  <div>Canal Original: <span className="font-bold">{selectedLead.utmSource}</span></div>
                  <div>Campaña: <span className="font-bold">{selectedLead.utmCampaign}</span></div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 flex gap-3">
              <a
                href={`https://wa.me/52${selectedLead.phone}?text=Hola%20${encodeURIComponent(
                  selectedLead.name
                )},%20te%20contacta%20Eduardo%20Ibarra%20de%20BMW%20Motorrad%20Monterrey`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl text-center hover:bg-emerald-700 transition-colors"
              >
                Contactar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
