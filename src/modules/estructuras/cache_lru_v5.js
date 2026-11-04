class NodoCache {
  constructor(clave, valor) {
    this.clave = clave;
    this.valor = valor;
    this.anterior = null;
    this.siguiente = null;
  }
}

class CacheLRU {
  constructor(capacidad = 100) {
    this.capacidad = capacidad;
    this.mapa = new Map();
    this.cabeza = new NodoCache(null, null);
    this.cola = new NodoCache(null, null);
    this.cabeza.siguiente = this.cola;
    this.cola.anterior = this.cabeza;
  }

  _eliminarNodo(nodo) {
    nodo.anterior.siguiente = nodo.siguiente;
    nodo.siguiente.anterior = nodo.anterior;
  }

  _agregarAlFrente(nodo) {
    nodo.siguiente = this.cabeza.siguiente;
    nodo.anterior = this.cabeza;
    this.cabeza.siguiente.anterior = nodo;
    this.cabeza.siguiente = nodo;
  }

  obtener(clave) {
    if (!this.mapa.has(clave)) return null;
    const nodo = this.mapa.get(clave);
    this._eliminarNodo(nodo);
    this._agregarAlFrente(nodo);
    return nodo.valor;
  }

  guardar(clave, valor) {
    if (this.mapa.has(clave)) {
      this._eliminarNodo(this.mapa.get(clave));
    }
    const nuevoNodo = new NodoCache(clave, valor);
    this._agregarAlFrente(nuevoNodo);
    this.mapa.set(clave, nuevoNodo);

    if (this.mapa.size > this.capacidad) {
      const lru = this.cola.anterior;
      this._eliminarNodo(lru);
      this.mapa.delete(lru.clave);
    }
  }

  longitud() {
    return this.mapa.size;
  }
}

module.exports = { version: "v5.0.0", CacheLRU };
