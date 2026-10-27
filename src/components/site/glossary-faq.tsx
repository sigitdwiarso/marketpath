"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQ_ITEMS, GLOSSARY } from "@/lib/education-data";
import { Search } from "lucide-react";

export function GlossaryFaq() {
  const [query, setQuery] = React.useState("");
  const q = query.trim().toLowerCase();
  const filtered = q
    ? GLOSSARY.filter(
        (g) =>
          g.term.toLowerCase().includes(q) ||
          g.short.toLowerCase().includes(q) ||
          g.definition.toLowerCase().includes(q)
      )
    : GLOSSARY;

  return (
    <section id="glossary" className="scroll-mt-20 py-14 sm:py-20" aria-labelledby="glossary-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Glossary */}
          <div>
            <h2 id="glossary-heading" className="font-heading text-2xl font-bold sm:text-3xl">
              Glossary
            </h2>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Every dotted-underlined term across the lessons lives here. Search in plain language —
              no jargon required.
            </p>
            <div className="relative mt-4">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" aria-hidden />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search terms — try 'volatility' or 'wallet'…"
                className="pl-9"
                aria-label="Search glossary"
              />
            </div>
            <div className="custom-scrollbar mt-4 max-h-[430px] space-y-3 overflow-y-auto pr-1.5">
              {filtered.length === 0 && (
                <p className="text-muted-foreground py-6 text-center text-sm">
                  No terms match &ldquo;{query}&rdquo;. Try a simpler word.
                </p>
              )}
              {filtered.map((g) => (
                <details key={g.id} className="group bg-card rounded-xl border border-border p-4 open:shadow-sm">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold">
                    {g.term}
                    <span className="text-muted-foreground text-xs transition-transform group-open:rotate-180">▾</span>
                  </summary>
                  <p className="text-muted-foreground mt-2 text-xs leading-relaxed">{g.definition}</p>
                  <p className="mt-2 rounded-md bg-muted p-2.5 text-xs leading-relaxed">
                    <span className="font-semibold text-gold">Example: </span>
                    {g.example}
                  </p>
                </details>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">Beginner FAQ</h2>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              The questions almost every newcomer asks, answered honestly — including the ones about
              what this site can and cannot do.
            </p>
            <Accordion type="single" collapsible className="mt-4">
              {FAQ_ITEMS.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-sm font-semibold">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
