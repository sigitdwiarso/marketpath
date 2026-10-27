"use client";

import * as React from "react";
import { SectionShell, Term, Takeaway, InfoCard } from "./shared";
import { Bitcoin, Blocks, Coins, Wallet, KeyRound, ShieldAlert, FileCode2, AlertTriangle } from "lucide-react";

/** Blocks chained together — blockchain analogy */
function ChainVisual() {
  return (
    <div className="bg-card rounded-xl border border-border p-5 sm:p-6">
      <h4 className="font-heading text-sm font-semibold">
        How a blockchain stays honest — the village ledger analogy
      </h4>
      <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:gap-0">
        {["Block 842\n· Anna → Ben: 1.5 coin", "Block 843\n· Ben → Cara: 0.4 coin", "Block 844\n· Cara → Dan: 2.0 coin"].map(
          (t, i) => (
            <React.Fragment key={i}>
              <div className="bg-muted/60 w-40 rounded-lg border border-volt/40 p-3 text-center">
                <p className="tnum text-volt text-xs font-semibold whitespace-pre-line">{t}</p>
              </div>
              {i < 2 && (
                <svg width="46" height="20" viewBox="0 0 46 20" className="mx-1 shrink-0 rotate-90 sm:rotate-0" aria-hidden>
                  <line x1="2" y1="10" x2="38" y2="10" stroke="#3b96ff" strokeWidth="2" strokeDasharray="6 4" className="animate-dash-flow" />
                  <polygon points="38,5 46,10 38,15" fill="#3b96ff" />
                </svg>
              )}
            </React.Fragment>
          )
        )}
      </div>
      <div className="text-muted-foreground mt-4 grid gap-2 text-xs leading-relaxed sm:grid-cols-2">
        <p>
          Each block records recent transactions and contains a fingerprint (hash) of the previous
          block. Change one historical transaction and every later fingerprint breaks — instantly
          visible tampering.
        </p>
        <p>
          Thousands of independent computers (&ldquo;nodes&rdquo;) each keep the full ledger and
          verify new blocks. No single person, company or government can rewrite history alone.
        </p>
      </div>
    </div>
  );
}

/** Keys diagram */
function KeysVisual() {
  return (
    <div className="bg-card rounded-xl border border-border p-5 sm:p-6">
      <h4 className="font-heading text-sm font-semibold">Your crypto identity: two keys</h4>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-volt/40 bg-volt/10 p-4">
          <KeyRound className="text-volt h-5 w-5" aria-hidden />
          <p className="mt-2 text-sm font-semibold">Private key</p>
          <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
            Your secret signature. Controls the funds. Never share it, never photograph it, never
            type it into a website.
          </p>
        </div>
        <div className="rounded-lg border border-border p-4">
          <Blocks className="text-volt h-5 w-5" aria-hidden />
          <p className="mt-2 text-sm font-semibold">Public key → address</p>
          <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
            Derived from the private key, mathematically one-way. Safe to share — it&apos;s your
            &ldquo;account number&rdquo; for receiving funds.
          </p>
        </div>
        <div className="rounded-lg border border-border p-4">
          <Coins className="text-gold h-5 w-5" aria-hidden />
          <p className="mt-2 text-sm font-semibold">Transaction fee</p>
          <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
            A small payment to the network for processing your transfer. Fees rise when the network
            is congested — check before sending small amounts.
          </p>
        </div>
      </div>
      <div className="mt-4 rounded-lg border border-bear/40 bg-bear/10 p-3.5 text-xs leading-relaxed">
        <strong className="text-bear">Irreversibility:</strong> a confirmed crypto transaction cannot
        be undone by anyone — not a bank, not support, not the police. One mistyped address usually
        means the funds are gone forever.
      </div>
    </div>
  );
}

export function CryptoEssentials() {
  return (
    <SectionShell
      id="crypto"
      moduleId="crypto"
      number={3}
      title="Cryptocurrency Essentials"
      intro={
        <>
          Crypto swaps the bank in the middle for a network of computers keeping the same ledger
          together. In this lesson we unpack <Term>Bitcoin</Term> and Ethereum, the difference between
          coins and tokens, how wallets and <Term>private-key</Term> security actually work, and —
          critically — the scams every beginner must recognize.
        </>
      }
    >
      {/* Bitcoin & Ethereum */}
      <div>
        <h3 className="font-heading text-xl font-semibold">The two giants: Bitcoin and Ethereum</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <InfoCard title="Bitcoin (BTC) — digital gold" icon={<Bitcoin className="text-gold h-5 w-5" aria-hidden />}>
            <p>
              Created in 2009 by the pseudonymous Satoshi Nakamoto, Bitcoin is a fixed-supply digital
              currency: no more than 21 million BTC will ever exist. New coins are issued as rewards
              to <strong className="text-foreground">miners</strong> — computers that validate
              transactions and secure the network.
            </p>
            <p>
              People value it as censorship-resistant money and a scarce digital asset. Its trade-offs:
              slow transactions (~10 min blocks) and famously sharp price swings.
            </p>
          </InfoCard>
          <InfoCard title="Ethereum (ETH) — the app store" icon={<FileCode2 className="text-volt h-5 w-5" aria-hidden />}>
            <p>
              Ethereum is a blockchain that runs <Term id="smart-contract">smart contracts</Term> —
              programs that execute automatically when conditions are met. It powers thousands of
              applications: lending markets, exchanges, digital art, games.
            </p>
            <p>
              ETH is the fuel: every operation on Ethereum pays a fee in ETH. The ecosystem is
              larger and more experimental than Bitcoin&apos;s — more innovation, but also more
              things that can break.
            </p>
          </InfoCard>
        </div>
        <div className="mt-4">
          <ChainVisual />
        </div>
      </div>

      {/* Coins vs tokens */}
      <div>
        <h3 className="font-heading text-xl font-semibold">Coins vs. tokens</h3>
        <div className="bg-card mt-4 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="p-4 font-semibold"> </th>
                <th className="p-4 font-semibold text-volt">Coin (e.g. BTC, ETH)</th>
                <th className="p-4 font-semibold text-gold">Token (e.g. USDC, UNI)</th>
              </tr>
            </thead>
            <tbody className="[&_td]:p-4 [&_tr]:border-b [&_tr:last-child]:border-0 [&_td]:align-top">
              <tr>
                <td className="font-medium">Runs on</td>
                <td className="text-muted-foreground">Its own blockchain</td>
                <td className="text-muted-foreground">Someone else&apos;s blockchain (often Ethereum)</td>
              </tr>
              <tr>
                <td className="font-medium">Analogy</td>
                <td className="text-muted-foreground">A national currency (dollars)</td>
                <td className="text-muted-foreground">A theme-park ticket issued inside the park</td>
              </tr>
              <tr>
                <td className="font-medium">Purpose</td>
                <td className="text-muted-foreground">Money / store of value / network fuel</td>
                <td className="text-muted-foreground">Represent assets, loyalty points, stablecoins, governance rights</td>
              </tr>
              <tr>
                <td className="font-medium">Risk note</td>
                <td className="text-muted-foreground">Longest track record, still very volatile</td>
                <td className="text-muted-foreground">Extra layers of risk — depends on issuer and host chain</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Wallets, exchanges, keys */}
      <div>
        <h3 className="font-heading text-xl font-semibold">Exchanges, wallets and keys</h3>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <InfoCard title="Where people buy and store crypto" icon={<Wallet className="text-volt h-5 w-5" aria-hidden />}>
            <p>
              <strong className="text-foreground">Exchanges</strong> are marketplaces for buying and
              selling. <strong className="text-foreground">Custodial wallets</strong> (held by an
              exchange) are convenient but trust-dependent — exchanges have famously collapsed,
              freezing customer funds.
            </p>
            <p>
              <strong className="text-foreground">Self-custody wallets</strong> put you in charge of
              your private keys. Hot wallets (apps) are convenient for small amounts; cold wallets
              (offline hardware devices) are the norm for meaningful savings.
            </p>
          </InfoCard>
          <KeysVisual />
        </div>
      </div>

      {/* Stablecoins, volatility, scams */}
      <div>
        <h3 className="font-heading text-xl font-semibold">Stablecoins, volatility and staying safe</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <InfoCard title="Stablecoins" icon={<Coins className="text-volt h-5 w-5" aria-hidden />}>
            <p>
              Tokens designed to track $1. They bridge fiat and crypto, but their stability depends on
              reserves and design — several have lost their peg catastrophically. Verify what backs
              the coin before trusting the &ldquo;stable&rdquo; label.
            </p>
          </InfoCard>
          <InfoCard title="Volatility is the feature — and the danger" icon={<AlertTriangle className="text-bear h-5 w-5" aria-hidden />}>
            <p>
              Crypto routinely moves 5–15% in a day and has seen 80%+ drawdowns from peak to trough.
              A <Term id="stablecoin">stablecoin</Term> is boring by design; most other coins are
              anything but. Size your exposure accordingly.
            </p>
          </InfoCard>
          <InfoCard title="Recognize the scams" icon={<ShieldAlert className="text-bear h-5 w-5" aria-hidden />}>
            <p>
              Red flags: guaranteed returns, &ldquo;officials&rdquo; asking for your keys, romance
              interest who suddenly trades crypto, urgent deadlines, and apps from unofficial stores.
              Legitimate projects never need your private key — ever.
            </p>
          </InfoCard>
        </div>
        <div className="mt-6">
          <Takeaway>
            Crypto removes the middleman and adds the responsibility: you are the bank, the compliance
            department and the security team. Keys are sacred, transactions are final, and if returns
            are guaranteed, you are the product.
          </Takeaway>
        </div>
      </div>
    </SectionShell>
  );
}
