function resolverMochila(valores, pesos, capacidad) {
  const n = valores.length;
  const dp = Array.from({ length: n + 1 }, () => Array(capacidad + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    const val = valores[i - 1];
    const wt = pesos[i - 1];
    for (let w = 1; w <= capacidad; w++) {
      if (wt <= w) {
        dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - wt] + val);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  return dp[n][capacidad];
}

module.exports = { version: "v2.0.0", resolverMochila };
