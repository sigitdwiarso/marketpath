"use client";

import * as React from "react";

export type ModuleId =
  | "fundamentals"
  | "stocks"
  | "crypto"
  | "charts"
  | "simulation"
  | "risk"
  | "practice";

export const MODULE_ORDER: ModuleId[] = [
  "fundamentals",
  "stocks",
  "crypto",
  "charts",
  "simulation",
  "risk",
  "practice",
];

export const MODULE_META: Record<ModuleId, { title: string; href: string; blurb: string }> = {
  fundamentals: { title: "Market Fundamentals", href: "#fundamentals", blurb: "What markets are and how they work" },
  stocks: { title: "Stock Essentials", href: "#stocks", blurb: "Shares, ETFs, valuation and market cycles" },
  crypto: { title: "Crypto Essentials", href: "#crypto", blurb: "Bitcoin, blockchain, wallets and safety" },
  charts: { title: "Reading Charts", href: "#charts", blurb: "Candlesticks, trends and indicators" },
  simulation: { title: "Learn by Simulation", href: "#simulation", blurb: "Practice with fictional capital" },
  risk: { title: "Risk Management", href: "#risk", blurb: "Volatility, sizing and psychology" },
  practice: { title: "Practice & Quizzes", href: "#practice", blurb: "Knowledge checks and badges" },
};

type ProgressState = {
  completed: ModuleId[];
  quizScores: Partial<Record<ModuleId, { correct: number; total: number }>>;
  toggleCompleted: (id: ModuleId) => void;
  recordQuiz: (id: ModuleId, correct: number, total: number) => void;
  resetAll: () => void;
  badges: string[];
};

const ProgressContext = React.createContext<ProgressState | null>(null);

const STORAGE_KEY = "marketpath-progress-v1";

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [completed, setCompleted] = React.useState<ModuleId[]>([]);
  const [quizScores, setQuizScores] = React.useState<ProgressState["quizScores"]>({});
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed.completed)) setCompleted(parsed.completed);
        if (parsed.quizScores) setQuizScores(parsed.quizScores);
      }
    } catch {
      /* ignore corrupted storage */
    }
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ completed, quizScores }));
    } catch {
      /* storage may be unavailable */
    }
  }, [completed, quizScores, hydrated]);

  const toggleCompleted = React.useCallback((id: ModuleId) => {
    setCompleted((prev) => (prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]));
  }, []);

  const recordQuiz = React.useCallback((id: ModuleId, correct: number, total: number) => {
    setQuizScores((prev) => ({
      ...prev,
      [id]: { correct: Math.max(correct, prev[id]?.correct ?? 0), total },
    }));
  }, []);

  const resetAll = React.useCallback(() => {
    setCompleted([]);
    setQuizScores({});
  }, []);

  const badges = React.useMemo(() => {
    const list: string[] = [];
    if (completed.length >= 1) list.push("First Steps");
    if (completed.includes("fundamentals") && completed.includes("stocks") && completed.includes("crypto"))
      list.push("Core Concepts");
    if (completed.includes("charts")) list.push("Chart Reader");
    if (completed.includes("simulation")) list.push("Paper Trader");
    if (completed.includes("risk")) list.push("Risk Aware");
    if (completed.length >= MODULE_ORDER.length) list.push("Course Champion");
    const perfect = Object.entries(quizScores).filter(([, s]) => s && s.correct === s.total);
    if (perfect.length >= 3) list.push("Quiz Whiz");
    if (perfect.length >= 5) list.push("Perfect Scholar");
    return list;
  }, [completed, quizScores]);

  return (
    <ProgressContext.Provider
      value={{ completed, quizScores, toggleCompleted, recordQuiz, resetAll, badges }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = React.useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
