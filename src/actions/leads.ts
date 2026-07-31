"use server";

import { db } from "@/db";
import { leads, opportunities, activities } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { sendLeadEmails } from "@/lib/resend";

export interface CreateLeadInput {
  name: string;
  email: string;
  phone: string;
  desiredModel?: string;
  budgetMxn?: number;
  hasTradeIn?: boolean;
  requiresFinancing?: boolean;
  notes?: string;
  utmSource?: string;
  utmCampaign?: string;
  youtubeVideoId?: string;
}

export async function submitLeadAction(data: CreateLeadInput) {
  try {
    // Calculate initial lead score based on submitted interest
    let score = 50;
    if (data.requiresFinancing) score += 20;
    if (data.hasTradeIn) score += 15;
    if (data.desiredModel) score += 10;

    let scoreLabel = "warm";
    if (score >= 80) scoreLabel = "hot";
    if (score < 40) scoreLabel = "cold";

    // 1. Insert Lead into Neon PostgreSQL
    const [newLead] = await db
      .insert(leads)
      .values({
        name: data.name,
        email: data.email,
        phone: data.phone,
        desiredModel: data.desiredModel || "BMW R 1300 GS",
        budgetMxn: data.budgetMxn ? String(data.budgetMxn) : "512000",
        score,
        scoreLabel,
        status: "new",
        hasTradeIn: data.hasTradeIn || false,
        requiresFinancing: data.requiresFinancing || false,
        notes: data.notes || "Lead creado automáticamente desde la página web.",
        utmSource: data.utmSource || "website_form",
        utmCampaign: data.utmCampaign || "organic",
        youtubeVideoId: data.youtubeVideoId,
      })
      .returning();

    // 2. Automatically create associated Opportunity in Sales Pipeline Kanban
    if (newLead) {
      await db.insert(opportunities).values({
        leadId: newLead.id,
        title: `Oportunidad ${newLead.desiredModel} - ${newLead.name}`,
        stage: "new",
        valueMxn: newLead.budgetMxn || "512000",
      });

      // 3. Record initial activity touchpoint
      await db.insert(activities).values({
        leadId: newLead.id,
        type: "note",
        title: "Lead Registrado en Sitio Web",
        description: `Lead registrado interesado en ${newLead.desiredModel}. Score inicial: ${score}.`,
      });
    }

    revalidatePath("/admin/leads");
    revalidatePath("/admin/crm");
    revalidatePath("/admin/dashboard");

    // 4. Send emails via Resend (to Eduardo Ibarra and user)
    if (data.email) {
      try {
        await sendLeadEmails({
          name: data.name,
          email: data.email,
          phone: data.phone,
          desiredModel: data.desiredModel,
          hasTradeIn: data.hasTradeIn,
          requiresFinancing: data.requiresFinancing,
          notes: data.notes,
        });
      } catch (emailErr) {
        console.error("Error triggering Resend email notification:", emailErr);
      }
    }

    return { success: true, leadId: newLead?.id };
  } catch (error) {
    console.error("Error submitting lead to Neon DB:", error);
    return { success: false, error: "Failed to submit lead" };
  }
}

export async function getLeadsAction() {
  try {
    const allLeads = await db
      .select()
      .from(leads)
      .orderBy(leads.createdAt);
    
    // Sort descending by createdAt
    allLeads.reverse();
    return { success: true, leads: allLeads };
  } catch (error) {
    console.error("Error fetching leads from Neon DB:", error);
    return { success: false, leads: [], error: "Failed to fetch leads" };
  }
}
