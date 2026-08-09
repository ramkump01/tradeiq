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
