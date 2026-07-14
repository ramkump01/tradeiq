import React, { useMemo, useState } from 'react';

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

const openTrades = [
  { instrument: 'AAPL', type: 'Stock', side: 'Buy', amount: '$8,420', pnl: '+$428' },
  { instrument: 'BTCUSD', type: 'Crypto', side: 'Buy', amount: '$12,200', pnl: '+$1,060' },
  { instrument: 'TSLA', type: 'Stock', side: 'Sell', amount: '$5,980', pnl: '-$210' },
  { instrument: 'EURUSD', type: 'Forex', side: 'Buy', amount: '$3,100', pnl: '+$84' },
];

const tradeIQIdeas = [
  { title: 'Add to semiconductors', reason: 'Portfolio is underweight AI momentum names this week.', confidence: '91%' },
  { title: 'Reduce EURUSD exposure', reason: 'Volatility model detected weakening trend quality.', confidence: '77%' },
  { title: 'Hedge BTC with partial USDC', reason: 'Risk balance is above your preferred threshold.', confidence: '84%' },
];

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

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [action, setAction] = useState('buy');
  const [instrument, setInstrument] = useState('NVDA');
  const [quantity, setQuantity] = useState(10);
  const [status, setStatus] = useState('Illustration only - no live brokerage integration.');

  const sampleUser = {
    name: 'Alex Morgan',
    balance: '$128,420',
    socialBadge: 842,
    openTrades: 14,
  };

  const selectedInstrument = useMemo(() => instruments.find((item) => item.symbol === instrument) || instruments[0], [instrument]);
  const estimatedCost = useMemo(() => selectedInstrument.price * quantity, [selectedInstrument, quantity]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus(`${action === 'buy' ? 'Buy' : 'Sell'} order prepared for ${quantity} ${selectedInstrument.symbol} - demo only`);
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
          </nav>
          <button className="btn btn-primary" onClick={() => setIsLoggedIn(true)}>Login</button>
        </header>

        <section className="hero">
          <div className="hero-copy">
            <p className="muted">MVP concept - illustration only</p>
            <h2>Trade stocks, crypto, forex and more with AI-backed insight.</h2>
            <p>Follow top traders, mirror smart portfolios, and let TradeIQ recommend your next move based on your live holdings.</p>
            <div className="hero-actions">
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
          <a href="#open-trades">Open Trades</a>
          <a href="#tradeiq-dashboard">TradeIQ</a>
          <a href="#social-trends">Social Trends</a>
          <a href="#movers">Movers</a>
          <a href="#watchlist">Watchlist</a>
        </nav>
        <div className="topbar-actions">
          <div className="badge">Balance {sampleUser.balance}</div>
          <div className="badge">Badge {sampleUser.socialBadge}</div>
          <button className="btn btn-secondary" onClick={() => setIsLoggedIn(false)}>Home</button>
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="muted">Welcome back</p>
          <h2>Live sample trading workspace across stocks, crypto and forex.</h2>
          <p>Monitor portfolio health, discover community trends, and use TradeIQ signals to manage risk.</p>
          <div className="hero-chips">
            <span className="chip">Open trades {sampleUser.openTrades}</span>
            <span className="chip">TradeIQ engine online</span>
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
            <div className="metric-card card"><span className="small-note">Open trades</span><strong>{sampleUser.openTrades}</strong></div>
            <div className="metric-card card"><span className="small-note">Available cash</span><strong>$24,180</strong></div>
            <div className="metric-card card"><span className="small-note">Social badge</span><strong>{sampleUser.socialBadge}</strong></div>
            <div className="metric-card card"><span className="small-note">Risk score</span><strong>Moderate</strong></div>
          </div>
        </div>
      </section>

      <main className="content-grid">
        <section className="card panel" id="open-trades">
          <div className="panel-header">
            <div>
              <p className="small-note">Portfolio</p>
              <h3 className="section-title">Open trades across platform</h3>
            </div>
            <button className="btn btn-ghost">Manage trades</button>
          </div>
          <div className="list">
            {openTrades.map((trade) => (
              <div className="position-row" key={trade.instrument}>
                <div>
                  <strong>{trade.instrument}</strong>
                  <div className="list-meta">{trade.type} - {trade.side}</div>
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
              <h3 className="section-title">AI recommendations</h3>
            </div>
            <span className="badge">Live signals</span>
          </div>
          <div className="list">
            {tradeIQIdeas.map((idea) => (
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
    </div>
  );
}
