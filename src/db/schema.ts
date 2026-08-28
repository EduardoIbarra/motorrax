import {
  pgTable,
  text,
  timestamp,
  integer,
  boolean,
  numeric,
  uuid,
  jsonb,
} from "drizzle-orm/pg-core";

// 1. Users & Roles
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash"),
  role: text("role").notNull().default("salesperson"), // superadmin, admin, sales_manager, salesperson, marketing, viewer
  avatarUrl: text("avatar_url"),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 2. Customers
export const customers = pgTable("customers", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  address: text("address"),
  companyName: text("company_name"),
  referralCode: text("referral_code"),
  marketingConsent: boolean("marketing_consent").default(true),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 3. BMW Models Catalog (Core Table)
export const bmwModels = pgTable("bmw_models", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  category: text("category").notNull(), // Adventure, Roadster, Heritage, Urban Mobility, Sport, M, Tour
  tagline: text("tagline"),
  msrpMxn: numeric("msrp_mxn").notNull(),
  engineCapacityCc: integer("engine_capacity_cc").notNull(),
  powerHp: integer("power_hp").notNull(),
  torqueNm: integer("torque_nm").notNull(),
  seatHeightMm: integer("seat_height_mm").notNull(),
  unladenWeightKg: integer("unladen_weight_kg").notNull(),
  topSpeedKmh: integer("top_speed_kmh").default(200),
  fuelEfficiencyKml: numeric("fuel_efficiency_kml").default("20.0"),
  descriptionEs: text("description_es").notNull(),
  pros: jsonb("pros").$type<string[]>(),
  cons: jsonb("cons").$type<string[]>(),
  colors: jsonb("colors").$type<{ name: string; hex: string }[]>(),
  accessories:
    jsonb("accessories").$type<{ name: string; priceMxn: number }[]>(),
  heroImage: text("hero_image"),
  galleryImages: jsonb("gallery_images").$type<string[]>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 4. Technical Data Detail Rows (Fichas Técnicas per Model)
export const bmwModelSpecs = pgTable("bmw_model_specs", {
  id: uuid("id").defaultRandom().primaryKey(),
  modelId: uuid("model_id")
    .references(() => bmwModels.id, { onDelete: "cascade" })
    .notNull(),
  specCategory: text("spec_category").notNull(), // Motor, Prestaciones / Consumo, Sistema Eléctrico, Transmisión, Chasis / Frenos, Dimensiones / Pesos
  specKey: text("spec_key").notNull(),
  specValue: text("spec_value").notNull(),
  displayOrder: integer("display_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 5. Inventory
export const inventory = pgTable("inventory", {
  id: uuid("id").defaultRandom().primaryKey(),
  vin: text("vin").notNull().unique(),
  modelName: text("model_name").notNull(),
  year: integer("year").notNull(),
  mileageKm: integer("mileage_km").notNull().default(0),
  color: text("color").notNull(),
  status: text("status").notNull().default("available"), // available, reserved, sold, incoming, demo
  priceMxn: numeric("price_mxn").notNull(),
  location: text("location").notNull().default("Monterrey Showroom"),
  assignedSalespersonId: uuid("assigned_salesperson_id").references(
    () => users.id,
  ),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 6. Leads
export const leads = pgTable("leads", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  desiredModel: text("desired_model"),
  budgetMxn: numeric("budget_mxn"),
  score: integer("score").default(50).notNull(), // 0 - 100
  scoreLabel: text("score_label").default("warm").notNull(), // cold, warm, hot
  status: text("status").notNull().default("new"), // new, contacted, qualified, lost, converted
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  youtubeVideoId: text("youtube_video_id"),
  referrerUrl: text("referrer_url"),
  hasTradeIn: boolean("has_trade_in").default(false),
  tradeInDetails: text("trade_in_details"),
  requiresFinancing: boolean("requires_financing").default(false),
  buyingTimeline: text("buying_timeline"), // immediate, 30_days, 60_days, 90_days
  notes: text("notes"),
  tags: jsonb("tags").$type<string[]>(),
  assignedSalespersonId: uuid("assigned_salesperson_id").references(
    () => users.id,
  ),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 7. Opportunities / Pipeline
export const opportunities = pgTable("opportunities", {
  id: uuid("id").defaultRandom().primaryKey(),
  leadId: uuid("lead_id")
    .references(() => leads.id)
    .notNull(),
  customerId: uuid("customer_id").references(() => customers.id),
  title: text("title").notNull(),
  stage: text("stage").notNull().default("new"), // new, qualified, contacted, scheduled, test_ride, negotiation, won, lost, archived
  valueMxn: numeric("value_mxn"),
  assignedSalespersonId: uuid("assigned_salesperson_id").references(
    () => users.id,
  ),
  lostReason: text("lost_reason"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 8. Tasks
export const tasks = pgTable("tasks", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  dueDate: timestamp("due_date").notNull(),
  priority: text("priority").notNull().default("medium"), // low, medium, high, urgent
  status: text("status").notNull().default("pending"), // pending, in_progress, completed, cancelled
  assignedToId: uuid("assigned_to_id").references(() => users.id),
  leadId: uuid("lead_id").references(() => leads.id),
  opportunityId: uuid("opportunity_id").references(() => opportunities.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 9. Activities & Notes
export const activities = pgTable("activities", {
  id: uuid("id").defaultRandom().primaryKey(),
  leadId: uuid("lead_id").references(() => leads.id),
  opportunityId: uuid("opportunity_id").references(() => opportunities.id),
  userId: uuid("user_id").references(() => users.id),
  type: text("type").notNull(), // call, email, whatsapp, meeting, note, stage_change
  title: text("title").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 10. Appointments
export const appointments = pgTable("appointments", {
  id: uuid("id").defaultRandom().primaryKey(),
  leadId: uuid("lead_id")
    .references(() => leads.id)
    .notNull(),
  type: text("type").notNull().default("test_ride"), // test_ride, showroom_visit, consultation
  scheduledAt: timestamp("scheduled_at").notNull(),
  status: text("status").notNull().default("scheduled"), // scheduled, completed, cancelled, rescheduled
  salespersonId: uuid("salesperson_id").references(() => users.id),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 11. Commissions
export const commissions = pgTable("commissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  salespersonId: uuid("salesperson_id")
    .references(() => users.id)
    .notNull(),
  opportunityId: uuid("opportunity_id")
    .references(() => opportunities.id)
    .notNull(),
  amountMxn: numeric("amount_mxn").notNull(),
  commissionRatePercent: numeric("commission_rate_percent")
    .notNull()
    .default("3.0"),
  status: text("status").notNull().default("pending"), // pending, approved, paid
  approvedAt: timestamp("approved_at"),
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 12. Marketing Campaigns
export const campaigns = pgTable("campaigns", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  channel: text("channel").notNull(), // google_ads, meta_ads, email, organic, referral, northbikers
  budgetMxn: numeric("budget_mxn").notNull(),
  spendMxn: numeric("spend_mxn").notNull().default("0"),
  leadsGenerated: integer("leads_generated").notNull().default(0),
  revenueMxn: numeric("revenue_mxn").notNull().default("0"),
  status: text("status").notNull().default("active"), // active, paused, completed
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 13. Digital Deliveries
export const digitalDeliveries = pgTable("digital_deliveries", {
  id: uuid("id").defaultRandom().primaryKey(),
  opportunityId: uuid("opportunity_id")
    .references(() => opportunities.id)
    .notNull(),
  customerName: text("customer_name").notNull(),
  vin: text("vin").notNull(),
  detailedInspected: boolean("detailed_inspected").default(false),
  fuelFilled: boolean("fuel_filled").default(false),
  documentsVerified: boolean("documents_verified").default(false),
  warrantyExplained: boolean("warranty_explained").default(false),
  manualDelivered: boolean("manual_delivered").default(false),
  connectedRideConfigured: boolean("connected_ride_configured").default(false),
  bluetoothPaired: boolean("bluetooth_paired").default(false),
  tftExplained: boolean("tft_explained").default(false),
  accessoriesInstalled: boolean("accessories_installed").default(false),
  customerSignature: text("customer_signature"),
  notes: text("notes"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 14. Audit Logs
export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  action: text("action").notNull(),
  entity: text("entity").notNull(),
  entityId: text("entity_id"),
  details: jsonb("details"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// First-party, privacy-conscious web analytics. Visitor IDs are anonymous random tokens.
export const analyticsSessions = pgTable("analytics_sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  visitorId: text("visitor_id").notNull().unique(),
  landingPage: text("landing_page").notNull(),
  referrer: text("referrer"),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  deviceType: text("device_type"),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  lastSeenAt: timestamp("last_seen_at").defaultNow().notNull(),
});

export const analyticsEvents = pgTable("analytics_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  sessionId: uuid("session_id")
    .references(() => analyticsSessions.id, { onDelete: "cascade" })
    .notNull(),
  visitorId: text("visitor_id").notNull(),
  eventName: text("event_name").notNull(),
  path: text("path").notNull(),
  label: text("label"),
  metadata:
    jsonb("metadata").$type<Record<string, string | number | boolean | null>>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const adminSessions = pgTable("admin_sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
