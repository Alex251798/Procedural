class NodoTrie {
  constructor() {
    this.hijos = new Map();
    this.esFinDePalabra = false;
  }
}

class ArbolTrie {
  constructor() {
    this.raiz = new NodoTrie();
  }

  insertar(palabra) {
    let actual = this.raiz;
    for (const char of palabra) {
      if (!actual.hijos.has(char)) {
        actual.hijos.set(char, new NodoTrie());
      }
      actual = actual.hijos.get(char);
    }
    actual.esFinDePalabra = true;
  }

  buscar(palabra) {
    let actual = this.raiz;
    for (const char of palabra) {
      if (!actual.hijos.has(char)) return false;
      actual = actual.hijos.get(char);
    }
    return actual.esFinDePalabra;
  }

  comienzaCon(prefijo) {
    let actual = this.raiz;
    for (const char of prefijo) {
      if (!actual.hijos.has(char)) return false;
      actual = actual.hijos.get(char);
    }
    return true;
  }
}

module.exports = { version: "v4.0.0", ArbolTrie };
