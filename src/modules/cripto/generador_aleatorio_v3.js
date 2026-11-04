function generadorMulberry32(semilla) {
  let estado = semilla >>> 0;
  return function() {
    estado |= 0;
    estado = (estado + 0x6D2B79F5) | 0;
    let t = Math.imul(estado ^ (estado >>> 15), 1 | estado);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generadorXorShift32(semilla) {
  let x = semilla || 1;
  return function() {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return (x >>> 0) / 4294967296;
  };
}

module.exports = { version: "v3.0.0", generadorMulberry32, generadorXorShift32 };
