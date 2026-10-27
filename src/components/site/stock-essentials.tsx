"use client";

import { SectionShell, Term, Takeaway, InfoCard } from "./shared";
import { PieChart, Coins, Receipt, Search } from "lucide-react";

/** Illustrative market cycle arc */
function MarketCycle() {
  return (
    <div className="bg-card rounded-xl border border-border p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h4 className="font-heading text-sm font-semibold">The market cycle (illustrated)</h4>
        <span className="text-muted-foreground text-xs">Not to scale — real cycles vary wildly</span>
      </div>
      <svg viewBox="0 0 760 170" className="mt-3 h-auto w-full" role="img" aria-label="Illustrated market cycle from accumulation through bull market, correction and bear market">
        <path
          d="M20,120 C90,110 120,60 200,55 C280,50 300,95 370,100 C440,105 470,30 560,25 C620,22 660,55 740,45"
          fill="none"
          stroke="#16c784"
          strokeWidth="2.5"
          strokeDasharray="5 0"
        />
        <path
          d="M560,25 C620,22 660,55 740,45"
          fill="none"
          stroke="#ea3943"
          strokeWidth="2.5"
          strokeDasharray="5 0"
        />
        {[
          { x: 20, y: 120, label: "Accumulation", color: "#8fa0b8" },
          { x: 200, y: 55, label: "Bull market", color: "#16c784" },
          { x: 370, y: 100, label: "Correction", color: "#f0b90b" },
          { x: 560, y: 25, label: "Peak euphoria", color: "#16c784" },
          { x: 740, y: 45, label: "Bear market", color: "#ea3943" },
        ].map((p) => (
          <g key={p.label}>
            <circle cx={p.x} cy={p.y} r="5" fill={p.color} />
            <text
              x={p.x}
              y={p.y - 14}
              textAnchor={p.x < 60 ? "start" : p.x > 700 ? "end" : "middle"}
              className="fill-current text-[11px] font-medium"
            >
              {p.label}
            </text>
          </g>
        ))}
      </svg>
      <div className="mt-3 grid gap-3 text-xs leading-relaxed sm:grid-cols-3">
        <p>
          <span className="font-semibold text-bull">Bull market</span> — sustained rising prices and
          optimism, usually +20% from recent lows.
        </p>
        <p>
          <span className="font-semibold text-gold">Correction</span> — a drop of roughly 10–20%
          inside an ongoing trend. Normal, but scary for beginners.
        </p>
        <p>
          <span className="font-semibold text-bear">Bear market</span> — a fall of 20% or more with
          widespread pessimism. Historically, every one has eventually been followed by recovery.
        </p>
      </div>
    </div>
  );
}

/** Simple P/E calculator visual */
function ValuationExample() {
  return (
    <div className="bg-card rounded-xl border border-border p-5 sm:p-6">
      <h4 className="font-heading text-sm font-semibold">Beginner valuation: the P/E ratio</h4>
      <div className="mt-3 rounded-lg bg-muted/60 p-4 font-mono text-sm">
        <span className="text-volt">P/E</span> = Share Price ÷ Earnings per Share
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-border p-4">
          <p className="text-sm font-semibold">Company A — &ldquo;Steady Steel&rdquo;</p>
          <p className="tnum text-muted-foreground mt-1 text-xs">Price $40 · EPS $4</p>
          <p className="tnum mt-2 text-xl font-bold text-bull">P/E = 10</p>
          <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
            Investors pay $10 for each $1 of annual profit — a modest, &ldquo;cheap-looking&rdquo;
            valuation typical of slow-growth firms.
          </p>
        </div>
        <div className="rounded-lg border border-border p-4">
          <p className="text-sm font-semibold">Company B — &ldquo;Rocket Apps&rdquo;</p>
          <p className="tnum text-muted-foreground mt-1 text-xs">Price $200 · EPS $2</p>
          <p className="tnum mt-2 text-xl font-bold text-gold">P/E = 100</p>
          <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
            Investors pay $100 per $1 of profit, betting growth will explode. Higher hope — and much
            further to fall if growth disappoints.
          </p>
        </div>
      </div>
      <p className="text-muted-foreground mt-3 text-xs leading-relaxed">
        Neither number is &ldquo;right&rdquo; on its own — a P/E is meaningful only compared with the
        company&apos;s own history and industry peers. It is a conversation starter, not a verdict.
      </p>
    </div>
  );
}

export function StockEssentials() {
  return (
    <SectionShell
      id="stocks"
      moduleId="stocks"
      number={2}
      title="Stock Market Essentials"
      intro={
        <>
          Stocks are the classic entry point to investing. In this lesson you&apos;ll meet the
          different shapes shares come in — individual stocks, <Term id="etf">ETFs</Term> and{" "}
          <Term id="index">indexes</Term> — learn how companies are valued, what dividends and
          earnings really are, and why markets swing between bulls and bears.
        </>
      }
    >
      {/* Instruments */}
      <div>
        <h3 className="font-heading text-xl font-semibold">Stocks, shares, ETFs and indexes</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <InfoCard title="A share" icon={<Coins className="text-volt h-5 w-5" aria-hidden />}>
            <p>
              One unit of ownership in one company. Buying shares of a single company is a{" "}
              <strong className="text-foreground">concentrated</strong> bet on that company&apos;s
              future — potentially rewarding, but fully exposed to its individual problems.
            </p>
          </InfoCard>
          <InfoCard title="An ETF" icon={<PieChart className="text-volt h-5 w-5" aria-hidden />}>
            <p>
              A basket of many securities that trades like one stock. One purchase can spread your
              money across hundreds of companies, instantly reducing single-company risk. Fees
              (called the &ldquo;expense ratio&rdquo;) are usually low.
            </p>
          </InfoCard>
          <InfoCard title="An index" icon={<Receipt className="text-volt h-5 w-5" aria-hidden />}>
            <p>
              A scoreboard that tracks a group of assets — e.g. the S&amp;P 500 tracks 500 large US
              companies. You can&apos;t buy an index directly, but ETFs exist that copy it almost
              exactly. Indexes are how investors benchmark performance.
            </p>
          </InfoCard>
        </div>
      </div>

      {/* Market cap + P/E */}
      <div className="grid gap-4 lg:grid-cols-2">
        <InfoCard title="Market capitalization: sizing up a company" icon={<Coins className="text-volt h-5 w-5" aria-hidden />}>
          <div className="tnum rounded-lg bg-muted/60 p-3 text-sm">
            Market cap = share price × shares outstanding
          </div>
          <p>
            It tells you what the market believes the whole company is worth today. The usual buckets:
            <strong className="text-foreground"> large-cap</strong> (over ~$10B, established),
            <strong className="text-foreground"> mid-cap</strong> and{" "}
            <strong className="text-foreground">small-cap</strong> (under ~$2B, younger and riskier).
          </p>
          <p>
            Price alone is meaningless without context: a $500 share can be cheaper than a $5 share
            relative to profits or growth. That&apos;s why valuation ratios exist.
          </p>
        </InfoCard>
        <ValuationExample />
      </div>

      {/* Dividends & earnings */}
      <div>
        <h3 className="font-heading text-xl font-semibold">Earnings and dividends</h3>
        <p className="text-muted-foreground mt-2 max-w-3xl text-sm leading-relaxed">
          Four times a year, public companies publish <strong className="text-foreground">earnings
          reports</strong> — their actual profits and losses. These reports are the heartbeat of stock
          markets: beat expectations and shares often jump; miss them and shares often drop. Some
          mature companies return part of those profits to owners as <Term id="dividend">dividends</Term>.
        </p>
        <div className="bg-card mt-4 grid gap-4 rounded-xl border border-border p-5 sm:grid-cols-3 sm:p-6">
          <div>
            <p className="tnum text-2xl font-bold text-bull">4%</p>
            <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
              A $2 yearly dividend on a $50 share = a 4% dividend yield. Yield = annual dividend ÷
              share price.
            </p>
          </div>
          <div>
            <p className="tnum text-2xl font-bold text-gold">$0</p>
            <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
              Many young companies pay no dividend at all — they reinvest every dollar trying to grow
              faster. That&apos;s normal, not a red flag by itself.
            </p>
          </div>
          <div>
            <p className="tnum text-2xl font-bold text-volt">±8%</p>
            <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
              A typical single-day move for a stock around its earnings announcement. Earnings days
              are volatility days.
            </p>
          </div>
        </div>
      </div>

      {/* Market cycle */}
      <MarketCycle />

      {/* Fundamental analysis */}
      <div>
        <h3 className="font-heading text-xl font-semibold">Fundamental analysis in 3 beginner questions</h3>
        <p className="text-muted-foreground mt-2 max-w-3xl text-sm leading-relaxed">
          <strong className="text-foreground">Fundamental analysis</strong> means judging a business by what it <em>is</em> — its
          products, profits and debts — rather than by its chart. Beginners can start with three
          questions about any company:
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {[
            {
              q: "Do people pay for what it sells?",
              detail:
                "Look for growing revenue and a product you can explain in one sentence. Companies with unclear business models are hard to evaluate — and easy to lose money in.",
            },
            {
              q: "Does it actually make money?",
              detail:
                "Revenue is what comes in; profit is what remains. Consistent profits fund growth and dividends without needing to borrow forever.",
            },
            {
              q: "Is the price reasonable?",
              detail:
                "Compare the P/E with industry peers and the company's own history. A great company bought at a silly price can still be a bad investment.",
            },
          ].map((c, i) => (
            <div key={c.q} className="bg-card rounded-xl border border-border p-5">
              <div className="bg-volt/15 text-volt tnum flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold">
                {i + 1}
              </div>
              <p className="mt-3 text-sm font-semibold">{c.q}</p>
              <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">{c.detail}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-gold/40 bg-gold/10 p-4">
          <Search className="text-gold mt-0.5 h-5 w-5 shrink-0" aria-hidden />
          <p className="text-sm leading-relaxed">
            <strong className="text-gold">Mini-exercise:</strong> pick any company you personally buy
            from. Find its latest earnings report (search &ldquo;ticker + investor relations&rdquo;)
            and try to answer the three questions above. You just did fundamental analysis.
          </p>
        </div>
        <div className="mt-6">
          <Takeaway>
            Own businesses, not lottery tickets: an ETF spreads risk instantly, earnings reports drive
            stock prices, and a good company at a fair price beats a hyped story at any price.
          </Takeaway>
        </div>
      </div>
    </SectionShell>
  );
}
