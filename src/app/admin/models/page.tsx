"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bike,
  Plus,
  Search,
  Upload,
  Trash2,
  Edit,
  ExternalLink,
  Image as ImageIcon,
  Save,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { BmwModelData } from "@/lib/data/bmw-models";

export default function ModelsAdminPage() {
  const [models, setModels] = useState<BmwModelData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Modal & Form State
  const [editingModel, setEditingModel] = useState<BmwModelData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/models");
      const json = await res.json();
      if (json.success) {
        setModels(json.data);
      }
    } catch (err) {
      console.error("Failed to load models", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    setEditingModel({
      slug: "",
      name: "",
      tagline: "",
      category: "Adventure",
      msrpMxn: 250000,
      engineCapacityCc: 800,
      powerHp: 85,
      torqueNm: 83,
      seatHeightMm: 820,
      unladenWeightKg: 200,
      topSpeedKmh: 200,
      fuelEfficiencyKml: 22,
      description: "",
      heroImage: "",
      galleryImages: [],
      pros: ["Gran versatilidad", "Excelente equipamiento de serie"],
      cons: ["Precio de mantenimiento oficial"],
      colors: [{ name: "Blackstorm Metallic", hex: "#111111" }],
      accessories: [{ name: "Maletas Laterales de Aluminio", priceMxn: 24500 }],
    });
    setIsModalOpen(true);
  };

  const handleEdit = (model: BmwModelData) => {
    setEditingModel(JSON.parse(JSON.stringify(model)));
    setIsModalOpen(true);
  };

  const handleDelete = async (slug: string, name: string) => {
    if (!confirm(`¿Seguro que deseas eliminar la motocicleta ${name}?`)) return;
    try {
      const res = await fetch(`/api/models?slug=${slug}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setModels(json.data);
        setStatusMessage({ type: "success", text: `Modelo ${name} eliminado con éxito` });
      }
    } catch (err) {
      setStatusMessage({ type: "error", text: "Error al eliminar el modelo" });
    }
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>, isHero: boolean) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !editingModel) return;

    if (isHero) setUploadingHero(true);
    else setUploadingGallery(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("slug", editingModel.slug || "new-model");

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const json = await res.json();

        if (json.success) {
          if (isHero) {
            setEditingModel((prev) => (prev ? { ...prev, heroImage: json.url } : null));
          } else {
            setEditingModel((prev) =>
              prev ? { ...prev, galleryImages: [...prev.galleryImages, json.url] } : null
            );
          }
        }
      }
    } catch (err) {
      alert("Error al subir imagen a Cloudinary");
    } finally {
      setUploadingHero(false);
      setUploadingGallery(false);
    }
  };

  const handleSaveModel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingModel || !editingModel.slug || !editingModel.name) {
      alert("Por favor completa al menos el Nombre y Slug del modelo");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingModel),
      });
      const json = await res.json();

      if (json.success) {
        setModels(json.data);
        setIsModalOpen(false);
        setEditingModel(null);
        setStatusMessage({ type: "success", text: `Guardado correctamente ${editingModel.name}` });
      } else {
        alert(json.error || "Error al guardar el modelo");
      }
    } catch (err) {
      alert("Error de red al guardar el modelo");
    } finally {
      setSaving(false);
    }
  };

  const categories = Array.from(new Set(models.map((m) => m.category)));

  const filteredModels = models.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.slug.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || m.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 md:p-8 space-y-8 bg-slate-50 min-h-screen text-slate-900">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-sky-600 text-white rounded-xl shadow-md shadow-sky-600/20">
              <Bike className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900">
                Gestor de Modelos BMW
              </h1>
              <p className="text-sm text-slate-500 font-medium">
                Catálogo central de motocicletas y galería Cloudinary CDN
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleCreateNew}
          className="inline-flex items-center justify-center space-x-2 bg-sky-600 hover:bg-sky-700 text-white font-bold px-5 py-3 rounded-xl shadow-lg shadow-sky-600/25 transition-all text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Agregar Nuevo Modelo</span>
        </button>
      </div>

      {/* Notification Toast */}
      {statusMessage && (
        <div
          className={`flex items-center justify-between p-4 rounded-xl text-sm font-medium ${
            statusMessage.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          <div className="flex items-center space-x-2">
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600" />
            )}
            <span>{statusMessage.text}</span>
          </div>
          <button onClick={() => setStatusMessage(null)}>
            <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
          </button>
        </div>
      )}

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar modelo o slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white font-medium"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setCategoryFilter("all")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              categoryFilter === "all"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Todos ({models.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                categoryFilter === cat
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat} ({models.filter((m) => m.category === cat).length})
            </button>
          ))}
        </div>
      </div>

      {/* Models Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400 space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-sky-600" />
          <p className="text-sm font-medium">Cargando modelos de motocicletas...</p>
        </div>
      ) : filteredModels.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <Bike className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">No se encontraron motocicletas</h3>
          <p className="text-xs text-slate-400 mt-1">Prueba con otra búsqueda o categoría.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModels.map((model) => (
            <div
              key={model.slug}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Hero Preview Image */}
                <div className="relative h-48 bg-slate-900 overflow-hidden">
                  {model.heroImage ? (
                    <Image
                      src={model.heroImage}
                      alt={model.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-600">
                      <ImageIcon className="w-8 h-8 mb-1" />
                      <span className="text-xs">Sin Imagen Hero</span>
                    </div>
                  )}
                  <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg border border-white/10">
                    {model.category}
                  </span>
                  <span className="absolute top-3 right-3 bg-sky-600 text-white text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg shadow-sm">
                    ${model.msrpMxn ? model.msrpMxn.toLocaleString("es-MX") : 0} MXN
                  </span>
                </div>

                {/* Content Details */}
                <div className="p-5 space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-black text-slate-900 group-hover:text-sky-600 transition-colors">
                        {model.name}
                      </h3>
                      <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                        /{model.slug}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1 font-medium">
                      {model.tagline || model.description}
                    </p>
                  </div>

                  {/* Specs Quick Pills */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-[11px]">
                    <div className="bg-slate-50 p-2 rounded-xl text-center">
                      <span className="block text-[9px] uppercase font-bold text-slate-400">Motor</span>
                      <span className="font-mono font-bold text-slate-800">{model.engineCapacityCc} cc</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-xl text-center">
                      <span className="block text-[9px] uppercase font-bold text-slate-400">Potencia</span>
                      <span className="font-mono font-bold text-slate-800">{model.powerHp} hp</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-xl text-center">
                      <span className="block text-[9px] uppercase font-bold text-slate-400">Galería</span>
                      <span className="font-mono font-bold text-sky-600">
                        {model.galleryImages?.length || 0} fotos
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/modelos/${model.slug}`}
                  target="_blank"
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-sky-600"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Ver en Vivo</span>
                </Link>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(model)}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Editar</span>
                  </button>

                  <button
                    onClick={() => handleDelete(model.slug, model.name)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                    title="Eliminar modelo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EDIT / CREATE MODEL MODAL */}
      {isModalOpen && editingModel && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-auto">
            {/* Modal Header */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-sky-600 rounded-xl">
                  <Bike className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black">
                    {editingModel.slug ? `Editar ${editingModel.name}` : "Agregar Nueva Motocicleta"}
                  </h2>
                  <p className="text-xs text-slate-400">
                    Sube imágenes a Cloudinary y ajusta las especificaciones
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSaveModel} className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* SECTION: Basic Info */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-sky-600 flex items-center space-x-2 border-b border-slate-100 pb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Información General</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nombre del Modelo *</label>
                    <input
                      type="text"
                      required
                      value={editingModel.name}
                      onChange={(e) =>
                        setEditingModel({
                          ...editingModel,
                          name: e.target.value,
                          slug: editingModel.slug || e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ""),
                        })
                      }
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-sky-500 focus:bg-white"
                      placeholder="BMW R 1300 GS"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Slug URL *</label>
                    <input
                      type="text"
                      required
                      value={editingModel.slug}
                      onChange={(e) => setEditingModel({ ...editingModel, slug: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-medium focus:ring-2 focus:ring-sky-500 focus:bg-white"
                      placeholder="r1300gs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Categoría</label>
                    <select
                      value={editingModel.category}
                      onChange={(e) => setEditingModel({ ...editingModel, category: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-sky-500 focus:bg-white"
                    >
                      <option value="Adventure">Adventure</option>
                      <option value="Roadster">Roadster</option>
                      <option value="Heritage">Heritage</option>
                      <option value="Sport">Sport</option>
                      <option value="Touring">Touring</option>
                      <option value="Urban Mobility">Urban Mobility</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Eslogan / Tagline</label>
                    <input
                      type="text"
                      value={editingModel.tagline || ""}
                      onChange={(e) => setEditingModel({ ...editingModel, tagline: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-sky-500 focus:bg-white"
                      placeholder="La reina indomable del segmento Adventure."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Precio MSRP (MXN)</label>
                    <input
                      type="number"
                      value={editingModel.msrpMxn || 0}
                      onChange={(e) =>
                        setEditingModel({ ...editingModel, msrpMxn: parseInt(e.target.value) || 0 })
                      }
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-emerald-700 focus:ring-2 focus:ring-sky-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Descripción Completa</label>
                  <textarea
                    rows={3}
                    value={editingModel.description || ""}
                    onChange={(e) => setEditingModel({ ...editingModel, description: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-sky-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* SECTION: Cloudinary Image Uploads */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-sky-600 flex items-center space-x-2 border-b border-slate-100 pb-2">
                  <Upload className="w-4 h-4" />
                  <span>Imágenes Cloudinary CDN</span>
                </h3>

                {/* Hero Image */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Imagen Principal (Hero)</h4>
                      <p className="text-[11px] text-slate-500">
                        Imagen destacada para tarjetas y portada del modelo.
                      </p>
                    </div>
                    <label className="inline-flex items-center space-x-2 cursor-pointer bg-sky-600 hover:bg-sky-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm">
                      {uploadingHero ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Upload className="w-3.5 h-3.5" />
                      )}
                      <span>{uploadingHero ? "Subiendo..." : "Subir Hero a Cloudinary"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleUploadImage(e, true)}
                        disabled={uploadingHero}
                      />
                    </label>
                  </div>

                  {editingModel.heroImage ? (
                    <div className="relative h-40 w-full max-w-md rounded-xl overflow-hidden border border-slate-300">
                      <Image
                        src={editingModel.heroImage}
                        alt="Hero Preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">No hay imagen Hero asignada.</p>
                  )}
                  <input
                    type="text"
                    placeholder="O pega directamente un URL de Cloudinary..."
                    value={editingModel.heroImage || ""}
                    onChange={(e) => setEditingModel({ ...editingModel, heroImage: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                  />
                </div>

                {/* Gallery Images */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Galería de Fotos ({editingModel.galleryImages?.length || 0})</h4>
                      <p className="text-[11px] text-slate-500">
                        Fotos secundarias del modelo para el carrusel de detalles.
                      </p>
                    </div>
                    <label className="inline-flex items-center space-x-2 cursor-pointer bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm">
                      {uploadingGallery ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" />
                      )}
                      <span>{uploadingGallery ? "Subiendo..." : "Agregar Fotos a Galería"}</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleUploadImage(e, false)}
                        disabled={uploadingGallery}
                      />
                    </label>
                  </div>

                  {editingModel.galleryImages && editingModel.galleryImages.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      {editingModel.galleryImages.map((imgUrl, idx) => (
                        <div
                          key={idx}
                          className="relative h-24 rounded-xl overflow-hidden border border-slate-300 group"
                        >
                          <Image src={imgUrl} alt={`Gallery ${idx}`} fill className="object-cover" unoptimized />
                          <button
                            type="button"
                            onClick={() =>
                              setEditingModel({
                                ...editingModel,
                                galleryImages: editingModel.galleryImages.filter((_, i) => i !== idx),
                              })
                            }
                            className="absolute top-1 right-1 p-1 bg-rose-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Eliminar de galería"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">No hay imágenes en la galería aún.</p>
                  )}
                </div>
              </div>

              {/* SECTION: Specifications */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-sky-600 flex items-center space-x-2 border-b border-slate-100 pb-2">
                  <Bike className="w-4 h-4" />
                  <span>Especificaciones Técnicas</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Cilindrada (cc)</label>
                    <input
                      type="number"
                      value={editingModel.engineCapacityCc || 0}
                      onChange={(e) =>
                        setEditingModel({ ...editingModel, engineCapacityCc: parseInt(e.target.value) || 0 })
                      }
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Potencia (hp)</label>
                    <input
                      type="number"
                      value={editingModel.powerHp || 0}
                      onChange={(e) =>
                        setEditingModel({ ...editingModel, powerHp: parseInt(e.target.value) || 0 })
                      }
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Torque (Nm)</label>
                    <input
                      type="number"
                      value={editingModel.torqueNm || 0}
                      onChange={(e) =>
                        setEditingModel({ ...editingModel, torqueNm: parseInt(e.target.value) || 0 })
                      }
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Altura Asiento (mm)</label>
                    <input
                      type="number"
                      value={editingModel.seatHeightMm || 0}
                      onChange={(e) =>
                        setEditingModel({ ...editingModel, seatHeightMm: parseInt(e.target.value) || 0 })
                      }
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Peso En Orden (kg)</label>
                    <input
                      type="number"
                      value={editingModel.unladenWeightKg || 0}
                      onChange={(e) =>
                        setEditingModel({ ...editingModel, unladenWeightKg: parseInt(e.target.value) || 0 })
                      }
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Velocidad Máx (km/h)</label>
                    <input
                      type="number"
                      value={editingModel.topSpeedKmh || 0}
                      onChange={(e) =>
                        setEditingModel({ ...editingModel, topSpeedKmh: parseInt(e.target.value) || 0 })
                      }
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-6 border-t border-slate-200 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 font-bold text-xs text-slate-600 hover:bg-slate-100 transition-all"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center space-x-2 bg-sky-600 hover:bg-sky-700 text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-sky-600/25 transition-all"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>{saving ? "Guardando..." : "Guardar Modelo"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
