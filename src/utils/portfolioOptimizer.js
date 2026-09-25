// Lightweight Modern Portfolio Theory (Markowitz) optimizer - no external dependencies.
// Given historical price series per asset, finds the weight allocation that maximizes
// the Sharpe ratio via a discretized grid search (fast enough for a handful of assets).

function returnsFromPoints(points) {
  const returns = [];
  for (let i = 1; i < points.length; i += 1) {
    returns.push((points[i] - points[i - 1]) / points[i - 1]);
  }
  return returns;
}

function mean(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function variance(values) {
  const m = mean(values);
  return mean(values.map((value) => (value - m) ** 2));
}

function covariance(a, b) {
  const ma = mean(a);
  const mb = mean(b);
  let total = 0;
  for (let i = 0; i < a.length; i += 1) {
    total += (a[i] - ma) * (b[i] - mb);
  }
  return total / a.length;
}

export function optimizePortfolio(assets, { step = 0.05 } = {}) {
  const returnsList = assets.map((asset) => returnsFromPoints(asset.points));
  const meanReturns = returnsList.map(mean);
  const count = assets.length;
  const covMatrix = returnsList.map((seriesA, i) =>
    returnsList.map((seriesB, j) => (i === j ? variance(seriesA) : covariance(seriesA, seriesB)))
  );

  const statsFor = (weights) => {
    const expectedReturn = weights.reduce((sum, w, i) => sum + w * meanReturns[i], 0);
    let portfolioVariance = 0;
    for (let i = 0; i < count; i += 1) {
      for (let j = 0; j < count; j += 1) {
        portfolioVariance += weights[i] * weights[j] * covMatrix[i][j];
      }
    }
    const volatility = Math.sqrt(Math.max(portfolioVariance, 0));
    const sharpe = volatility ? expectedReturn / volatility : 0;
    return { expectedReturn, volatility, sharpe };
  };

  let best = null;
  const search = (index, remaining, weights) => {
    if (index === count - 1) {
      if (remaining < -1e-9) return;
      const finalWeights = [...weights, Number(remaining.toFixed(4))];
      const stats = statsFor(finalWeights);
      if (!best || stats.sharpe > best.stats.sharpe) {
        best = { weights: finalWeights, stats };
      }
      return;
    }
    for (let w = 0; w <= remaining + 1e-9; w += step) {
      search(index + 1, Number((remaining - w).toFixed(4)), [...weights, Number(w.toFixed(4))]);
    }
  };
  search(0, 1, []);

  const currentWeights = assets.map((asset) => asset.currentWeight);
  const current = { weights: currentWeights, ...statsFor(currentWeights) };
  const optimal = { weights: best.weights, ...best.stats };

  return {
    assets: assets.map((asset, i) => ({
      symbol: asset.symbol,
      currentWeight: currentWeights[i],
      optimalWeight: optimal.weights[i],
    })),
    current,
    optimal,
  };
}
