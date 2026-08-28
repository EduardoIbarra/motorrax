import { sendGAEvent } from "@next/third-parties/google";
import { trackFirstParty } from "@/components/analytics/AnalyticsTracker";

/**
 * Tracks custom lead and engagement events in Google Analytics 4
 */
export function trackGAEvent(
  eventName: string,
  eventParams?: Record<string, string | number | boolean | undefined | null>,
) {
  try {
    if (typeof window !== "undefined") {
      sendGAEvent("event", eventName, eventParams || {});
      trackFirstParty(
        eventName === "click_whatsapp" ? "whatsapp_click" : eventName,
        {
          label: String(eventParams?.event_label || eventName),
          metadata: eventParams as Record<
            string,
            string | number | boolean | null
          >,
        },
      );
    }
  } catch (error) {
    console.error("GA Event Error:", error);
  }
}

/**
 * Predefined conversion event trackers for Motorrax
 */
export const AnalyticsEvents = {
  // Lead Generation Events
  leadFormSubmit: (data: {
    model?: string;
    leadType?: string;
    source?: string;
  }) => {
    trackGAEvent("generate_lead", {
      event_category: "Lead",
      event_label: data.model || "General Quote",
      model_requested: data.model,
      lead_type: data.leadType || "quote_request",
      utm_source: data.source || "website_form",
    });
  },

  whatsappClick: (location: string, modelName?: string) => {
    trackGAEvent("click_whatsapp", {
      event_category: "Contact",
      event_label: location,
      model_context: modelName || "general",
      click_location: location,
    });
  },

  bmwFinderCompleted: (recommendedModel: string, score: number) => {
    trackGAEvent("bmw_finder_completed", {
      event_category: "Quiz",
      event_label: recommendedModel,
      recommended_model: recommendedModel,
      match_score: score,
    });
  },

  modelViewed: (modelSlug: string, modelName: string, category: string) => {
    trackGAEvent("view_item", {
      event_category: "Catalog",
      item_id: modelSlug,
      item_name: modelName,
      item_category: category,
    });
  },
};
