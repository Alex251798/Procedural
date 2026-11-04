const fs = require('fs');
const path = require('path');

const SUFFIXES = [
  '',
  '_v2',
  '_v3',
  '_optimizada',
  '_avanzada',
  '_modular',
  '_segura',
  '_extendida',
  '_rapida',
  '_eficiente',
  '_core',
  '_util'
];

const ACTIONS = [
  'implementar',
  'agregar',
  'incorporar',
  'optimizar',
  'refactorizar',
  'ampliar'
];

const CATEGORIES = [
  {
    cat: 'matematicas',
    slug: 'algebra_lineal',
    branch: 'algebra-lineal',
    title: 'operaciones con vectores y matrices',
    desc: 'Implementacion modular de algoritmos y utilidades de algebra lineal.',
    gen: (ver) => `
function productoPunto(vecA, vecB) {
  if (vecA.length !== vecB.length) throw new Error("Las dimensiones de los vectores no coinciden");
  let suma = 0;
  for (let i = 0; i < vecA.length; i++) {
    suma += vecA[i] * vecB[i];
  }
  return suma;
}

function magnitudVector(vec) {
  return Math.sqrt(productoPunto(vec, vec));
}

function normalizarVector(vec) {
  const mag = magnitudVector(vec);
  if (mag === 0) return vec.map(() => 0);
  return vec.map((val) => val / mag);
}

function productoCruz3D(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0]
  ];
}

function multiplicarMatrices(matA, matB) {
  const filasA = matA.length;
  const colA = matA[0].length;
  const filasB = matB.length;
  const colB = matB[0].length;
  if (colA !== filasB) throw new Error("Dimensiones de matrices incompatibles");

  const resultado = Array.from({ length: filasA }, () => Array(colB).fill(0));
  for (let i = 0; i < filasA; i++) {
    for (let j = 0; j < colB; j++) {
      let suma = 0;
      for (let k = 0; k < colA; k++) {
        suma += matA[i][k] * matB[k][j];
      }
      resultado[i][j] = suma;
    }
  }
  return resultado;
}

module.exports = {
  version: "${ver}",
  productoPunto,
  magnitudVector,
  normalizarVector,
  productoCruz3D,
  multiplicarMatrices
};`
  },
  {
    cat: 'matematicas',
    slug: 'teoria_numeros',
    branch: 'teoria-numeros',
    title: 'criba de eratostenes y calculo mcd',
    desc: 'Implementacion de criba de numeros primos y algoritmo de euclides.',
    gen: (ver) => `
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
  version: "${ver}",
  cribaEratostenes,
  maximoComunDivisor,
  minimoComunMultiplo,
  potenciaModular
};`
  },
  {
    cat: 'matematicas',
    slug: 'estadistica',
    branch: 'estadistica-descriptiva',
    title: 'calculo de varianza y correlacion pearson',
    desc: 'Funciones de analisis estadistico descriptivo y correlacion.',
    gen: (ver) => `
function calcularMedia(arr) {
  if (!arr.length) return 0;
  return arr.reduce((acc, val) => acc + val, 0) / arr.length;
}

function calcularMediana(arr) {
  if (!arr.length) return 0;
  const ordenado = [...arr].sort((a, b) => a - b);
  const mitad = Math.floor(ordenado.length / 2);
  return ordenado.length % 2 !== 0 ? ordenado[mitad] : (ordenado[mitad - 1] + ordenado[mitad]) / 2;
}

function calcularVarianza(arr) {
  if (arr.length <= 1) return 0;
  const m = calcularMedia(arr);
  return arr.reduce((acc, val) => acc + Math.pow(val - m, 2), 0) / (arr.length - 1);
}

function desviacionEstandar(arr) {
  return Math.sqrt(calcularVarianza(arr));
}

function correlacionPearson(arrX, arrY) {
  if (arrX.length !== arrY.length || arrX.length === 0) return 0;
  const mediaX = calcularMedia(arrX);
  const mediaY = calcularMedia(arrY);
  let numerador = 0;
  let denX = 0;
  let denY = 0;

  for (let i = 0; i < arrX.length; i++) {
    const diffX = arrX[i] - mediaX;
    const diffY = arrY[i] - mediaY;
    numerador += diffX * diffY;
    denX += diffX * diffX;
    denY += diffY * diffY;
  }

  const denominador = Math.sqrt(denX * denY);
  return denominador === 0 ? 0 : numerador / denominador;
}

module.exports = {
  version: "${ver}",
  calcularMedia,
  calcularMediana,
  calcularVarianza,
  desviacionEstandar,
  correlacionPearson
};`
  },
  {
    cat: 'geometria',
    slug: 'poligonos',
    branch: 'geometria-poligonos',
    title: 'calculo de area de poligonos mediante shoelace',
    desc: 'Algoritmos de geometria computacional y calculo de areas.',
    gen: (ver) => `
function calcularAreaPoligono(vertices) {
  const n = vertices.length;
  if (n < 3) return 0;
  let area = 0;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    area += vertices[i].x * vertices[j].y;
    area -= vertices[j].x * vertices[i].y;
  }
  return Math.abs(area) / 2;
}

function distanciaEuclidiana(p1, p2) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.hypot(dx, dy);
}

function orientacionPuntos(p, q, r) {
  const valor = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
  if (valor === 0) return 0;
  return valor > 0 ? 1 : 2;
}

module.exports = {
  version: "${ver}",
  calcularAreaPoligono,
  distanciaEuclidiana,
  orientacionPuntos
};`
  },
  {
    cat: 'matematicas',
    slug: 'combinatoria',
    branch: 'combinatoria',
    title: 'calculo de combinaciones y permutaciones',
    desc: 'Utilidades combinatorias con soporte para factoriales y coeficientes binomiales.',
    gen: (ver) => `
function factorial(n) {
  let resultado = 1n;
  for (let i = 2n; i <= BigInt(n); i++) resultado *= i;
  return resultado;
}

function combinaciones(n, k) {
  if (k < 0 || k > n) return 0n;
  if (k === 0 || k === n) return 1n;
  const kReal = k > n - k ? n - k : k;
  let numerador = 1n;
  let denominador = 1n;
  for (let i = 1n; i <= BigInt(kReal); i++) {
    numerador *= BigInt(n) - i + 1n;
    denominador *= i;
  }
  return numerador / denominador;
}

function permutaciones(n, k) {
  if (k < 0 || k > n) return 0n;
  let res = 1n;
  for (let i = 0n; i < BigInt(k); i++) {
    res *= BigInt(n) - i;
  }
  return res;
}

module.exports = {
  version: "${ver}",
  factorial,
  combinaciones,
  permutaciones
};`
  },
  {
    cat: 'estructuras',
    slug: 'cache_lru',
    branch: 'cache-lru',
    title: 'memoria cache con politica lru',
    desc: 'Estructura de cache en memoria con lista doblemente enlazada.',
    gen: (ver) => `
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

module.exports = { version: "${ver}", CacheLRU };`
  },
  {
    cat: 'estructuras',
    slug: 'arbol_binario',
    branch: 'arbol-binario',
    title: 'arbol binario de busqueda con recorridos',
    desc: 'Estructura de arbol binario con operaciones de insercion y recorrido in-order.',
    gen: (ver) => `
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

module.exports = { version: "${ver}", ArbolBinarioBusqueda };`
  },
  {
    cat: 'estructuras',
    slug: 'cola_prioridad',
    branch: 'cola-prioridad',
    title: 'cola de prioridad basada en monticulo binario',
    desc: 'Cola de prioridad con soporte para comparador personalizado y heap in-place.',
    gen: (ver) => `
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

module.exports = { version: "${ver}", ColaPrioridad };`
  },
  {
    cat: 'estructuras',
    slug: 'arbol_trie',
    branch: 'arbol-trie',
    title: 'arbol trie para busqueda y autocompletado',
    desc: 'Estructura trie para almacenamiento eficiente de prefijos y busquedas rapidas.',
    gen: (ver) => `
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

module.exports = { version: "${ver}", ArbolTrie };`
  },
  {
    cat: 'estructuras',
    slug: 'conjuntos_disjuntos',
    branch: 'union-find',
    title: 'union find con compresion de caminos',
    desc: 'Estructura disjoint set con tecnicas de union por rango y compresion.',
    gen: (ver) => `
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

module.exports = { version: "${ver}", ConjuntosDisjuntos };`
  },
  {
    cat: 'algoritmos',
    slug: 'quicksort',
    branch: 'ordenamiento-quicksort',
    title: 'ordenamiento rapido quicksort in-place',
    desc: 'Algoritmo de ordenamiento quicksort con particionado de lomuto.',
    gen: (ver) => `
function particionar(arr, bajo, alto, comparador) {
  const pivote = arr[alto];
  let i = bajo - 1;

  for (let j = bajo; j < alto; j++) {
    if (comparador(arr[j], pivote) <= 0) {
      i++;
      const temporal = arr[i];
      arr[i] = arr[j];
      arr[j] = temporal;
    }
  }

  const intercambio = arr[i + 1];
  arr[i + 1] = arr[alto];
  arr[alto] = intercambio;
  return i + 1;
}

function auxiliarQuickSort(arr, bajo, alto, comparador) {
  if (bajo < alto) {
    const indiceParticion = particionar(arr, bajo, alto, comparador);
    auxiliarQuickSort(arr, bajo, indiceParticion - 1, comparador);
    auxiliarQuickSort(arr, indiceParticion + 1, alto, comparador);
  }
}

function ordenarQuickSort(arreglo, comparador = (a, b) => a - b) {
  const copia = [...arreglo];
  auxiliarQuickSort(copia, 0, copia.length - 1, comparador);
  return copia;
}

module.exports = { version: "${ver}", ordenarQuickSort };`
  },
  {
    cat: 'algoritmos',
    slug: 'dijkstra',
    branch: 'algoritmo-dijkstra',
    title: 'busqueda de caminos minimos con dijkstra',
    desc: 'Algoritmo de rutas optimas en grafos dirigidos ponderados.',
    gen: (ver) => `
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

module.exports = { version: "${ver}", GrafoPonderado };`
  },
  {
    cat: 'algoritmos',
    slug: 'mochila_dinamica',
    branch: 'mochila-dinamica',
    title: 'problema de la mochila 0-1 con programacion dinamica',
    desc: 'Solucion clasica al problema de la mochila mediante matriz de programacion dinamica.',
    gen: (ver) => `
function resolverMochila(valores, pesos, capacidad) {
  const n = valores.length;
  const dp = Array.from({ length: n + 1 }, () => Array(capacidad + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    const val = valores[i - 1];
    const wt = pesos[i - 1];
    for (let w = 1; w <= capacidad; w++) {
      if (wt <= w) {
        dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - wt] + val);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  return dp[n][capacidad];
}

module.exports = { version: "${ver}", resolverMochila };`
  },
  {
    cat: 'algoritmos',
    slug: 'busqueda_binaria',
    branch: 'busqueda-binaria',
    title: 'algoritmos de busqueda binaria y salto',
    desc: 'Implementaciones de busqueda binaria clasica y busqueda por bloques o saltos.',
    gen: (ver) => `
function busquedaBinaria(arr, objetivo) {
  let inicio = 0;
  let fin = arr.length - 1;
  while (inicio <= fin) {
    const medio = Math.floor((inicio + fin) / 2);
    if (arr[medio] === objetivo) return medio;
    if (arr[medio] < objetivo) inicio = medio + 1;
    else fin = medio - 1;
  }
  return -1;
}

function busquedaPorSaltos(arr, objetivo) {
  const n = arr.length;
  let paso = Math.floor(Math.sqrt(n));
  let previo = 0;

  while (arr[Math.min(paso, n) - 1] < objetivo) {
    previo = paso;
    paso += Math.floor(Math.sqrt(n));
    if (previo >= n) return -1;
  }

  while (arr[previo] < objetivo) {
    previo++;
    if (previo === Math.min(paso, n)) return -1;
  }

  return arr[previo] === objetivo ? previo : -1;
}

module.exports = { version: "${ver}", busquedaBinaria, busquedaPorSaltos };`
  },
  {
    cat: 'texto',
    slug: 'distancia_levenshtein',
    branch: 'distancia-levenshtein',
    title: 'calculo de distancia de edicion levenshtein',
    desc: 'Metrica de distancia levenshtein para comparacion difusa de cadenas.',
    gen: (ver) => `
function distanciaLevenshtein(cadA, cadB) {
  const m = cadA.length;
  const n = cadB.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (cadA[i - 1] === cadB[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],
          dp[i][j - 1],
          dp[i - 1][j - 1]
        );
      }
    }
  }

  return dp[m][n];
}

function similitudCadenas(cadA, cadB) {
  const maxLongitud = Math.max(cadA.length, cadB.length);
  if (maxLongitud === 0) return 1.0;
  const distancia = distanciaLevenshtein(cadA, cadB);
  return (maxLongitud - distancia) / maxLongitud;
}

module.exports = { version: "${ver}", distanciaLevenshtein, similitudCadenas };`
  },
  {
    cat: 'texto',
    slug: 'formateador_cadenas',
    branch: 'formateador-cadenas',
    title: 'conversion de slugs y estilos de nomenclatura',
    desc: 'Funciones para generar slugs web limpios y transformar entre camelCase y snake_case.',
    gen: (ver) => `
function generarSlug(cadena) {
  return cadena
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\\u0300-\\u036f]/g, '')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\\s+/g, '-')
    .replace(/-+/g, '-');
}

function convertirACamelCase(cadena) {
  return cadena.replace(/([-_][a-z])/gi, ($1) =>
    $1.toUpperCase().replace('-', '').replace('_', '')
  );
}

function convertirASnakeCase(cadena) {
  return cadena
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase()
    .replace(/^_/, '');
}

module.exports = { version: "${ver}", generarSlug, convertirACamelCase, convertirASnakeCase };`
  },
  {
    cat: 'texto',
    slug: 'motor_plantillas',
    branch: 'motor-plantillas',
    title: 'motor de interpolacion de plantillas dinamicas',
    desc: 'Motor ligero de reemplazo de variables con soporte para propiedades anidadas.',
    gen: (ver) => `
function interpolarPlantilla(plantilla, contexto) {
  return plantilla.replace(/\\{\\{\\s*([a-zA-Z0-9_.]+)\\s*\\}\\}/g, (match, clave) => {
    const propiedades = clave.split('.');
    let valor = contexto;
    for (const p of propiedades) {
      if (valor === null || valor === undefined) return '';
      valor = valor[p];
    }
    return valor !== undefined && valor !== null ? String(valor) : '';
  });
}

function extraerVariablesPlantilla(plantilla) {
  const coincidencias = [...plantilla.matchAll(/\\{\\{\\s*([a-zA-Z0-9_.]+)\\s*\\}\\}/g)];
  return [...new Set(coincidencias.map((m) => m[1]))];
}

module.exports = { version: "${ver}", interpolarPlantilla, extraerVariablesPlantilla };`
  },
  {
    cat: 'async',
    slug: 'reintento_exponencial',
    branch: 'reintento-exponencial',
    title: 'mecanismo de reintento con retroceso exponencial',
    desc: 'Supervisor de reintentos para operaciones asincronas con factor de jitter.',
    gen: (ver) => `
function pausar(ms) {
  return new Promise((resolver) => setTimeout(resolver, ms));
}

async function reintentarConRetroceso(tarea, opciones = {}) {
  const {
    intentosMaximos = 3,
    demoraInicial = 100,
    demoraMaxima = 2000,
    factorMultiplicador = 2,
    aplicarJitter = true
  } = opciones;

  let intento = 0;
  let demoraActual = demoraInicial;

  while (true) {
    try {
      intento++;
      return await tarea(intento);
    } catch (error) {
      if (intento >= intentosMaximos) throw error;
      const variacion = aplicarJitter ? demoraActual * (0.8 + Math.random() * 0.4) : demoraActual;
      await pausar(Math.min(variacion, demoraMaxima));
      demoraActual = Math.min(demoraActual * factorMultiplicador, demoraMaxima);
    }
  }
}

module.exports = { version: "${ver}", pausar, reintentarConRetroceso };`
  },
  {
    cat: 'async',
    slug: 'control_concurrencia',
    branch: 'control-concurrencia',
    title: 'limitador de tasa de concurrencia',
    desc: 'Manejador de colas de tareas con limite estricto de ejecucion simultanea.',
    gen: (ver) => `
class PiscinaConcurrencia {
  constructor(limite = 4) {
    this.limite = limite;
    this.enEjecucion = 0;
    this.colaEspera = [];
  }

  async ejecutar(tarea) {
    if (this.enEjecucion >= this.limite) {
      await new Promise((resolve) => this.colaEspera.push(resolve));
    }
    this.enEjecucion++;
    try {
      return await tarea();
    } finally {
      this.enEjecucion--;
      if (this.colaEspera.length > 0) {
        const siguiente = this.colaEspera.shift();
        siguiente();
      }
    }
  }
}

module.exports = { version: "${ver}", PiscinaConcurrencia };`
  },
  {
    cat: 'cripto',
    slug: 'hash_fnv1a',
    branch: 'checksum-fnv1a',
    title: 'algoritmos de checksum fnv1a y adler32',
    desc: 'Funciones de dispersion hash de alta velocidad para validacion de integridad.',
    gen: (ver) => `
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

module.exports = { version: "${ver}", hashFNV1a, checksumAdler32 };`
  },
  {
    cat: 'cripto',
    slug: 'generador_aleatorio',
    branch: 'generador-aleatorio',
    title: 'generador pseudoaleatorio determinista',
    desc: 'Generador de secuencias pseudoaleatorias basado en el algoritmo mulberry32.',
    gen: (ver) => `
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

module.exports = { version: "${ver}", generadorMulberry32, generadorXorShift32 };`
  },
  {
    cat: 'colecciones',
    slug: 'utilidades_listas',
    branch: 'utilidades-listas',
    title: 'utilidades para particionar y agrupar arreglos',
    desc: 'Funciones funcionales para segmentar, particionar y agrupar colecciones de datos.',
    gen: (ver) => `
function dividirEnLotes(arreglo, tamanioLote = 1) {
  if (!Array.isArray(arreglo) || tamanioLote < 1) return [];
  const salida = [];
  for (let i = 0; i < arreglo.length; i += tamanioLote) {
    salida.push(arreglo.slice(i, i + tamanioLote));
  }
  return salida;
}

function agruparPor(arreglo, selectorClave) {
  const mapa = new Map();
  for (const elemento of arreglo) {
    const clave = typeof selectorClave === 'function' ? selectorClave(elemento) : elemento[selectorClave];
    const grupo = mapa.get(clave);
    if (!grupo) {
      mapa.set(clave, [elemento]);
    } else {
      grupo.push(elemento);
    }
  }
  return Object.fromEntries(mapa);
}

function particionar(arreglo, predicado) {
  const verdaderos = [];
  const falsos = [];
  for (const item of arreglo) {
    if (predicado(item)) {
      verdaderos.push(item);
    } else {
      falsos.push(item);
    }
  }
  return [verdaderos, falsos];
}

module.exports = { version: "${ver}", dividirEnLotes, agruparPor, particionar };`
  },
  {
    cat: 'eventos',
    slug: 'emisor_eventos',
    branch: 'emisor-eventos',
    title: 'bus emisor de eventos personalizado',
    desc: 'Sistema de publicacion y suscripcion desacoplado con soporte para listeners unicos.',
    gen: (ver) => `
class EmisorEventos {
  constructor() {
    this.oyentes = new Map();
  }

  suscribir(evento, callback) {
    if (!this.oyentes.has(evento)) {
      this.oyentes.set(evento, []);
    }
    this.oyentes.get(evento).push(callback);
    return () => this.cancelar(evento, callback);
  }

  cancelar(evento, callback) {
    const lista = this.oyentes.get(evento);
    if (!lista) return;
    this.oyentes.set(evento, lista.filter((fn) => fn !== callback));
  }

  emitir(evento, ...datos) {
    const lista = this.oyentes.get(evento);
    if (!lista) return;
    for (const callback of lista) {
      callback(...datos);
    }
  }

  suscribirUnaVez(evento, callback) {
    const desuscribir = this.suscribir(evento, (...datos) => {
      desuscribir();
      callback(...datos);
    });
  }
}

module.exports = { version: "${ver}", EmisorEventos };`
  },
  {
    cat: 'validacion',
    slug: 'validador_esquemas',
    branch: 'validador-esquemas',
    title: 'validador declarativo de esquemas y tipos',
    desc: 'Motor de validacion de objetos con reglas obligatorias, tipos de datos y rangos.',
    gen: (ver) => `
class ValidadorEsquema {
  constructor(reglas) {
    this.reglas = reglas;
  }

  validar(datos) {
    const fallos = {};
    for (const [campo, regla] of Object.entries(this.reglas)) {
      const valor = datos[campo];
      if (regla.requerido && (valor === undefined || valor === null || valor === '')) {
        fallos[campo] = 'El campo es obligatorio';
        continue;
      }
      if (valor !== undefined && regla.tipo && typeof valor !== regla.tipo) {
        fallos[campo] = 'Se esperaba tipo ' + regla.tipo + ', recibido ' + typeof valor;
        continue;
      }
      if (regla.minimo !== undefined && valor < regla.minimo) {
        fallos[campo] = 'El valor minimo permitido es ' + regla.minimo;
      }
    }
    return { valido: Object.keys(fallos).length === 0, errores: fallos };
  }
}

module.exports = { version: "${ver}", ValidadorEsquema };`
  },
  {
    cat: 'fechas',
    slug: 'calculo_fechas',
    branch: 'calculo-fechas',
    title: 'calculo de dias laborables y duracion',
    desc: 'Funciones de conteo de dias habiles excluyendo fines de semana y formato de duracion.',
    gen: (ver) => `
function formatearDuracion(milisegundos) {
  const seg = Math.floor((milisegundos / 1000) % 60);
  const min = Math.floor((milisegundos / (1000 * 60)) % 60);
  const horas = Math.floor((milisegundos / (1000 * 60 * 60)) % 24);
  const dias = Math.floor(milisegundos / (1000 * 60 * 60 * 24));

  const partes = [];
  if (dias > 0) partes.push(dias + 'd');
  if (horas > 0) partes.push(horas + 'h');
  if (min > 0) partes.push(min + 'm');
  partes.push(seg + 's');
  return partes.join(' ');
}

function esFinDeSemana(fecha) {
  const dia = fecha.getDay();
  return dia === 0 || dia === 6;
}

function sumarDiasLaborables(fechaInicio, cantidadDias) {
  const copia = new Date(fechaInicio);
  let agregados = 0;
  while (agregados < cantidadDias) {
    copia.setDate(copia.getDate() + 1);
    if (!esFinDeSemana(copia)) agregados++;
  }
  return copia;
}

module.exports = { version: "${ver}", formatearDuracion, esFinDeSemana, sumarDiasLaborables };`
  }
];

function generateModule(index) {
  const catObj = CATEGORIES[index % CATEGORIES.length];
  const cycle = Math.floor(index / CATEGORIES.length) + 1;
  const suffix = cycle > 1 ? `_v${cycle}` : '';
  const branchSuffix = cycle > 1 ? `-v${cycle}` : '';

  const relativeDir = path.join('src', 'modules', catObj.cat);
  const fileName = `${catObj.slug}${suffix}.js`;
  const fullPath = path.join(relativeDir, fileName);

  const versionString = cycle > 1 ? `v${cycle}.0.0` : '1.0.0';
  const codeContent = catObj.gen(versionString).trim();

  const action = cycle === 1 ? 'implementar' : 'actualizar';
  const commitTitle = `feat(${catObj.cat}): ${action} ${catObj.title}${cycle > 1 ? ` (v${cycle})` : ''}`;
  const branchName = `feat/${catObj.branch}${branchSuffix}`;
  const prBody = `${catObj.desc}\n\nModulo ubicado en \`${catObj.cat}/${fileName}\`.`;

  return {
    relativeDir,
    fileName,
    fullPath,
    branchName,
    codeContent,
    commitTitle,
    prBody,
    category: catObj.cat
  };
}

if (require.main === module) {
  const index = parseInt(process.argv[2] || '0', 10);
  const mod = generateModule(index);
  
  const targetDir = path.join(process.cwd(), mod.relativeDir);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(process.cwd(), mod.fullPath), mod.codeContent + '\n', 'utf8');

  console.log(JSON.stringify(mod));
}

module.exports = { generateModule, CATEGORIES };
