import { Check, Minus } from "lucide-react";

type Row = { feature: string; values: string[] };

export function ComparisonTable({ models, rows }: { models: string[]; rows: Row[] }) {
  return <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm"><table className="w-full min-w-[680px] border-collapse text-left text-sm"><caption className="sr-only">Comparación de modelos Carpuride {models.join(", ")}</caption><thead className="bg-slate-950 text-white"><tr><th scope="col" className="p-4 font-black">Característica</th>{models.map((model) => <th scope="col" className="p-4 font-black" key={model}>{model}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={row.feature} className={index % 2 ? "bg-slate-50" : "bg-white"}><th scope="row" className="p-4 font-bold text-slate-900">{row.feature}</th>{row.values.map((value, i) => <td key={`${row.feature}-${i}`} className="p-4 leading-6 text-slate-600">{value === "Sí" ? <span className="inline-flex items-center gap-1.5 font-bold text-emerald-700"><Check className="h-4 w-4" />Sí</span> : value === "No" ? <span className="inline-flex items-center gap-1.5"><Minus className="h-4 w-4" />No</span> : value}</td>)}</tr>)}</tbody></table></div>;
}

