"use client";

import React from "react";
import { FileText, Edit, Plus, Globe, Eye } from "lucide-react";
import Link from "next/link";

export default function ContentCMSPage() {
  const contentItems = [
    { title: "Landing Especial BMW R 1300 GS 2026", type: "Landing Page", slug: "/landings/r1300gs", views: 18600 },
    { title: "BMW R 1300 GS vs Honda Africa Twin", type: "Comparativa", slug: "/comparativas", views: 24500 },
    { title: "Guía de Selección de Maxi-Trail en Monterrey", type: "Blog Article", slug: "/blog/guia-maxi-trail", views: 12400 },
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="border-b border-slate-200 pb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Administrador de Contenidos</span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">CMS & Publicaciones</h1>
          <p className="text-xs text-slate-500 mt-1">Gestión de landing pages, catálogo de modelos BMW, artículos y SEO.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contentItems.map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="px-2.5 py-0.5 bg-slate-100 font-mono text-[10px] rounded font-bold text-slate-600 uppercase">
                {item.type}
              </span>
              <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
              <span className="text-xs text-slate-400 block">{item.views.toLocaleString()} vistas</span>
            </div>

            <Link
              href={item.slug}
              target="_blank"
              className="w-full text-center py-2.5 bg-slate-900 hover:bg-sky-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <Globe className="w-4 h-4" />
              Ver Página en Vivo
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
