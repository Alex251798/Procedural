function factorialBig(n) {
  let res = 1n;
  for (let i = 2n; i <= BigInt(n); i++) res *= i;
  return res;
}

function combinations(n, k) {
  if (k < 0 || k > n) return 0n;
  if (k === 0 || k === n) return 1n;
  const actualK = k > n - k ? n - k : k;
  let num = 1n;
  let den = 1n;
  for (let i = 1n; i <= BigInt(actualK); i++) {
    num *= BigInt(n) - i + 1n;
    den *= i;
  }
  return num / den;
}

function permutations(n, k) {
  if (k < 0 || k > n) return 0n;
  let res = 1n;
  for (let i = 0n; i < BigInt(k); i++) {
    res *= BigInt(n) - i;
  }
  return res;
}

module.exports = { version: "mod_mw2ckbyx_e2n6", factorialBig, combinations, permutations };
