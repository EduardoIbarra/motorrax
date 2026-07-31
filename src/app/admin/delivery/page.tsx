"use client";

import React, { useState } from "react";
import { CheckSquare, Square, FileText, CheckCircle2, ShieldCheck, Download, Sparkles } from "lucide-react";

export default function DigitalDeliveryPage() {
  const [checklist, setChecklist] = useState([
    { id: 1, text: "Motocicleta detallada e inspección estética exterior", done: true },
    { id: 2, text: "Tanque de combustible lleno al 100%", done: true },
    { id: 3, text: "Factura original y documentación legal revisadas", done: true },
    { id: 4, text: "Garantía BMW Motorrad explicada y dada de alta en sistema", done: true },
    { id: 5, text: "Manual del propietario impreso entregado", done: true },
    { id: 6, text: "BMW ConnectedRide App configurada en teléfono del cliente", done: true },
    { id: 7, text: "Emparejamiento Bluetooth casco / intercomunicador realizado", done: false },
    { id: 8, text: "Explicación de pantalla TFT, modos de manejo y suspensión DSA", done: false },
    { id: 9, text: "Accesorios adicionales instalados y verificados", done: true },
    { id: 10, text: "Fotografía oficial de entrega y firma de conformidad recibida", done: false },
  ]);

  const [customerName, setCustomerName] = useState("Roberto Garza Sada");
  const [vin, setVin] = useState("WB10M0010RZE89012");
  const [model, setModel] = useState("BMW R 1300 GS Option 719");
  const [reportGenerated, setReportGenerated] = useState(false);

  const toggleStep = (id: number) => {
    setChecklist((prev) => prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
  };

  const completedCount = checklist.filter((i) => i.done).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-slate-200 pb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Post-Venta & Entrega</span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Checklist Digital de Entrega</h1>
          <p className="text-xs text-slate-500 mt-1">Proceso de 10 puntos de control para garantizar una entrega perfecta de la motocicleta.</p>
        </div>

        <div className="text-right">
          <span className="text-2xl font-black text-slate-900">{completedCount}/10</span>
          <span className="block text-[10px] uppercase font-bold text-slate-400">Puntos Completados</span>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div>
          <span className="text-slate-400 font-bold uppercase block text-[10px]">Cliente</span>
          <span className="font-bold text-slate-900 text-sm">{customerName}</span>
        </div>
        <div>
          <span className="text-slate-400 font-bold uppercase block text-[10px]">Modelo Entregado</span>
          <span className="font-bold text-slate-900 text-sm">{model}</span>
        </div>
        <div>
          <span className="text-slate-400 font-bold uppercase block text-[10px]">Serie / VIN</span>
          <span className="font-mono font-bold text-slate-900 text-sm">{vin}</span>
        </div>
      </div>

      {/* Checklist */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
        {checklist.map((item) => (
          <button
            key={item.id}
            onClick={() => toggleStep(item.id)}
            className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3 text-xs font-semibold ${
              item.done
                ? "bg-emerald-50/60 border-emerald-200 text-emerald-900"
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            {item.done ? (
              <CheckSquare className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            ) : (
              <Square className="w-5 h-5 text-slate-300 flex-shrink-0" />
            )}
            <span>
              {item.id}. {item.text}
            </span>
          </button>
        ))}
      </div>

      {/* PDF Report Trigger */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {reportGenerated ? (
          <div className="w-full p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Reporte PDF de Entrega Generado Correctamente
            </span>
            <button className="px-3 py-1 bg-emerald-600 text-white rounded text-[11px] font-bold">
              Descargar PDF
            </button>
          </div>
        ) : (
          <button
            onClick={() => setReportGenerated(true)}
            className="w-full py-4 bg-slate-950 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-sky-600 transition-colors shadow-lg flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Generar Reporte PDF Oficial de Entrega
          </button>
        )}
      </div>
    </div>
  );
}
