class ConjuntosDisjuntos {
  constructor(tam) {
    this.padre = Array.from({ length: tam }, (_, i) => i);
    this.rango = new Array(tam).fill(0);
  }

  buscar(i) {
    if (this.padre[i] === i) return i;
    this.padre[i] = this.buscar(this.padre[i]);
    return this.padre[i];
  }

  unir(i, j) {
    const raizI = this.buscar(i);
    const raizJ = this.buscar(j);
    if (raizI === raizJ) return false;

    if (this.rango[raizI] < this.rango[raizJ]) {
      this.padre[raizI] = raizJ;
    } else if (this.rango[raizI] > this.rango[raizJ]) {
      this.padre[raizJ] = raizI;
    } else {
      this.padre[raizJ] = raizI;
      this.rango[raizI]++;
    }
    return true;
  }

  estanConectados(i, j) {
    return this.buscar(i) === this.buscar(j);
  }
}

module.exports = { version: "v2.0.0", ConjuntosDisjuntos };
