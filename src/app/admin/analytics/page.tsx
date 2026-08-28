"use client";
import { useEffect, useState } from "react";
import { Activity, Eye, MousePointerClick, Route, Users } from "lucide-react";

type Data = {
  summary: {
    visitors: number;
    sessions: number;
    pageViews: number;
    conversions: number;
    conversionRate: number;
  };
  topPages: { path: string; views: number; conversions: number }[];
  sources: { source: string; count: number }[];
  devices: { device: string; count: number }[];
  funnel: { name: string; sessions: number }[];
  journeys: {
    sessionId: string;
    startedAt: string;
    device: string;
    source: string;
    steps: { name: string; path: string; label: string | null; time: string }[];
  }[];
};
const names: Record<string, string> = {
  page_view: "Visita",
  scroll_depth: "Lectura",
  cta_click: "CTA",
  form_start: "Inició formulario",
  generate_lead: "Lead",
  affiliate_click: "Afiliado",
  whatsapp_click: "WhatsApp",
  click: "Clic",
};

export default function AnalyticsPage() {
  const [days, setDays] = useState(30);
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    fetch(`/api/admin/analytics?days=${days}`)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then(setData)
      .catch(() => setError("No fue posible cargar la analítica."));
  }, [days]);
  if (!data)
    return (
      <div className="p-8">
        <h1 className="text-3xl font-black">Analítica de clientes</h1>
        <p className="mt-4 text-sm text-slate-500">
          {error || "Cargando datos reales…"}
        </p>
      </div>
    );
  const cards = [
    [Users, "Visitantes", data.summary.visitors],
    [Activity, "Sesiones", data.summary.sessions],
    [Eye, "Páginas vistas", data.summary.pageViews],
    [MousePointerClick, "Leads", data.summary.conversions],
  ] as const;
  return (
    <div className="mx-auto max-w-7xl space-y-8 p-5 sm:p-8">
      <header className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-sky-600">
            Datos first-party en tiempo real
          </p>
          <h1 className="mt-1 text-3xl font-black">
            Analítica, embudos y journeys
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Interacciones anónimas; no se guardan valores escritos en
            formularios.
          </p>
        </div>
        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold"
        >
          <option value={7}>7 días</option>
          <option value={30}>30 días</option>
          <option value={90}>90 días</option>
        </select>
      </header>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(([Icon, label, value]) => (
          <article
            key={label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <Icon className="h-5 w-5 text-sky-600" />
            <p className="mt-4 text-xs font-bold uppercase text-slate-400">
              {label}
            </p>
            <p className="mt-1 text-3xl font-black">{value.toLocaleString()}</p>
          </article>
        ))}
      </section>
      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-black">Embudo de conversión</h2>
          <p className="text-sm text-slate-500">
            Conversión total: {data.summary.conversionRate.toFixed(1)}%
          </p>
          <div className="mt-6 space-y-4">
            {data.funnel.map((step, i) => (
              <div key={step.name}>
                <div className="mb-1 flex justify-between text-xs font-bold">
                  <span>{names[step.name] || step.name}</span>
                  <span>{step.sessions} sesiones</span>
                </div>
                <div className="h-8 rounded-lg bg-slate-100">
                  <div
                    className="h-full min-w-1 rounded-lg bg-sky-600"
                    style={{
                      width: `${Math.max(2, data.funnel[0].sessions ? (step.sessions / data.funnel[0].sessions) * 100 : 0)}%`,
                    }}
                  />
                </div>
                {i > 0 && (
                  <p className="mt-1 text-[10px] text-slate-400">
                    {data.funnel[i - 1].sessions
                      ? (
                          (step.sessions / data.funnel[i - 1].sessions) *
                          100
                        ).toFixed(1)
                      : 0}
                    % del paso anterior
                  </p>
                )}
              </div>
            ))}
          </div>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-black">Fuentes de tráfico</h2>
          <div className="mt-5 divide-y divide-slate-100">
            {data.sources.map((x) => (
              <div
                key={x.source}
                className="flex justify-between gap-4 py-3 text-sm"
              >
                <span className="truncate">{x.source}</span>
                <strong>{x.count}</strong>
              </div>
            ))}
          </div>
          <h3 className="mt-6 font-black">Dispositivos</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {data.devices.map((x) => (
              <span
                key={x.device}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold"
              >
                {x.device}: {x.count}
              </span>
            ))}
          </div>
        </article>
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white">
        <h2 className="border-b border-slate-200 p-6 text-xl font-black">
          Páginas más visitadas
        </h2>
        <div className="divide-y divide-slate-100">
          {data.topPages.map((p) => (
            <div
              key={p.path}
              className="grid grid-cols-[1fr_auto_auto] gap-6 p-4 text-sm"
            >
              <span className="font-mono text-xs">{p.path}</span>
              <span>{p.views} vistas</span>
              <strong className="text-emerald-700">
                {p.conversions} leads
              </strong>
            </div>
          ))}
        </div>
      </section>
      <section>
        <div className="flex items-center gap-2">
          <Route className="h-5 w-5 text-sky-600" />
          <h2 className="text-xl font-black">Journeys recientes</h2>
        </div>
        <div className="mt-5 space-y-4">
          {data.journeys.map((j) => (
            <article
              key={j.sessionId}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="flex flex-wrap justify-between gap-2 text-xs text-slate-500">
                <span>
                  {new Date(j.startedAt).toLocaleString("es-MX")} · {j.device}
                </span>
                <span className="max-w-md truncate">{j.source}</span>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {j.steps.length ? (
                  j.steps.map((s, i) => (
                    <div
                      key={`${s.time}-${i}`}
                      className="flex items-center gap-2"
                    >
                      <span
                        className={`rounded-lg px-3 py-2 text-xs font-bold ${s.name === "generate_lead" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-700"}`}
                      >
                        {names[s.name] || s.name}: {s.path}
                      </span>
                      {i < j.steps.length - 1 && (
                        <span className="text-slate-300">→</span>
                      )}
                    </div>
                  ))
                ) : (
                  <span className="text-xs text-slate-400">
                    Sin pasos relevantes
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
