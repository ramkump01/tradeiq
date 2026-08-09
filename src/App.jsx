import React, { useMemo, useState } from 'react';
import { mockAccounts, mockTrades, mockCopyStrategy, userProfile } from './data/mockTrades.js';

const tabs = ['Trade', 'Analyze', 'Insights'];

const instruments = [
  { symbol: 'NVDA', name: 'NVIDIA', price: 125.4 },
  { symbol: 'BTCUSD', name: 'Bitcoin', price: 30240 },
  { symbol: 'EURUSD', name: 'Euro / Dollar', price: 1.09 },
  { symbol: 'SPY', name: 'S&P 500 ETF', price: 512.8 },
];

const positions = [
  { name: 'Apple', symbol: 'AAPL', size: '32 shares', value: '$3,840', change: '+4.2%' },
  { name: 'Bitcoin', symbol: 'BTC', size: '0.42 BTC', value: '$12,600', change: '+6.1%' },
  { name: 'EUR/USD', symbol: 'FX', size: '2 lots', value: '$4,200', change: '-0.9%' },
];

const recommendations = [
  { title: 'Increase exposure to NVDA', body: 'Momentum is rising and your portfolio is underweight semis.', score: '92/100' },
  { title: 'Trim EUR/USD after drawdown', body: 'Risk-adjusted score suggests reduced conviction.', score: '78/100' },
  { title: 'Rebalance crypto sleeve', body: 'BTC exposure is 6% above your personal comfort band.', score: '86/100' },
];

const socialLeaders = [
  { name: 'Mina Chen', tag: '+18.4% this month', follow: 'Copy' },
  { name: 'Leo Rivera', tag: 'Follows macro + crypto', follow: 'Follow' },
  { name: 'Sara Khan', tag: 'Momentum swing trader', follow: 'Copy' },
];

const placedTrades = [
  { ticket: 'CT-93284', platform: 'cTrader', instrument: 'XAUUSD', type: 'Commodities', side: 'Buy', amount: '$6,480', pnl: '+$212' },
  { ticket: 'MT5-88012', platform: 'MT5', instrument: 'EURUSD', type: 'Forex', side: 'Buy', amount: '$3,100', pnl: '+$84' },
  { ticket: 'TQ-10291', platform: 'TradeIQ', instrument: 'AAPL', type: 'Stock', side: 'Buy', amount: '$8,420', pnl: '+$428' },
  { ticket: 'MT5-88077', platform: 'MT5', instrument: 'US100', type: 'Indices', side: 'Sell', amount: '$4,950', pnl: '-$106' },
  { ticket: 'CT-93321', platform: 'cTrader', instrument: 'GBPJPY', type: 'Forex', side: 'Sell', amount: '$2,880', pnl: '+$54' },
  { ticket: 'TQ-10306', platform: 'TradeIQ', instrument: 'BTCUSD', type: 'Crypto', side: 'Buy', amount: '$12,200', pnl: '+$1,060' },
];

const tradeIQProfiles = {
  low: {
    label: 'Low risk steady',
    appetite: 'Capital preservation with lower volatility.',
    health: 'Conservative portfolio fit: 74%',
    recommendations: [
      { title: 'Trim BTCUSD position by 20%', reason: 'Reduces portfolio volatility and drawdown risk.', confidence: '89%' },
      { title: 'Add defensive ETF sleeve', reason: 'Increase allocation to lower-beta broad-market exposure.', confidence: '86%' },
      { title: 'Set tighter stops on FX positions', reason: 'Protects capital during macro event spikes.', confidence: '81%' },
    ],
  },
  medium: {
    label: 'Medium risk balanced',
    appetite: 'Balanced growth and risk management.',
    health: 'Balanced portfolio fit: 83%',
    recommendations: [
      { title: 'Add to semiconductors', reason: 'Portfolio is underweight AI momentum names this week.', confidence: '91%' },
      { title: 'Reduce EURUSD exposure', reason: 'Volatility model detected weakening trend quality.', confidence: '77%' },
      { title: 'Hedge BTC with partial USDC', reason: 'Risk balance is above your preferred threshold.', confidence: '84%' },
    ],
  },
  high: {
    label: 'High risk aggressive',
    appetite: 'Maximum growth with higher volatility tolerance.',
    health: 'Aggressive portfolio fit: 88%',
    recommendations: [
      { title: 'Increase high-momentum tech exposure', reason: 'Current trend acceleration supports tactical upside.', confidence: '87%' },
      { title: 'Scale into BTCUSD on pullbacks', reason: 'High-beta allocation aligns with aggressive profile.', confidence: '82%' },
      { title: 'Loosen FX stop distance for trend trades', reason: 'Allows positions to absorb normal market noise.', confidence: '79%' },
    ],
  },
};

const socialTrends = [
  { topic: 'AI Infrastructure Basket', trend: '+31% copied', sentiment: 'Bullish' },
  { topic: 'Energy Rotation', trend: '+18% copied', sentiment: 'Neutral' },
  { topic: 'USD Strength Strategy', trend: '+11% copied', sentiment: 'Bearish' },
];

const movers = {
  highest: [
    { symbol: 'NVDA', move: '+6.4%' },
    { symbol: 'COIN', move: '+5.1%' },
    { symbol: 'MSTR', move: '+4.8%' },
  ],
  lowest: [
    { symbol: 'NIO', move: '-4.6%' },
    { symbol: 'RIVN', move: '-3.9%' },
    { symbol: 'BABA', move: '-3.1%' },
  ],
};

const watchlist = [
  { symbol: 'MSFT', price: '$468.12', change: '+1.3%' },
  { symbol: 'AMZN', price: '$204.09', change: '+0.8%' },
  { symbol: 'SOLUSD', price: '$154.22', change: '-2.1%' },
  { symbol: 'SPY', price: '$544.60', change: '+0.4%' },
];

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

const communityTradeFlow = {
  buying: [
    { symbol: 'NVDA', users: 1422, notional: '$18.2M', delta: '+22%' },
    { symbol: 'XAUUSD', users: 918, notional: '$9.4M', delta: '+14%' },
    { symbol: 'BTCUSD', users: 1304, notional: '$21.1M', delta: '+19%' },
    { symbol: 'MSFT', users: 744, notional: '$7.0M', delta: '+11%' },
  ],
  selling: [
    { symbol: 'TSLA', users: 1006, notional: '$12.0M', delta: '+17%' },
    { symbol: 'EURUSD', users: 672, notional: '$6.3M', delta: '+8%' },
    { symbol: 'BABA', users: 590, notional: '$4.8M', delta: '+6%' },
    { symbol: 'RIVN', users: 430, notional: '$3.2M', delta: '+4%' },
  ],
};

function getTradeSupportReply(message) {
  const q = message.toLowerCase();

  if (q.includes('stop loss') || q.includes('take profit')) {
    return 'A stop-loss helps cap downside risk, while a take-profit locks in gains. A simple approach is to set them before you enter and adjust them only when your thesis changes.';
  }

  if (q.includes('risk') || q.includes('position size')) {
    return 'A common rule is to risk only a small portion of capital per trade, often around 0.5% to 2% depending on your tolerance and the setup.';
  }

  if (q.includes('crypto') || q.includes('btc')) {
    return 'Crypto can be more volatile than equities, so keep position sizing conservative and watch for liquidity and funding conditions around major news events.';
  }

  if (q.includes('forex') || q.includes('eur') || q.includes('usd')) {
    return 'Forex often reacts strongly to macro data and central bank commentary. Monitor economic calendars, spreads, and trend quality before sizing up.';
  }

  if (q.includes('portfolio') || q.includes('diversify')) {
    return 'Diversification usually means spreading risk across uncorrelated ideas, sectors, or asset classes rather than chasing every market move.';
  }

  if (q.includes('market') || q.includes('trend')) {
    return 'Trend-following usually works best when you combine momentum with structure, such as support and resistance levels and confirmation from volume or price action.';
  }

  return 'I can help with general trading topics like risk management, position sizing, forex, crypto, portfolio structure, and platform questions. Try asking, “What is a stop-loss?” or “How should I size a position?”';
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [action, setAction] = useState('buy');
  const [instrument, setInstrument] = useState('NVDA');
  const [quantity, setQuantity] = useState(10);
  const [riskTolerance, setRiskTolerance] = useState('medium');
  const [activeTab, setActiveTab] = useState('Trade');
  const [selectedAccount, setSelectedAccount] = useState('mt5');
  const [nativeDesktopEnabled, setNativeDesktopEnabled] = useState(false);
  const [status, setStatus] = useState('Illustration only - no live brokerage integration.');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Hi! I’m TradeIQ Chat. I can answer general trading questions about risk, portfolio structure, forex, crypto, and markets.',
    },
  ]);

  const sampleUser = {
    name: 'Alex Morgan',
    balance: '$128,420',
    socialBadge: 842,
    openTrades: 14,
  };

  const selectedInstrument = useMemo(() => instruments.find((item) => item.symbol === instrument) || instruments[0], [instrument]);
  const estimatedCost = useMemo(() => selectedInstrument.price * quantity, [selectedInstrument, quantity]);
  const activeProfile = tradeIQProfiles[riskTolerance];

  const analytics = useMemo(() => {
    const positive = mockTrades.filter((trade) => trade.pnl > 0);
    const negative = mockTrades.filter((trade) => trade.pnl < 0);
    const totalPnL = mockTrades.reduce((sum, trade) => sum + trade.pnl, 0);
    const winRate = Math.round((positive.length / mockTrades.length) * 100);
    const avgWin = positive.length ? positive.reduce((sum, trade) => sum + trade.pnl, 0) / positive.length : 0;
    const avgLoss = negative.length ? Math.abs(negative.reduce((sum, trade) => sum + trade.pnl, 0) / negative.length) : 0;
    const rrRatio = avgLoss ? Number((avgWin / avgLoss).toFixed(2)) : 0;

    const running = [];
    let balance = 100000;
    mockTrades.forEach((trade) => {
      balance += trade.pnl;
      running.push(balance);
    });

    const maxDrawdown = running.reduce((worst, value, index) => {
      const peak = Math.max(...running.slice(0, index + 1));
      return Math.min(worst, value - peak);
    }, 0);

    const exposure = mockTrades.reduce((acc, trade) => {
      acc[trade.symbol] = (acc[trade.symbol] || 0) + trade.size;
      return acc;
    }, {});

    return { winRate, avgWin, avgLoss, rrRatio, totalPnL, maxDrawdown, equityCurve: running, exposure };
  }, []);

  const exposureEntries = Object.entries(analytics.exposure).slice(0, 4);
  const selectedAccountData = mockAccounts.find((account) => account.id === selectedAccount) ?? mockAccounts[0];

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus(`${action === 'buy' ? 'Buy' : 'Sell'} order prepared for ${quantity} ${selectedInstrument.symbol} - demo only`);
  };

  const handleChatSubmit = (event) => {
    event.preventDefault();
    const trimmed = chatInput.trim();
    if (!trimmed) {
      return;
    }

    setChatMessages((messages) => [
      ...messages,
      { id: Date.now(), role: 'user', content: trimmed },
      { id: Date.now() + 1, role: 'assistant', content: getTradeSupportReply(trimmed) },
    ]);
    setChatInput('');
  };

  const handleHomeClick = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="app-shell">
        <header className="topbar">
          <div className="brand">
            <div className="brand-mark">T</div>
            <div>
              <h1>TradeIQ</h1>
              <p>AI social trading</p>
            </div>
          </div>
          <nav className="topnav">
            <a href="#portfolio">Portfolio</a>
            <a href="#tradeiq">TradeIQ</a>
            <a href="#social">Social</a>
            <a href="#wallet">Wallet</a>
            <a href="#downloads">Downloads</a>
          </nav>
          <div className="topbar-actions">
            <button className="btn btn-ghost" onClick={handleHomeClick}>Home</button>
            <button className="btn btn-secondary">Register</button>
            <button className="btn btn-primary" onClick={() => setIsLoggedIn(true)}>Login</button>
          </div>
        </header>

        <section className="hero">
          <div className="hero-copy">
            <p className="muted">MVP concept - illustration only</p>
            <h2>Trade stocks, crypto, forex and more with AI-backed insight.</h2>
            <p>Follow top traders, mirror smart portfolios, and let TradeIQ recommend your next move based on your live holdings.</p>
            <div className="hero-actions">
              <button className="btn btn-secondary">Register</button>
              <button className="btn btn-primary" onClick={() => setIsLoggedIn(true)}>Login To Dashboard</button>
              <button className="btn btn-secondary">Watch demo</button>
            </div>
            <div className="hero-chips">
              <span className="chip">Stocks</span>
              <span className="chip">Crypto</span>
              <span className="chip">Forex</span>
              <span className="chip">ETFs</span>
            </div>
          </div>
          <div className="card hero-card">
            <div className="hero-balance">
              <span>Portfolio balance</span>
              <span className="badge positive">+$4,280</span>
            </div>
            <div className="balance-amount">$128,420</div>
            <div className="sparkline" />
            <div className="metrics-grid">
              <div className="metric-card card"><span className="small-note">Risk score</span><strong>Moderate</strong></div>
              <div className="metric-card card"><span className="small-note">Open positions</span><strong>12</strong></div>
              <div className="metric-card card"><span className="small-note">Wallet</span><strong>BTC 0.42</strong></div>
              <div className="metric-card card"><span className="small-note">Followers</span><strong>8.4k</strong></div>
            </div>
          </div>
        </section>

        <main className="content-grid">
          <section className="card panel" id="portfolio">
            <div className="panel-header">
              <div>
                <p className="small-note">Portfolio</p>
                <h3 className="section-title">Live positions</h3>
              </div>
              <button className="btn btn-ghost">View all</button>
            </div>
            <div className="list">
              {positions.map((position) => (
                <div className="position-row" key={position.symbol}>
                  <div>
                    <strong>{position.name}</strong>
                    <div className="list-meta">{position.symbol} - {position.size}</div>
                  </div>
                  <div className="right">
                    <strong>{position.value}</strong>
                    <div className={position.change.startsWith('-') ? 'negative' : 'positive'}>{position.change}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="card panel" id="tradeiq">
            <div className="panel-header">
              <div>
                <p className="small-note">TradeIQ</p>
                <h3 className="section-title">AI recommendations</h3>
              </div>
              <span className="badge">Smart picks</span>
            </div>
            <div className="list">
              {recommendations.map((item) => (
                <div className="recommend-row" key={item.title}>
                  <div>
                    <strong>{item.title}</strong>
                    <div className="list-meta">{item.body}</div>
                  </div>
                  <div className="right">
                    <strong>{item.score}</strong>
                    <button className="btn btn-ghost">Apply</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        <section className="secondary-grid">
          <div className="card panel" id="social">
            <div className="panel-header">
              <div>
                <p className="small-note">Social trading</p>
                <h3 className="section-title">Popular traders</h3>
              </div>
              <button className="btn btn-ghost">Discover</button>
            </div>
            <div className="list">
              {socialLeaders.map((trader) => (
                <div className="social-row" key={trader.name}>
                  <div>
                    <strong>{trader.name}</strong>
                    <div className="list-meta">{trader.tag}</div>
                  </div>
                  <button className="btn btn-secondary">{trader.follow}</button>
                </div>
              ))}
            </div>
          </div>

          <div className="card panel" id="wallet">
            <div className="panel-header">
              <div>
                <p className="small-note">Crypto wallet</p>
                <h3 className="section-title">Wallet overview</h3>
              </div>
              <span className="badge">Secure</span>
            </div>
            <div className="wallet-card" style={{ marginTop: '12px' }}>
              <div className="wallet-row"><span>BTC</span><strong>0.42</strong></div>
              <div className="wallet-row"><span>ETH</span><strong>2.18</strong></div>
              <div className="wallet-row"><span>USDC</span><strong>8,420</strong></div>
            </div>
          </div>
        </section>

        <section className="card panel" id="downloads">
          <div className="panel-header">
            <div>
              <p className="small-note">Trading Platform Downloads</p>
              <h3 className="section-title">Get your platform</h3>
            </div>
            <span className="badge">Desktop + Mobile</span>
          </div>
          <div className="download-grid">
            <article className="download-card">
              <strong>TradeIQ Platform</strong>
              <p className="list-meta">Native TradeIQ terminal for portfolio, social copy trading and AI insights.</p>
              <button className="btn btn-primary">Download TradeIQ</button>
            </article>
            <article className="download-card">
              <strong>MetaTrader 5 (MT5)</strong>
              <p className="list-meta">Advanced charting, expert advisors and multi-asset execution.</p>
              <button className="btn btn-secondary">Download MT5</button>
            </article>
            <article className="download-card">
              <strong>cTrader</strong>
              <p className="list-meta">Institutional-grade execution with modern order and depth tools.</p>
              <button className="btn btn-secondary">Download cTrader</button>
            </article>
          </div>
        </section>
        <button className="home-fab" onClick={handleHomeClick}>Home</button>

        <button className="chat-launcher" onClick={() => setIsChatOpen((value) => !value)}>
          {isChatOpen ? 'Close chat' : 'TradeIQ Chat'}
        </button>

        {isChatOpen && (
          <div className="chat-panel">
            <div className="chat-header">
              <div>
                <strong>TradeIQ Chat</strong>
                <p>Support assistant for general trading questions</p>
              </div>
              <button className="chat-close" onClick={() => setIsChatOpen(false)} aria-label="Close chat">
                ×
              </button>
            </div>

            <div className="chat-messages">
              {chatMessages.map((message) => (
                <div key={message.id} className={`chat-bubble ${message.role}`}>
                  {message.content}
                </div>
              ))}
            </div>

            <div className="chat-quick-actions">
              {['What is a stop-loss?', 'How should I size a position?', 'How do I think about crypto risk?'].map((suggestion) => (
                <button key={suggestion} className="quick-chip" onClick={() => setChatInput(suggestion)}>
                  {suggestion}
                </button>
              ))}
            </div>

            <form className="chat-form" onSubmit={handleChatSubmit}>
              <input
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                placeholder="Ask about trading advice"
              />
              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">T</div>
          <div>
            <h1>{sampleUser.name}</h1>
            <p>Sample User Dashboard</p>
          </div>
        </div>
        <nav className="topnav">
          <a href="#all-trades">All Trades</a>
          <a href="#market-flow">Market Flow</a>
          <a href="#risk-engine">Risk Engine</a>
          <a href="#tradeiq-dashboard">TradeIQ</a>
          <a href="#social-trends">Social Trends</a>
          <a href="#movers">Movers</a>
          <a href="#watchlist">Watchlist</a>
        </nav>
        <div className="topbar-actions">
          <div className="badge">Balance {sampleUser.balance}</div>
          <div className="badge">Badge {sampleUser.socialBadge}</div>
          <button className="btn btn-secondary" onClick={handleHomeClick}>Home</button>
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="muted">Welcome back</p>
          <h2>Live sample trading workspace across stocks, crypto and forex.</h2>
          <p>Monitor portfolio health, discover community trends, and use TradeIQ signals to manage risk.</p>
          <div className="hero-chips">
            <span className="chip">Placed trades {placedTrades.length}</span>
            <span className="chip">TradeIQ proprietary engine online</span>
            <span className="chip">Social rank top 12%</span>
          </div>
        </div>
        <div className="card hero-card">
          <div className="hero-balance">
            <span>Account equity</span>
            <span className="badge positive">+$4,280 Today</span>
          </div>
          <div className="balance-amount">{sampleUser.balance}</div>
          <div className="sparkline" />
          <div className="metrics-grid">
            <div className="metric-card card"><span className="small-note">Placed trades</span><strong>{placedTrades.length}</strong></div>
            <div className="metric-card card"><span className="small-note">Available cash</span><strong>$24,180</strong></div>
            <div className="metric-card card"><span className="small-note">Social badge</span><strong>{sampleUser.socialBadge}</strong></div>
            <div className="metric-card card"><span className="small-note">Risk profile</span><strong>{activeProfile.label}</strong></div>
          </div>
        </div>
      </section>

      <section className="card panel workspace-panel" id="workspace">
        <div className="panel-header workspace-header">
          <div>
            <p className="small-note">Unified workspace</p>
            <h3 className="section-title">MT5 + cTrader in one TradeIQ view</h3>
          </div>
          <div className="top-nav workspace-tabs" aria-label="Workspace tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                className={`nav-pill ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="content-shell">
          {activeTab === 'Trade' && (
            <section className="tab-panel trade-panel">
              <div className="hero-card">
                <div>
                  <p className="eyebrow">Single product experience</p>
                  <h1>One workspace for MT5 and cTrader activity.</h1>
                  <p className="hero-copy">Alex Morgan stays signed in once while TradeIQ surfaces both broker environments as a unified analytics layer.</p>
                </div>
                <div className="hero-badge">SSO-ready demo</div>
              </div>

              <div className="account-grid">
                {mockAccounts.map((account) => (
                  <article key={account.id} className={`account-card ${account.color}`}>
                    <div className="card-head">
                      <div>
                        <p className="eyebrow">{account.label}</p>
                        <h2>{account.name}</h2>
                      </div>
                      <button type="button" className="ghost-btn" onClick={() => setSelectedAccount(account.id)}>View</button>
                    </div>

                    <div className="metric-stack">
                      <div>
                        <span>Balance</span>
                        <strong>{formatCurrency(account.balance)}</strong>
                      </div>
                      <div>
                        <span>Equity</span>
                        <strong>{formatCurrency(account.equity)}</strong>
                      </div>
                      <div>
                        <span>Open positions</span>
                        <strong>{account.openPositions}</strong>
                      </div>
                      <div>
                        <span>Unrealized P/L</span>
                        <strong className={account.unrealizedPl >= 0 ? 'positive' : 'negative'}>
                          {account.unrealizedPl >= 0 ? '+' : ''}{formatCurrency(account.unrealizedPl)}
                        </strong>
                      </div>
                    </div>

                    <div className="card-actions">
                      <button type="button" className="primary-btn" onClick={() => setSelectedAccount(account.id)}>Launch terminal</button>
                    </div>

                    {account.id === 'mt5' && (
                      <label className="toggle-row">
                        <input type="checkbox" checked={nativeDesktopEnabled} onChange={() => setNativeDesktopEnabled((value) => !value)} />
                        <span>Trading via native desktop app</span>
                      </label>
                    )}

                    {account.id === 'mt5' && nativeDesktopEnabled && (
                      <p className="sync-note">Account synced — analytics continue to flow into TradeIQ even when trading outside the browser.</p>
                    )}
                  </article>
                ))}
              </div>

              <div className="terminal-panel">
                <div className="terminal-header">
                  <div>
                    <p className="eyebrow">Embedded terminal</p>
                    <h3>{selectedAccountData.name} workspace</h3>
                  </div>
                  <span className="status-pill">Mocked view</span>
                </div>
                <div className="terminal-surface">
                  <div className="left-column">
                    <div className="mini-card">
                      <p className="eyebrow">Watchlist</p>
                      <ul>
                        {['NVDA', 'BTCUSD', 'EURUSD'].map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mini-card">
                      <p className="eyebrow">Recent activity</p>
                      <p>Buy NVDA • 1.40 lots • 10:16</p>
                      <p>Sell EURUSD • 0.80 lots • 10:02</p>
                    </div>
                  </div>
                  <div className="right-column">
                    <div className="mini-card terminal-visual">
                      <div className="terminal-grid">
                        <div>
                          <p className="eyebrow">Order book</p>
                          <div className="book-row"><span>Bid</span><strong>144.88</strong></div>
                          <div className="book-row"><span>Ask</span><strong>145.06</strong></div>
                        </div>
                        <div>
                          <p className="eyebrow">Position</p>
                          <div className="book-row"><span>Risk</span><strong>1.42%</strong></div>
                          <div className="book-row"><span>SL</span><strong>142.40</strong></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'Analyze' && (
            <section className="tab-panel analyze-panel">
              <div className="section-title-row">
                <div>
                  <p className="eyebrow">Behavioral analytics</p>
                  <h2>Alex Morgan performance snapshot</h2>
                </div>
                <div className="pill">52 trades • 2 accounts</div>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <span>Win rate</span>
                  <strong>{analytics.winRate}%</strong>
                </div>
                <div className="stat-card">
                  <span>Average win</span>
                  <strong>{formatCurrency(analytics.avgWin)}</strong>
                </div>
                <div className="stat-card">
                  <span>Average loss</span>
                  <strong>{formatCurrency(analytics.avgLoss)}</strong>
                </div>
                <div className="stat-card">
                  <span>R/R ratio</span>
                  <strong>{analytics.rrRatio}x</strong>
                </div>
                <div className="stat-card">
                  <span>Max drawdown</span>
                  <strong>{formatCurrency(Math.abs(analytics.maxDrawdown))}</strong>
                </div>
                <div className="stat-card">
                  <span>Total P/L</span>
                  <strong className={analytics.totalPnL >= 0 ? 'positive' : 'negative'}>{formatCurrency(analytics.totalPnL)}</strong>
                </div>
              </div>

              <div className="analytics-grid">
                <div className="chart-card">
                  <h3>Equity curve</h3>
                  <div className="chart-line" aria-label="Equity curve chart">
                    {analytics.equityCurve.map((value, index) => {
                      const width = 100 / analytics.equityCurve.length;
                      const height = 100 - ((value - 90000) / 25000) * 100;
                      return <span key={`${value}-${index}`} style={{ left: `${index * width}%`, bottom: `${Math.max(8, height)}%` }} />;
                    })}
                  </div>
                </div>
                <div className="chart-card">
                  <h3>Exposure by symbol</h3>
                  <div className="donut-chart">
                    {exposureEntries.map(([symbol, value], index) => (
                      <div key={symbol} className="legend-item">
                        <span className="legend-dot" style={{ background: ['#2dd4bf', '#38bdf8', '#818cf8', '#f59e0b'][index] }} />
                        <span>{symbol}</span>
                        <strong>{formatCurrency(value)}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lower-grid">
                <div className="chart-card">
                  <h3>Leverage & margin usage</h3>
                  <div className="metric-stack compact">
                    <div><span>Current leverage</span><strong>1.42x</strong></div>
                    <div><span>Margin used</span><strong>73%</strong></div>
                    <div><span>Margin buffer</span><strong>$18.4k</strong></div>
                  </div>
                </div>
                <div className="chart-card">
                  <h3>Recent trend</h3>
                  <p className="trend-copy">Momentum improved after a short consolidation in EURUSD, but volatility rose in the last 10 sessions.</p>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'Insights' && (
            <section className="tab-panel insights-panel">
              <div className="section-title-row">
                <div>
                  <p className="eyebrow">TradeIQ narrative</p>
                  <h2>What the data is signaling</h2>
                </div>
              </div>

              <div className="insight-summary">
                <p>You're up 12% this month, but your position size increases roughly 35% after a losing trade — that pattern preceded two of your largest drawdowns.</p>
              </div>

              <div className="flag-grid">
                <div className="flag-card warning">
                  <h3>Position sizing after loss</h3>
                  <p>Average size rose 34% after losing trades, then reverted only after a higher-volatility session.</p>
                </div>
                <div className="flag-card">
                  <h3>Overtrading in session</h3>
                  <p>New York session activity clustered around the same setups, creating repeat exposure to NVDA and BTCUSD.</p>
                </div>
                <div className="flag-card">
                  <h3>cTrader copy overlay</h3>
                  <p>{mockCopyStrategy.strategyName} is pacing +14.8% ROI, but the TradeIQ overlay shows drawdown deterioration across three weeks.</p>
                </div>
              </div>

              <div className="copy-card">
                <div>
                  <p className="eyebrow">cTrader copy strategy</p>
                  <h3>{mockCopyStrategy.strategyName}</h3>
                  <div className="copy-metrics">
                    <div><span>ROI</span><strong>{mockCopyStrategy.roi}</strong></div>
                    <div><span>Followers</span><strong>{mockCopyStrategy.followers}</strong></div>
                    <div><span>Balance</span><strong>{formatCurrency(mockCopyStrategy.balance)}</strong></div>
                    <div><span>Equity</span><strong>{formatCurrency(mockCopyStrategy.equity)}</strong></div>
                  </div>
                </div>
                <div className="mini-chart">
                  <div className="mini-bar" style={{ height: '34%' }} />
                  <div className="mini-bar" style={{ height: '58%' }} />
                  <div className="mini-bar" style={{ height: '72%' }} />
                  <div className="mini-bar" style={{ height: '64%' }} />
                </div>
                <p className="copy-insight">TradeIQ insight: {mockCopyStrategy.insight}</p>
              </div>
            </section>
          )}
        </div>
      </section>

      <section className="card panel" id="risk-engine">
        <div className="panel-header">
          <div>
            <p className="small-note">TradeIQ Proprietary Tool</p>
            <h3 className="section-title">Recommendation engine risk tolerance</h3>
          </div>
          <span className="badge">Portfolio-aware</span>
        </div>
        <div className="risk-toggle-row">
          <button className={`risk-btn ${riskTolerance === 'low' ? 'active' : ''}`} onClick={() => setRiskTolerance('low')}>Low risk steady</button>
          <button className={`risk-btn ${riskTolerance === 'medium' ? 'active' : ''}`} onClick={() => setRiskTolerance('medium')}>Medium risk</button>
          <button className={`risk-btn ${riskTolerance === 'high' ? 'active' : ''}`} onClick={() => setRiskTolerance('high')}>High risk</button>
        </div>
        <div className="list-meta" style={{ marginTop: '10px' }}>
          {activeProfile.appetite} TradeIQ portfolio analysis: {activeProfile.health}
        </div>
      </section>

      <section className="card panel" id="market-flow">
        <div className="panel-header">
          <div>
            <p className="small-note">Live user trade data</p>
            <h3 className="section-title">Trending market trades by other users</h3>
          </div>
          <span className="badge">Realtime flow</span>
        </div>
        <div className="flow-grid">
          <div className="flow-card">
            <div className="flow-head">
              <strong>Most Bought</strong>
              <span className="positive">Buying</span>
            </div>
            {communityTradeFlow.buying.map((item) => (
              <div className="flow-row" key={`buy-${item.symbol}`}>
                <div>
                  <strong>{item.symbol}</strong>
                  <div className="list-meta">{item.users} users</div>
                </div>
                <div className="right">
                  <strong>{item.notional}</strong>
                  <div className="positive">{item.delta}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flow-card">
            <div className="flow-head">
              <strong>Most Sold</strong>
              <span className="negative">Selling</span>
            </div>
            {communityTradeFlow.selling.map((item) => (
              <div className="flow-row" key={`sell-${item.symbol}`}>
                <div>
                  <strong>{item.symbol}</strong>
                  <div className="list-meta">{item.users} users</div>
                </div>
                <div className="right">
                  <strong>{item.notional}</strong>
                  <div className="negative">{item.delta}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="content-grid">
        <section className="card panel" id="all-trades">
          <div className="panel-header">
            <div>
              <p className="small-note">Portfolio</p>
              <h3 className="section-title">All placed trades: cTrader, MT5 and TradeIQ</h3>
            </div>
            <button className="btn btn-ghost">Manage trades</button>
          </div>
          <div className="list">
            {placedTrades.map((trade) => (
              <div className="position-row" key={trade.ticket}>
                <div>
                  <strong>{trade.instrument}</strong>
                  <div className="list-meta">{trade.platform} - {trade.type} - {trade.side} - {trade.ticket}</div>
                </div>
                <div className="right">
                  <strong>{trade.amount}</strong>
                  <div className={trade.pnl.startsWith('-') ? 'negative' : 'positive'}>{trade.pnl}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="card panel order-card">
          <div className="panel-header">
            <div>
              <p className="small-note">Trade Ticket</p>
              <h3 className="section-title">Place sample order</h3>
            </div>
            <div className="toggle-row">
              <button className={`toggle-btn ${action === 'buy' ? 'active' : ''}`} onClick={() => setAction('buy')}>Buy</button>
              <button className={`toggle-btn ${action === 'sell' ? 'active' : ''}`} onClick={() => setAction('sell')}>Sell</button>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="instrument">Instrument</label>
              <select id="instrument" value={instrument} onChange={(event) => setInstrument(event.target.value)}>
                {instruments.map((item) => (
                  <option value={item.symbol} key={item.symbol}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="quantity">Quantity</label>
              <input id="quantity" type="number" min="1" value={quantity} onChange={(event) => setQuantity(Number(event.target.value) || 1)} />
            </div>
            <div className="order-summary">
              <div><span>Selected</span><strong>{selectedInstrument.symbol}</strong></div>
              <div><span>Action</span><strong>{action === 'buy' ? 'Buy' : 'Sell'}</strong></div>
              <div><span>Estimated cost</span><strong>${estimatedCost.toLocaleString()}</strong></div>
            </div>
            <button className="btn btn-primary" type="submit">Place sample order</button>
            <p className="small-note">{status}</p>
          </form>
        </section>
      </main>

      <section className="secondary-grid">
        <div className="card panel" id="tradeiq-dashboard">
          <div className="panel-header">
            <div>
              <p className="small-note">TradeIQ Recommendation Engine</p>
              <h3 className="section-title">AI recommendations by risk appetite</h3>
            </div>
            <span className="badge">Live signals</span>
          </div>
          <div className="list">
            {activeProfile.recommendations.map((idea) => (
              <div className="recommend-row" key={idea.title}>
                <div>
                  <strong>{idea.title}</strong>
                  <div className="list-meta">{idea.reason}</div>
                </div>
                <div className="right">
                  <strong>{idea.confidence}</strong>
                  <button className="btn btn-ghost">Apply</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card panel" id="social-trends">
          <div className="panel-header">
            <div>
              <p className="small-note">Community Radar</p>
              <h3 className="section-title">Social trading trends</h3>
            </div>
            <button className="btn btn-ghost">Explore</button>
          </div>
          <div className="list">
            {socialTrends.map((trend) => (
              <div className="social-row" key={trend.topic}>
                <div>
                  <strong>{trend.topic}</strong>
                  <div className="list-meta">{trend.trend}</div>
                </div>
                <div className="right">
                  <div className="badge">{trend.sentiment}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="secondary-grid">
        <div className="card panel" id="movers">
          <div className="panel-header">
            <div>
              <p className="small-note">Market Pulse</p>
              <h3 className="section-title">Highest and lowest movers</h3>
            </div>
          </div>
          <div className="movers-grid">
            <div className="mover-column">
              <p className="small-note">Highest movers</p>
              {movers.highest.map((stock) => (
                <div className="mover-row" key={stock.symbol}>
                  <strong>{stock.symbol}</strong>
                  <span className="positive">{stock.move}</span>
                </div>
              ))}
            </div>
            <div className="mover-column">
              <p className="small-note">Lowest movers</p>
              {movers.lowest.map((stock) => (
                <div className="mover-row" key={stock.symbol}>
                  <strong>{stock.symbol}</strong>
                  <span className="negative">{stock.move}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card panel" id="watchlist">
          <div className="panel-header">
            <div>
              <p className="small-note">Personal Tracking</p>
              <h3 className="section-title">Sample watchlist</h3>
            </div>
            <button className="btn btn-ghost">Edit</button>
          </div>
          <div className="list">
            {watchlist.map((item) => (
              <div className="watch-row" key={item.symbol}>
                <div>
                  <strong>{item.symbol}</strong>
                </div>
                <div className="right">
                  <strong>{item.price}</strong>
                  <div className={item.change.startsWith('-') ? 'negative' : 'positive'}>{item.change}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <button className="home-fab" onClick={handleHomeClick}>Home</button>

      <button className="chat-launcher" onClick={() => setIsChatOpen((value) => !value)}>
        {isChatOpen ? 'Close chat' : 'TradeIQ Chat'}
      </button>

      {isChatOpen && (
        <div className="chat-panel">
          <div className="chat-header">
            <div>
              <strong>TradeIQ Chat</strong>
              <p>Support assistant for general trading questions</p>
            </div>
            <button className="chat-close" onClick={() => setIsChatOpen(false)} aria-label="Close chat">
              ×
            </button>
          </div>

          <div className="chat-messages">
            {chatMessages.map((message) => (
              <div key={message.id} className={`chat-bubble ${message.role}`}>
                {message.content}
              </div>
            ))}
          </div>

          <div className="chat-quick-actions">
            {['What is a stop-loss?', 'How should I size a position?', 'How do I think about crypto risk?'].map((suggestion) => (
              <button key={suggestion} className="quick-chip" onClick={() => setChatInput(suggestion)}>
                {suggestion}
              </button>
            ))}
          </div>

          <form className="chat-form" onSubmit={handleChatSubmit}>
            <input
              value={chatInput}
              onChange={(event) => setChatInput(event.target.value)}
              placeholder="Ask about trading advice"
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}
