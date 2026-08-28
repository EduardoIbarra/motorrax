CREATE TABLE IF NOT EXISTS "analytics_sessions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "visitor_id" text NOT NULL UNIQUE,
  "landing_page" text NOT NULL,
  "referrer" text,
  "utm_source" text,
  "utm_medium" text,
  "utm_campaign" text,
  "device_type" text,
  "started_at" timestamp DEFAULT now() NOT NULL,
  "last_seen_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "analytics_events" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "session_id" uuid NOT NULL REFERENCES "analytics_sessions"("id") ON DELETE cascade,
  "visitor_id" text NOT NULL,
  "event_name" text NOT NULL,
  "path" text NOT NULL,
  "label" text,
  "metadata" jsonb,
  "created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "analytics_events_created_at_idx" ON "analytics_events" ("created_at");
CREATE INDEX IF NOT EXISTS "analytics_events_session_id_idx" ON "analytics_events" ("session_id");
CREATE INDEX IF NOT EXISTS "analytics_sessions_started_at_idx" ON "analytics_sessions" ("started_at");
CREATE UNIQUE INDEX IF NOT EXISTS "analytics_sessions_visitor_id_idx" ON "analytics_sessions" ("visitor_id");
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "admin_sessions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "token" text NOT NULL UNIQUE,
  "expires_at" timestamp NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "admin_sessions_token_idx" ON "admin_sessions" ("token");
