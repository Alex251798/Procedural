function factorial(n) {
  let resultado = 1n;
  for (let i = 2n; i <= BigInt(n); i++) resultado *= i;
  return resultado;
}

function combinaciones(n, k) {
  if (k < 0 || k > n) return 0n;
  if (k === 0 || k === n) return 1n;
  const kReal = k > n - k ? n - k : k;
  let numerador = 1n;
  let denominador = 1n;
  for (let i = 1n; i <= BigInt(kReal); i++) {
    numerador *= BigInt(n) - i + 1n;
    denominador *= i;
  }
  return numerador / denominador;
}

function permutaciones(n, k) {
  if (k < 0 || k > n) return 0n;
  let res = 1n;
  for (let i = 0n; i < BigInt(k); i++) {
    res *= BigInt(n) - i;
  }
  return res;
}

module.exports = {
  version: "v3.0.0",
  factorial,
  combinaciones,
  permutaciones
};
