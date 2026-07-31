import { db } from "./index";
import { users, bmwModels, bmwModelSpecs, inventory, leads, opportunities, tasks, campaigns } from "./schema";
import { BMW_MODELS_DATA } from "../lib/data/bmw-models";
import { sql } from "drizzle-orm";

export async function resetAndSeedAllBmwModels() {
  console.log("🔥 Resetting & Seeding ALL 28 Official BMW Motorrad Mexico Models into Neon DB...");

  try {
    // 1. Ensure Super Admin User exists
    await db
      .insert(users)
      .values({
        name: "Eduardo Ibarra",
        email: "eduardoibarra904@gmail.com",
        passwordHash: "?Str0ngbacker",
        role: "superadmin",
        phone: "8125827777",
        avatarUrl: "/images/eduardo_profile.jpg",
      })
      .onConflictDoNothing({ target: users.email });

    // 2. Clear old models & spec rows
    await db.execute(sql`ALTER TABLE bmw_models ADD COLUMN IF NOT EXISTS hero_image text;`);
    await db.execute(sql`ALTER TABLE bmw_models ADD COLUMN IF NOT EXISTS gallery_images jsonb;`);
    await db.execute(sql`TRUNCATE TABLE bmw_model_specs CASCADE;`);
    await db.execute(sql`TRUNCATE TABLE bmw_models CASCADE;`);

    console.log("🧹 Cleared old model data.");

    // 3. Insert all 28 models and their specs rows
    let insertedCount = 0;
    for (const m of BMW_MODELS_DATA) {
      const [insertedModel] = await db
        .insert(bmwModels)
        .values({
          slug: m.slug,
          name: m.name,
          category: m.category,
          tagline: m.tagline,
          msrpMxn: String(m.msrpMxn),
          engineCapacityCc: m.engineCapacityCc,
          powerHp: m.powerHp,
          torqueNm: m.torqueNm,
          seatHeightMm: m.seatHeightMm,
          unladenWeightKg: m.unladenWeightKg,
          topSpeedKmh: m.topSpeedKmh,
          fuelEfficiencyKml: String(m.fuelEfficiencyKml),
          descriptionEs: m.description,
          pros: m.pros,
          cons: m.cons,
          colors: m.colors,
          accessories: m.accessories,
          heroImage: m.heroImage,
          galleryImages: m.galleryImages,
        })
        .returning();

      if (insertedModel && m.specs) {
        let order = 1;
        for (const s of m.specs) {
          await db.insert(bmwModelSpecs).values({
            modelId: insertedModel.id,
            specCategory: s.category,
            specKey: s.key,
            specValue: s.value,
            displayOrder: order++,
          });
        }
      }
      insertedCount++;
    }

    console.log(`🎉 Successfully seeded ALL ${insertedCount} Official BMW Motorrad Mexico Models & Fichas Técnicas!`);
  } catch (error) {
    console.error("❌ Error seeding all models:", error);
  }
}

// Execute seed function
resetAndSeedAllBmwModels();
