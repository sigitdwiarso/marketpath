/** Educational content data: glossary terms and quiz banks. */

export type GlossaryTerm = {
  id: string;
  term: string;
  short: string;
  definition: string;
  example: string;
};

export const GLOSSARY: GlossaryTerm[] = [
  {
    id: "bitcoin",
    term: "Bitcoin",
    short: "The first and largest cryptocurrency, created in 2009.",
    definition:
      "Bitcoin is a decentralized digital currency running on its own blockchain, with a capped supply of 21 million coins. It operates without any central bank, relying on a global network of computers to verify transactions.",
    example:
      "If all 21 million BTC existed today, each would represent roughly 1/21,000,000 of the entire network — which is why supporters call it 'digital gold'.",
  },
  {
    id: "stock",
    term: "Stock",
    short: "A share of ownership in a company.",
    definition:
      "A stock is a security that represents fractional ownership in a company. When you buy one share, you own a tiny slice of that business, including a claim on part of its assets and profits.",
    example:
      "If a company has 1,000 shares and you buy 1, you own 0.1% of the company. If it does well, your slice may become more valuable.",
  },
  {
    id: "etf",
    term: "ETF",
    short: "A basket of investments that trades like a single stock.",
    definition:
      "An Exchange-Traded Fund bundles many assets (stocks, bonds, or other securities) into one tradable product. Buying one ETF share gives you exposure to every holding inside it.",
    example:
      "One share of an index ETF that tracks 500 companies spreads your money across all 500 automatically.",
  },
  {
    id: "market-cap",
    term: "Market Capitalization",
    short: "Share price × total number of shares.",
    definition:
      "Market cap estimates the total value the market assigns to a company. It is calculated by multiplying the current share price by the number of outstanding shares.",
    example:
      "A company with 10 million shares priced at $20 has a market cap of $200 million.",
  },
  {
    id: "dividend",
    term: "Dividend",
    short: "A portion of company profits paid to shareholders.",
    definition:
      "Some companies distribute part of their earnings to shareholders on a regular schedule, usually in cash per share. Not all companies pay dividends — younger firms often reinvest profits instead.",
    example:
      "A $2 annual dividend on a $50 share equals a 4% dividend yield.",
  },
  {
    id: "volatility",
    term: "Volatility",
    short: "How much and how quickly prices move up and down.",
    definition:
      "Volatility measures the size of price swings over time. High volatility means large, fast moves in both directions — more potential gain, but also more potential loss.",
    example:
      "A coin that moves ±8% per day is far more volatile than a stock moving ±1% per day.",
  },
  {
    id: "blockchain",
    term: "Blockchain",
    short: "A shared digital ledger copied across many computers.",
    definition:
      "A blockchain is a running record of transactions stored in linked 'blocks' and duplicated across thousands of independent computers. Because every participant holds a copy, altering history would require changing most copies at once — which is impractical.",
    example:
      "Think of a village ledger that every household keeps an identical copy of. To fake a payment you would have to rewrite everyone's book simultaneously.",
  },
  {
    id: "private-key",
    term: "Private Key",
    short: "A secret code that proves your crypto is yours.",
    definition:
      "A private key is a long, secret cryptographic code that authorizes spending of crypto from your wallet. Whoever holds it controls the funds. It can't be reset or recovered if lost.",
    example:
      "Losing your private key is like losing the only key to a safe — no bank exists to issue a replacement.",
  },
  {
    id: "wallet",
    term: "Wallet",
    short: "Software or hardware that stores your keys.",
    definition:
      "A crypto wallet doesn't hold coins themselves — coins live on the blockchain. The wallet stores the keys that let you access and move them. 'Hot' wallets are connected to the internet; 'cold' wallets are offline devices.",
    example:
      "A hardware wallet is like a physical keychain kept in a drawer; an app wallet is like keys in your pocket — handy, but easier to lose.",
  },
  {
    id: "stablecoin",
    term: "Stablecoin",
    short: "A crypto token designed to hold a steady value.",
    definition:
      "Stablecoins aim to track a reference asset, commonly the US dollar, by holding reserves or using algorithms. They reduce exposure to crypto volatility but carry their own risks if reserves are poorly managed.",
    example:
      "1 USDC is designed to always be redeemable for about $1 — traders often park funds in stablecoins between trades.",
  },
  {
    id: "diversification",
    term: "Diversification",
    short: "Spreading money across different assets to reduce risk.",
    definition:
      "Diversification means not putting all your money into one asset. Because different investments rarely fall at the same time by the same amount, a spread portfolio usually swings less than a concentrated one.",
    example:
      "$10,000 split across 4 assets falls less than $10,000 in a single stock when that stock drops 30%.",
  },
  {
    id: "liquidity",
    term: "Liquidity",
    short: "How easily an asset can be bought or sold without moving its price.",
    definition:
      "A liquid market has many active buyers and sellers, so trades execute quickly near the current price. Illiquid assets may force you to accept a much worse price to sell quickly.",
    example:
      "Selling a popular ETF is like selling bread in a busy market; selling a rare collectible may take months or a discount.",
  },
  {
    id: "bull-market",
    term: "Bull Market",
    short: "A prolonged period of rising prices.",
    definition:
      "A bull market describes sustained rising prices and optimism, typically marked by gains of 20% or more from recent lows. It comes from the upward thrust of a bull's horns.",
    example:
      "From 2009 to 2021, broad stock indexes rose for over a decade with several smaller dips — often described as a long bull market.",
  },
  {
    id: "bear-market",
    term: "Bear Market",
    short: "A prolonged period of falling prices.",
    definition:
      "A bear market is a decline of 20% or more from recent highs, usually accompanied by pessimism. Bear markets are a normal part of market cycles, lasting months or longer.",
    example:
      "In 2022, many stock indexes fell over 20% — an officially recognized bear market — before recovering later.",
  },
  {
    id: "order-book",
    term: "Order Book",
    short: "A live list of buy and sell orders waiting to be matched.",
    definition:
      "Exchanges match buyers and sellers using an order book: 'bids' list what buyers will pay, 'asks' list what sellers want. The gap between the best bid and best ask is the spread.",
    example:
      "If the best bid is $99 and the best ask is $101, the $2 gap is the spread — a sign of thin liquidity.",
  },
  {
    id: "index",
    term: "Index",
    short: "A scoreboard tracking a group of investments.",
    definition:
      "An index measures the combined performance of a selected group of assets, such as the largest 500 US companies. Indexes are benchmarks — most active funds are compared against them.",
    example:
      "If an index of 500 companies rises 1% today, an ETF tracking it should also rise about 1%.",
  },
  {
    id: "leverage",
    term: "Leverage",
    short: "Trading with borrowed money to amplify exposure.",
    definition:
      "Leverage lets you control a position larger than your own capital by borrowing. It multiplies both gains and losses, and losses can exceed your original deposit — a major reason beginners lose money quickly.",
    example:
      "With 10× leverage, a 10% price move against you can erase 100% of your stake.",
  },
  {
    id: "fiat",
    term: "Fiat Currency",
    short: "Government-issued money like dollars or euros.",
    definition:
      "Fiat money is currency declared legal tender by governments, not backed by a physical commodity. Its value rests on public trust and central-bank management.",
    example:
      "The US dollar, euro and yen are all fiat currencies — most crypto trades are quoted against them.",
  },
  {
    id: "smart-contract",
    term: "Smart Contract",
    short: "A program on a blockchain that runs automatically.",
    definition:
      "A smart contract is self-executing code stored on a blockchain. When set conditions are met, it performs actions without intermediaries — but bugs in the code can be exploited and are often irreversible.",
    example:
      "A smart contract that releases payment only when a package's tracking code confirms delivery — no courier escrow needed.",
  },
  {
    id: "position-sizing",
    term: "Position Sizing",
    short: "Deciding how much money to put into a single trade.",
    definition:
      "Position sizing is the practice of limiting any single investment to a small share of your total capital, so that no single bad outcome can seriously damage your finances.",
    example:
      "Risking at most 1–2% of a $10,000 portfolio per trade means a losing streak hurts, but doesn't wipe you out.",
  },
  {
    id: "fomo",
    term: "FOMO",
    short: "'Fear Of Missing Out' — emotion-driven buying.",
    definition:
      "FOMO describes the anxiety of watching others profit and jumping in late at elevated prices. It is one of the most common beginner mistakes and often leads to buying highs and selling lows.",
    example:
      "Buying an asset after it already rose 300% in a week 'because everyone is talking about it' is classic FOMO.",
  },
];

export type QuizQuestion = {
  id: string;
  moduleId: string;
  question: string;
  options: string[];
  answer: number;
  hint: string;
  explanation: string;
};

export const QUIZZES: Record<string, QuizQuestion[]> = {
  fundamentals: [
    {
      id: "f1",
      moduleId: "fundamentals",
      question: "What do you actually own when you buy one share of a company?",
      options: [
        "A loan to the company that earns fixed interest",
        "A small piece of ownership in that company",
        "The right to set the company's prices",
        "A guaranteed share of all company debts",
      ],
      answer: 1,
      hint: "Think about what the word 'shareholder' literally means.",
      explanation:
        "A share is fractional ownership. You participate in the company's success (and failure) through the value of your shares and, sometimes, dividends — but you don't set prices or absorb debts personally.",
    },
    {
      id: "f2",
      moduleId: "fundamentals",
      question: "What is the main difference between investing and trading?",
      options: [
        "Investing is always profitable; trading is not",
        "Trading uses banks; investing uses apps",
        "Investors hold for years; traders buy and sell frequently",
        "There is no difference at all",
      ],
      answer: 2,
      hint: "One approach is about time spent in the market, the other about timing it.",
      explanation:
        "Investing focuses on long-term growth of fundamentally valuable assets. Trading seeks profit from shorter-term price movements and requires much more time, skill and emotional control.",
    },
    {
      id: "f3",
      moduleId: "fundamentals",
      question: "Which statement about risk and return is true?",
      options: [
        "High potential returns usually come with higher risk",
        "Risk and return are unrelated",
        "Some investments are guaranteed to make everyone rich",
        "Low-risk investments always beat high-risk ones",
      ],
      answer: 0,
      hint: "Why would anyone take extra risk without the possibility of extra reward?",
      explanation:
        "Markets price risk: assets that can lose a lot must offer the possibility of earning a lot to attract buyers. Anyone promising high returns with no risk is a red flag for fraud.",
    },
  ],
  stocks: [
    {
      id: "s1",
      moduleId: "stocks",
      question: "A company has 2 million shares and its price is $25. What is its market cap?",
      options: ["$5 million", "$50 million", "$500 million", "$5 billion"],
      answer: 1,
      hint: "Market cap = price × number of shares.",
      explanation: "2,000,000 × $25 = $50,000,000 — a $50 million market cap.",
    },
    {
      id: "s2",
      moduleId: "stocks",
      question: "What is the most likely effect of strong demand meeting limited supply of shares?",
      options: [
        "The price tends to rise",
        "The price tends to fall",
        "The price stays exactly the same",
        "Shares are automatically cancelled",
      ],
      answer: 0,
      hint: "Think of an auction with more buyers than items.",
      explanation:
        "Price discovery is a continuous auction. When more buyers want shares than sellers are offering, bids rise until a trade happens — pushing the price up.",
    },
    {
      id: "s3",
      moduleId: "stocks",
      question: "Why do many beginners choose broad index ETFs?",
      options: [
        "They are guaranteed never to fall",
        "They provide instant diversification across many companies",
        "They pay the highest dividends on the market",
        "They remove all fees from investing",
      ],
      answer: 1,
      hint: "What is inside the basket?",
      explanation:
        "An index ETF holds many companies at once, so one bad company hurts less. They still fall in bear markets — nothing is guaranteed — but single-company risk is reduced.",
    },
  ],
  crypto: [
    {
      id: "c1",
      moduleId: "crypto",
      question: "What happens if you lose your crypto private key with no backup?",
      options: [
        "The exchange resets it for you",
        "The blockchain restores it after 30 days",
        "The funds controlled by that key are effectively unreachable",
        "The government holds a spare copy",
      ],
      answer: 2,
      hint: "Remember: there is no 'forgot password' on the blockchain.",
      explanation:
        "Private keys cannot be recovered by anyone. This is why secure backup (or shared multi-key setups) is essential for anyone holding significant crypto.",
    },
    {
      id: "c2",
      moduleId: "crypto",
      question: "What is the primary purpose of a stablecoin?",
      options: [
        "To grow 100× faster than Bitcoin",
        "To keep a steady value, often pegged to the US dollar",
        "To replace wallets entirely",
        "To pay lower transaction fees on all blockchains",
      ],
      answer: 1,
      hint: "The name is the clue.",
      explanation:
        "Stablecoins aim to maintain a stable value (usually $1) so traders can move in and out of volatile assets. Their stability depends on the issuer's reserves and design — which can fail.",
    },
    {
      id: "c3",
      moduleId: "crypto",
      question: "Which of these is a common crypto scam pattern?",
      options: [
        "Open-source code published on GitHub",
        "'Guaranteed 5% daily returns' if you deposit crypto",
        "Suggesting you learn before investing",
        "Publishing a project's team members publicly",
      ],
      answer: 1,
      hint: "If something sounds too good to be true…",
      explanation:
        "Guaranteed high daily returns are mathematically impossible in legitimate markets. They are the hallmark of Ponzi schemes, which collapse when new deposits stop.",
    },
  ],
  charts: [
    {
      id: "ch1",
      moduleId: "charts",
      question: "On a candlestick, what does the 'body' represent?",
      options: [
        "The highest and lowest prices of the period",
        "The open-to-close price range",
        "The total trading volume",
        "The number of trades executed",
      ],
      answer: 1,
      hint: "The thin 'wicks' stick out beyond something…",
      explanation:
        "The body spans open → close. Green (or hollow) bodies close higher than they opened; red (or filled) bodies close lower. The wicks mark the high and low extremes.",
    },
    {
      id: "ch2",
      moduleId: "charts",
      question: "'Support' is a price level where…",
      options: [
        "Price has repeatedly stopped falling and bounced up",
        "Price always gaps upward on Mondays",
        "Volume is guaranteed to disappear",
        "The exchange sets a minimum price",
      ],
      answer: 0,
      hint: "Think of the floor a ball bounces on.",
      explanation:
        "A support level is an area where buying interest has historically been strong enough to halt declines. It is a tendency, not a guarantee — support levels do break.",
    },
    {
      id: "ch3",
      moduleId: "charts",
      question: "What does a 50-day moving average show?",
      options: [
        "The average price of the last 50 days, updated each day",
        "The price exactly 50 days ago",
        "The total profit over 50 days",
        "The next 50 days of predicted prices",
      ],
      answer: 0,
      hint: "It 'moves' because the window slides forward each day.",
      explanation:
        "Moving averages smooth out noise by averaging the last N closes. Traders use them to see the underlying trend direction more clearly.",
    },
  ],
  simulation: [
    {
      id: "sim1",
      moduleId: "simulation",
      question: "In this simulator, where does the money come from?",
      options: [
        "Real deposits from your bank account",
        "Fictional starting capital that has no real-world value",
        "Sponsored prizes",
        "The exchange's trading desk",
      ],
      answer: 1,
      hint: "You never entered a payment method.",
      explanation:
        "Every number in the simulator is fictional practice capital. Its purpose is to build intuition — not to promise or predict real results.",
    },
    {
      id: "sim2",
      moduleId: "simulation",
      question: "A portfolio that is 100% in one volatile crypto asset will tend to…",
      options: [
        "Grow smoothly with no drawdowns",
        "Show much larger swings up and down than a mixed portfolio",
        "Be immune to bear markets",
        "Automatically rebalance itself",
      ],
      answer: 1,
      hint: "Try the allocation sliders with different market scenarios.",
      explanation:
        "Concentration amplifies volatility. Diversified mixes usually swing less — that reduced swing is the entire point of asset allocation.",
    },
  ],
  risk: [
    {
      id: "r1",
      moduleId: "risk",
      question: "With 10× leverage, what happens if the price drops 10% against your position?",
      options: [
        "You lose about 10% of your money",
        "You lose nothing — leverage protects you",
        "Your stake can be wiped out entirely (liquidation)",
        "The exchange refunds your fees",
      ],
      answer: 2,
      hint: "Leverage multiplies the move.",
      explanation:
        "A 10% adverse move on 10× leverage is a 100% loss of your margin. This is called liquidation — one of the fastest ways beginners lose everything.",
    },
    {
      id: "r2",
      moduleId: "risk",
      question: "Which behavior is an example of emotional decision-making to avoid?",
      options: [
        "Writing an investment plan before buying",
        "Panic-selling everything at the bottom of a crash",
        "Limiting any single position to a small % of the portfolio",
        "Reviewing your holdings once a quarter",
      ],
      answer: 1,
      hint: "Which option is driven by fear rather than a plan?",
      explanation:
        "Panic-selling at the bottom 'locks in' losses and is a classic pattern after crashes. Pre-defined rules (position limits, rebalancing schedules) help you act less emotionally.",
    },
    {
      id: "r3",
      moduleId: "risk",
      question: "A common position-sizing rule for beginners is…",
      options: [
        "Put 100% into your best idea",
        "Risk only a small share (e.g. 1–2%) of capital on any single trade",
        "Double your position after every loss",
        "Borrow extra money to enlarge every position",
      ],
      answer: 1,
      hint: "Survival first: no single mistake should be fatal.",
      explanation:
        "Small position sizes keep any single loss survivable. 'Doubling down' after losses (martingale) and using debt to invest are among the most dangerous beginner habits.",
    },
  ],
  practice: [
    {
      id: "p1",
      moduleId: "practice",
      question: "You see a chart labeled 'simulated data'. What does that mean?",
      options: [
        "It is live market data with a small delay",
        "It was generated for education and does not represent real prices",
        "It is historical data that predicts the future",
        "It is insider information",
      ],
      answer: 1,
      hint: "Simulated = made up for practice.",
      explanation:
        "Simulated data exists to let you practice safely. It never implies real market prices, and no simulation can promise real future results.",
    },
    {
      id: "p2",
      moduleId: "practice",
      question: "Which habit best supports long-term financial literacy?",
      options: [
        "Checking prices every 5 minutes",
        "Following viral 'sure thing' tips",
        "Learning one concept at a time and testing your understanding",
        "Borrowing to invest more, faster",
      ],
      answer: 2,
      hint: "Slow and steady builds real understanding.",
      explanation:
        "Financial literacy compounds like interest: steady learning, practical exercises and honest review of mistakes beat hype-chasing every time.",
    },
  ],
};

export const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "Is any of the price data on this site real?",
    a: "No. Every price, chart and portfolio figure on MarketPath is simulated or purely illustrative, generated for education. Banners and labels mark simulated data everywhere it appears. This site never displays live market prices.",
  },
  {
    q: "Can I lose real money here?",
    a: "No. There are no deposits, payment methods or real trading anywhere on MarketPath. The simulator uses fictional starting capital with no monetary value.",
  },
  {
    q: "How much money do I need to start investing in real life?",
    a: "That depends on your situation, and this site cannot give financial advice. Many brokers offer fractional shares with very small minimums. The more important starting points are an emergency fund, an understanding of fees, and only risking money you can afford to lose.",
  },
  {
    q: "Why does crypto get so much attention about risk?",
    a: "Crypto assets have historically shown extreme volatility, 24/7 trading, irreversible transactions and a high prevalence of scams. These characteristics make education and security practices especially important before anyone touches real funds.",
  },
  {
    q: "What should I learn first?",
    a: "Start with Market Fundamentals, then Stock Essentials, then Crypto Essentials. After that, the chart-reading module and the simulator reinforce everything with practice. The 'Next Lesson' buttons guide you in order.",
  },
  {
    q: "Does MarketPath give investment advice?",
    a: "No. MarketPath is an educational resource. Nothing here is a recommendation to buy or sell any asset. Real decisions should consider your own circumstances and, where appropriate, licensed professional advice.",
  },
];
