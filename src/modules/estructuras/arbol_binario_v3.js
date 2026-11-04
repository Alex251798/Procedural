class NodoArbol {
  constructor(valor) {
    this.valor = valor;
    this.izquierdo = null;
    this.derecho = null;
  }
}

class ArbolBinarioBusqueda {
  constructor() {
    this.raiz = null;
    this.elementos = 0;
  }

  insertar(valor) {
    const nuevo = new NodoArbol(valor);
    this.elementos++;
    if (!this.raiz) {
      this.raiz = nuevo;
      return;
    }

    let actual = this.raiz;
    while (true) {
      if (valor === actual.valor) return;
      if (valor < actual.valor) {
        if (!actual.izquierdo) {
          actual.izquierdo = nuevo;
          return;
        }
        actual = actual.izquierdo;
      } else {
        if (!actual.derecho) {
          actual.derecho = nuevo;
          return;
        }
        actual = actual.derecho;
      }
    }
  }

  contiene(valor) {
    let actual = this.raiz;
    while (actual) {
      if (valor === actual.valor) return true;
      actual = valor < actual.valor ? actual.izquierdo : actual.derecho;
    }
    return false;
  }

  recorridoEnOrden(callback) {
    function visitar(nodo) {
      if (!nodo) return;
      visitar(nodo.izquierdo);
      callback(nodo.valor);
      visitar(nodo.derecho);
    }
    visitar(this.raiz);
  }
}

module.exports = { version: "v3.0.0", ArbolBinarioBusqueda };
