"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { SimBadge, SectionShell, Takeaway } from "./shared";
import { ASSETS, TIMEFRAMES, generateCandles, movingAverage, type AssetKey, type Candle, type Timeframe } from "@/lib/market-data";
import { HelpCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

/* ============ Candle anatomy visual ============ */

function CandleAnatomy() {
  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <h4 className="font-heading text-sm font-semibold">Anatomy of a candle</h4>
      <div className="mt-2 flex items-start justify-center gap-8">
        <svg viewBox="0 0 120 210" className="h-44 w-auto" role="img" aria-label="Green bullish candle anatomy">
          <line x1="60" y1="10" x2="60" y2="200" stroke="#16c784" strokeWidth="2" />
          <rect x="42" y="55" width="36" height="105" rx="2" fill="#16c784" />
          <text x="60" y="8" textAnchor="middle" className="fill-current text-[10px] font-semibold">High</text>
          <text x="88" y="62" textAnchor="start" className="fill-current text-[10px]">Close</text>
          <text x="88" y="163" textAnchor="start" className="fill-current text-[10px]">Open</text>
          <text x="60" y="209" textAnchor="middle" className="fill-current text-[10px] font-semibold">Low</text>
          <text x="14" y="112" textAnchor="middle" className="fill-current text-[11px] font-bold text-[#16c784]">BULL</text>
        </svg>
        <svg viewBox="0 0 120 210" className="h-44 w-auto" role="img" aria-label="Red bearish candle anatomy">
          <line x1="60" y1="10" x2="60" y2="200" stroke="#ea3943" strokeWidth="2" />
          <rect x="42" y="50" width="36" height="105" rx="2" fill="#ea3943" />
          <text x="60" y="8" textAnchor="middle" className="fill-current text-[10px] font-semibold">High</text>
          <text x="88" y="57" textAnchor="start" className="fill-current text-[10px]">Open</text>
          <text x="88" y="158" textAnchor="start" className="fill-current text-[10px]">Close</text>
          <text x="60" y="209" textAnchor="middle" className="fill-current text-[10px] font-semibold">Low</text>
          <text x="14" y="110" textAnchor="middle" className="fill-current text-[11px] font-bold text-[#ea3943]">BEAR</text>
        </svg>
      </div>
      <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
        The <strong className="text-foreground">body</strong> spans open → close; the thin{" "}
        <strong className="text-foreground">wicks</strong> reach the high and low. Green (bullish)
        closes above its open; red (bearish) closes below.
      </p>
    </div>
  );
}

/* ============ Mini pattern cards ============ */

const PATTERNS: { name: string; path: string; color: string; read: string }[] = [
  {
    name: "Doji — indecision",
    path: "M15,10 L15,58 M15,30 L15,32 M10,28 Q20,24 25,32 Q15,40 5,30",
    color: "#f0b90b",
    read: "Open and close nearly equal — buyers and sellers fought to a draw. Often appears at turning points.",
  },
  {
    name: "Hammer — possible bottom",
    path: "M15,8 L15,14 M11,14 L19,14 L19,20 L11,20 Z M15,20 L15,56",
    color: "#16c784",
    read: "Long lower wick after a fall: sellers pushed down, buyers slammed the price back. A classic 'maybe the bottom' signal.",
  },
  {
    name: "Engulfing — momentum shift",
    path: "M8,20 L12,20 L12,34 L8,34 Z M20,10 L26,10 L26,40 L20,40 Z",
    color: "#ea3943",
    read: "A large candle that completely covers the previous one — here a red body swallowing a green one, suggesting sellers took control.",
  },
];

function PatternCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {PATTERNS.map((p) => (
        <div key={p.name} className="bg-card rounded-xl border border-border p-4 text-center">
          <svg viewBox="0 0 34 62" className="mx-auto h-20" role="img" aria-label={p.name}>
            <path d={p.path} fill={p.color} stroke={p.color} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <p className="mt-1 text-sm font-semibold">{p.name}</p>
          <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">{p.read}</p>
        </div>
      ))}
    </div>
  );
}

/* ============ The interactive candlestick chart ============ */

const CHART_W = 820;
const CHART_H = 380;
const PRICE_H = 280;
const VOL_TOP = 300;
const VOL_H = 66;
const PAD_R = 8;

function CandleChart({
  candles,
  showMA,
  asset,
  onHover,
  hoverIdx,
}: {
  candles: Candle[];
  showMA: boolean;
  asset: AssetKey;
  onHover: (i: number | null) => void;
  hoverIdx: number | null;
}) {
  const ma7 = React.useMemo(() => movingAverage(candles, 7), [candles]);
  const ma25 = React.useMemo(() => movingAverage(candles, 25), [candles]);

  const { lo, hi } = React.useMemo(() => {
    const l = Math.min(...candles.map((c) => c.low));
    const h = Math.max(...candles.map((c) => c.high));
    const pad = (h - l) * 0.08;
    return { lo: l - pad, hi: h + pad };
  }, [candles]);
  const maxVol = React.useMemo(() => Math.max(...candles.map((c) => c.volume)), [candles]);

  const n = candles.length;
  const slot = (CHART_W - PAD_R) / n;
  const bodyW = Math.max(3, Math.min(16, slot * 0.62));

  const yOf = (price: number) => 14 + (1 - (price - lo) / (hi - lo)) * (PRICE_H - 14);
  const xOf = (i: number) => i * slot + slot / 2;
  const vH = (v: number) => (v / maxVol) * (VOL_H - 8);

  const linePath = (series: (number | null)[]) =>
    series
      .map((v, i) => (v === null ? null : `${i === 0 || series[i - 1] === null ? "M" : "L"}${xOf(i).toFixed(1)},${yOf(v).toFixed(1)}`))
      .filter(Boolean)
      .join(" ")
      .replace(/^M/, "M");

  const gridPrices = React.useMemo(() => {
    const out: number[] = [];
    for (let i = 0; i <= 4; i++) out.push(lo + ((hi - lo) * i) / 4);
    return out;
  }, [lo, hi]);

  const decimals = ASSETS[asset].decimals;
  const fmt = (v: number) =>
    v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${CHART_W} ${CHART_H}`}
        className="w-full"
        role="img"
        aria-label="Interactive candlestick chart of simulated prices"
        onMouseLeave={() => onHover(null)}
      >
        {/* gridlines + price axis */}
        {gridPrices.map((p) => (
          <g key={p}>
            <line x1="0" x2={CHART_W} y1={yOf(p)} y2={yOf(p)} stroke="currentColor" strokeOpacity="0.09" strokeDasharray="3 6" />
            <text x={CHART_W - 4} y={yOf(p) - 4} textAnchor="end" className="fill-current text-[11px] opacity-50 tnum">
              {fmt(p)}
            </text>
          </g>
        ))}

        {/* volume bars */}
        {candles.map((c, i) => (
          <rect
            key={`v${i}`}
            x={xOf(i) - bodyW / 2}
            y={VOL_TOP + (VOL_H - vH(c.volume))}
            width={bodyW}
            height={vH(c.volume)}
            fill={c.close >= c.open ? "#16c784" : "#ea3943"}
            opacity={hoverIdx === null || hoverIdx === i ? 0.35 : 0.12}
            rx="1"
          />
        ))}
        <text x="4" y={VOL_TOP + 12} className="fill-current text-[10px] opacity-45">
          Volume
        </text>

        {/* MA lines */}
        {showMA && (
          <>
            <path d={linePath(ma7)} fill="none" stroke="#3b96ff" strokeWidth="1.8" opacity="0.9" />
            <path d={linePath(ma25)} fill="none" stroke="#f0b90b" strokeWidth="1.8" opacity="0.9" />
          </>
        )}

        {/* candles */}
        {candles.map((c, i) => {
          const up = c.close >= c.open;
          const col = up ? "#16c784" : "#ea3943";
          const yO = yOf(c.open);
          const yC = yOf(c.close);
          const top = Math.min(yO, yC);
          const h = Math.max(2, Math.abs(yC - yO));
          const hovered = hoverIdx === i;
          return (
            <motion.g
              key={`c${i}`}
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.012, duration: 0.3, ease: "easeOut" }}
              onMouseEnter={() => onHover(i)}
            >
              <rect x={xOf(i) - slot / 2} y="0" width={slot} height={CHART_H} fill="transparent" />
              <line x1={xOf(i)} x2={xOf(i)} y1={yOf(c.high)} y2={yOf(c.low)} stroke={col} strokeWidth="1.6" />
              <rect
                x={xOf(i) - bodyW / 2}
                y={top}
                width={bodyW}
                height={h}
                fill={col}
                opacity={hovered ? 1 : 0.92}
                stroke={hovered ? "currentColor" : "none"}
                strokeOpacity="0.4"
                rx="1.5"
              />
            </motion.g>
          );
        })}

        {/* hover crosshair */}
        {hoverIdx !== null && (
          <line x1={xOf(hoverIdx)} x2={xOf(hoverIdx)} y1="0" y2={VOL_TOP + VOL_H} stroke="currentColor" strokeOpacity="0.35" strokeDasharray="3 4" />
        )}
      </svg>

      {/* tooltip */}
      {hoverIdx !== null && candles[hoverIdx] && (
        <div
          className="bg-popover pointer-events-none absolute top-2 z-10 w-44 rounded-lg border border-border p-3 text-xs shadow-xl"
          style={{
            left: `${(hoverIdx + 0.5) < n * 0.55 ? (xOf(hoverIdx) / CHART_W) * 100 + 3 : (xOf(hoverIdx) / CHART_W) * 100 - 32}%`,
          }}
        >
          <p className="font-semibold">{candles[hoverIdx].time}</p>
          <dl className="tnum mt-1.5 space-y-0.5">
            {(["open", "high", "low", "close"] as const).map((k) => (
              <div key={k} className="flex justify-between">
                <dt className="text-muted-foreground capitalize">{k}</dt>
                <dd className="font-medium">{fmt(candles[hoverIdx][k])}</dd>
              </div>
            ))}
            <div className="flex justify-between border-t border-border pt-0.5">
              <dt className="text-muted-foreground">Volume</dt>
              <dd className="font-medium">{candles[hoverIdx].volume.toLocaleString()}</dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
}

/* ============ Section ============ */

export function ChartReading() {
  const [asset, setAsset] = React.useState<AssetKey>("stock");
  const [tf, setTf] = React.useState<Timeframe>("1M");
  const [showMA, setShowMA] = React.useState(true);
  const [hoverIdx, setHoverIdx] = React.useState<number | null>(null);

  const candles = React.useMemo(() => generateCandles(asset, tf), [asset, tf]);

  const cfg = ASSETS[asset];
  const first = candles[0];
  const last = candles[candles.length - 1];
  const changePct = ((last.close - first.open) / first.open) * 100;
  const up = changePct >= 0;
  const money = (v: number) => `${cfg.currency}${v.toLocaleString("en-US", { minimumFractionDigits: cfg.decimals, maximumFractionDigits: cfg.decimals })}`;

  // guided exercise state
  const [hintLevel, setHintLevel] = React.useState(0);
  const [answered, setAnswered] = React.useState<"none" | "right" | "wrong">("none");
  const resetExercise = () => {
    setHintLevel(0);
    setAnswered("none");
  };

  return (
    <SectionShell
      id="charts"
      moduleId="charts"
      number={4}
      title="Reading Charts"
      intro={
        <>
          Charts look intimidating until you learn they only ever show four numbers per period: open,
          high, low and close. Use the interactive chart below — hover any candle, switch assets and
          timeframes, and toggle the moving averages — until OHLC feels like a second language.
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.9fr_1fr]">
        {/* Chart panel */}
        <div className="bg-card rounded-xl border border-border p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* asset toggle */}
            <div className="bg-muted inline-flex rounded-lg p-1" role="tablist" aria-label="Choose market">
              {(Object.keys(ASSETS) as AssetKey[]).map((k) => (
                <button
                  key={k}
                  role="tab"
                  aria-selected={asset === k}
                  onClick={() => {
                    setAsset(k);
                    setHoverIdx(null);
                  }}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                    asset === k ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {k === "stock" ? "📈 Stock (ACME)" : "₿ Crypto (DEMO)"}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Switch id="ma-toggle" checked={showMA} onCheckedChange={setShowMA} />
              <Label htmlFor="ma-toggle" className="text-xs">
                Moving averages
              </Label>
            </div>
          </div>

          {/* timeframe switcher */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Timeframe">
              {TIMEFRAMES.map((t) => (
                <Button
                  key={t.key}
                  size="sm"
                  variant={tf === t.key ? "default" : "outline"}
                  className={cn("h-8 px-3", tf === t.key && "bg-volt text-white hover:bg-volt/85")}
                  onClick={() => {
                    setTf(t.key);
                    setHoverIdx(null);
                  }}
                  title={t.label}
                >
                  {t.key}
                </Button>
              ))}
            </div>
            <SimBadge>{cfg.note}</SimBadge>
          </div>

          {/* price header */}
          <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1 px-1">
            <span className="font-heading text-xl font-bold">{cfg.label}</span>
            <span className="tnum text-2xl font-bold">{money(last.close)}</span>
            <span className={cn("tnum text-sm font-semibold", up ? "text-bull" : "text-bear")}>
              {up ? "▲" : "▼"} {Math.abs(changePct).toFixed(2)}% over this window
            </span>
          </div>
          <p className="text-muted-foreground mt-0.5 px-1 text-[11px]">
            {TIMEFRAMES.find((t) => t.key === tf)?.label} · hover any candle for OHLC + volume
          </p>

          <div className="mt-3 text-foreground">
            <CandleChart
              candles={candles}
              showMA={showMA}
              asset={asset}
              hoverIdx={hoverIdx}
              onHover={setHoverIdx}
            />
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-4 px-1 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-4 rounded bg-[#16c784]" /> Close ≥ Open
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-4 rounded bg-[#ea3943]" /> Close &lt; Open
            </span>
            {showMA && (
              <>
                <span className="flex items-center gap-1.5">
                  <span className="h-0.5 w-4 bg-[#3b96ff]" /> MA-7
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-0.5 w-4 bg-[#f0b90b]" /> MA-25
                </span>
              </>
            )}
          </div>
        </div>

        {/* Side explainer */}
        <div className="space-y-4">
          <CandleAnatomy />
          <div className="bg-card rounded-xl border border-border p-5">
            <h4 className="font-heading text-sm font-semibold">Trends, support & resistance</h4>
            <ul className="text-muted-foreground mt-2 space-y-2 text-xs leading-relaxed">
              <li>
                <strong className="text-foreground">Trend</strong> — the general direction. Higher
                highs + higher lows = uptrend; the reverse = downtrend.
              </li>
              <li>
                <strong className="text-foreground">Support</strong> — a floor level where buying has
                repeatedly stopped declines.
              </li>
              <li>
                <strong className="text-foreground">Resistance</strong> — a ceiling where selling has
                repeatedly capped rallies.
              </li>
              <li>
                <strong className="text-foreground">Moving average</strong> — the average close of the
                last N candles, drawn as a smooth line. It filters noise and shows the underlying
                direction.
              </li>
            </ul>
          </div>
          <div className="rounded-xl border border-volt/40 bg-volt/10 p-5">
            <h4 className="font-heading flex items-center gap-2 text-sm font-semibold">
              <HelpCircle className="text-volt h-4 w-4" aria-hidden /> Guided exercise
            </h4>
            <p className="mt-2 text-xs leading-relaxed">
              Hover across the chart from left to right and find the <strong>lowest low</strong> of
              the window. Click the answer:
            </p>
            <div className="mt-3 grid grid-cols-3 gap-1.5 text-center text-xs font-semibold">
              {["Start of window", "Middle third", "End of window"].map((opt, i) => (
                <button
                  key={opt}
                  onClick={() => {
                    setAnswered(i === 0 ? "right" : "wrong");
                    if (i !== 0) setHintLevel(1);
                  }}
                  className="bg-card hover:border-volt rounded-lg border border-border px-2 py-2.5 transition-colors"
                >
                  {opt}
                </button>
              ))}
            </div>
            {answered === "none" && hintLevel === 0 && (
              <p className="text-muted-foreground mt-2.5 text-[11px] leading-relaxed">
                Hint 1: sort the candles mentally by their <em>low</em> wick — where does the deepest
                one sit?
              </p>
            )}
            {answered === "wrong" && (
              <p className="mt-2.5 rounded-md bg-bear/10 p-2 text-[11px] leading-relaxed text-bear">
                Not quite — compare candle lows by hovering. Notice the trend: in this window prices
                generally drift upward, so the deepest low usually sits near the beginning. Try again!
              </p>
            )}
            {answered === "right" && (
              <p className="text-bull mt-2.5 flex items-start gap-1.5 rounded-md bg-bull/10 p-2 text-[11px] leading-relaxed">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" /> Correct! In an uptrend window,
                the lowest low typically appears near the start. Now switch to the 1D timeframe and
                check whether that still holds.
              </p>
            )}
            {answered !== "none" && (
              <Button size="sm" variant="outline" className="mt-2.5 h-7" onClick={resetExercise}>
                Reset exercise
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Patterns */}
      <div>
        <h3 className="font-heading text-xl font-semibold">Three patterns beginners actually remember</h3>
        <p className="text-muted-foreground mt-2 max-w-3xl text-sm leading-relaxed">
          Chart patterns are shapes that recur because human greed and fear recur. They are
          tendencies, never guarantees — but knowing these three makes charts feel far less random.
        </p>
        <div className="mt-4">
          <PatternCards />
        </div>
      </div>

      <Takeaway>
        A candle is just a story compressed into four numbers. Learn to read OHLC + volume, add a
        moving average for direction, and remember: patterns describe probabilities, not certainties.
      </Takeaway>
    </SectionShell>
  );
}
