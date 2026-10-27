/**
 * Deterministic (seeded) market data generators.
 * ALL data produced here is ILLUSTRATIVE — invented for education.
 * It must never be presented as live or real market data.
 */

export type Candle = {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

/** mulberry32 — small deterministic PRNG */
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type AssetKey = "stock" | "crypto";

export const ASSETS: Record<
  AssetKey,
  {
    label: string;
    ticker: string;
    kind: string;
    basePrice: number;
    vol: number;
    decimals: number;
    currency: string;
    seed: number;
    note: string;
  }
> = {
  stock: {
    label: "Acme Corp (fictional)",
    ticker: "ACME",
    kind: "Stock",
    basePrice: 142,
    vol: 0.014,
    decimals: 2,
    currency: "$",
    seed: 20240117,
    note: "Illustrative stock data — a fictional company invented for learning.",
  },
  crypto: {
    label: "DemoCoin (fictional)",
    ticker: "DEMO",
    kind: "Cryptocurrency",
    basePrice: 31250,
    vol: 0.038,
    decimals: 0,
    currency: "$",
    seed: 770311,
    note: "Illustrative crypto data — a fictional coin invented for learning.",
  },
};

export type Timeframe = "1D" | "1W" | "1M" | "3M" | "1Y";

export const TIMEFRAMES: { key: Timeframe; candles: number; label: string }[] = [
  { key: "1D", candles: 24, label: "One day, hourly candles" },
  { key: "1W", candles: 28, label: "One week, 6-hour candles" },
  { key: "1M", candles: 30, label: "One month, daily candles" },
  { key: "3M", candles: 36, label: "Three months, ~2–3 day candles" },
  { key: "1Y", candles: 48, label: "One year, weekly candles" },
];

function fmtVolLabel(tf: Timeframe): string {
  switch (tf) {
    case "1D":
      return "hour";
    case "1W":
      return "6h";
    case "1M":
      return "day";
    case "3M":
      return "2–3d";
    case "1Y":
      return "week";
  }
}

/** Generate a deterministic candlestick series with a gentle trend + cycles. */
export function generateCandles(asset: AssetKey, tf: Timeframe): Candle[] {
  const cfg = ASSETS[asset];
  const tfIdx = TIMEFRAMES.findIndex((t) => t.key === tf);
  const rand = mulberry32(cfg.seed + tfIdx * 977);
  const n = TIMEFRAMES[tfIdx].candles;

  const candles: Candle[] = [];
  // trend drift: gentle up or down depending on seed parity + a sine cycle
  const drift = (rand() - 0.42) * cfg.vol * 0.9;
  const cycleAmp = cfg.vol * (1.5 + rand() * 2);
  const cyclePhase = rand() * Math.PI * 2;
  const cycleFreq = 0.6 + rand() * 1.2;

  let price = cfg.basePrice * (0.82 + rand() * 0.12);

  const volLabel = fmtVolLabel(tf);

  for (let i = 0; i < n; i++) {
    const cyc = Math.sin(cyclePhase + (i / n) * Math.PI * 2 * cycleFreq) * cycleAmp;
    const shock = (rand() - 0.5) * 2 * cfg.vol;
    const open = price;
    const close = open * (1 + drift + shock + cyc / n * 3);
    const wick = Math.abs(close - open) * (0.4 + rand() * 1.1) + open * cfg.vol * (0.2 + rand() * 0.5);
    const high = Math.max(open, close) + wick * rand();
    const low = Math.min(open, close) - wick * rand();
    const volume = Math.round((0.55 + rand()) * 1_000_000 * (1 + Math.abs(shock) * 9));
    const time = candleTime(tf, i, n);
    candles.push({
      time,
      open: round(open, cfg.decimals),
      high: round(high, cfg.decimals),
      low: round(low, cfg.decimals),
      close: round(close, cfg.decimals),
      volume,
    });
    price = close;
  }
  void volLabel;
  return candles;
}

function candleTime(tf: Timeframe, i: number, n: number): string {
  // Deterministic pseudo timestamps (illustrative)
  const daysAgo = { "1D": 1, "1W": 7, "1M": 30, "3M": 90, "1Y": 365 }[tf];
  const step = daysAgo / n;
  const d = new Date(Date.UTC(2026, 0, 1) - (daysAgo - i * step) * 86400000);
  if (tf === "1D") {
    const h = Math.floor((i / n) * 24);
    return `${String(d.getUTCDate()).padStart(2, "0")} Jan, ${String(h).padStart(2, "0")}:00`;
  }
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", timeZone: "UTC" });
}

function round(v: number, decimals: number): number {
  const f = Math.pow(10, decimals);
  return Math.round(v * f) / f;
}

/** Simple moving average over closes */
export function movingAverage(candles: Candle[], period: number): (number | null)[] {
  const out: (number | null)[] = [];
  for (let i = 0; i < candles.length; i++) {
    if (i < period - 1) {
      out.push(null);
      continue;
    }
    let sum = 0;
    for (let j = i - period + 1; j <= i; j++) sum += candles[j].close;
    out.push(round(sum / period, 2));
  }
  return out;
}

/** Hero animation series — a smooth pseudo-random walk */
export function heroSeries(seed = 42, points = 90): number[] {
  const rand = mulberry32(seed);
  const out: number[] = [];
  let v = 100;
  for (let i = 0; i < points; i++) {
    v *= 1 + (rand() - 0.46) * 0.035 + Math.sin(i / 9) * 0.004;
    out.push(v);
  }
  return out;
}

export const TICKER_ITEMS: { symbol: string; price: string; change: number }[] = [
  { symbol: "ACME (fictional stock)", price: "$146.22", change: 1.8 },
  { symbol: "DEMO (fictional coin)", price: "$32,840", change: -2.4 },
  { symbol: "S&P 500 (concept)", price: "Index", change: 0.6 },
  { symbol: "ETF demo (fictional)", price: "$51.10", change: 0.9 },
  { symbol: "STABLE (stablecoin)", price: "$1.00", change: 0.0 },
  { symbol: "Bond fund demo", price: "$98.60", change: -0.2 },
];
