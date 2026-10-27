"use client";

import { SectionShell, Term, Takeaway, InfoCard } from "./shared";
import { Building2, Coins, ArrowLeftRight, Handshake, ShieldAlert, Scale, Users, Store } from "lucide-react";

export function Fundamentals() {
  return (
    <SectionShell
      id="fundamentals"
      moduleId="fundamentals"
      number={1}
      title="Market Fundamentals"
      intro={
        <>
          Before touching a single chart, let&apos;s answer the questions everything else builds on:
          what exactly is a <Term id="stock">stock</Term>, what makes <Term id="blockchain">crypto</Term>{" "}
          different, and where do prices actually come from? By the end of this lesson you&apos;ll
          understand the cast of characters in a market — buyers, sellers, exchanges and brokers — and
          the single most important relationship in finance: the trade-off between risk and return.
        </>
      }
    >
      {/* Stock vs Crypto side by side */}
      <div>
        <h3 className="font-heading text-xl font-semibold">Stocks vs. crypto — the 60-second version</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <InfoCard title="What is a stock?" icon={<Building2 className="text-volt h-5 w-5" aria-hidden />}>
            <p>
              A stock is a <strong className="text-foreground">share of ownership</strong> in a real
              company. When the company earns profits and grows, your slice of it tends to become more
              valuable. Some companies also share profits directly through{" "}
              <Term id="dividend">dividends</Term>.
            </p>
            <p>
              Stocks trade on regulated exchanges during fixed market hours. Ownership is recorded by
              central institutions, and companies disclose financial reports the public can inspect.
            </p>
          </InfoCard>
          <InfoCard title="What is cryptocurrency?" icon={<Coins className="text-gold h-5 w-5" aria-hidden />}>
            <p>
              Cryptocurrency is <strong className="text-foreground">digital money</strong> recorded on a{" "}
              <Term id="blockchain">blockchain</Term> — a shared ledger copied across thousands of
              computers instead of managed by one bank. Bitcoin, the first crypto, was created in 2009
              as money that no single authority controls.
            </p>
            <p>
              Crypto trades 24/7 with no closing bell. That means prices can — and do — move while you
              sleep, which cuts both ways: opportunity and risk around the clock.
            </p>
          </InfoCard>
        </div>
      </div>

      {/* How markets work */}
      <div>
        <h3 className="font-heading text-xl font-semibold">How do prices actually form?</h3>
        <p className="text-muted-foreground mt-2 max-w-3xl text-sm leading-relaxed">
          A market price isn&apos;t set by anyone in particular — it emerges from a continuous auction
          called <Term id="order-book">price discovery</Term>. Follow the flow below:
        </p>
        <div className="bg-card mt-4 grid gap-3 rounded-xl border border-border p-5 sm:p-6">
          <ol className="grid gap-4 md:grid-cols-4">
            {[
              {
                icon: <Users className="h-5 w-5" aria-hidden />,
                title: "1. Buyers & sellers",
                text: "Buyers place bids (what they'll pay); sellers place asks (what they'll accept).",
              },
              {
                icon: <Store className="h-5 w-5" aria-hidden />,
                title: "2. The exchange",
                text: "A marketplace matches bids and asks electronically — the NYSE for stocks, platforms like crypto exchanges for coins.",
              },
              {
                icon: <ArrowLeftRight className="h-5 w-5" aria-hidden />,
                title: "3. A trade happens",
                text: "When a buyer and seller agree, a trade executes and everyone can see the last price.",
              },
              {
                icon: <Scale className="h-5 w-5" aria-hidden />,
                title: "4. Price discovery",
                text: "Millions of trades later, the price continuously reflects the balance of supply and demand.",
              },
            ].map((s) => (
              <li key={s.title} className="bg-muted/50 rounded-lg p-4">
                <span className="text-volt">{s.icon}</span>
                <p className="mt-2 text-sm font-semibold">{s.title}</p>
                <p className="text-muted-foreground mt-1 text-xs leading-relaxed">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-2 rounded-lg border border-dashed border-border p-3 text-center text-xs text-muted-foreground">
            When demand (buyers) outweighs supply (sellers), price tends to rise. When supply outweighs
            demand, price tends to fall. That is the entire engine.
          </div>
        </div>
      </div>

      {/* Exchanges, brokers, platforms */}
      <div>
        <h3 className="font-heading text-xl font-semibold">Exchanges, brokers and platforms</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <InfoCard title="Exchange" icon={<Store className="text-volt h-5 w-5" aria-hidden />}>
            <p>
              The central marketplace itself. Regulated stock exchanges (like the NYSE or Nasdaq)
              list companies. Crypto exchanges (like Coinbase or Binance) match crypto buyers and
              sellers, usually with fewer protections.
            </p>
          </InfoCard>
          <InfoCard title="Broker" icon={<Handshake className="text-volt h-5 w-5" aria-hidden />}>
            <p>
              Your middleman to the exchange — an app or firm that places orders on your behalf and
              keeps records. Most modern stock brokers charge zero commission on basic trades, but
              check spreads and fees for currency conversion.
            </p>
          </InfoCard>
          <InfoCard title="Wallet" icon={<ShieldAlert className="text-gold h-5 w-5" aria-hidden />}>
            <p>
              In crypto, you keep assets in a <Term id="wallet">wallet</Term> controlled by your{" "}
              <Term id="private-key">private keys</Term>. &ldquo;Not your keys, not your coins&rdquo;
              is the saying — leaving coins on an exchange means trusting the exchange.
            </p>
          </InfoCard>
        </div>
      </div>

      {/* Investing vs trading */}
      <div>
        <h3 className="font-heading text-xl font-semibold">Investing vs. trading</h3>
        <p className="text-muted-foreground mt-2 max-w-3xl text-sm leading-relaxed">
          People use both words loosely, but they describe genuinely different activities with
          different time horizons, skills and risks.
        </p>
        <div className="bg-card mt-4 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="p-4 font-semibold">Dimension</th>
                <th className="p-4 font-semibold text-bull">Investing</th>
                <th className="p-4 font-semibold text-bear">Trading</th>
              </tr>
            </thead>
            <tbody className="[&_td]:p-4 [&_tr]:border-b [&_tr:last-child]:border-0 [&_td]:align-top">
              <tr>
                <td className="font-medium">Time horizon</td>
                <td className="text-muted-foreground">Years to decades</td>
                <td className="text-muted-foreground">Minutes to weeks</td>
              </tr>
              <tr>
                <td className="font-medium">Goal</td>
                <td className="text-muted-foreground">Grow wealth with the economy over time</td>
                <td className="text-muted-foreground">Profit from short-term price swings</td>
              </tr>
              <tr>
                <td className="font-medium">Main analysis</td>
                <td className="text-muted-foreground">Fundamentals: earnings, growth, valuation</td>
                <td className="text-muted-foreground">Charts, momentum, order flow</td>
              </tr>
              <tr>
                <td className="font-medium">Stress & time cost</td>
                <td className="text-muted-foreground">Low — check in periodically</td>
                <td className="text-muted-foreground">High — markets demand constant attention</td>
              </tr>
              <tr>
                <td className="font-medium">Suitable for beginners?</td>
                <td className="text-muted-foreground">Generally yes, with education first</td>
                <td className="text-muted-foreground">
                  Mostly no — most short-term traders lose money
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Risk & return */}
      <div>
        <h3 className="font-heading text-xl font-semibold">Risk, return and diversification</h3>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <InfoCard title="Risk & return travel together" icon={<Scale className="text-volt h-5 w-5" aria-hidden />}>
            <p>
              Assets that <em>can</em> lose a lot must offer the <em>possibility</em> of gaining a lot,
              or nobody would buy them. This is why cash pays little and{" "}
              <Term id="volatility">volatile</Term> assets promise (but never guarantee) more.
            </p>
          </InfoCard>
          <InfoCard title="Diversification spreads risk" icon={<ShieldAlert className="text-volt h-5 w-5" aria-hidden />}>
            <p>
              <Term id="diversification">Diversification</Term> means splitting money across assets
              that don&apos;t move in lockstep. When one holding falls, others may hold steady —
              smoothing your overall ride without necessarily hurting long-run returns.
            </p>
          </InfoCard>
          <InfoCard title="Only risk what you can lose" icon={<ShieldAlert className="text-bear h-5 w-5" aria-hidden />}>
            <p>
              The universal beginner rule: never invest money you need for rent, food or emergencies.
              Markets can stay irrational longer than anyone expects, and forced selling at a loss is
              how paper losses become real ones.
            </p>
          </InfoCard>
        </div>
        <div className="mt-6">
          <Takeaway>
            Markets are auctions; prices are opinions meeting money. Higher potential returns always
            come bundled with higher risk, and diversification is the closest thing investors have to
            a free lunch.
          </Takeaway>
        </div>
      </div>
    </SectionShell>
  );
}
