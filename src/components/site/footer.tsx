"use client";

import { TrendingUp, ExternalLink } from "lucide-react";
import { MODULE_META, MODULE_ORDER } from "@/lib/progress";

/** Reputable third-party learning resources that informed the lesson material. */
const LEARNING_SOURCES: { name: string; url: string; desc: string }[] = [
  {
    name: "Investor.gov (U.S. SEC)",
    url: "https://www.investor.gov/",
    desc: "Free, unbiased investor education from the U.S. Securities and Exchange Commission.",
  },
  {
    name: "Investopedia",
    url: "https://www.investopedia.com/",
    desc: "Encyclopedic definitions and tutorials on stocks, markets and economic concepts.",
  },
  {
    name: "Khan Academy — Personal Finance",
    url: "https://www.khanacademy.org/college-careers-more/personal-finance",
    desc: "Free video courses on saving, investing, stocks and bonds.",
  },
  {
    name: "FINRA — Investor Education",
    url: "https://www.finra.org/investors",
    desc: "Broker checks, fees explained and how to avoid fraud.",
  },
  {
    name: "Binance Academy",
    url: "https://academy.binance.com/en",
    desc: "Beginner-friendly articles on blockchain, Bitcoin, wallets and security.",
  },
  {
    name: "Coinbase Learn",
    url: "https://www.coinbase.com/learn",
    desc: "Short guides on how crypto, blockchains and stablecoins work.",
  },
  {
    name: "MyMoney.gov (U.S. FLEC)",
    url: "https://www.mymoney.gov/",
    desc: "The U.S. government's central site for financial literacy fundamentals.",
  },
  {
    name: "Federal Reserve Education",
    url: "https://www.federalreserveeducation.org/",
    desc: "How central banking, money supply and interest rates work.",
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card/50">
      <div className="mx-auto max-w-6xl 2xl:max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
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
            <p className="text-sm font-semibold">Learning sources</p>
            <p className="text-muted-foreground mt-1.5 text-[11px] leading-relaxed">
              Lesson material is inspired by these reputable, free educational resources:
            </p>
            <ul className="mt-3 space-y-1.5">
              {LEARNING_SOURCES.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-volt group inline-flex items-start gap-1 text-xs transition-colors"
                    title={s.desc}
                  >
                    <span className="underline decoration-border underline-offset-2 group-hover:decoration-volt">
                      {s.name}
                    </span>
                    <ExternalLink className="mt-0.5 h-3 w-3 shrink-0 opacity-60" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-gold">Educational disclaimer</p>
            <p className="text-muted-foreground mt-3 text-xs leading-relaxed">
              All prices, charts, tickers and portfolio values on this site are simulated or purely
              illustrative and never represent live market data. Nothing on MarketPath is financial,
              investment or tax advice. Markets involve risk, including total loss of capital; past
              performance — real or simulated — does not predict future results. Consider licensed
              professional advice before making real financial decisions.
            </p>
            <p className="text-muted-foreground mt-2.5 text-[11px] leading-relaxed">
              External links lead to independent third-party sites; MarketPath is not affiliated with
              them and does not endorse their content.
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
