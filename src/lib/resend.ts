import { Resend } from "resend";
import { BMW_MODELS_DATA } from "@/lib/data/bmw-models";

const resendApiKey = process.env.RESEND_API_KEY || "";
const resend = new Resend(resendApiKey);

const ADMIN_EMAIL = "eduardoibarra904@gmail.com";

interface SendLeadEmailsInput {
  name: string;
  email: string;
  phone: string;
  desiredModel?: string;
  hasTradeIn?: boolean;
  requiresFinancing?: boolean;
  notes?: string;
}

export async function sendLeadEmails(input: SendLeadEmailsInput) {
  if (!input.email || !input.email.includes("@")) {
    return { success: false, reason: "No valid user email provided" };
  }

  // Find model details if model requested
  let modelInfo = null;
  if (input.desiredModel) {
    const searchName = input.desiredModel.toLowerCase().trim();
    modelInfo = BMW_MODELS_DATA.find(
      (m) =>
        m.name.toLowerCase() === searchName ||
        searchName.includes(m.name.toLowerCase()) ||
        m.name.toLowerCase().includes(searchName) ||
        searchName.includes(m.slug.toLowerCase())
    );
  }

  const results = {
    adminEmail: false,
    userEmail: false,
    errors: [] as string[],
  };

  // 1. Send notification to admin (Eduardo Ibarra)
  try {
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h2 style="color: #0284c7; margin-top: 0;">⚡ Nuevo Lead Registrado en MOTORRAX</h2>
        <p>Se ha recibido una nueva solicitud de contacto a través del sitio web:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f1f5f9; width: 140px;">Nombre:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${input.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f1f5f9;">Email:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${input.email}">${input.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f1f5f9;">Teléfono:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;"><a href="tel:${input.phone}">${input.phone}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f1f5f9;">Modelo Solicitado:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #0284c7;">${input.desiredModel || "No especificado"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f1f5f9;">Financiamiento:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${input.requiresFinancing ? "Sí" : "No"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f1f5f9;">Moto a Cuenta:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${input.hasTradeIn ? "Sí" : "No"}</td>
          </tr>
          ${
            input.notes
              ? `
          <tr>
            <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f1f5f9;">Mensaje/Notas:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${input.notes}</td>
          </tr>`
              : ""
          }
        </table>
        
        <div style="margin-top: 24px; text-align: center;">
          <a href="https://wa.me/${input.phone.replace(/[^0-9]/g, "")}" style="display: inline-block; background-color: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Contactar por WhatsApp</a>
        </div>
      </div>
    `;

    const adminRes = await resend.emails.send({
      from: "MOTORRAX Leads <onboarding@resend.dev>",
      to: [ADMIN_EMAIL],
      subject: `⚡ Nuevo Lead MOTORRAX: ${input.name} - ${input.desiredModel || "Consulta general"}`,
      html: adminHtml,
    });

    if (adminRes.error) {
      results.errors.push(`Admin email error: ${adminRes.error.message}`);
    } else {
      results.adminEmail = true;
    }
  } catch (err: any) {
    results.errors.push(`Admin email exception: ${err?.message || err}`);
  }

  // 2. Send confirmation & enriched details to user
  try {
    let modelDetailsHtml = "";
    if (modelInfo) {
      modelDetailsHtml = `
        <div style="margin-top: 24px; padding: 20px; background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
          <h3 style="color: #0284c7; margin-top: 0; margin-bottom: 8px;">🏍️ Información de la ${modelInfo.name}</h3>
          <p style="font-style: italic; color: #64748b; margin-top: 0;">"${modelInfo.tagline}"</p>
          
          ${
            modelInfo.heroImage
              ? `<img src="${modelInfo.heroImage}" alt="${modelInfo.name}" style="width: 100%; max-height: 260px; object-fit: cover; border-radius: 8px; margin-bottom: 16px;" />`
              : ""
          }
          
          <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
            <tr>
              <td style="padding: 6px 0; color: #64748b;">Precio Base Sugerido:</td>
              <td style="padding: 6px 0; font-weight: bold; text-align: right;">$${Number(modelInfo.msrpMxn).toLocaleString("es-MX")} MXN</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b;">Cilindrada:</td>
              <td style="padding: 6px 0; font-weight: bold; text-align: right;">${modelInfo.engineCapacityCc} cc</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b;">Potencia:</td>
              <td style="padding: 6px 0; font-weight: bold; text-align: right;">${modelInfo.powerHp} HP</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b;">Torque:</td>
              <td style="padding: 6px 0; font-weight: bold; text-align: right;">${modelInfo.torqueNm} Nm</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b;">Altura de asiento:</td>
              <td style="padding: 6px 0; font-weight: bold; text-align: right;">${modelInfo.seatHeightMm} mm</td>
            </tr>
          </table>

          <div style="margin-top: 16px;">
            <p style="font-weight: bold; margin-bottom: 6px; font-size: 14px;">Highlights & Destacados:</p>
            <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #334155;">
              ${modelInfo.pros.map((p) => `<li style="margin-bottom: 4px;">${p}</li>`).join("")}
            </ul>
          </div>
        </div>
      `;
    }

    const userHtml = `
      <div style="font-family: Arial, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h2 style="color: #0284c7; margin-top: 0;">¡Hola, ${input.name}!</h2>
        <p>Hemos recibido tus datos correctamente en <strong>MOTORRAX</strong>. Eduardo Ibarra se pondrá en contacto contigo muy pronto a través de WhatsApp o correo para brindarte atención personalizada y resolver todas tus dudas.</p>
        
        <p>A continuación te compartimos un resumen de tu solicitud:</p>
        <ul>
          <li><strong>Modelo de Interés:</strong> ${input.desiredModel || "Consulta General"}</li>
          <li><strong>Teléfono de Contacto:</strong> ${input.phone}</li>
        </ul>

        ${modelDetailsHtml}

        <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 13px; color: #64748b; text-align: center;">
          <p style="margin: 0; font-weight: bold; color: #1e293b;">Eduardo Ibarra — MOTORRAX BMW Motorrad</p>
          <p style="margin: 4px 0 0 0;">Monterrey, Nuevo León, México</p>
          <p style="margin: 4px 0 0 0;">WhatsApp: +52 81 2582 7777</p>
        </div>
      </div>
    `;

    const userRes = await resend.emails.send({
      from: "Eduardo Ibarra - MOTORRAX <onboarding@resend.dev>",
      to: [input.email],
      subject: `¡Recibimos tu solicitud! ${input.desiredModel ? `- Detalles de ${input.desiredModel}` : ""} | MOTORRAX`,
      html: userHtml,
    });

    if (userRes.error) {
      results.errors.push(`User email error: ${userRes.error.message}`);
    } else {
      results.userEmail = true;
    }
  } catch (err: any) {
    results.errors.push(`User email exception: ${err?.message || err}`);
  }

  return results;
}
