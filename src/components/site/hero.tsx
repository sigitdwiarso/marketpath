"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SimBadge } from "./shared";
import { heroSeries, TICKER_ITEMS } from "@/lib/market-data";
import { ArrowRight, BookOpen } from "lucide-react";

function AnimatedChart() {
  const series = React.useMemo(() => heroSeries(20260301, 110), []);
  const W = 900;
  const H = 320;
  const min = Math.min(...series);
  const max = Math.max(...series);
  const pad = 12;
  const pts = series.map((v, i) => {
    const x = (i / (series.length - 1)) * W;
    const y = H - pad - ((v - min) / (max - min)) * (H - pad * 2);
    return [x, y] as const;
  });
  const line = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} L${W},${H} L0,${H} Z`;
  const last = pts[pts.length - 1];
  const first = pts[0];
  const isUp = series[series.length - 1] >= series[0];

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label="Animated illustrative chart of fictional price movement"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="hero-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={isUp ? "#16c784" : "#ea3943"} stopOpacity="0.28" />
            <stop offset="100%" stopColor={isUp ? "#16c784" : "#ea3943"} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* horizontal gridlines */}
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1="0" x2={W} y1={H * f} y2={H * f} stroke="currentColor" strokeOpacity="0.08" strokeDasharray="4 6" />
        ))}
        <motion.path
          d={area}
          fill="url(#hero-fill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke={isUp ? "#16c784" : "#ea3943"}
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
        />
        <motion.circle
          cx={first[0]}
          cy={first[1]}
          r="4"
          fill={isUp ? "#16c784" : "#ea3943"}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2.2, times: [0, 0.02, 1] }}
        />
        <motion.circle
          cx={last[0]}
          cy={last[1]}
          r="5"
          fill={isUp ? "#16c784" : "#ea3943"}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.15, duration: 0.35 }}
          className="animate-pulse-dot"
        />
      </svg>
      <div className="absolute top-3 right-3">
        <SimBadge>Illustrative price movement</SimBadge>
      </div>
    </div>
  );
}

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="overflow-hidden border-y border-border bg-card/60 py-2.5" aria-label="Illustrative ticker of fictional instruments">
      <div className="animate-ticker flex w-max gap-10 whitespace-nowrap">
        {items.map((t, i) => (
          <span key={i} className="tnum flex items-center gap-2 text-xs sm:text-sm">
            <span className="text-muted-foreground">{t.symbol}</span>
            <span className="font-semibold">{t.price}</span>
            <span className={t.change > 0 ? "text-bull" : t.change < 0 ? "text-bear" : "text-muted-foreground"}>
              {t.change > 0 ? "▲" : t.change < 0 ? "▼" : "—"} {Math.abs(t.change).toFixed(1)}%
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <div id="top" className="bg-market-grid relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-volt/10 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-14 sm:px-6 sm:pt-24 sm:pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Badge variant="outline" className="mb-5 border-gold/50 text-gold">
              Zero experience required · 100% practice, 0% real money
            </Badge>
            <h1 className="font-heading text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl lg:text-[3.4rem]">
              Understand the Market.{" "}
              <span className="text-volt">Build Your Financial Knowledge.</span>
            </h1>
            <p className="text-muted-foreground mt-5 max-w-xl text-base leading-relaxed sm:text-lg">
              Learn stocks, crypto, investing and market fundamentals step by step — even if you are
              starting from zero. Interactive lessons, plain-language explanations and a risk-free
              simulator with fictional capital.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-volt text-white hover:bg-volt/85">
                <a href="#fundamentals">
                  Start Learning <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#fundamentals">
                  <BookOpen className="mr-1.5 h-4 w-4" aria-hidden /> Explore Market Basics
                </a>
              </Button>
            </div>
            <p className="mt-6 max-w-lg text-xs leading-relaxed text-muted-foreground">
              Educational platform. All prices, charts and portfolios are simulated or illustrative —
              never live market data. Nothing here is investment advice.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-card/80 rounded-2xl border border-border p-4 shadow-xl backdrop-blur sm:p-5"
          >
            <div className="mb-2 flex items-center justify-between px-1">
              <div>
                <p className="font-heading text-sm font-semibold">The market in motion</p>
                <p className="text-muted-foreground text-xs">Fictional asset · price over time</p>
              </div>
              <span className="tnum text-bull text-sm font-semibold">+18.4%</span>
            </div>
            <AnimatedChart />
            <div className="mt-2 flex items-center justify-between px-1 text-[11px] text-muted-foreground">
              <span>Every dip and peak here teaches a lesson you&apos;ll meet later.</span>
              <span className="tnum">Fictional data</span>
            </div>
          </motion.div>
        </div>
      </div>
      <Ticker />
    </div>
  );
}
