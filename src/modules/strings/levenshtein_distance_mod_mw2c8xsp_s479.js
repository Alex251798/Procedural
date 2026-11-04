function levenshteinDistance(strA, strB) {
  const m = strA.length;
  const n = strB.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (strA[i - 1] === strB[j - 1]) {
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

function stringSimilarity(strA, strB) {
  const maxLen = Math.max(strA.length, strB.length);
  if (maxLen === 0) return 1.0;
  const distance = levenshteinDistance(strA, strB);
  return (maxLen - distance) / maxLen;
}

module.exports = { version: "mod_mw2c8xsp_s479", levenshteinDistance, stringSimilarity };
