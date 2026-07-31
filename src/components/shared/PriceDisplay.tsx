"use client";

import React from "react";
import { formatPrice, MANDATORY_PRICE_DISCLAIMER } from "@/lib/pricing";

interface PriceDisplayProps {
  amount: number;
  currency?: string;
  className?: string;
  showDisclaimerNote?: boolean;
  prefix?: string;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  amount,
  currency = "MXN",
  className = "text-2xl font-bold text-slate-900",
  showDisclaimerNote = true,
  prefix,
}) => {
  return (
    <div className="inline-flex flex-col">
      <div className={className}>
        {prefix && <span className="text-sm font-medium text-slate-500 mr-2 font-normal">{prefix}</span>}
        {formatPrice(amount, currency)}
      </div>
      {showDisclaimerNote && (
        <span className="text-[10px] text-slate-400 mt-1 font-normal tracking-tight">
          *{MANDATORY_PRICE_DISCLAIMER}
        </span>
      )}
    </div>
  );
};
