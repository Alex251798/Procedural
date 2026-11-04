function cribaEratostenes(limite) {
  const primos = [];
  const esPrimo = new Uint8Array(limite + 1).fill(1);
  esPrimo[0] = 0;
  esPrimo[1] = 0;

  for (let p = 2; p * p <= limite; p++) {
    if (esPrimo[p]) {
      for (let i = p * p; i <= limite; i += p) {
        esPrimo[i] = 0;
      }
    }
  }

  for (let i = 2; i <= limite; i++) {
    if (esPrimo[i]) primos.push(i);
  }
  return primos;
}

function maximoComunDivisor(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const temporal = y;
    y = x % y;
    x = temporal;
  }
  return x;
}

function minimoComunMultiplo(a, b) {
  if (a === 0 || b === 0) return 0;
  return Math.abs((a * b) / maximoComunDivisor(a, b));
}

function potenciaModular(base, exponente, modulo) {
  if (modulo === 1) return 0;
  let res = 1n;
  let b = BigInt(base) % BigInt(modulo);
  let e = BigInt(exponente);
  const m = BigInt(modulo);

  while (e > 0n) {
    if (e % 2n === 1n) res = (res * b) % m;
    e = e / 2n;
    b = (b * b) % m;
  }
  return Number(res);
}

module.exports = {
  version: "v5.0.0",
  cribaEratostenes,
  maximoComunDivisor,
  minimoComunMultiplo,
  potenciaModular
};
