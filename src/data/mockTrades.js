export const userProfile = {
  name: 'Alex Morgan',
  role: 'Multi-account trader',
  status: 'Live demo',
  avatar: 'AM',
};

export const mockAccounts = [
  {
    id: 'mt5',
    name: 'MT5',
    label: 'White-label MT5',
    balance: 128450,
    equity: 131220,
    openPositions: 3,
    unrealizedPl: 2780,
    color: 'teal',
  },
  {
    id: 'ctrader',
    name: 'cTrader',
    label: 'White-label cTrader',
    balance: 97220,
    equity: 94480,
    openPositions: 2,
    unrealizedPl: -1740,
    color: 'blue',
  },
];

const symbols = ['NVDA', 'BTCUSD', 'EURUSD', 'XAUUSD', 'SPY'];
const sessions = ['Asia', 'London', 'New York'];
const sideBias = ['Long', 'Short'];

const generateMockTrades = () => {
  const trades = [];
  const baseDate = new Date('2026-01-10T09:00:00Z');

  for (let index = 0; index < 52; index += 1) {
    const account = index % 3 === 0 ? 'cTrader' : 'MT5';
    const symbol = symbols[index % symbols.length];
    const side = sideBias[index % sideBias.length];
    const size = 1800 + (index % 7) * 320 + (index % 4) * 110;
    const pnl = index % 5 === 0 ? -(320 + (index % 6) * 140) : 420 + (index % 5) * 180;
    const entry = 100 + (index % 8) * 1.4 + (index % 3) * 0.3;
    const exit = entry + (side === 'Long' ? 0.9 : -0.7) + (index % 4) * 0.2;
    const date = new Date(baseDate.getTime() + index * 2.4 * 60 * 60 * 1000);

    trades.push({
      id: `T-${index + 1}`,
      account,
      symbol,
      side,
      size,
      entry: Number(entry.toFixed(2)),
      exit: Number(exit.toFixed(2)),
      pnl: Number(pnl.toFixed(2)),
      session: sessions[index % sessions.length],
      date: date.toISOString(),
    });
  }

  return trades;
};

export const mockTrades = generateMockTrades();

export const mockCopyStrategy = {
  strategyName: 'North Star Flow',
  roi: '+14.8%',
  followers: 1840,
  balance: 148200,
  equity: 141760,
  insight: 'Drawdown widened for three straight weeks and is now outside its historical range.',
};

export const copyTraders = [
  {
    id: 'mina-chen',
    name: 'Mina Chen',
    avatar: 'MC',
    strategy: 'AI Infrastructure Momentum',
    roiYtd: 34.2,
    roi30d: 6.1,
    riskScore: 4,
    copiers: 3820,
    winRate: 71,
    aum: 4200000,
    tags: ['Equities', 'AI'],
    curve: [100, 104, 108, 106, 113, 119, 124, 131, 128, 136, 142],
  },
  {
    id: 'leo-rivera',
    name: 'Leo Rivera',
    avatar: 'LR',
    strategy: 'Macro + Crypto Rotation',
    roiYtd: 21.7,
    roi30d: 2.4,
    riskScore: 6,
    copiers: 2210,
    winRate: 63,
    aum: 2650000,
    tags: ['Macro', 'Crypto'],
    curve: [100, 98, 103, 107, 105, 111, 116, 114, 119, 121, 118],
  },
  {
    id: 'sara-khan',
    name: 'Sara Khan',
    avatar: 'SK',
    strategy: 'Momentum Swing Trading',
    roiYtd: 45.6,
    roi30d: 8.9,
    riskScore: 7,
    copiers: 5140,
    winRate: 68,
    aum: 6100000,
    tags: ['Swing', 'Momentum'],
    curve: [100, 106, 111, 109, 118, 126, 122, 133, 140, 138, 149],
  },
  {
    id: 'noah-park',
    name: 'Noah Park',
    avatar: 'NP',
    strategy: 'Low-Volatility Income',
    roiYtd: 12.4,
    roi30d: 1.1,
    riskScore: 2,
    copiers: 1490,
    winRate: 77,
    aum: 1800000,
    tags: ['Income', 'Low Risk'],
    curve: [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110],
  },
];

const brokerSymbolPool = {
  MT5: ['EURUSD', 'GBPJPY', 'XAUUSD', 'US100', 'USDJPY'],
  cTrader: ['XAUUSD', 'GBPUSD', 'US30', 'BTCUSD', 'AUDUSD'],
};

const brokerAssetType = {
  EURUSD: 'Forex',
  GBPJPY: 'Forex',
  GBPUSD: 'Forex',
  AUDUSD: 'Forex',
  USDJPY: 'Forex',
  XAUUSD: 'Commodities',
  US100: 'Indices',
  US30: 'Indices',
  BTCUSD: 'Crypto',
};

let importCounter = 0;

// Simulates fetching recent trade history from a broker's trade API for the import flow.
export function generateImportedTrades(platform, accountLogin) {
  const pool = brokerSymbolPool[platform] || brokerSymbolPool.MT5;
  const count = 4 + (accountLogin.length % 3);
  const trades = [];

  for (let index = 0; index < count; index += 1) {
    importCounter += 1;
    const symbol = pool[(importCounter + index) % pool.length];
    const side = index % 2 === 0 ? 'Buy' : 'Sell';
    const size = 1500 + ((importCounter * 137 + index * 211) % 6000);
    const pnlMagnitude = 60 + ((importCounter * 53 + index * 97) % 900);
    const pnl = index % 3 === 0 ? -pnlMagnitude : pnlMagnitude;
    const ticketPrefix = platform === 'MT5' ? 'MT5' : 'CT';

    trades.push({
      ticket: `${ticketPrefix}-IMP-${1000 + importCounter}`,
      platform,
      instrument: symbol,
      type: brokerAssetType[symbol] || 'Forex',
      side,
      amount: `$${size.toLocaleString()}`,
      pnl: `${pnl >= 0 ? '+' : '-'}$${Math.abs(pnl).toLocaleString()}`,
      analyticsPnl: pnl,
      analyticsSize: size,
      symbolKey: symbol,
      sideKey: side === 'Buy' ? 'Long' : 'Short',
      importedAt: new Date().toISOString(),
    });
  }

  return trades;
}
