class GrafoPonderado {
  constructor() {
    this.listaAdyacencia = new Map();
  }

  agregarVertice(vertice) {
    if (!this.listaAdyacencia.has(vertice)) {
      this.listaAdyacencia.set(vertice, []);
    }
  }

  agregarArista(origen, destino, peso) {
    this.agregarVertice(origen);
    this.agregarVertice(destino);
    this.listaAdyacencia.get(origen).push({ nodo: destino, peso });
    this.listaAdyacencia.get(destino).push({ nodo: origen, peso });
  }

  caminoMinimo(inicio, fin) {
    const distancias = {};
    const previo = {};
    const visitados = new Set();
    const nodos = new Set();

    for (const vertice of this.listaAdyacencia.keys()) {
      distancias[vertice] = vertice === inicio ? 0 : Infinity;
      previo[vertice] = null;
      nodos.add(vertice);
    }

    while (nodos.size > 0) {
      let menor = null;
      for (const nodo of nodos) {
        if (menor === null || distancias[nodo] < distancias[menor]) {
          menor = nodo;
        }
      }

      if (menor === null || distancias[menor] === Infinity) break;
      if (menor === fin) {
        const camino = [];
        let actual = fin;
        while (actual) {
          camino.push(actual);
          actual = previo[actual];
        }
        return { distancia: distancias[fin], camino: camino.reverse() };
      }

      nodos.delete(menor);
      visitados.add(menor);

      for (const vecino of this.listaAdyacencia.get(menor)) {
        if (visitados.has(vecino.nodo)) continue;
        const nuevaDist = distancias[menor] + vecino.peso;
        if (nuevaDist < distancias[vecino.nodo]) {
          distancias[vecino.nodo] = nuevaDist;
          previo[vecino.nodo] = menor;
        }
      }
    }

    return { distancia: Infinity, camino: [] };
  }
}

module.exports = { version: "v4.0.0", GrafoPonderado };
