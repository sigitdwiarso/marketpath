"use client";

import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, ArrowRight, Lightbulb } from "lucide-react";
import { GLOSSARY } from "@/lib/education-data";
import { MODULE_ORDER, MODULE_META, useProgress, type ModuleId } from "@/lib/progress";
import { cn } from "@/lib/utils";

/* ---------------- Clickable financial term ---------------- */

export function Term({ id, children }: { id: string; children?: React.ReactNode }) {
  const data = GLOSSARY.find((g) => g.id === id);
  if (!data) return <>{children ?? id}</>;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="term-highlight font-medium text-foreground"
          aria-label={`Definition of ${data.term}`}
        >
          {children ?? data.term}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" side="top">
        <p className="font-heading text-sm font-semibold">{data.term}</p>
        <p className="mt-1.5 text-sm text-muted-foreground">{data.definition}</p>
        <div className="mt-3 rounded-md bg-muted p-2.5 text-xs leading-relaxed">
          <span className="font-semibold text-gold">Example: </span>
          {data.example}
        </div>
      </PopoverContent>
    </Popover>
  );
}

/* ---------------- Key takeaway callout ---------------- */

export function Takeaway({ children }: { children: React.ReactNode }) {
  return (
    <div className="takeaway bg-card rounded-r-lg px-4 py-3 text-sm leading-relaxed">
      <span className="mr-1.5 inline-flex items-center gap-1 font-semibold text-gold">
        <Lightbulb className="h-4 w-4" aria-hidden /> Key takeaway
      </span>
      <span>{children}</span>
    </div>
  );
}

/* ---------------- Section shell with lesson controls ---------------- */

export function SectionShell({
  id,
  moduleId,
  number,
  title,
  intro,
  children,
}: {
  id: string;
  moduleId: ModuleId;
  number: number;
  title: string;
  intro: React.ReactNode;
  children: React.ReactNode;
}) {
  const { completed, toggleCompleted } = useProgress();
  const isDone = completed.includes(moduleId);
  const idx = MODULE_ORDER.indexOf(moduleId);
  const next = idx >= 0 && idx < MODULE_ORDER.length - 1 ? MODULE_META[MODULE_ORDER[idx + 1]] : null;

  return (
    <section id={id} className="scroll-mt-20 py-14 sm:py-20" aria-labelledby={`${id}-heading`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="outline" className="tnum border-volt/50 text-volt">
            Lesson {number} of 7
          </Badge>
          {isDone && (
            <Badge className="gap-1 bg-bull/15 text-bull hover:bg-bull/15">
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden /> Completed
            </Badge>
          )}
        </div>
        <h2 id={`${id}-heading`} className="font-heading mt-3 text-3xl font-bold sm:text-4xl">
          {title}
        </h2>
        <div className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {intro}
        </div>

        <div className="mt-10 space-y-10">{children}</div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          <Button
            variant={isDone ? "outline" : "default"}
            onClick={() => toggleCompleted(moduleId)}
            className={cn(!isDone && "bg-volt text-white hover:bg-volt/85")}
          >
            {isDone ? (
              <>
                <Circle className="h-4 w-4" aria-hidden /> Mark as not completed
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" aria-hidden /> Mark lesson complete
              </>
            )}
          </Button>
          {next && (
            <a href={next.href} className="group inline-flex items-center gap-1.5 text-sm font-semibold text-volt">
              Next lesson: {next.title}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Card helper ---------------- */

export function InfoCard({
  title,
  icon,
  children,
  className,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("bg-card rounded-xl border border-border p-5 sm:p-6", className)}>
      <h3 className="font-heading flex items-center gap-2 text-lg font-semibold">
        {icon}
        {title}
      </h3>
      <div className="mt-2.5 space-y-2.5 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}

/* ---------------- Simulated-data disclaimer chip ---------------- */

export function SimBadge({ children }: { children?: React.ReactNode }) {
  return (
    <Badge variant="outline" className="gap-1 border-gold/50 text-xs font-medium text-gold">
      <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
      {children ?? "Simulated data — for education only"}
    </Badge>
  );
}
