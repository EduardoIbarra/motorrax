"use client";

import React, { useState } from "react";
import { MessageSquare, Send, Bot, User, X, Sparkles } from "lucide-react";

export const AISalesWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "¡Hola! Soy el Asistente Virtual Inteligente de MOTORRAX + BMW Motorrad Monterrey. ¿En qué te puedo asesorar hoy sobre la gama BMW?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      let reply =
        "Excelente consulta. Con la nueva BMW R 1300 GS o F 900 GS obtienes tecnología de vanguardia y respaldo total de garantía. ¿Te gustaría agendar una prueba de manejo o solicitar una cotización personalizada con Eduardo Ibarra?";
      if (userMsg.toLowerCase().includes("precio") || userMsg.toLowerCase().includes("costo")) {
        reply =
          "Los precios van desde $348,000 MXN* para la F 900 GS hasta $625,000 MXN* para la ultra-exclusiva M 1000 XR. Recordando siempre que *Precios están sujetos a disponibilidad y cambios sin previo aviso. ¿Quieres calcular tu mensualidad?";
      } else if (userMsg.toLowerCase().includes("mantenimiento") || userMsg.toLowerCase().includes("servicio")) {
        reply =
          "Los servicios programados de BMW Motorrad Monterrey se realizan cada 10,000 km o 12 meses. Incluyen escaneo de diagnóstico digital BMW iD, cambio de aceite sintético y actualización de software.";
      }
      setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open ? (
        <div className="w-96 h-[500px] bg-white rounded-2xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-slate-950 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-sky-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold flex items-center gap-1">
                  AI Sales Assistant <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                </h4>
                <span className="text-[10px] text-slate-400">BMW Motorrad Expert</span>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.sender === "ai" && (
                  <div className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-xl max-w-[80%] leading-relaxed ${
                    m.sender === "user"
                      ? "bg-slate-900 text-white rounded-br-none"
                      : "bg-white text-slate-800 border border-slate-200 shadow-sm rounded-bl-none"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-[11px] text-slate-400 animate-pulse pl-8">
                Escribiendo respuesta...
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Pregunta sobre modelos, precios..."
              className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-sky-600"
            />
            <button
              onClick={handleSend}
              className="p-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-3 bg-slate-950 text-white font-bold text-xs rounded-full shadow-2xl hover:scale-105 transition-all border border-slate-800 flex items-center space-x-2 group"
        >
          <div className="w-7 h-7 rounded-full bg-sky-600 flex items-center justify-center group-hover:bg-sky-500 transition-colors">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span>AI Assistant BMW</span>
        </button>
      )}
    </div>
  );
};
