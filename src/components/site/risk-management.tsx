"use client";

import * as React from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionShell, Term, Takeaway, InfoCard } from "./shared";
import { cn } from "@/lib/utils";
import { Activity, Layers, Crosshair, Zap, HeartCrack } from "lucide-react";

/* ---------- Drawdown recovery visual ---------- */

function DrawdownVisual() {
  const rows = [
    { drop: -10, need: 11 },
    { drop: -25, need: 33 },
    { drop: -50, need: 100 },
    { drop: -80, need: 400 },
  ];
  return (
    <div className="bg-card rounded-xl border border-border p-5 sm:p-6">
      <h3 className="font-heading text-xl font-semibold">Losses are asymmetric — brutally so</h3>
      <p className="text-muted-foreground mt-1.5 max-w-3xl text-sm leading-relaxed">
        A 10% loss needs an 11% gain to recover. A 50% loss needs a 100% gain. This asymmetry is why
        professionals obsess over avoiding deep drawdowns rather than chasing big wins.
      </p>
      <div className="mt-4 space-y-3">
        {rows.map((r) => {
          const barColor = r.drop <= -50 ? "bg-bear" : r.drop <= -25 ? "bg-gold" : "bg-bull";
          return (
            <div key={r.drop} className="flex items-center gap-2 sm:gap-3">
              <span className="tnum w-11 shrink-0 text-right text-sm font-semibold text-bear sm:w-14">{r.drop}%</span>
              <div className="flex h-7 min-w-0 flex-1 items-center gap-2">
                <div className="h-7 shrink-0 overflow-hidden rounded-md" style={{ width: `${Math.min(55, r.need / 7.3)}%` }}>
                  <div className={cn("h-full rounded-md", barColor)} />
                </div>
                <span className="tnum text-[10px] font-medium whitespace-nowrap sm:text-xs">
                  +{r.need}% to break even
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-muted-foreground mt-3 text-xs">
        Bars scaled to the required gain. Survivability beats optimization.
      </p>
    </div>
  );
}

/* ---------- Position sizing calculator ---------- */

function PositionSizer() {
  const [account, setAccount] = React.useState("10000");
  const [riskPct, setRiskPct] = React.useState([1]);
  const [stopPct, setStopPct] = React.useState([8]);

  const acc = Math.max(0, parseFloat(account) || 0);
  const riskUsd = (acc * riskPct[0]) / 100;
  const position = stopPct[0] > 0 ? (riskUsd / stopPct[0]) * 100 : 0;
  const posPctOfAcc = acc > 0 ? (position / acc) * 100 : 0;

  return (
    <div className="bg-card rounded-xl border border-border p-5 sm:p-6">
      <h3 className="font-heading flex items-center gap-2 text-xl font-semibold">
        <Crosshair className="text-volt h-5 w-5" aria-hidden /> Position sizing calculator
      </h3>
      <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
        The classic beginner rule: decide the most you can lose on a trade <em>before</em> entering,
        keep it tiny (1–2% of capital), and let math size the position for you.
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div>
          <Label htmlFor="acc" className="text-xs">Account size ($)</Label>
          <Input id="acc" className="tnum mt-1.5" value={account} onChange={(e) => setAccount(e.target.value)} inputMode="decimal" />
        </div>
        <div>
          <Label className="text-xs">Risk per trade: <span className="tnum text-volt">{riskPct[0]}%</span></Label>
          <Slider className="mt-3" value={riskPct} min={1} max={10} step={1} onValueChange={setRiskPct} aria-label="Risk per trade percent" />
        </div>
        <div>
          <Label className="text-xs">Stop-loss distance: <span className="tnum text-volt">{stopPct[0]}%</span></Label>
          <Slider className="mt-3" value={stopPct} min={2} max={30} step={1} onValueChange={setStopPct} aria-label="Stop loss distance percent" />
        </div>
      </div>
      <div className="bg-muted/50 mt-4 grid gap-3 rounded-lg p-3.5 sm:grid-cols-3 sm:p-4">
        <div>
          <p className="text-muted-foreground text-xs">Maximum loss if stopped out</p>
          <p className="tnum mt-1 text-lg font-bold text-bear sm:text-xl">
            −${riskUsd.toLocaleString("en-US", { maximumFractionDigits: 0 })}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs">Position size to buy</p>
          <p className="tnum mt-1 text-lg font-bold sm:text-xl">${position.toLocaleString("en-US", { maximumFractionDigits: 0 })}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs">That&apos;s this share of your account</p>
          <p className="tnum mt-1 text-lg font-bold sm:text-xl">{posPctOfAcc.toFixed(0)}%</p>
        </div>
      </div>
      <p className="text-muted-foreground mt-3 text-xs leading-relaxed">
        Risk-to-reward: if you risk ${riskUsd.toFixed(0)} to make 2× that (${(riskUsd * 2).toFixed(0)}),
        you only need to be right about 1 in 3 times to break even. That is what a 2:1{" "}
        <Term id="position-sizing">risk-to-reward</Term> ratio buys you.
      </p>
    </div>
  );
}

/* ---------- Leverage visual ---------- */

function LeverageVisual() {
  const [lev, setLev] = React.useState([3]);
  const wipeout = 100 / lev[0];
  return (
    <div className="bg-card rounded-xl border border-border p-5 sm:p-6">
      <h3 className="font-heading flex items-center gap-2 text-xl font-semibold">
        <Zap className="text-gold h-5 w-5" aria-hidden /> Why leverage melts accounts
      </h3>
      <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
        <Term id="leverage">Leverage</Term> borrows money to enlarge a position. Gains multiply — and
        so do losses. Drag the slider to see how small a move it takes to lose everything:
      </p>
      <div className="mt-4 flex items-center gap-3">
        <span className="w-24 shrink-0 text-xs font-medium sm:w-28">Leverage: {lev[0]}×</span>
        <Slider value={lev} min={1} max={25} step={1} onValueChange={setLev} className="flex-1" aria-label="Leverage multiplier" />
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className={cn("rounded-lg border p-4", lev[0] > 5 ? "border-bear/50 bg-bear/10" : "border-border bg-muted/50")}>
          <p className="text-muted-foreground text-xs">Price move against you that wipes out 100% of your stake</p>
          <p className={cn("tnum mt-1 text-2xl font-bold sm:text-3xl", lev[0] > 5 ? "text-bear" : "text-gold")}>−{wipeout.toFixed(1)}%</p>
        </div>
        <div className="bg-muted/50 rounded-lg border border-border p-4">
          <p className="text-muted-foreground text-xs">Your effective exposure</p>
          <p className="tnum mt-1 text-2xl font-bold sm:text-3xl">{lev[0]}× your money</p>
          <p className="text-muted-foreground mt-1 text-[11px]">
            On a $1,000 stake at {lev[0]}× leverage, you control ${((1000 * lev[0])).toLocaleString()} of the asset.
          </p>
        </div>
      </div>
      <p className="text-muted-foreground mt-3 text-xs leading-relaxed">
        Crypto platforms offer 50–125× leverage. At 100×, a 1% move against you ends your position —
        that can happen in seconds. Most beginners who try high leverage don&apos;t lose slowly; they
        lose instantly.
      </p>
    </div>
  );
}

/* ---------- Section ---------- */

const MISTAKES = [
  {
    icon: <HeartCrack className="text-bear h-5 w-5" aria-hidden />,
    title: "FOMO buying",
    text: "Buying because an asset is pumping and everyone is talking about it. You buy other people's profits at their peak — the classic top signal.",
  },
  {
    icon: <HeartCrack className="text-bear h-5 w-5" aria-hidden />,
    title: "Panic selling",
    text: "Dumping everything at the bottom because the news is terrifying. It converts a temporary paper loss into a permanent real one.",
  },
  {
    icon: <HeartCrack className="text-bear h-5 w-5" aria-hidden />,
    title: "Revenge trading",
    text: "Trying to win a loss back immediately with bigger, riskier bets. Losses are a cost of business — chasing them compounds the damage.",
  },
  {
    icon: <HeartCrack className="text-bear h-5 w-5" aria-hidden />,
    title: "No plan at all",
    text: "Entering without knowing when you'd sell at a loss or take profit. A plan you write calmly beats a decision you make in panic.",
  },
];

export function RiskManagement() {
  return (
    <SectionShell
      id="risk"
      moduleId="risk"
      number={6}
      title="Risk Management"
      intro={
        <>
          The uncomfortable truth: how you manage losses matters more than how often you win.
          This lesson covers volatility, the math of drawdowns, position sizing, the mechanics of
          leverage — and the emotional traps that sink more beginners than any market crash.
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <DrawdownVisual />
        <div className="space-y-6">
          <InfoCard title="Volatility: the price of admission" icon={<Activity className="text-volt h-5 w-5" aria-hidden />}>
            <p>
              <Term id="volatility">Volatility</Term> measures how violently prices swing. High
              volatility is a two-edged sword: it creates the exciting gains <em>and</em> the
              stomach-churning losses. Crypto typically runs 3–5× more volatile than stocks.
            </p>
            <p>
              The practical question isn&apos;t &ldquo;which asset is best?&rdquo; but &ldquo;what
              swing can I sit through without selling at the worst moment?&rdquo; Answer that honestly
              and your allocation will follow.
            </p>
          </InfoCard>
          <InfoCard title="Diversification & asset allocation" icon={<Layers className="text-volt h-5 w-5" aria-hidden />}>
            <p>
              <Term id="diversification">Diversification</Term> spreads risk across assets;{" "}
              <strong className="text-foreground">asset allocation</strong> is the recipe — the
              percentages you assign to stocks, bonds, crypto and cash. You experimented with both in
              the simulator: the same market scenario produced wildly different outcomes for different
              mixes.
            </p>
            <p>
              Your allocation is your single biggest risk decision — bigger than picking any individual
              asset. Revisit it when your life changes, not when the market does.
            </p>
          </InfoCard>
        </div>
      </div>

      <PositionSizer />
      <LeverageVisual />

      <div>
        <h3 className="font-heading text-xl font-semibold">The four emotional traps</h3>
        <p className="text-muted-foreground mt-2 max-w-3xl text-sm leading-relaxed">
          Every experienced investor recognizes these from personal scar tissue. Naming them is the
          first defense; written rules are the second.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MISTAKES.map((m) => (
            <div key={m.title} className="bg-card rounded-xl border border-border p-5">
              {m.icon}
              <p className="mt-2.5 text-sm font-semibold">{m.title}</p>
              <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">{m.text}</p>
            </div>
          ))}
        </div>
      </div>

      <Takeaway>
        Survive first, optimize later. Small positions, wide diversification, zero leverage, and a
        written plan for when you&apos;ll sell — these four habits prevent the disasters that no
        amount of market genius can undo.
      </Takeaway>
    </SectionShell>
  );
}
