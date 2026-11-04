function knapsack(values, weights, capacity) {
  const n = values.length;
  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    const val = values[i - 1];
    const wt = weights[i - 1];
    for (let w = 1; w <= capacity; w++) {
      if (wt <= w) {
        dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - wt] + val);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  return dp[n][capacity];
}

module.exports = { version: "mod_mw2c7czz_e7kq", knapsack };
