import React from "react";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { MapPin, Bike, Sparkles, PhoneCall } from "lucide-react";
import Link from "next/link";
import { db } from "@/db";
import { inventory } from "@/db/schema";

export const dynamic = "force-dynamic";

export default async function InventoryPage() {
  let inventoryItems: Array<{
    id: string;
    vin: string;
    modelName: string;
    year: number;
    mileageKm: number;
    color: string;
    status: string;
    priceMxn: string | number;
    location: string;
  }> = [];

  try {
    const rawItems = await db.select().from(inventory);
    inventoryItems = rawItems || [];
  } catch (error) {
    console.error("Error fetching DB inventory:", error);
    inventoryItems = [];
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="border-b border-slate-200 pb-8 flex flex-col md:flex-row md:items-end justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Disponibilidad en Tiempo Real</span>
          <h1 className="text-4xl font-extrabold text-slate-900 mt-1">Inventario BMW Monterrey</h1>
          <p className="text-slate-500 text-sm mt-2 font-light">
            Unidades físicas en showroom, demos autorizadas y motocicletas en tránsito prioritario.
          </p>
        </div>
      </div>

      {inventoryItems.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-3xl mx-auto shadow-sm space-y-6">
          <div className="w-16 h-16 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center mx-auto border border-sky-100">
            <Bike className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">No hay unidades en inventario físico disponible en este momento</h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto font-light leading-relaxed">
              Actualmente todas las unidades de entrega inmediata han sido asignadas. Eduardo Ibarra gestiona pedidos directos a planta con prioridad en asignación de vin para tu nuevo BMW.
            </p>
          </div>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://wa.me/528125827777?text=Hola%20Eduardo,%20quiero%20consultar%20disponibilidad%20y%20tiempos%20de%20entrega%20para%20un%20BMW%20Motorrad"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Consultar Asignación por WhatsApp</span>
            </a>
            <Link
              href="/#cotizar-lead-form"
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span>Solicitar Cotización Personalizada</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {inventoryItems.map((item) => (
            <div
              key={item.vin || item.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md hover:shadow-xl transition-all space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-md ${
                      item.status === "available"
                        ? "bg-emerald-100 text-emerald-800"
                        : item.status === "reserved"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-sky-100 text-sky-800"
                    }`}
                  >
                    {item.status === "available"
                      ? "Disponible Entrega Inmediata"
                      : item.status === "reserved"
                      ? "Unidad Reservada"
                      : "Unidad Demo Autorizada"}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">VIN: {item.vin?.slice(-6)}</span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">{item.modelName}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.location}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-xs text-slate-700">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Año</span>
                    <span className="font-bold">{item.year}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Kilometraje</span>
                    <span className="font-bold">{item.mileageKm} km</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Color</span>
                    <span className="font-bold truncate block">{item.color}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <PriceDisplay amount={Number(item.priceMxn)} className="text-2xl font-black text-slate-900" />
                <a
                  href={`https://wa.me/528125827777?text=Hola%20Eduardo,%20me%20interesa%20la%20unidad%20con%20VIN%20${item.vin}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full text-center py-3 bg-sky-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-sky-700 transition-colors shadow-md shadow-sky-600/20"
                >
                  Apartar / Solicitar Informes
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
