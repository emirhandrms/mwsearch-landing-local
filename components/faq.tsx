"use client";

import {
  CircleDollarSign,
  ClockArrowDown,
  Globe2,
  Server,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { cn } from "@/lib/utils";

const faq = [
  {
    icon: Globe2,
    question: "What is MindSearch?",
    answer:
      "MindSearch is an API-first web search service that delivers fast, structured realtime results from the public web with flexible query parameters.",
  },
  {
    icon: UserRoundCheck,
    question: "How do I get started?",
    answer:
      "Create an account, generate an API key, and call the search endpoint with your query and optional parameters. You can be live in minutes—no SDK required.",
  },
  {
    icon: ClockArrowDown,
    question: "How does freshness work?",
    answer:
      "You can limit results to recent content using a freshness window (e.g., last hours or days) to ensure the information is up to date.",
  },
  {
    icon: Server,
    question: "What performance can I expect?",
    answer:
      "Low-latency responses and high throughput at scale, backed by resilient infrastructure for production workloads.",
  },
  {
    icon: CircleDollarSign,
    question: "What about pricing and rate limits?",
    answer:
      "Plans include monthly quotas, with the option to purchase additional units as needed. Start free, upgrade as you grow.",
  },
  {
    icon: ShieldCheck,
    question: "Is my data secure?",
    answer:
      "Access is secured with API keys, and all requests are transmitted over encrypted connections to protect your data.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div
      id="faq"
      className="min-h-screen w-full max-w-screen-xl mx-auto flex items-center justify-center px-6 py-12 xs:py-20"
    >
      <div className=" max-w-screen-lg w-full">
        <h2 className="text-3xl xs:text-4xl md:text-5xl !leading-[1.15] font-bold tracking-tight text-center">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 xs:text-lg text-center text-muted-foreground">
          Quick answers to common questions about our MWSearch.
        </p>

        <div className="mt-12 flex flex-col gap-4">
          {faq.map(({ question, answer, icon: Icon }, idx) => (
            <Collapsible
              key={question}
              open={openIndex === idx}
              onOpenChange={(isOpen) => setOpenIndex(isOpen ? idx : null)}
            >
              <CollapsibleTrigger
                className={cn(
                  "w-full p-4 rounded-lg text-left flex items-center justify-between gap-3 hover:bg-accent transition"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 flex items-center justify-center rounded-full bg-accent shrink-0">
                    <Icon className="h-4 w-4 xs:h-5 xs:w-5" />
                  </div>
                  <span className="text-base xs:text-lg font-medium">
                    {question}
                  </span>
                </div>
                <svg
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    openIndex === idx ? "rotate-180" : "rotate-0"
                  )}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </CollapsibleTrigger>

              <CollapsibleContent className="px-4 pb-4 pt-2 text-sm xs:text-base text-muted-foreground">
                {answer}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
