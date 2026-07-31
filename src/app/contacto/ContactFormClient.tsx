"use client";

import React, { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { submitLeadAction } from "@/actions/leads";

const MODEL_OPTIONS = [
  "General / Consulta",
  "BMW R 1300 GS",
  "BMW F 900 GS",
  "BMW M 1000 XR",
  "BMW S 1000 XR",
  "BMW R 12 G/S",
  "BMW R 1300 RT",
  "BMW G 310 GS",
];

export function ContactFormClient() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    model: "General / Consulta",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitLeadAction({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        desiredModel: formData.model !== "General / Consulta" ? formData.model : undefined,
        notes: formData.notes,
        utmSource: "contact_page",
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting contact form:", err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="mt-12 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-slate-100">¡Mensaje enviado con éxito!</h3>
        <p className="text-sm text-slate-300 max-w-md mx-auto">
          Hemos recibido tus datos y te hemos enviado un correo de confirmación a <strong className="text-white">{formData.email}</strong>.
          {formData.model !== "General / Consulta" && (
            <span> Incluimos la ficha con información detallada de la <strong className="text-accent">{formData.model}</strong>.</span>
          )}
          {" "}Eduardo Ibarra se pondrá en contacto contigo muy pronto.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-12 space-y-4 rounded-2xl border border-card-border bg-card p-6 sm:p-8"
    >
      <h2 className="text-lg font-bold text-slate-100">Enviar mensaje a Eduardo Ibarra</h2>
      <p className="text-sm text-muted">
        Completa el formulario y te responderemos inmediatamente por email o WhatsApp.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-300">
            Nombre Completo *
          </label>
          <input
            id="name"
            type="text"
            required
            placeholder="Ej. Roberto Garza"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-xl border border-card-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent text-slate-100"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-300">
            Correo Electrónico *
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="roberto@ejemplo.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full rounded-xl border border-card-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent text-slate-100"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-300">
            Teléfono / WhatsApp *
          </label>
          <input
            id="phone"
            type="tel"
            required
            placeholder="81 2582 7777"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full rounded-xl border border-card-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent text-slate-100"
          />
        </div>

        <div>
          <label htmlFor="model" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-300">
            Modelo de Interés
          </label>
          <select
            id="model"
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            className="w-full rounded-xl border border-card-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent text-slate-100"
          >
            {MODEL_OPTIONS.map((m) => (
              <option key={m} value={m} className="bg-slate-900 text-white">
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-300">
          Mensaje / Detalles
        </label>
        <textarea
          id="notes"
          rows={4}
          placeholder="Cuéntanos sobre tu consulta, rodada o lo que estás buscando…"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full rounded-xl border border-card-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent text-slate-100"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-bold text-white hover:bg-accent-hover transition disabled:opacity-50"
      >
        <Send className="h-4 w-4" />
        {loading ? "Enviando..." : "Enviar Mensaje"}
      </button>
    </form>
  );
}
