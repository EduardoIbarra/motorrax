import { db } from "./index";
import { users, bmwModels, inventory, leads, opportunities, tasks, campaigns, activities } from "./schema";
import { BMW_MODELS_DATA } from "../lib/data/bmw-models";

export async function seedDatabase() {
  console.log("🌱 Starting Neon PostgreSQL database seeding...");

  try {
    // 1. Seed Main Super Admin User
    const [eduardoUser] = await db
      .insert(users)
      .values({
        name: "Eduardo Ibarra",
        email: "eduardoibarra904@gmail.com",
        passwordHash: "?Str0ngbacker",
        role: "superadmin",
        phone: "8125827777",
        avatarUrl: "/images/eduardo_profile.jpg",
      })
      .onConflictDoNothing({ target: users.email })
      .returning();

    const userId = eduardoUser?.id;
    console.log("✅ Super Admin User created:", eduardoUser?.email || "eduardoibarra904@gmail.com");

    // 2. Seed BMW Models
    for (const m of BMW_MODELS_DATA) {
      await db
        .insert(bmwModels)
        .values({
          slug: m.slug,
          name: m.name,
          category: m.category,
          msrpMxn: String(m.msrpMxn),
          engineCapacityCc: m.engineCapacityCc,
          powerHp: m.powerHp,
          torqueNm: m.torqueNm,
          seatHeightMm: m.seatHeightMm,
          unladenWeightKg: m.unladenWeightKg,
          descriptionEs: m.description,
          pros: m.pros,
          cons: m.cons,
          colors: m.colors,
          accessories: m.accessories,
        })
        .onConflictDoNothing({ target: bmwModels.slug });
    }
    console.log("✅ BMW 2026 Models catalog seeded.");

    // 3. Seed Inventory Units (Empty by default until real bikes are added)
    const inventoryItems: any[] = [];

    for (const item of inventoryItems) {
      await db.insert(inventory).values(item).onConflictDoNothing({ target: inventory.vin });
    }
    console.log("✅ Inventory units seed check completed.");

    // 4. Seed Marketing Campaigns
    const sampleCampaigns = [
      {
        name: "Google Search - BMW R1300GS Monterrey",
        channel: "google_ads",
        budgetMxn: "45000",
        spendMxn: "32000",
        leadsGenerated: 68,
        revenueMxn: "3584000",
        status: "active",
      },
      {
        name: "Meta Video Ads - M1000XR Launch",
        channel: "meta_ads",
        budgetMxn: "25000",
        spendMxn: "18500",
        leadsGenerated: 34,
        revenueMxn: "1875000",
        status: "active",
      },
      {
        name: "YouTube Reviews - Eduardo Ibarra Channel",
        channel: "organic",
        budgetMxn: "0",
        spendMxn: "0",
        leadsGenerated: 112,
        revenueMxn: "8200000",
        status: "active",
      },
    ];

    for (const camp of sampleCampaigns) {
      await db.insert(campaigns).values(camp);
    }
    console.log("✅ Marketing campaigns seeded.");

    // 5. Seed Leads & Opportunities
    const [lead1] = await db
      .insert(leads)
      .values({
        name: "Carlos Villarreal",
        email: "carlos.villarreal@ejemplo.com",
        phone: "8112345678",
        desiredModel: "BMW R 1300 GS Option 719",
        budgetMxn: "535000",
        score: 92,
        scoreLabel: "hot",
        status: "qualified",
        utmSource: "youtube",
        utmMedium: "organic_video",
        utmCampaign: "v_r1300gs_review",
        youtubeVideoId: "v_r1300gs_rayones",
        hasTradeIn: true,
        tradeInDetails: "BMW R 1250 GS 2021 (28,000 km)",
        requiresFinancing: true,
        buyingTimeline: "immediate",
        notes: "Cliente muy interesado en paquete Option 719 y suspensión de altura adaptativa.",
        assignedSalespersonId: userId,
      })
      .returning();

    if (lead1) {
      await db.insert(opportunities).values({
        leadId: lead1.id,
        title: "Venta BMW R 1300 GS - Carlos Villarreal",
        stage: "scheduled",
        valueMxn: "535000",
        assignedSalespersonId: userId,
      });

      await db.insert(tasks).values({
        title: "Confirmar Cita para Prueba de Manejo R1300GS",
        description: "Llamar a Carlos Villarreal para confirmar horario en showroom San Pedro.",
        dueDate: new Date(Date.now() + 86400000),
        priority: "high",
        status: "pending",
        assignedToId: userId,
        leadId: lead1.id,
      });
    }

    console.log("🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
}

// Auto-run if executed directly
if (require.main === module) {
  seedDatabase();
}
