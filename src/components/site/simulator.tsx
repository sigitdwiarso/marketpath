"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { SimBadge, SectionShell, Takeaway } from "./shared";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Wallet, Trash2 } from "lucide-react";

/* ---------- Fictional assets on the paper-trading desk ---------- */

type DeskAsset = {
  key: string;
  name: string;
  ticker: string;
  price: number;
  decimals: number;
  volNote: string;
};

const DESK_ASSETS: DeskAsset[] = [
  { key: "acme", name: "Acme Corp (fictional stock)", ticker: "ACME", price: 142.0, decimals: 2, volNote: "Typical stock volatility" },
  { key: "etf", name: "Everything ETF (fictional)", ticker: "ALLX", price: 51.1, decimals: 2, volNote: "Diversified basket" },
  { key: "demo", name: "DemoCoin (fictional crypto)", ticker: "DEMO", price: 31250, decimals: 0, volNote: "High volatility!" },
  { key: "bond", name: "Bond fund (fictional)", ticker: "BND", price: 98.6, decimals: 2, volNote: "Low volatility" },
];

type ScenarioKey = "bull" | "bear" | "crash" | "sideways";

const SCENARIOS: Record<
  ScenarioKey,
  { label: string; mult: number[]; blurb: string; color: string }
> = {
  bull: {
    label: "Bull market",
    mult: [1.28, 1.14, 1.65, 1.03],
    blurb: "Optimism lifts everything — risky assets fly highest.",
    color: "text-bull",
  },
  bear: {
    label: "Bear market",
    mult: [0.78, 0.9, 0.52, 0.96],
    blurb: "Fear dominates. Crypto historically falls hardest.",
    color: "text-bear",
  },
  crash: {
    label: "Flash crash",
    mult: [0.62, 0.82, 0.38, 0.9],
    blurb: "Panic selling — even good assets get dumped.",
    color: "text-bear",
  },
  sideways: {
    label: "Sideways",
    mult: [1.01, 1.0, 0.98, 1.005],
    blurb: "The market goes nowhere. Boredom is part of investing.",
    color: "text-muted-foreground",
  },
};

const START_CASH = 10_000;

type Trade = { id: number; side: "BUY" | "SELL"; ticker: string; qty: number; price: number; usd: number };

function fmtUsd(v: number) {
  return v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}
function fmtPrice(v: number, d: number) {
  return `$${v.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d })}`;
}

/* ---------- Paper trading desk ---------- */

function TradingDesk() {
  const [cash, setCash] = React.useState(START_CASH);
  const [qty, setQty] = React.useState<Record<string, number>>({ acme: 0, etf: 0, demo: 0, bond: 0 });
  const [prices, setPrices] = React.useState<Record<string, number>>(
    Object.fromEntries(DESK_ASSETS.map((a) => [a.key, a.price]))
  );
  const [amount, setAmount] = React.useState("500");
  const [log, setLog] = React.useState<Trade[]>([]);
  const [scenario, setScenario] = React.useState<ScenarioKey | null>(null);
  const [flash, setFlash] = React.useState<string | null>(null);
  const nextId = React.useRef(1);

  const holdingsValue = DESK_ASSETS.reduce((s, a) => s + (qty[a.key] ?? 0) * prices[a.key], 0);
  const total = cash + holdingsValue;
  const pnl = total - START_CASH;
  const pnlPct = (pnl / START_CASH) * 100;
  const amt = Math.max(0, Math.min(cash, parseFloat(amount) || 0));

  const applyScenario = (key: ScenarioKey) => {
    setScenario(key);
    setPrices((p) => {
      const out = { ...p };
      DESK_ASSETS.forEach((a, i) => {
        out[a.key] = +(a.price * SCENARIOS[key].mult[i]).toFixed(a.decimals);
      });
      return out;
    });
    setFlash(`Simulated a ${SCENARIOS[key].label.toLowerCase()} — watch your portfolio react.`);
    window.setTimeout(() => setFlash(null), 3500);
  };

  const trade = (a: DeskAsset, side: "BUY" | "SELL") => {
    const price = prices[a.key];
    if (side === "BUY") {
      if (amt < 0.01) return;
      const bought = amt / price;
      setCash((c) => +(c - amt).toFixed(2));
      setQty((q) => ({ ...q, [a.key]: (q[a.key] ?? 0) + bought }));
      setLog((l) => [{ id: nextId.current++, side, ticker: a.ticker, qty: bought, price, usd: amt }, ...l].slice(0, 12));
    } else {
      const held = qty[a.key] ?? 0;
      if (held < 1e-9) return;
      const proceeds = held * price;
      setCash((c) => +(c + proceeds).toFixed(2));
      setQty((q) => ({ ...q, [a.key]: 0 }));
      setLog((l) => [{ id: nextId.current++, side, ticker: a.ticker, qty: held, price, usd: proceeds }, ...l].slice(0, 12));
    }
  };

  const reset = () => {
    setCash(START_CASH);
    setQty({ acme: 0, etf: 0, demo: 0, bond: 0 });
    setPrices(Object.fromEntries(DESK_ASSETS.map((a) => [a.key, a.price])));
    setLog([]);
    setScenario(null);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-heading flex items-center gap-2 text-xl font-semibold">
          <Wallet className="text-volt h-5 w-5" aria-hidden /> The paper trading desk
        </h3>
        <SimBadge>Fictional capital · nothing here is real money</SimBadge>
      </div>

      {/* Portfolio summary */}
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="bg-muted/50 rounded-lg p-3.5 sm:p-4">
          <p className="text-muted-foreground text-xs">Total portfolio value</p>
          <p className="tnum mt-1 text-xl font-bold sm:text-2xl">{fmtUsd(total)}</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-3.5 sm:p-4">
          <p className="text-muted-foreground text-xs">Cash available</p>
          <p className="tnum mt-1 text-xl font-bold sm:text-2xl">{fmtUsd(cash)}</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-3.5 sm:p-4">
          <p className="text-muted-foreground text-xs">Hypothetical P/L</p>
          <p className={cn("tnum mt-1 text-xl font-bold sm:text-2xl", pnl >= 0 ? "text-bull" : "text-bear")}>
            {pnl >= 0 ? "+" : ""}
            {fmtUsd(pnl)} ({pnlPct >= 0 ? "+" : ""}
            {pnlPct.toFixed(2)}%)
          </p>
        </div>
      </div>

      {/* Scenario buttons */}
      <div className="mt-4">
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          Step 1 — throw a market scenario at your portfolio:
        </p>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(SCENARIOS) as ScenarioKey[]).map((k) => (
            <Button
              key={k}
              size="sm"
              variant={scenario === k ? "default" : "outline"}
              className={cn("h-9", scenario === k && "bg-volt text-white hover:bg-volt/85")}
              onClick={() => applyScenario(k)}
            >
              {k === "bull" || k === "sideways" ? (
                <TrendingUp className="mr-1 h-3.5 w-3.5" />
              ) : (
                <TrendingDown className="mr-1 h-3.5 w-3.5" />
              )}
              {SCENARIOS[k].label}
            </Button>
          ))}
          <Button size="sm" variant="ghost" onClick={reset} className="h-9">
            <Trash2 className="mr-1 h-3.5 w-3.5" /> Reset
          </Button>
        </div>
        {scenario && (
          <AnimatePresence>
            <motion.p
              key={scenario}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-muted-foreground mt-2 text-xs"
            >
              {SCENARIOS[scenario].blurb}
            </motion.p>
          </AnimatePresence>
        )}
        {flash && <p className="text-gold mt-2 text-xs">{flash}</p>}
      </div>

      {/* Assets */}
      <p className="text-muted-foreground mt-5 mb-2 text-xs font-medium">
        Step 2 — buy and sell with your fictional ${START_CASH.toLocaleString()}:
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {DESK_ASSETS.map((a) => {
          const held = qty[a.key] ?? 0;
          const value = held * prices[a.key];
          return (
            <div key={a.key} className="rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">
                    <span className="tnum mr-2 rounded bg-muted px-1.5 py-0.5 text-xs">{a.ticker}</span>
                    {a.name}
                  </p>
                  <p className="text-muted-foreground mt-0.5 text-[11px]">{a.volNote}</p>
                </div>
                <p className="tnum text-lg font-bold">{fmtPrice(prices[a.key], a.decimals)}</p>
              </div>
              <p className="tnum text-muted-foreground mt-2 text-xs">
                Holding: {held > 0 ? `${held < 0.0001 ? held.toExponential(2) : held.toLocaleString("en-US", { maximumFractionDigits: held < 1 ? 6 : 2 })} units · ${fmtUsd(value)}` : "nothing yet"}
              </p>
              <div className="mt-2.5 flex gap-2">
                <Input
                  type="number"
                  min={0}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="tnum h-9 min-w-0 flex-1"
                  aria-label={`Amount in dollars to trade ${a.ticker}`}
                />
                <Button size="sm" className="h-9 shrink-0 bg-bull px-2.5 text-white hover:bg-bull/85 sm:px-3" onClick={() => trade(a, "BUY")}>
                  Buy
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-9 shrink-0 border-bear/50 px-2.5 text-bear hover:bg-bear/10 sm:px-3"
                  onClick={() => trade(a, "SELL")}
                  disabled={held <= 0}
                >
                  Sell
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trade log */}
      <div className="mt-5">
        <p className="mb-2 text-xs font-medium text-muted-foreground">Trade log (latest first)</p>
        <div className="custom-scrollbar max-h-40 overflow-y-auto rounded-lg border border-border">
          {log.length === 0 ? (
            <p className="text-muted-foreground p-3 text-xs">No trades yet — your ledger is empty.</p>
          ) : (
            <ul className="divide-y divide-border text-xs">
              {log.map((t) => (
                <li key={t.id} className="tnum flex items-center justify-between px-3 py-2">
                  <span className={cn("font-bold", t.side === "BUY" ? "text-bull" : "text-bear")}>{t.side}</span>
                  <span className="font-semibold">{t.ticker}</span>
                  <span className="text-muted-foreground">
                    {t.qty < 0.0001 ? t.qty.toExponential(2) : t.qty.toLocaleString("en-US", { maximumFractionDigits: 4 })} @ {fmtPrice(t.price, t.usd && t.price < 10 ? 2 : t.price < 1000 ? 2 : 0)}
                  </span>
                  <span className="font-medium">{fmtUsd(t.usd)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Allocation lab ---------- */

const BUCKETS = [
  { key: "stock", label: "Fictional stock", mult: { bull: 1.28, bear: 0.78, crash: 0.62, sideways: 1.01 } },
  { key: "etf", label: "Diversified ETF", mult: { bull: 1.14, bear: 0.9, crash: 0.82, sideways: 1.0 } },
  { key: "crypto", label: "Fictional crypto", mult: { bull: 1.65, bear: 0.52, crash: 0.38, sideways: 0.98 } },
  { key: "bonds", label: "Bonds", mult: { bull: 1.03, bear: 0.96, crash: 0.9, sideways: 1.005 } },
  { key: "cash", label: "Cash", mult: { bull: 1.0, bear: 1.0, crash: 1.0, sideways: 1.0 } },
] as const;

function AllocationLab() {
  const [weights, setWeights] = React.useState<number[]>([30, 30, 20, 10, 10]);
  const [scenario, setScenario] = React.useState<Exclude<ScenarioKey, never>>("bull");

  const sum = weights.reduce((a, b) => a + b, 0);
  const normalized = weights.map((w) => (sum === 0 ? 0 : (w / sum) * 100));
  const outcome = BUCKETS.reduce((s, b, i) => s + (normalized[i] / 100) * START_CASH * b.mult[scenario], 0);
  const ret = ((outcome - START_CASH) / START_CASH) * 100;
  const concentration = Math.max(...normalized);

  const setBucket = (i: number, v: number) => {
    setWeights((w) => {
      const next = [...w];
      next[i] = v;
      return next;
    });
  };

  return (
    <div className="bg-card rounded-xl border border-border p-5 sm:p-6">
      <h3 className="font-heading text-xl font-semibold">The allocation lab</h3>
      <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
        Drag the sliders to split {fmtUsd(START_CASH)} across five buckets, then pick a market
        scenario. Notice how concentration in volatile buckets swings the result dramatically in{" "}
        <em>both</em> directions.
      </p>

      <div className="mt-4 space-y-3.5">
        {BUCKETS.map((b, i) => (
          <div key={b.key} className="flex items-center gap-2 sm:gap-3">
            <span className="w-24 shrink-0 text-xs font-medium sm:w-44 sm:text-sm">{b.label}</span>
            <Slider
              value={[weights[i]]}
              min={0}
              max={100}
              step={5}
              onValueChange={(v) => setBucket(i, v[0])}
              className="flex-1"
              aria-label={`${b.label} allocation percent`}
            />
            <span className="tnum w-12 text-right text-xs font-semibold">{normalized[i].toFixed(0)}%</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Scenario">
        {(Object.keys(SCENARIOS) as ScenarioKey[]).map((k) => (
          <Button
            key={k}
            size="sm"
            variant={scenario === k ? "default" : "outline"}
            className={cn("h-8", scenario === k && "bg-volt text-white hover:bg-volt/85")}
            onClick={() => setScenario(k)}
          >
            {SCENARIOS[k].label}
          </Button>
        ))}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="bg-muted/50 rounded-lg p-3.5 sm:p-4">
          <p className="text-muted-foreground text-xs">Portfolio value after scenario</p>
          <p className="tnum mt-1 text-xl font-bold sm:text-2xl">{fmtUsd(outcome)}</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-3.5 sm:p-4">
          <p className="text-muted-foreground text-xs">Hypothetical return</p>
          <p className={cn("tnum mt-1 text-xl font-bold sm:text-2xl", ret >= 0 ? "text-bull" : "text-bear")}>
            {ret >= 0 ? "+" : ""}
            {ret.toFixed(1)}%
          </p>
        </div>
        <div className="bg-muted/50 rounded-lg p-3.5 sm:p-4">
          <p className="text-muted-foreground text-xs">Concentration (largest bucket)</p>
          <p className={cn("tnum mt-1 text-xl font-bold sm:text-2xl", concentration >= 60 ? "text-bear" : concentration >= 40 ? "text-gold" : "text-bull")}>
            {concentration.toFixed(0)}%
          </p>
          <p className="text-muted-foreground mt-1 text-[11px]">
            {concentration >= 60
              ? "High concentration — big swings expected."
              : concentration >= 40
                ? "Moderate concentration."
                : "Well spread — smoother ride."}
          </p>
        </div>
      </div>

      {/* outcome bar */}
      <div className="mt-5">
        <p className="mb-1.5 text-xs text-muted-foreground">
          Visualize the outcome: worst plausible → your scenario → best plausible
        </p>
        <div className="relative h-8 overflow-hidden rounded-lg border border-border">
          <div className="absolute inset-y-0 left-0 w-[45%] bg-bear/20" aria-hidden />
          <div className="absolute inset-y-0 right-0 w-[45%] bg-bull/20" aria-hidden />
          <div className="absolute inset-y-0 left-[45%] w-[10%] bg-muted" aria-hidden />
          <div
            className="absolute inset-y-0 w-1.5 rounded bg-volt transition-all duration-500"
            style={{
              left: `${Math.min(96, Math.max(1, 50 + (ret / 70) * 45))}%`,
            }}
            aria-hidden
          />
          <span className="tnum absolute inset-y-0 left-2 flex items-center text-[10px] font-semibold text-bear">
            −55%
          </span>
          <span className="tnum absolute inset-y-0 right-2 flex items-center text-[10px] font-semibold text-bull">
            +65%
          </span>
        </div>
        <p className="text-muted-foreground mt-1.5 text-[11px]">
          Marker shows your {SCENARIOS[scenario].label.toLowerCase()} outcome against a rough range of
          historical-style scenarios (illustrative, not predictive).
        </p>
      </div>
    </div>
  );
}

/* ---------- Section ---------- */

export function Simulator() {
  return (
    <SectionShell
      id="simulation"
      moduleId="simulation"
      number={5}
      title="Learn by Simulation"
      intro={
        <>
          Theory becomes intuition through practice. Below you get{" "}
          <strong className="text-foreground">{fmtUsd(START_CASH)} of fictional capital</strong> — no
          deposits, no real money, no accounts. Buy and sell fictional assets, throw bull and bear
          markets at your portfolio, and see how different asset allocations behave under stress.
        </>
      }
    >
      <TradingDesk />
      <AllocationLab />
      <Takeaway>
        Volatility is not a flaw — it&apos;s the price of admission. The simulator shows the same
        portfolio can look brilliant in a bull market and brutal in a crash; your job as a learner is
        to find an allocation you could actually live with.
      </Takeaway>
    </SectionShell>
  );
}
