function hashFNV1a(cadena) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < cadena.length; i++) {
    hash ^= cadena.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return hash >>> 0;
}

function checksumAdler32(cadena) {
  const MOD_ADLER = 65521;
  let a = 1;
  let b = 0;
  for (let i = 0; i < cadena.length; i++) {
    a = (a + cadena.charCodeAt(i)) % MOD_ADLER;
    b = (b + a) % MOD_ADLER;
  }
  return ((b << 16) | a) >>> 0;
}

module.exports = { version: "v4.0.0", hashFNV1a, checksumAdler32 };
