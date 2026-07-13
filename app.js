const { useMemo, useState } = React;

const instruments = [
  { symbol: 'NVDA', name: 'NVIDIA', price: 125.4, change: 2.8, type: 'Stocks' },
  { symbol: 'BTCUSD', name: 'Bitcoin', price: 30240, change: 6.1, type: 'Crypto' },
  { symbol: 'EURUSD', name: 'Euro / Dollar', price: 1.09, change: -0.9, type: 'Forex' },
  { symbol: 'SPY', name: 'S&P 500 ETF', price: 512.8, change: 1.3, type: 'ETF' },
];

const positions = [
  { name: 'Apple', symbol: 'AAPL', size: '32 shares', value: '$3,840', change: '+4.2%' },
  { name: 'Bitcoin', symbol: 'BTC', size: '0.42 BTC', value: '$12,600', change: '+6.1%' },
  { name: 'EUR/USD', symbol: 'FX', size: '2 lots', value: '$4,200', change: '-0.9%' },
];

const recommendations = [
  { title: 'Increase NVDA exposure', body: 'Momentum is strengthening and your portfolio is underweight AI leaders.', score: '92/100' },
  { title: 'Trim EUR/USD after pullback', body: 'TradeIQ sees lower conviction after a sharp move against your target.', score: '78/100' },
  { title: 'Rebalance crypto sleeve', body: 'BTC is now 6% above your preferred risk band.', score: '86/100' },
];

const traders = [
  { name: 'Mina Chen', tag: '+18.4% this month', follow: 'Copy' },
  { name: 'Leo Rivera', tag: 'Macro + crypto', follow: 'Follow' },
  { name: 'Sara Khan', tag: 'Momentum swing', follow: 'Copy' },
];

function App() {
  const [action, setAction] = useState('buy');
  const [instrument, setInstrument] = useState('NVDA');
  const [quantity, setQuantity] = useState(10);
  const [status, setStatus] = useState('Illustration only — no live brokerage integration.');

  const selectedInstrument = useMemo(() => instruments.find((item) => item.symbol === instrument) || instruments[0], [instrument]);
  const estimatedCost = useMemo(() => selectedInstrument.price * quantity, [selectedInstrument, quantity]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus(`${action === 'buy' ? 'Buy' : 'Sell'} order prepared for ${quantity} ${selectedInstrument.symbol} · demo only`);
  };

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
        <button className="btn btn-secondary">+ Deposit</button>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="muted">Premium trading experience • concept UI</p>
          <h2>Trade all instruments with AI guidance, social copy trading and a premium experience.</h2>
          <p>Discover smart opportunities, mirror expert traders and manage your portfolio from one elegant workspace.</p>
          <div className="hero-actions">
            <button className="btn btn-primary">Open account</button>
            <button className="btn btn-secondary">Watch demo</button>
          </div>
        </div>
        <div className="card hero-card">
          <div className="hero-balance">
            <span>Portfolio balance</span>
            <span className="badge">+$4,280</span>
          </div>
          <div className="balance-amount">$128,420</div>
          <div className="sparkline" />
          <div className="metrics-grid">
            <div className="metric-card card">
              <span className="small-note">Risk</span>
              <strong>Balanced</strong>
            </div>
            <div className="metric-card card">
              <span className="small-note">Open ideas</span>
              <strong>12</strong>
            </div>
            <div className="metric-card card">
              <span className="small-note">Copy traders</span>
              <strong>8</strong>
            </div>
            <div className="metric-card card">
              <span className="small-note">Today</span>
              <strong className="positive">+2.8%</strong>
            </div>
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
                  <div className="list-meta">{position.symbol} • {position.size}</div>
                </div>
                <div className="right">
                  <strong>{position.value}</strong>
                  <div className={position.change.startsWith('-') ? 'negative' : 'positive'}>{position.change}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="card panel order-card">
          <div className="panel-header">
            <div>
              <p className="small-note">Trade</p>
              <h3 className="section-title">New order</h3>
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
            <button className="btn btn-primary" type="submit">Place order</button>
            <p className="small-note">{status}</p>
          </form>
        </section>
      </main>

      <section className="secondary-grid">
        <div className="card panel" id="tradeiq">
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
        </div>

        <div className="card panel" id="social">
          <div className="panel-header">
            <div>
              <p className="small-note">Social trading</p>
              <h3 className="section-title">Popular traders</h3>
            </div>
            <button className="btn btn-ghost">Discover</button>
          </div>
          <div className="list">
            {traders.map((trader) => (
              <div className="social-row" key={trader.name}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div className="avatar">{trader.name.split(' ').map((word) => word[0]).join('')}</div>
                  <div>
                    <strong>{trader.name}</strong>
                    <div className="list-meta">{trader.tag}</div>
                  </div>
                </div>
                <button className="btn btn-secondary">{trader.follow}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="card panel" id="wallet" style={{ marginTop: '18px' }}>
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
      </section>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
