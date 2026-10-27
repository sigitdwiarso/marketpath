"use client";

import { TrendingUp } from "lucide-react";
import { MODULE_META, MODULE_ORDER } from "@/lib/progress";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card/50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="flex items-center gap-2 font-semibold">
              <span className="bg-volt flex h-7 w-7 items-center justify-center rounded-lg text-white">
                <TrendingUp className="h-4 w-4" aria-hidden />
              </span>
              <span className="font-heading text-base">
                Market<span className="text-volt">Path</span>
              </span>
            </p>
            <p className="text-muted-foreground mt-3 text-xs leading-relaxed">
              An educational platform for understanding markets — built for absolute beginners.
              Understanding over speculation, clarity over complexity.
            </p>
          </div>
          <nav aria-label="Lesson index">
            <p className="text-sm font-semibold">Lessons</p>
            <ul className="mt-3 space-y-1.5">
              {MODULE_ORDER.map((id, i) => (
                <li key={id}>
                  <a
                    href={MODULE_META[id].href}
                    className="text-muted-foreground hover:text-volt text-xs transition-colors"
                  >
                    {i + 1}. {MODULE_META[id].title}
                  </a>
                </li>
              ))}
              <li>
                <a href="#glossary" className="text-muted-foreground hover:text-volt text-xs transition-colors">
                  Glossary & FAQ
                </a>
              </li>
            </ul>
          </nav>
          <div>
            <p className="text-sm font-semibold text-gold">Educational disclaimer</p>
            <p className="text-muted-foreground mt-3 text-xs leading-relaxed">
              All prices, charts, tickers and portfolio values on this site are simulated or purely
              illustrative and never represent live market data. Nothing on MarketPath is financial,
              investment or tax advice. Markets involve risk, including total loss of capital; past
              performance — real or simulated — does not predict future results. Consider licensed
              professional advice before making real financial decisions.
            </p>
          </div>
        </div>
        <div className="text-muted-foreground mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-5 text-[11px]">
          <p>© 2026 MarketPath — a fictional educational platform. Learn first, invest later.</p>
          <p className="tnum">Simulated data only · No real trading · No sign-up</p>
        </div>
      </div>
    </footer>
  );
}
