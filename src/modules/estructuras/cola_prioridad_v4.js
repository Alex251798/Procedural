class ColaPrioridad {
  constructor(comparador = (a, b) => a - b) {
    this.heap = [];
    this.comparador = comparador;
  }

  insertar(valor) {
    this.heap.push(valor);
    this._flotar(this.heap.length - 1);
  }

  extraer() {
    if (!this.heap.length) return null;
    const superior = this.heap[0];
    const ultimo = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = ultimo;
      this._hundir(0);
    }
    return superior;
  }

  vistazo() {
    return this.heap[0] || null;
  }

  tamanio() {
    return this.heap.length;
  }

  _flotar(indice) {
    while (indice > 0) {
      const padre = Math.floor((indice - 1) / 2);
      if (this.comparador(this.heap[indice], this.heap[padre]) < 0) {
        [this.heap[indice], this.heap[padre]] = [this.heap[padre], this.heap[indice]];
        indice = padre;
      } else {
        break;
      }
    }
  }

  _hundir(indice) {
    const len = this.heap.length;
    while (true) {
      let objetivo = indice;
      const izq = 2 * indice + 1;
      const der = 2 * indice + 2;

      if (izq < len && this.comparador(this.heap[izq], this.heap[objetivo]) < 0) {
        objetivo = izq;
      }
      if (der < len && this.comparador(this.heap[der], this.heap[objetivo]) < 0) {
        objetivo = der;
      }
      if (objetivo !== indice) {
        [this.heap[indice], this.heap[objetivo]] = [this.heap[objetivo], this.heap[indice]];
        indice = objetivo;
      } else {
        break;
      }
    }
  }
}

module.exports = { version: "v4.0.0", ColaPrioridad };
