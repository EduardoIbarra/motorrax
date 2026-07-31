"use client";

import React, { useState } from "react";
import { BMW_MODELS_DATA, BmwModelData } from "@/lib/data/bmw-models";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { CheckCircle2, Sparkles, ArrowRight, RotateCcw, Award, ChevronRight } from "lucide-react";
import Link from "next/link";

interface ScoredModel {
  model: BmwModelData;
  score: number;
  matchPercentage: number;
  reasons: string[];
}

export const BMWFinderWidget = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    budget: "",
    height: "",
    passenger: "",
    terrain: "",
    experience: "",
  });
  const [recommendations, setRecommendations] = useState<ScoredModel[]>([]);

  const questions = [
    {
      id: "budget",
      question: "¿Cuál es tu presupuesto estimado para tu nueva BMW?",
      options: [
        { label: "Hasta $250,000 MXN (Entrada / Movilidad Urbana)", value: "entry" },
        { label: "Entre $250,000 y $400,000 MXN (Gama Media / Versátil)", value: "mid" },
        { label: "Entre $400,000 y $550,000 MXN (Gama Alta / High Performance)", value: "high" },
        { label: "Más de $550,000 MXN (Full Spec / M Series / Luxury Tourer)", value: "ultra" },
      ],
    },
    {
      id: "height",
      question: "¿Cuál es tu estatura aproximada?",
      options: [
        { label: "Menos de 1.70 m", value: "short" },
        { label: "Entre 1.70 m y 1.83 m", value: "average" },
        { label: "Más de 1.83 m", value: "tall" },
      ],
    },
    {
      id: "terrain",
      question: "¿En qué tipo de caminos planeas rodar principalmente?",
      options: [
        { label: "Movilidad urbana / Tráfico diario y ciudad", value: "city" },
        { label: "100% Asfalto, autopistas y curvas deportivas", value: "road" },
        { label: "Rutas largas de viaje y Gran Turismo", value: "touring" },
        { label: "Terracería, rutas mixtas y Off-Road de Aventura", value: "offroad" },
      ],
    },
    {
      id: "passenger",
      question: "¿Acostumbras viajar con acompañante o equipaje pesado?",
      options: [
        { label: "Casi siempre solo", value: "solo" },
        { label: "Ocasionalmente con acompañante", value: "occasional" },
        { label: "Frecuentemente con copiloto y maletas llenas", value: "touring" },
      ],
    },
    {
      id: "experience",
      question: "¿Cuál es tu nivel de experiencia en motocicletas?",
      options: [
        { label: "Principiante / Mi primera motocicleta BMW", value: "beginner" },
        { label: "Intermedio (Buscando cilindrada media o polivalencia)", value: "intermediate" },
        { label: "Avanzado / Piloto experimentado de alta potencia", value: "advanced" },
      ],
    },
  ];

  const calculateRecommendations = (ans: typeof answers): ScoredModel[] => {
    return BMW_MODELS_DATA.map((m) => {
      let score = 0;
      const reasons: string[] = [];

      // 1. Budget scoring (Max 30 pts)
      if (ans.budget === "entry") {
        if (m.msrpMxn <= 250000) {
          score += 30;
          reasons.push("Se ajusta perfectamente a tu presupuesto inicial.");
        } else if (m.msrpMxn <= 350000) {
          score += 15;
        }
      } else if (ans.budget === "mid") {
        if (m.msrpMxn >= 220000 && m.msrpMxn <= 420000) {
          score += 30;
          reasons.push("Dentro del rango óptimo de inversión deseado.");
        } else if (m.msrpMxn < 220000) {
          score += 20;
          reasons.push("Por debajo de tu tope de presupuesto.");
        } else if (m.msrpMxn <= 520000) {
          score += 10;
        }
      } else if (ans.budget === "high") {
        if (m.msrpMxn >= 380000 && m.msrpMxn <= 560000) {
          score += 30;
          reasons.push("Equipamiento de gama alta dentro de tu presupuesto.");
        } else if (m.msrpMxn >= 250000 && m.msrpMxn < 380000) {
          score += 20;
        } else score += 10;
      } else if (ans.budget === "ultra") {
        if (m.msrpMxn >= 540000) {
          score += 30;
          reasons.push("Máxima especificación y exclusividad BMW.");
        } else if (m.msrpMxn >= 450000) {
          score += 22;
        } else score += 12;
      }

      // 2. Terrain & Usage scoring (Max 30 pts)
      if (ans.terrain === "city") {
        if (m.category === "Urban Mobility") {
          score += 30;
          reasons.push("Diseño y agilidad идеа formal para la ciudad.");
        } else if (m.category === "Roadster" && m.engineCapacityCc <= 900) {
          score += 26;
          reasons.push("Agilidad urbana con respuesta ágil de Roadster.");
        } else if (m.slug === "g310gs") {
          score += 24;
        } else if (m.category === "Heritage") {
          score += 20;
        } else score += 10;
      } else if (ans.terrain === "road") {
        if (m.category === "Sport" || m.category === "Roadster") {
          score += 30;
          reasons.push("Dinámica deportiva impecable para asfalto y curvas.");
        } else if (m.category === "Heritage") {
          score += 24;
        } else if (m.category === "Tour") {
          score += 22;
        } else if (m.category === "Adventure") {
          score += 18;
        } else score += 10;
      } else if (ans.terrain === "touring") {
        if (m.category === "Tour") {
          score += 30;
          reasons.push("Confort touring de nivel presidencial para largos trayectos.");
        } else if (["r1300gs", "r1300gs-adventure", "f900gs-adventure", "s1000xr", "f900xr", "r18classic"].includes(m.slug)) {
          score += 28;
          reasons.push("Excelente protección eólica y ergonomía para viajes lejanos.");
        } else if (m.category === "Adventure") {
          score += 22;
        } else score += 10;
      } else if (ans.terrain === "offroad") {
        if (["f900gs", "f900gs-adventure", "r1300gs", "r1300gs-adventure", "r12gs"].includes(m.slug)) {
          score += 30;
          reasons.push("Capacidades todoterreno legendarias del segmento GS.");
        } else if (m.category === "Adventure") {
          score += 26;
          reasons.push("Geometría de aventura lista para terracerías.");
        } else score += 0;
      }

      // 3. Passenger & Cargo scoring (Max 15 pts)
      if (ans.passenger === "solo") {
        if (["s1000rr", "m1000rr", "s1000r", "m1000r", "g310r", "f900r", "ce02"].includes(m.slug)) {
          score += 15;
          reasons.push("Enfoque deportivo ligero para piloto solitario.");
        } else score += 12;
      } else if (ans.passenger === "occasional") {
        if (m.category === "Adventure" || m.category === "Sport" || m.category === "Heritage" || m.category === "Urban Mobility") {
          score += 15;
          reasons.push("Equilibrio entre dinamismo y confort para copiloto ocasional.");
        } else score += 12;
      } else if (ans.passenger === "touring") {
        if (m.category === "Tour" || ["r1300gs", "r1300gs-adventure", "f900gs-adventure", "s1000xr", "f900xr", "r18classic"].includes(m.slug)) {
          score += 15;
          reasons.push("Soporte completo para copiloto y capacidad de equipaje.");
        } else if (m.category === "Adventure") {
          score += 12;
        } else score += 2;
      }

      // 4. Experience scoring (Max 15 pts)
      if (ans.experience === "beginner") {
        if (m.powerHp <= 48) {
          score += 15;
          reasons.push("Potencia dócil y fácil control para tus inicios.");
        } else if (m.powerHp <= 90) {
          score += 10;
        } else score += 2;
      } else if (ans.experience === "intermediate") {
        if (m.powerHp >= 75 && m.powerHp <= 125) {
          score += 15;
          reasons.push("Potencia ideal de cilindrada media para acelerar tu desarrollo.");
        } else if (m.powerHp < 75) {
          score += 12;
        } else score += 8;
      } else if (ans.experience === "advanced") {
        if (m.powerHp >= 135) {
          score += 15;
          reasons.push("Alto rendimiento (135+ HP) acorde a tu destreza.");
        } else if (m.powerHp >= 100) {
          score += 12;
        } else score += 6;
      }

      // 5. Ergonomics / Height scoring (Max 10 pts)
      if (ans.height === "short") {
        if (m.seatHeightMm <= 815) {
          score += 10;
          reasons.push("Altura de asiento accesible (" + m.seatHeightMm + " mm) para total confianza.");
        } else if (m.seatHeightMm <= 840) {
          score += 6;
        } else score += 2;
      } else if (ans.height === "average") {
        if (m.seatHeightMm >= 790 && m.seatHeightMm <= 860) {
          score += 10;
        } else score += 7;
      } else if (ans.height === "tall") {
        if (m.seatHeightMm >= 840) {
          score += 10;
          reasons.push("Ergonomía amplia y postura holgada para pilotos altos.");
        } else score += 6;
      }

      const matchPercentage = Math.min(99, Math.max(65, Math.round((score / 100) * 100)));

      return {
        model: m,
        score,
        matchPercentage,
        reasons: Array.from(new Set(reasons)).slice(0, 3),
      };
    }).sort((a, b) => b.score - a.score);
  };

  const handleSelectOption = (key: string, value: string) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const results = calculateRecommendations(updated);
      setRecommendations(results);
      setStep(questions.length);
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({ budget: "", height: "", passenger: "", terrain: "", experience: "" });
    setRecommendations([]);
  };

  const topMatch = recommendations[0];
  const runnerUps = recommendations.slice(1, 3);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xl max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">BMW Finder Interactive</h3>
            <p className="text-xs text-slate-500">Evaluación inteligente entre los 28 modelos oficial BMW</p>
          </div>
        </div>
        {step > 0 && (
          <button
            onClick={handleReset}
            className="text-xs text-slate-400 hover:text-slate-700 flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reiniciar
          </button>
        )}
      </div>

      {/* Quiz Body */}
      {step < questions.length ? (
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
              Paso {step + 1} de {questions.length}
            </span>
            <span className="text-xs text-slate-400">
              {Math.round(((step + 1) / questions.length) * 100)}% completado
            </span>
          </div>

          <div className="w-full bg-slate-100 h-2 rounded-full mb-8 overflow-hidden">
            <div
              className="bg-sky-600 h-full transition-all duration-300"
              style={{ width: `${((step + 1) / questions.length) * 100}%` }}
            ></div>
          </div>

          <h4 className="text-lg font-bold text-slate-900 mb-6">{questions[step].question}</h4>

          <div className="space-y-3">
            {questions[step].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(questions[step].id, opt.value)}
                className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-sky-500 hover:bg-sky-50/50 transition-all font-medium text-slate-800 flex items-center justify-between group"
              >
                <span>{opt.label}</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Results */
        topMatch && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-200">
                <CheckCircle2 className="w-4 h-4" />
                Recomendación Principal ({topMatch.matchPercentage}% de Compatibilidad)
              </div>

              {/* Main Model Image Card */}
              {topMatch.model.heroImage && (
                <div className="relative w-full max-w-lg mx-auto h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md group">
                  <img
                    src={topMatch.model.heroImage}
                    alt={topMatch.model.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 bg-sky-500 text-white rounded-md mb-1 inline-block">
                      {topMatch.model.category}
                    </span>
                    <h4 className="text-2xl font-black text-white drop-shadow-sm">{topMatch.model.name}</h4>
                  </div>
                </div>
              )}

              {!topMatch.model.heroImage && (
                <div>
                  <h4 className="text-3xl font-extrabold text-slate-900">{topMatch.model.name}</h4>
                </div>
              )}

              <p className="text-sm text-slate-600 mt-2 max-w-xl mx-auto">{topMatch.model.description}</p>

              {/* Match reasons */}
              {topMatch.reasons.length > 0 && (
                <div className="bg-sky-50/60 p-4 rounded-xl border border-sky-100 max-w-lg mx-auto text-left">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-800 block mb-2">
                    ¿Por qué es perfecta para ti?
                  </span>
                  <ul className="space-y-1.5 text-xs text-sky-950 font-medium">
                    {topMatch.reasons.map((r, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-sky-500 font-bold">•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 max-w-md mx-auto">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block mb-1">
                  Precio de Lista Sugerido
                </span>
                <PriceDisplay amount={topMatch.model.msrpMxn} className="text-3xl font-black text-slate-900" />
              </div>

              <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto text-left text-xs bg-white p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 block font-medium">Potencia</span>
                  <span className="font-bold text-slate-900 text-sm">{topMatch.model.powerHp} HP</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Torque</span>
                  <span className="font-bold text-slate-900 text-sm">{topMatch.model.torqueNm} Nm</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Altura Asiento</span>
                  <span className="font-bold text-slate-900 text-sm">{topMatch.model.seatHeightMm} mm</span>
                </div>
              </div>

              {(() => {
                const waMessage = `Hola Eduardo, utilicé el BMW Finder Interactive y obtendría los siguientes resultados de recomendación:

🥇 1º Opción: ${topMatch.model.name} (${topMatch.matchPercentage}% compatibilidad)
${runnerUps[0] ? `🥈 2º Opción: ${runnerUps[0].model.name} (${runnerUps[0].matchPercentage}% compatibilidad)\n` : ""}${runnerUps[1] ? `🥉 3º Opción: ${runnerUps[1].model.name} (${runnerUps[1].matchPercentage}% compatibilidad)\n` : ""}
Me gustaría recibir una cotización y asesoría personalizada.`;

                return (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                    <Link
                      href={`/modelos/${topMatch.model.slug}`}
                      className="w-full sm:w-auto px-6 py-3 bg-sky-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-sky-700 transition-all shadow-md shadow-sky-600/20"
                    >
                      Ver Ficha Completa
                    </Link>
                    <a
                      href={`https://wa.me/528125827777?text=${encodeURIComponent(waMessage)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto px-6 py-3 border border-slate-300 text-slate-800 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-all"
                    >
                      Cotizar con Eduardo Ibarra
                    </a>
                  </div>
                );
              })()}
            </div>

            {/* Runner up recommendations */}
            {runnerUps.length > 0 && (
              <div className="border-t border-slate-100 pt-6">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 text-center flex items-center justify-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-500" />
                  Otras Opciones Compatibles
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {runnerUps.map((item) => (
                    <Link
                      key={item.model.slug}
                      href={`/modelos/${item.model.slug}`}
                      className="p-4 rounded-xl border border-slate-200 hover:border-sky-400 hover:bg-slate-50/50 transition-all group flex flex-col justify-between overflow-hidden"
                    >
                      <div>
                        {item.model.heroImage && (
                          <div className="w-full h-32 rounded-lg overflow-hidden mb-3 bg-slate-900 relative">
                            <img
                              src={item.model.heroImage}
                              alt={item.model.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 bg-slate-900/80 backdrop-blur-sm text-white rounded-full border border-white/20">
                              {item.matchPercentage}% Match
                            </span>
                          </div>
                        )}
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors">
                            {item.model.name}
                          </span>
                          {!item.model.heroImage && (
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">
                              {item.matchPercentage}% Match
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-2 mb-3">{item.model.tagline}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                        <PriceDisplay amount={item.model.msrpMxn} className="font-bold text-slate-900" />
                        <span className="text-sky-600 font-bold flex items-center gap-0.5 text-[11px] group-hover:translate-x-0.5 transition-transform">
                          Ver modelo <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

