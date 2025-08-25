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
import { ArrowUpRight, CircleCheck, CircleHelp } from "lucide-react";
import { useMemo, useState } from "react";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { Switch } from "./ui/switch";

type Billing = "monthly" | "yearly";

type Plan = {
  name: string;
  priceMonthly: number;
  description: string;
  included: string;
  overage: {
    label: string;
    tooltip?: string;
  };
  support: "Limited" | "Standard" | "Enterprise" | null;
  isPopular?: boolean;
  annualEligible?: boolean;
};

const plans: Plan[] = [
  {
    name: "Pay‑as‑you‑go",
    priceMonthly: 0,
    description: "No monthly fee. Pay per request as you go",
    included: "Included: 0 requests",
    overage: { label: "$14 per 1K requests" },
    support: null,
    annualEligible: false,
  },
  {
    name: "Basic",
    priceMonthly: 62.5,
    description: "For getting started with modest traffic.",
    included: "Included: 5K requests / month",
    overage: { label: "Overage: $14 per 1K requests" },
    support: "Limited",
  },
  {
    name: "Starter",
    priceMonthly: 230,
    description: "For steady workloads that need room to grow.",
    included: "Included: 20K requests / month",
    overage: { label: "Overage: $14 per 1K requests" },
    support: "Limited",
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
    isPopular: true,
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

const YEARLY_DISCOUNT_PERCENT = 10;

function formatPrice(n: number) {
  return n % 1 === 0 ? n.toString() : n.toFixed(2);
}

function useDisplayPlans(billing: Billing) {
  return useMemo(() => {
    return plans.map((p) => {
      const eligible = p.annualEligible !== false;
      const base = p.priceMonthly;
      const price =
        billing === "monthly"
          ? base
          : eligible
          ? +(base * (1 - YEARLY_DISCOUNT_PERCENT / 100)).toFixed(2)
          : base;

      return { ...p, displayPrice: price, annualEligible: eligible } as Plan & {
        displayPrice: number;
      };
    });
  }, [billing]);
}

function PlanCard({
  plan,
  billing,
}: {
  plan: Plan & { displayPrice: number };
  billing: Billing;
}) {
  return (
    <div
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
        <span className="flex items-baseline gap-2">
          <span>${formatPrice(plan.displayPrice)}</span>
          {billing === "yearly" && plan.annualEligible && (
            <span className="text-2xl line-through text-gray-400">
              ${formatPrice(plan.priceMonthly)}
            </span>
          )}
        </span>
        <span className="block text-sm text-muted-foreground font-normal">
          /month
          <span className="text-xs text-muted-foreground/80">
            {billing === "yearly" && plan.annualEligible && (
              <>
                {" "}
                <span>(Billed annually)</span>
              </>
            )}
          </span>
        </span>
      </p>

      {billing === "yearly" && plan.annualEligible && (
        <div className="mt-2 text-sm text-muted-foreground flex items-center gap-2">
          <Badge variant="outline" className="text-green-600 border-green-300">
            Save $
            {Math.round(
              plan.priceMonthly * 12 * (YEARLY_DISCOUNT_PERCENT / 100)
            )}
          </Badge>
        </div>
      )}

      {/* <p className="mt-2 text-4xl font-bold">
        ${formatPrice(plan.displayPrice)}
        <span className="ml-1.5 text-sm text-muted-foreground font-normal">
          /month
        </span>
      </p> */}
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
          <CircleCheck className="h-4 w-4 mt-1" />
          <span>{plan.included}</span>
        </li>
        <li className="flex items-start gap-1.5">
          <CircleCheck className="h-4 w-4 mt-1" />
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
            <CircleCheck className="h-4 w-4 mt-1" />
            <span>{`${plan.support} Support`}</span>
          </li>
        )}
      </ul>
    </div>
  );
}

// function CTABanner({
//   title,
//   description,
//   variant,
//   buttonText = "Get Started",
//   infoTooltip,
//   isIconVisible = true,
// }: {
//   title: string;
//   description: string;
//   variant?: "free" | "enterprise";
//   buttonText?: string;
//   infoTooltip?: string;
//   isIconVisible?: boolean;
// }) {
//   const bgClass = cn("text-foreground", {
//     "bg-background dark": !variant,
//     "bg-[#f4f4f5] dark:bg-[#1f1f1f]": variant === "free",
//     "bg-[#e5e7eb] dark:bg-[#111827]": variant === "enterprise",
//   });

//   return (
//     <div className="px-6">
//       <div
//         className={cn(
//           "relative overflow-hidden w-full max-w-screen-xl mx-auto rounded-2xl py-10 md:py-16 px-6 md:px-14 dark:border",
//           bgClass
//         )}
//       >
//         {/* <AnimatedGridPattern
//           numSquares={30}
//           maxOpacity={0.1}
//           duration={3}
//           className={cn(
//             "[mask-image:radial-gradient(400px_circle_at_right,white,rgba(255,255,255,0.6),transparent)]",
//             "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
//           )}
//         /> */}
//         {/* <AnimatedGridPattern
//           numSquares={30}
//           maxOpacity={0.1}
//           duration={3}
//           className={cn(
//             "[mask-image:radial-gradient(400px_circle_at_top_left,white,rgba(255,255,255,0.6),transparent)]",
//             "inset-x-0 inset-y-0 h-[200%] skew-y-12"
//           )}
//         /> */}
//         <div className="relative z-0 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
//           <div className="flex flex-col gap-3">
//             <h3 className="text-3xl md:text-4xl font-semibold">{title}</h3>
//             <p className="mt-2 text-base md:text-lg flex items-center gap-1.5">
//               <span>{description}</span>
//               {infoTooltip && (
//                 <Tooltip>
//                   <TooltipTrigger className="cursor-help">
//                     <CircleHelp className="h-4 w-4 mt-0.5 text-muted-foreground" />
//                   </TooltipTrigger>
//                   <TooltipContent className="max-w-xs">
//                     {infoTooltip}
//                   </TooltipContent>
//                 </Tooltip>
//               )}
//             </p>
//           </div>
//           <div className="mt-6 md:mt-0">
//             <Button size="lg" disabled>
//               {buttonText}
//               {isIconVisible && <ArrowUpRight className="!h-5 !w-5" />}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

function CTAEnterpriseBanner({
  title,
  description,
  // variant,
  buttonText = "Get Started",
  infoTooltip,
  isIconVisible = true,
}: {
  title: string;
  description: string;
  buttonText?: string;
  infoTooltip?: string;
  isIconVisible?: boolean;
}) {
  const bgClass = cn("text-foreground", {
    "bg-[#e5e7eb] dark:bg-[#111827]": true,
  });

  return (
    <div className="px-6">
      <div
        className={cn(
          "relative overflow-hidden w-full max-w-screen-xl mx-auto rounded-2xl py-10 md:py-14 px-4 md:px-12 dark:border",
          "border rounded-xl",
          bgClass
        )}
      >
        {/* <div
      className={cn(
        "relative border rounded-xl p-6 bg-background/50 flex flex-col",
        {
          "border-[2px] border-primary bg-background": plan.isPopular,
        }
      )}
    > */}
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          className={cn(
            "[mask-image:radial-gradient(400px_circle_at_right,white,rgba(255,255,255,0.6),transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
          )}
        />
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          className={cn(
            "[mask-image:radial-gradient(400px_circle_at_top_left,white,rgba(255,255,255,0.6),transparent)]",
            "inset-x-0 inset-y-0 h-[200%] skew-y-12"
          )}
        />
        <div className="relative z-0 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-col gap-3">
            <h3 className="text-2xl md:text-3xl font-semibold">{title}</h3>
            <p className="mt-2 text-base md:text-md flex items-center gap-1.5">
              <span>{description}</span>
              {infoTooltip && (
                <Tooltip>
                  <TooltipTrigger className="cursor-help">
                    <CircleHelp className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    {infoTooltip}
                  </TooltipContent>
                </Tooltip>
              )}
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <Button size="lg" disabled>
              {buttonText}
              {isIconVisible && <ArrowUpRight className="!h-5 !w-5" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Pricing() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const displayPlans = useDisplayPlans(billing);

  const payg = displayPlans.find((p) => p.name === "Pay‑as‑you‑go")!;
  const enterprise = displayPlans.find((p) => p.name === "Enterprise")!;
  const middlePlans = displayPlans.filter(
    (p) => p.name !== "Pay‑as‑you‑go" && p.name !== "Enterprise"
  );

  return (
    <div
      id="pricing"
      className="flex flex-col items-center justify-center py-12 xs:py-20 px-6 max-w-screen-xl mx-auto"
    >
      <h1 className="text-3xl xs:text-4xl md:text-5xl font-bold text-center tracking-tight">
        Pricing
      </h1>
      <p
        id="payg-description"
        className="mt-3 xs:text-md text-center text-muted-foreground"
      >
        Try our <span className="font-medium">Pay‑as‑You‑Go</span> plan with no
        monthly fees — pay only for what you use.{" "}
        <Tooltip>
          <TooltipTrigger>
            <span
              className="cursor-pointer text-blue-500 hover:underline hover:underline-offset-4"
              onClick={() => alert("Start Now clicked")}
            >
              Start Now
            </span>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            {payg.overage.label}
          </TooltipContent>
        </Tooltip>
        <br />
        Or, you can pick a plan that fits your needs.
      </p>

      {/* <div className="mt-8 max-w-screen-xl mx-auto w-full"> */}
      {/* PAYG CTA */}
      {/* <CTABanner
          title="Start with Pay-as-you-go"
          description={payg.description}
          variant="free"
          buttonText="Start Free"
          infoTooltip={payg.overage.label}
        /> */}
      {/* </div> */}
      {/* <div className="mt-8 max-w-screen-xl mx-auto w-full"> */}
      {/* PAYG CTA */}
      {/* <FreeCTABanner
          title="Start with Pay-as-you-go"
          description={payg.description}
          variant="free"
          buttonText="Start Free"
          infoTooltip={payg.overage.label}
          isIconVisible={false}
        /> */}
      {/* </div> */}

      <Tabs
        value={billing}
        onValueChange={(v) => setBilling(v as Billing)}
        className="max-w-screen-xl mx-auto w-full"
      >
        {/* OR Divider */}
        {/* <div className="text-center text-muted-foreground my-10 font-medium uppercase tracking-wide">
          OR
        </div> */}

        {/* <div className="text-center text-muted-foreground my-10 font-medium uppercase tracking-wide">
          <TabsList className="h-11 px-1.5 rounded-full bg-primary/5">
            <TabsTrigger value="monthly" className="py-1.5 rounded-full">
              Monthly
            </TabsTrigger>
            <TabsTrigger value="yearly" className="py-1.5 rounded-full">
              Yearly (Save {YEARLY_DISCOUNT_PERCENT}%)
            </TabsTrigger>
          </TabsList>
        </div> */}
        <div className="flex justify-end w-full max-w-screen-xl px-6 mt-10 mb-5">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Switch
              id="annual-billing"
              checked={billing === "yearly"}
              onCheckedChange={(checked) =>
                setBilling(checked ? "yearly" : "monthly")
              }
            />
            <label htmlFor="annual-billing" className="cursor-pointer">
              Annualy
              <span className="text-muted-foreground ml-1">
                (Save {YEARLY_DISCOUNT_PERCENT}%)
              </span>
            </label>
          </div>
        </div>
      </Tabs>

      {/* 4 Plans */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-screen-xl mx-auto px-6">
        {middlePlans.map((plan) => (
          <PlanCard key={plan.name} plan={plan} billing={billing} />
        ))}
      </div>

      {/* OR Divider */}
      {/* <div className="text-center text-muted-foreground my-10 font-medium uppercase tracking-wide">
        OR
      </div> */}

      <div className="max-w-screen-xl mx-auto w-full mt-8">
        {/* Enterprise CTA */}
        <CTAEnterpriseBanner
          title="Enterprise-grade Access"
          description={
            "300K requests/month included with scalable overage options and Enterprise-level support. Ideal for mission-critical workloads that need custom solutions"
          }
          buttonText="Choose Enterprise"
          isIconVisible={false}
        />
      </div>
    </div>
  );
}
