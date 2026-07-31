"use client";

import React, { useState } from "react";
import { CheckCircle2, Shield, Send } from "lucide-react";
import { submitLeadAction } from "@/actions/leads";
import { AnalyticsEvents } from "@/lib/analytics";

interface LeadCaptureFormProps {
  title?: string;
  subtitle?: string;
  defaultModel?: string;
  buttonText?: string;
}

export const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  title = "Solicitar Cotización & Asesoría",
  subtitle = "Recibe atención prioritaria y propuesta personalizada por Eduardo Ibarra.",
  defaultModel = "BMW R 1300 GS",
  buttonText = "Enviar Solicitud Prioritaria",
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    model: defaultModel,
    financing: false,
    tradeIn: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitLeadAction({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        desiredModel: formData.model,
        requiresFinancing: formData.financing,
        hasTradeIn: formData.tradeIn,
        utmSource: "web_form",
      });
      AnalyticsEvents.leadFormSubmit({
        model: formData.model,
        leadType: formData.financing ? "quote_with_financing" : "quote_standard",
        source: "lead_capture_form",
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h4 className="text-xl font-bold text-slate-900">¡Solicitud Registrada en CRM!</h4>
        <p className="text-xs text-slate-600 max-w-md mx-auto">
          Gracias {formData.name}. Tu solicitud se ha registrado exitosamente. Eduardo Ibarra te contactará vía WhatsApp en menos de 15 minutos.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative z-10 bg-white rounded-2xl border border-slate-200 p-8 shadow-xl space-y-5">
      <div>
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Nombre Completo *
          </label>
          <input
            type="text"
            required
            placeholder="Ej. Roberto Garza"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-600 text-xs font-medium text-slate-900"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Teléfono WhatsApp *
            </label>
            <input
              type="tel"
              required
              placeholder="81 0000 0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-600 text-xs font-medium text-slate-900"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Correo Electrónico *
            </label>
            <input
              type="email"
              required
              placeholder="roberto@ejemplo.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-600 text-xs font-medium text-slate-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Modelo de Interés
          </label>
          <select
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-600 text-xs font-medium text-slate-900 bg-white"
          >
            <option value="BMW R 1300 GS">BMW R 1300 GS</option>
            <option value="BMW F 900 GS">BMW F 900 GS</option>
            <option value="BMW M 1000 XR">BMW M 1000 XR</option>
            <option value="BMW S 1000 XR">BMW S 1000 XR</option>
            <option value="BMW R 12 G/S">BMW R 12 G/S</option>
            <option value="BMW R 1300 RT">BMW R 1300 RT</option>
          </select>
        </div>

        <div className="flex items-center space-x-6 text-xs text-slate-700 pt-1">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.financing}
              onChange={(e) => setFormData({ ...formData, financing: e.target.checked })}
              className="rounded text-sky-600 focus:ring-sky-500"
            />
            <span>Requiero financiamiento</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.tradeIn}
              onChange={(e) => setFormData({ ...formData, tradeIn: e.target.checked })}
              className="rounded text-sky-600 focus:ring-sky-500"
            />
            <span>Tengo moto a cuenta</span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-sky-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-sky-700 transition-all shadow-md shadow-sky-600/20 flex items-center justify-center gap-2"
      >
        <Send className="w-4 h-4" />
        {loading ? "Registrando..." : buttonText}
      </button>

      <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
        <Shield className="w-3.5 h-3.5 text-slate-400" />
        <span>Tus datos se manejan con estricta confidencialidad.</span>
      </div>
    </form>
  );
};
