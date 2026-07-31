import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { BMW_MODELS_DATA, BmwModelData } from "@/lib/data/bmw-models";

const DATA_FILE = path.join(process.cwd(), "src/lib/data/bmw-models.ts");

// Temporary in-memory state fallback if file system is read-only (e.g. Vercel serverless)
let inMemoryModels: BmwModelData[] | null = null;

function getModels(): BmwModelData[] {
  if (inMemoryModels) return inMemoryModels;
  return BMW_MODELS_DATA;
}

export async function GET() {
  return NextResponse.json({ success: true, data: getModels() });
}

export async function POST(request: Request) {
  try {
    const body: BmwModelData = await request.json();
    if (!body.slug || !body.name) {
      return NextResponse.json({ error: "Slug and Name are required" }, { status: 400 });
    }

    const currentModels = [...getModels()];
    const existingIndex = currentModels.findIndex((m) => m.slug === body.slug);

    if (existingIndex >= 0) {
      // Update existing model
      currentModels[existingIndex] = { ...currentModels[existingIndex], ...body };
    } else {
      // Add new model
      currentModels.unshift(body);
    }

    inMemoryModels = currentModels;

    // Persist to src/lib/data/bmw-models.ts in dev environment
    try {
      if (fs.existsSync(DATA_FILE)) {
        const fileContent = `export interface BmwModelData {\n  slug: string;\n  name: string;\n  tagline: string;\n  category: string;\n  msrpMxn: number;\n  engineCapacityCc: number;\n  powerHp: number;\n  torqueNm: number;\n  seatHeightMm: number;\n  unladenWeightKg: number;\n  topSpeedKmh: number;\n  fuelEfficiencyKml: number;\n  description: string;\n  heroImage: string;\n  galleryImages: string[];\n  pros: string[];\n  cons: string[];\n  colors: { name: string; hex: string }[];\n  accessories: { name: string; priceMxn: number }[];\n  faq?: { question: string; answer: string }[];\n  specs?: { category: string; key: string; value: string }[];\n}\n\nexport const BMW_MODELS_DATA: BmwModelData[] = ${JSON.stringify(currentModels, null, 2)};\n`;
        fs.writeFileSync(DATA_FILE, fileContent, "utf8");
      }
    } catch (fsErr) {
      console.warn("Could not write file to disk (likely serverless environment):", fsErr);
    }

    return NextResponse.json({ success: true, data: currentModels });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update models" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const currentModels = getModels().filter((m) => m.slug !== slug);
    inMemoryModels = currentModels;

    try {
      if (fs.existsSync(DATA_FILE)) {
        const fileContent = `export interface BmwModelData {\n  slug: string;\n  name: string;\n  tagline: string;\n  category: string;\n  msrpMxn: number;\n  engineCapacityCc: number;\n  powerHp: number;\n  torqueNm: number;\n  seatHeightMm: number;\n  unladenWeightKg: number;\n  topSpeedKmh: number;\n  fuelEfficiencyKml: number;\n  description: string;\n  heroImage: string;\n  galleryImages: string[];\n  pros: string[];\n  cons: string[];\n  colors: { name: string; hex: string }[];\n  accessories: { name: string; priceMxn: number }[];\n  faq?: { question: string; answer: string }[];\n  specs?: { category: string; key: string; value: string }[];\n}\n\nexport const BMW_MODELS_DATA: BmwModelData[] = ${JSON.stringify(currentModels, null, 2)};\n`;
        fs.writeFileSync(DATA_FILE, fileContent, "utf8");
      }
    } catch (fsErr) {
      console.warn("Could not write file to disk:", fsErr);
    }

    return NextResponse.json({ success: true, data: currentModels });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to delete model" }, { status: 500 });
  }
}
