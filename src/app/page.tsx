"use client";

import { Nav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { Fundamentals } from "@/components/site/fundamentals";
import { StockEssentials } from "@/components/site/stock-essentials";
import { CryptoEssentials } from "@/components/site/crypto-essentials";
import { ChartReading } from "@/components/site/chart-reading";
import { Simulator } from "@/components/site/simulator";
import { RiskManagement } from "@/components/site/risk-management";
import { Practice } from "@/components/site/practice";
import { GlossaryFaq } from "@/components/site/glossary-faq";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">
        <Hero />
        <div className="bg-market-grid">
          <Fundamentals />
          <div className="mx-auto h-px max-w-6xl 2xl:max-w-7xl bg-border" />
          <StockEssentials />
          <div className="mx-auto h-px max-w-6xl 2xl:max-w-7xl bg-border" />
          <CryptoEssentials />
        </div>
        <div className="bg-card/40">
          <ChartReading />
        </div>
        <div className="bg-market-grid">
          <Simulator />
          <div className="mx-auto h-px max-w-6xl 2xl:max-w-7xl bg-border" />
          <RiskManagement />
          <div className="mx-auto h-px max-w-6xl 2xl:max-w-7xl bg-border" />
          <Practice />
        </div>
        <GlossaryFaq />
      </main>
      <Footer />
    </div>
  );
}
