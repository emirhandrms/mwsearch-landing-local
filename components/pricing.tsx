"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { CircleCheck, CircleHelp } from "lucide-react";
import { useMemo, useState } from "react";

// ——————————————————————————————————————————
// MWSearch Pricing — Monthly / Yearly (10% off, except PAYG)
// Overage packs for Pro/Scale/Enterprise are sold in fixed bundles
// Pro: 55 USD / 5K (≈ $11 per 1K)
// Scale: 150 USD / 15K (≈ $10 per 1K)
// Enterprise: 270 USD / 30K (≈ $9 per 1K)
// ——————————————————————————————————————————

type Billing = "monthly" | "yearly";

type Plan = {
  name: string;
  priceMonthly: number; // USD/month
  description: string;
  included: string; // Included usage text
  overage: {
    label: string; // Human text shown in card
    tooltip?: string; // Optional extra info
  };
  support: "Limited" | "Standard" | "Enterprise" | null;
  isPopular?: boolean;
  annualEligible?: boolean; // some plans (PAYG) don't get annual
};

const plans: Plan[] = [
  {
    name: "Pay‑as‑you‑go",
    priceMonthly: 0,
    description: "Monthly only. Start for free and pay per request as you go.",
    included: "Included: 0 requests",
    overage: {
      label: "Overage: $14 per 1K requests",
    },
    support: null,
    annualEligible: false,
  },
  {
    name: "Basic",
    priceMonthly: 62.5,
    description: "For getting started with modest traffic.",
    included: "Included: 5K requests / month",
    overage: {
      label: "Overage: $14 per 1K requests",
    },
    support: "Limited",
  },
  {
    name: "Starter",
    priceMonthly: 230,
    description: "For steady workloads that need room to grow.",
    included: "Included: 20K requests / month",
    overage: {
      label: "Overage: $14 per 1K requests",
    },
    support: "Limited",
    isPopular: true,
  },
  {
    name: "Pro",
    priceMonthly: 550,
    description: "For production apps with higher demand.",
    included: "Included: 50K requests / month",
    overage: {
      label: "Overage: $55 per 5K requests (≈ $11 / 1K)",
      tooltip:
        "Pro overage is sold in 5K‑request bundles at $55 each. Effective rate ≈ $11 per 1K.",
    },
    support: "Standard",
  },
  {
    name: "Scale",
    priceMonthly: 1500,
    description: "For teams scaling traffic and throughput.",
    included: "Included: 150K requests / month",
    overage: {
      label: "Overage: $150 per 15K requests (≈ $10 / 1K)",
      tooltip:
        "Scale overage is sold in 15K‑request bundles at $150 each. Effective rate ≈ $10 per 1K.",
    },
    support: "Standard",
  },
  {
    name: "Enterprise",
    priceMonthly: 2700,
    description: "For mission‑critical workloads and custom needs.",
    included: "Included: 300K requests / month",
    overage: {
      label: "Overage: $270 per 30K requests (≈ $9 / 1K)",
      tooltip:
        "Enterprise overage is sold in 30K‑request bundles at $270 each. Effective rate ≈ $9 per 1K.",
    },
    support: "Enterprise",
  },
];

const YEARLY_DISCOUNT_PERCENT = 10; // applies to all except PAYG

function formatPrice(n: number) {
  // Show trailing .00 only when needed; keep concise
  return n % 1 === 0 ? n.toString() : n.toFixed(2);
}

function useDisplayPlans(billing: Billing) {
  return useMemo(() => {
    return plans.map((p) => {
      const eligible = p.annualEligible !== false; // default true
      const base = p.priceMonthly;
      const price =
        billing === "monthly"
          ? base
          : eligible
          ? +(base * (1 - YEARLY_DISCOUNT_PERCENT / 100)).toFixed(2)
          : base; // PAYG unchanged

      return { ...p, displayPrice: price, annualEligible: eligible } as Plan & {
        displayPrice: number;
      };
    });
  }, [billing]);
}

export default function Pricing() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const displayPlans = useDisplayPlans(billing);

  return (
    <div
      id="pricing"
      className="flex flex-col items-center justify-center py-12 xs:py-20 px-6"
    >
      <h1 className="text-3xl xs:text-4xl md:text-5xl font-bold text-center tracking-tight">
        Pricing
      </h1>

      <Tabs
        value={billing}
        onValueChange={(v) => setBilling(v as Billing)}
        className="mt-8"
      >
        <TabsList className="h-11 px-1.5 rounded-full bg-primary/5">
          <TabsTrigger value="monthly" className="py-1.5 rounded-full">
            Monthly
          </TabsTrigger>
          <TabsTrigger value="yearly" className="py-1.5 rounded-full">
            Yearly (Save {YEARLY_DISCOUNT_PERCENT}%)
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mt-12 max-w-screen-lg mx-auto grid grid-cols-1 lg:grid-cols-3 items-stretch gap-8">
        {displayPlans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "relative border rounded-xl p-6 bg-background/50 flex flex-col",
              {
                "border-[2px] border-primary bg-background": plan.isPopular,
              }
            )}
          >
            {plan.isPopular && (
              <Badge className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2">
                Most Popular
              </Badge>
            )}

            <h3 className="text-lg font-medium">{plan.name}</h3>

            <p className="mt-2 text-4xl font-bold">
              ${formatPrice(plan.displayPrice)}
              <span className="ml-1.5 text-sm text-muted-foreground font-normal">
                /month
              </span>
            </p>

            {/* {billing === "yearly" && plan.annualEligible === false && (
              <p className="mt-1 text-xs text-muted-foreground">
                No annual plan for PAYG.
              </p>
            )} */}

            <p className="mt-4 font-medium text-muted-foreground">
              {plan.description}
            </p>

            <Button
              variant={plan.isPopular ? "default" : "outline"}
              size="lg"
              className="w-full mt-6 text-base"
              disabled={billing === "yearly" && !plan.annualEligible}
            >
              {plan.name !== "Pay‑as‑you‑go"
                ? `Choose ${plan.name}`
                : billing === "monthly"
                ? "Start with PAYG"
                : "No annual plan"}
            </Button>

            <Separator className="my-8" />

            <ul className="space-y-3">
              <li className="flex items-start gap-1.5">
                <span className="flex-shrink-0">
                  <CircleCheck className="h-4 w-4 mt-1" />
                </span>
                <span>{plan.included}</span>
              </li>

              <li className="flex items-start gap-1.5">
                <span className="flex-shrink-0">
                  <CircleCheck className="h-4 w-4 mt-1" />
                </span>
                <span className="flex items-start gap-1.5">
                  {plan.overage.label}
                  {plan.overage.tooltip && (
                    <Tooltip>
                      <TooltipTrigger className="cursor-help">
                        <CircleHelp className="h-4 w-4 mt-1 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        {plan.overage.tooltip}
                      </TooltipContent>
                    </Tooltip>
                  )}
                </span>
              </li>
              {plan.support && (
                <li className="flex items-start gap-1.5">
                  <span className="flex-shrink-0">
                    <CircleCheck className="h-4 w-4 mt-1" />
                  </span>
                  <span>{`${plan.support} Support`}</span>
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
