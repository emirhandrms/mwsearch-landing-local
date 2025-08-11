import {
  CircleDollarSign,
  ClockArrowDown,
  Globe2,
  Server,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";

const faq = [
  {
    icon: Globe2,
    question: "What is MWSearch?",
    answer:
      "MWSearch is an API-first web search service that delivers fast, structured results from the public web with flexible query parameters.",
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
  return (
    <div
      id="faq"
      className="min-h-screen flex items-center justify-center px-6 py-12 xs:py-20"
    >
      <div className="max-w-screen-lg">
        <h2 className="text-3xl xs:text-4xl md:text-5xl !leading-[1.15] font-bold tracking-tight text-center">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 xs:text-lg text-center text-muted-foreground">
          Quick answers to common questions about our MWSearch.
        </p>

        <div className="mt-12 grid md:grid-cols-2 bg-background rounded-xl overflow-hidden outline outline-[1px] outline-border outline-offset-[-1px]">
          {faq.map(({ question, answer, icon: Icon }) => (
            <div key={question} className="border p-6 -mt-px -ml-px">
              <div className="h-8 w-8 xs:h-10 xs:w-10 flex items-center justify-center rounded-full bg-accent">
                <Icon className="h-4 w-4 xs:h-6 xs:w-6" />
              </div>
              <div className="mt-3 mb-2 flex items-start gap-2 text-lg xs:text-[1.35rem] font-semibold tracking-tight">
                <span>{question}</span>
              </div>
              <p className="text-sm xs:text-base">{answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
