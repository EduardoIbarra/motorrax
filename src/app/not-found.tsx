import Link from "next/link";
import { MessageCircle, Home, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center px-4 py-24 text-center min-h-[70vh]">
      <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-sky-600 mb-6">
        Error 404 • Página No Encontrada
      </div>
      <h1 className="mb-4 text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
        Parece que tomaste un desvío fuera de ruta
      </h1>
      <p className="mb-8 text-base text-slate-600 max-w-md">
        La página que buscas no existe o ha cambiado de ubicación. Te ayudamos a volver al camino indicado.
      </p>
      
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-slate-800 transition-all shadow-md"
        >
          <Home className="w-4 h-4" />
          Volver al Inicio
        </Link>
        <Link
          href="/modelos"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-800 hover:bg-slate-50 transition-all"
        >
          <Compass className="w-4 h-4 text-sky-600" />
          Ver Catálogo BMW
        </Link>
        <a
          href="https://wa.me/528125827777?text=Hola%20Eduardo,%20me%20encontré%20con%20un%20enlace%20roto%20en%20motorrax.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white hover:bg-emerald-700 transition-all shadow-md"
        >
          <MessageCircle className="w-4 h-4" />
          Contactar a Eduardo
        </a>
      </div>
    </div>
  );
}
