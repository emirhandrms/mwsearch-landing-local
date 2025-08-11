import {  Bot, Filter, Globe, Server, Lock, Logs } from "lucide-react";
import React from "react";

const features = [
  {
    icon: Globe,
    title: "Real-Time & Fresh",
    description:
      "Define freshness windows down to minutes. Limit results to hours, days, or custom date ranges.",
  },
  {
    icon: Filter,
    title: "Domain Restriction",
    description:
      "Search the public web or restrict queries to your specified domains.",
  },
  {
    icon: Logs,
    title: "Controlled Results",
    description:
      "Fine-tune queries with parameters like language, number_of_results, site filters, and safe mode.",
  },
  {
    icon: Bot,
    title: "Simple Output",
    description:
      "Clean and predictable search results ready to feed into your workflows. No parsing headaches.",
  },
  {
    icon: Server,
    title: "Low Latency, High Throughput",
    description:
      "High-speed queries at scale, without restrictions or access issues.",
  },
  {
    icon: Lock,
    title: "Security & Privacy",
    description:
      "API key authentication to protect access and keep your data secure.",
  },
];

const Features = () => {
  return (
    <div id="features" className="w-full py-12 xs:py-20 px-6">
      <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight text-center">
        Precise Search, Instant Results
      </h2>
      <div className="w-full max-w-screen-lg mx-auto mt-10 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col bg-background border rounded-xl py-6 px-5"
          >
            <div className="mb-3 h-10 w-10 flex items-center justify-center bg-muted rounded-full">
              <feature.icon className="h-6 w-6" />
            </div>
            <span className="text-lg font-semibold">{feature.title}</span>
            <p className="mt-1 text-foreground/80 text-[15px]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
