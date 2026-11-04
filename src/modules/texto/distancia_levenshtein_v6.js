function distanciaLevenshtein(cadA, cadB) {
  const m = cadA.length;
  const n = cadB.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (cadA[i - 1] === cadB[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],
          dp[i][j - 1],
          dp[i - 1][j - 1]
        );
      }
    }
  }

  return dp[m][n];
}

function similitudCadenas(cadA, cadB) {
  const maxLongitud = Math.max(cadA.length, cadB.length);
  if (maxLongitud === 0) return 1.0;
  const distancia = distanciaLevenshtein(cadA, cadB);
  return (maxLongitud - distancia) / maxLongitud;
}

module.exports = { version: "v6.0.0", distanciaLevenshtein, similitudCadenas };
