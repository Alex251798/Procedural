function sieveOfEratosthenes(limit) {
  const primes = [];
  const isPrime = new Uint8Array(limit + 1).fill(1);
  isPrime[0] = 0;
  isPrime[1] = 0;

  for (let p = 2; p * p <= limit; p++) {
    if (isPrime[p]) {
      for (let i = p * p; i <= limit; i += p) {
        isPrime[i] = 0;
      }
    }
  }

  for (let i = 2; i <= limit; i++) {
    if (isPrime[i]) primes.push(i);
  }
  return primes;
}

function gcd(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x;
}

function lcm(a, b) {
  if (a === 0 || b === 0) return 0;
  return Math.abs((a * b) / gcd(a, b));
}

function modPow(base, exponent, modulus) {
  if (modulus === 1) return 0;
  let result = 1n;
  let b = BigInt(base) % BigInt(modulus);
  let e = BigInt(exponent);
  const m = BigInt(modulus);

  while (e > 0n) {
    if (e % 2n === 1n) result = (result * b) % m;
    e = e / 2n;
    b = (b * b) % m;
  }
  return Number(result);
}

module.exports = {
  version: "mod_mw2ci3g3_z2fz",
  sieveOfEratosthenes,
  gcd,
  lcm,
  modPow
};
