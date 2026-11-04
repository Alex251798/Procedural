const fs = require('fs');
const path = require('path');

const CATEGORIES = [
  {
    cat: 'math',
    type: 'linear_algebra',
    title: 'linear algebra vector and matrix transformations',
    gen: (id) => `
function dotProduct(vecA, vecB) {
  if (vecA.length !== vecB.length) throw new Error("Vector dimension mismatch");
  let sum = 0;
  for (let i = 0; i < vecA.length; i++) {
    sum += vecA[i] * vecB[i];
  }
  return sum;
}

function magnitude(vec) {
  return Math.sqrt(dotProduct(vec, vec));
}

function normalize(vec) {
  const mag = magnitude(vec);
  if (mag === 0) return vec.map(() => 0);
  return vec.map((val) => val / mag);
}

function crossProduct3D(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0]
  ];
}

function matrixMultiply(matA, matB) {
  const rowsA = matA.length;
  const colsA = matA[0].length;
  const rowsB = matB.length;
  const colsB = matB[0].length;
  if (colsA !== rowsB) throw new Error("Incompatible matrix dimensions");

  const result = Array.from({ length: rowsA }, () => Array(colsB).fill(0));
  for (let i = 0; i < rowsA; i++) {
    for (let j = 0; j < colsB; j++) {
      let sum = 0;
      for (let k = 0; k < colsA; k++) {
        sum += matA[i][k] * matB[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}

module.exports = {
  version: "${id}",
  dotProduct,
  magnitude,
  normalize,
  crossProduct3D,
  matrixMultiply
};`
  },
  {
    cat: 'math',
    type: 'number_theory',
    title: 'number theory prime sieve and modular arithmetic',
    gen: (id) => `
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
  version: "${id}",
  sieveOfEratosthenes,
  gcd,
  lcm,
  modPow
};`
  },
  {
    cat: 'math',
    type: 'statistics_engine',
    title: 'statistical metrics variance and correlation analyzer',
    gen: (id) => `
function mean(arr) {
  if (!arr.length) return 0;
  return arr.reduce((acc, val) => acc + val, 0) / arr.length;
}

function median(arr) {
  if (!arr.length) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function variance(arr) {
  if (arr.length <= 1) return 0;
  const m = mean(arr);
  return arr.reduce((acc, val) => acc + Math.pow(val - m, 2), 0) / (arr.length - 1);
}

function standardDeviation(arr) {
  return Math.sqrt(variance(arr));
}

function pearsonCorrelation(arrX, arrY) {
  if (arrX.length !== arrY.length || arrX.length === 0) return 0;
  const meanX = mean(arrX);
  const meanY = mean(arrY);
  let num = 0;
  let denX = 0;
  let denY = 0;

  for (let i = 0; i < arrX.length; i++) {
    const diffX = arrX[i] - meanX;
    const diffY = arrY[i] - meanY;
    num += diffX * diffY;
    denX += diffX * diffX;
    denY += diffY * diffY;
  }

  const denominator = Math.sqrt(denX * denY);
  return denominator === 0 ? 0 : num / denominator;
}

module.exports = { version: "${id}", mean, median, variance, standardDeviation, pearsonCorrelation };`
  },
  {
    cat: 'math',
    type: 'geometry_poly',
    title: 'computational geometry shoelace and hull calculations',
    gen: (id) => `
function polygonArea(vertices) {
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

function distance2D(p1, p2) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.hypot(dx, dy);
}

function orientation(p, q, r) {
  const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
  if (val === 0) return 0;
  return val > 0 ? 1 : 2;
}

module.exports = { version: "${id}", polygonArea, distance2D, orientation };`
  },
  {
    cat: 'math',
    type: 'combinatorics',
    title: 'combinatorics permutations and combinations calculator',
    gen: (id) => `
function factorialBig(n) {
  let res = 1n;
  for (let i = 2n; i <= BigInt(n); i++) res *= i;
  return res;
}

function combinations(n, k) {
  if (k < 0 || k > n) return 0n;
  if (k === 0 || k === n) return 1n;
  const actualK = k > n - k ? n - k : k;
  let num = 1n;
  let den = 1n;
  for (let i = 1n; i <= BigInt(actualK); i++) {
    num *= BigInt(n) - i + 1n;
    den *= i;
  }
  return num / den;
}

function permutations(n, k) {
  if (k < 0 || k > n) return 0n;
  let res = 1n;
  for (let i = 0n; i < BigInt(k); i++) {
    res *= BigInt(n) - i;
  }
  return res;
}

module.exports = { version: "${id}", factorialBig, combinations, permutations };`
  },
  {
    cat: 'structures',
    type: 'lru_cache',
    title: 'least recently used LRU memory cache store',
    gen: (id) => `
class LRUCacheNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity = 100) {
    this.capacity = capacity;
    this.map = new Map();
    this.head = new LRUCacheNode(null, null);
    this.tail = new LRUCacheNode(null, null);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  _remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  _add(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }

  get(key) {
    if (!this.map.has(key)) return null;
    const node = this.map.get(key);
    this._remove(node);
    this._add(node);
    return node.value;
  }

  put(key, value) {
    if (this.map.has(key)) {
      this._remove(this.map.get(key));
    }
    const node = new LRUCacheNode(key, value);
    this._add(node);
    this.map.set(key, node);

    if (this.map.size > this.capacity) {
      const lru = this.tail.prev;
      this._remove(lru);
      this.map.delete(lru.key);
    }
  }

  size() {
    return this.map.size;
  }
}

module.exports = { version: "${id}", LRUCache };`
  },
  {
    cat: 'structures',
    type: 'binary_search_tree',
    title: 'balanced binary search tree structure',
    gen: (id) => `
class BSTNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
    this.count = 0;
  }

  insert(value) {
    const newNode = new BSTNode(value);
    this.count++;
    if (!this.root) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    while (true) {
      if (value === current.value) return;
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  contains(value) {
    let current = this.root;
    while (current) {
      if (value === current.value) return true;
      current = value < current.value ? current.left : current.right;
    }
    return false;
  }

  inOrderTraversal(callback) {
    function traverse(node) {
      if (!node) return;
      traverse(node.left);
      callback(node.value);
      traverse(node.right);
    }
    traverse(this.root);
  }
}

module.exports = { version: "${id}", BinarySearchTree };`
  },
  {
    cat: 'structures',
    type: 'priority_heap',
    title: 'binary heap priority queue implementation',
    gen: (id) => `
class PriorityQueue {
  constructor(comparator = (a, b) => a - b) {
    this.heap = [];
    this.comparator = comparator;
  }

  enqueue(val) {
    this.heap.push(val);
    this._bubbleUp(this.heap.length - 1);
  }

  dequeue() {
    if (!this.heap.length) return null;
    const top = this.heap[0];
    const bottom = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = bottom;
      this._bubbleDown(0);
    }
    return top;
  }

  peek() {
    return this.heap[0] || null;
  }

  size() {
    return this.heap.length;
  }

  _bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.comparator(this.heap[index], this.heap[parentIndex]) < 0) {
        [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  _bubbleDown(index) {
    const length = this.heap.length;
    while (true) {
      let target = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;

      if (left < length && this.comparator(this.heap[left], this.heap[target]) < 0) {
        target = left;
      }
      if (right < length && this.comparator(this.heap[right], this.heap[target]) < 0) {
        target = right;
      }
      if (target !== index) {
        [this.heap[index], this.heap[target]] = [this.heap[target], this.heap[index]];
        index = target;
      } else {
        break;
      }
    }
  }
}

module.exports = { version: "${id}", PriorityQueue };`
  },
  {
    cat: 'structures',
    type: 'prefix_trie',
    title: 'prefix tree string search and autocomplete dictionary',
    gen: (id) => `
class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let current = this.root;
    for (const char of word) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }
      current = current.children.get(char);
    }
    current.isEndOfWord = true;
  }

  search(word) {
    let current = this.root;
    for (const char of word) {
      if (!current.children.has(char)) return false;
      current = current.children.get(char);
    }
    return current.isEndOfWord;
  }

  startsWith(prefix) {
    let current = this.root;
    for (const char of prefix) {
      if (!current.children.has(char)) return false;
      current = current.children.get(char);
    }
    return true;
  }
}

module.exports = { version: "${id}", Trie };`
  },
  {
    cat: 'structures',
    type: 'disjoint_set_union',
    title: 'disjoint set union find with path compression and rank',
    gen: (id) => `
class DisjointSet {
  constructor(size) {
    this.parent = Array.from({ length: size }, (_, i) => i);
    this.rank = new Array(size).fill(0);
  }

  find(i) {
    if (this.parent[i] === i) return i;
    this.parent[i] = this.find(this.parent[i]);
    return this.parent[i];
  }

  union(i, j) {
    const rootI = this.find(i);
    const rootJ = this.find(j);
    if (rootI === rootJ) return false;

    if (this.rank[rootI] < this.rank[rootJ]) {
      this.parent[rootI] = rootJ;
    } else if (this.rank[rootI] > this.rank[rootJ]) {
      this.parent[rootJ] = rootI;
    } else {
      this.parent[rootJ] = rootI;
      this.rank[rootI]++;
    }
    return true;
  }

  connected(i, j) {
    return this.find(i) === this.find(j);
  }
}

module.exports = { version: "${id}", DisjointSet };`
  },
  {
    cat: 'algorithms',
    type: 'quicksort_engine',
    title: 'in-place dual-pivot quicksort algorithm',
    gen: (id) => `
function partition(arr, low, high, comparator) {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (comparator(arr[j], pivot) <= 0) {
      i++;
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }

  const swapTemp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = swapTemp;
  return i + 1;
}

function quickSortHelper(arr, low, high, comparator) {
  if (low < high) {
    const pi = partition(arr, low, high, comparator);
    quickSortHelper(arr, low, pi - 1, comparator);
    quickSortHelper(arr, pi + 1, high, comparator);
  }
}

function quickSort(inputArray, comparator = (a, b) => a - b) {
  const arr = [...inputArray];
  quickSortHelper(arr, 0, arr.length - 1, comparator);
  return arr;
}

module.exports = { version: "${id}", quickSort };`
  },
  {
    cat: 'algorithms',
    type: 'dijkstra_graph',
    title: 'shortest path weighted graph traversal with dijkstra',
    gen: (id) => `
class WeightedGraph {
  constructor() {
    this.adjacencyList = new Map();
  }

  addVertex(vertex) {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }

  addEdge(node1, node2, weight) {
    this.addVertex(node1);
    this.addVertex(node2);
    this.adjacencyList.get(node1).push({ node: node2, weight });
    this.adjacencyList.get(node2).push({ node: node1, weight });
  }

  shortestPath(start, finish) {
    const distances = {};
    const previous = {};
    const visited = new Set();
    const nodes = new Set();

    for (const vertex of this.adjacencyList.keys()) {
      distances[vertex] = vertex === start ? 0 : Infinity;
      previous[vertex] = null;
      nodes.add(vertex);
    }

    while (nodes.size > 0) {
      let smallest = null;
      for (const node of nodes) {
        if (smallest === null || distances[node] < distances[smallest]) {
          smallest = node;
        }
      }

      if (smallest === null || distances[smallest] === Infinity) break;
      if (smallest === finish) {
        const path = [];
        let curr = finish;
        while (curr) {
          path.push(curr);
          curr = previous[curr];
        }
        return { distance: distances[finish], path: path.reverse() };
      }

      nodes.delete(smallest);
      visited.add(smallest);

      for (const neighbor of this.adjacencyList.get(smallest)) {
        if (visited.has(neighbor.node)) continue;
        const alt = distances[smallest] + neighbor.weight;
        if (alt < distances[neighbor.node]) {
          distances[neighbor.node] = alt;
          previous[neighbor.node] = smallest;
        }
      }
    }

    return { distance: Infinity, path: [] };
  }
}

module.exports = { version: "${id}", WeightedGraph };`
  },
  {
    cat: 'algorithms',
    type: 'knapsack_dp',
    title: 'dynamic programming 0-1 knapsack solver',
    gen: (id) => `
function knapsack(values, weights, capacity) {
  const n = values.length;
  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    const val = values[i - 1];
    const wt = weights[i - 1];
    for (let w = 1; w <= capacity; w++) {
      if (wt <= w) {
        dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - wt] + val);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  return dp[n][capacity];
}

module.exports = { version: "${id}", knapsack };`
  },
  {
    cat: 'algorithms',
    type: 'search_binary_jump',
    title: 'binary and jump search comparison routines',
    gen: (id) => `
function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}

function jumpSearch(arr, target) {
  const n = arr.length;
  let step = Math.floor(Math.sqrt(n));
  let prev = 0;

  while (arr[Math.min(step, n) - 1] < target) {
    prev = step;
    step += Math.floor(Math.sqrt(n));
    if (prev >= n) return -1;
  }

  while (arr[prev] < target) {
    prev++;
    if (prev === Math.min(step, n)) return -1;
  }

  return arr[prev] === target ? prev : -1;
}

module.exports = { version: "${id}", binarySearch, jumpSearch };`
  },
  {
    cat: 'strings',
    type: 'levenshtein_distance',
    title: 'fuzzy string matching and edit distance metric',
    gen: (id) => `
function levenshteinDistance(strA, strB) {
  const m = strA.length;
  const n = strB.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (strA[i - 1] === strB[j - 1]) {
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

function stringSimilarity(strA, strB) {
  const maxLen = Math.max(strA.length, strB.length);
  if (maxLen === 0) return 1.0;
  const distance = levenshteinDistance(strA, strB);
  return (maxLen - distance) / maxLen;
}

module.exports = { version: "${id}", levenshteinDistance, stringSimilarity };`
  },
  {
    cat: 'strings',
    type: 'slug_case_converter',
    title: 'slugification and case formatting transformations',
    gen: (id) => `
function toSlug(str) {
  return str
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\\u0300-\\u036f]/g, '')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\\s+/g, '-')
    .replace(/-+/g, '-');
}

function toCamelCase(str) {
  return str.replace(/([-_][a-z])/gi, ($1) =>
    $1.toUpperCase().replace('-', '').replace('_', '')
  );
}

function toSnakeCase(str) {
  return str
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase()
    .replace(/^_/, '');
}

module.exports = { version: "${id}", toSlug, toCamelCase, toSnakeCase };`
  },
  {
    cat: 'strings',
    type: 'template_engine',
    title: 'mustache style template string interpolation engine',
    gen: (id) => `
function interpolate(template, context) {
  return template.replace(/\\{\\{\\s*([a-zA-Z0-9_.]+)\\s*\\}\\}/g, (match, key) => {
    const keys = key.split('.');
    let value = context;
    for (const k of keys) {
      if (value === null || value === undefined) return '';
      value = value[k];
    }
    return value !== undefined && value !== null ? String(value) : '';
  });
}

function extractVariables(template) {
  const matches = [...template.matchAll(/\\{\\{\\s*([a-zA-Z0-9_.]+)\\s*\\}\\}/g)];
  return [...new Set(matches.map((m) => m[1]))];
}

module.exports = { version: "${id}", interpolate, extractVariables };`
  },
  {
    cat: 'async',
    type: 'retry_backoff',
    title: 'exponential backoff and jitter retry supervisor',
    gen: (id) => `
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function retryWithBackoff(fn, options = {}) {
  const {
    maxRetries = 3,
    initialDelay = 100,
    maxDelay = 2000,
    factor = 2,
    jitter = true
  } = options;

  let attempt = 0;
  let delay = initialDelay;

  while (true) {
    try {
      attempt++;
      return await fn(attempt);
    } catch (err) {
      if (attempt >= maxRetries) throw err;
      const actualDelay = jitter ? delay * (0.8 + Math.random() * 0.4) : delay;
      await sleep(Math.min(actualDelay, maxDelay));
      delay = Math.min(delay * factor, maxDelay);
    }
  }
}

module.exports = { version: "${id}", sleep, retryWithBackoff };`
  },
  {
    cat: 'async',
    type: 'concurrency_pool',
    title: 'asynchronous task pool and concurrency rate limiter',
    gen: (id) => `
class PromisePool {
  constructor(concurrency = 4) {
    this.concurrency = concurrency;
    this.active = 0;
    this.queue = [];
  }

  async run(task) {
    if (this.active >= this.concurrency) {
      await new Promise((resolve) => this.queue.push(resolve));
    }
    this.active++;
    try {
      return await task();
    } finally {
      this.active--;
      if (this.queue.length > 0) {
        const next = this.queue.shift();
        next();
      }
    }
  }
}

module.exports = { version: "${id}", PromisePool };`
  },
  {
    cat: 'crypto',
    type: 'fnv1a_hash',
    title: 'fnv1a and adler32 high speed checksum algorithms',
    gen: (id) => `
function fnv1a32(str) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return hash >>> 0;
}

function adler32(str) {
  const MOD_ADLER = 65521;
  let a = 1;
  let b = 0;
  for (let i = 0; i < str.length; i++) {
    a = (a + str.charCodeAt(i)) % MOD_ADLER;
    b = (b + a) % MOD_ADLER;
  }
  return ((b << 16) | a) >>> 0;
}

module.exports = { version: "${id}", fnv1a32, adler32 };`
  },
  {
    cat: 'crypto',
    type: 'pseudo_random',
    title: 'deterministic mulberry32 and xorshift PRNG suite',
    gen: (id) => `
function mulberry32(seed) {
  let a = seed >>> 0;
  return function() {
    a |= 0;
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function xorshift32(seed) {
  let x = seed || 1;
  return function() {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return (x >>> 0) / 4294967296;
  };
}

module.exports = { version: "${id}", mulberry32, xorshift32 };`
  },
  {
    cat: 'collections',
    type: 'functional_chunker',
    title: 'array partitioning grouping and chunking utilities',
    gen: (id) => `
function chunk(array, size = 1) {
  if (!Array.isArray(array) || size < 1) return [];
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

function groupBy(array, keyGetter) {
  const map = new Map();
  for (const item of array) {
    const key = typeof keyGetter === 'function' ? keyGetter(item) : item[keyGetter];
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  }
  return Object.fromEntries(map);
}

function partition(array, predicate) {
  const truthy = [];
  const falsy = [];
  for (const item of array) {
    if (predicate(item)) {
      truthy.push(item);
    } else {
      falsy.push(item);
    }
  }
  return [truthy, falsy];
}

module.exports = { version: "${id}", chunk, groupBy, partition };`
  },
  {
    cat: 'events',
    type: 'pub_sub_emitter',
    title: 'event emitter with listener lifecycle management',
    gen: (id) => `
class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(eventName, listener) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    this.events.get(eventName).push(listener);
    return () => this.off(eventName, listener);
  }

  off(eventName, listener) {
    const listeners = this.events.get(eventName);
    if (!listeners) return;
    this.events.set(eventName, listeners.filter((fn) => fn !== listener));
  }

  emit(eventName, ...args) {
    const listeners = this.events.get(eventName);
    if (!listeners) return;
    for (const fn of listeners) {
      fn(...args);
    }
  }

  once(eventName, listener) {
    const unsubscribe = this.on(eventName, (...args) => {
      unsubscribe();
      listener(...args);
    });
  }
}

module.exports = { version: "${id}", EventEmitter };`
  },
  {
    cat: 'validation',
    type: 'schema_validator',
    title: 'declarative object schema and rule validator',
    gen: (id) => `
class SchemaValidator {
  constructor(rules) {
    this.rules = rules;
  }

  validate(data) {
    const errors = {};
    for (const [field, rule] of Object.entries(this.rules)) {
      const val = data[field];
      if (rule.required && (val === undefined || val === null || val === '')) {
        errors[field] = 'Field is required';
        continue;
      }
      if (val !== undefined && rule.type && typeof val !== rule.type) {
        errors[field] = "Expected " + rule.type + ", received " + typeof val;
        continue;
      }
      if (rule.min !== undefined && val < rule.min) {
        errors[field] = "Minimum value is " + rule.min;
      }
    }
    return { isValid: Object.keys(errors).length === 0, errors };
  }
}

module.exports = { version: "${id}", SchemaValidator };`
  },
  {
    cat: 'datetime',
    type: 'duration_diff',
    title: 'time duration formatting and business day calculations',
    gen: (id) => `
function formatDurationMs(ms) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));

  const parts = [];
  if (days > 0) parts.push(days + 'd');
  if (hours > 0) parts.push(hours + 'h');
  if (minutes > 0) parts.push(minutes + 'm');
  parts.push(seconds + 's');
  return parts.join(' ');
}

function isWeekend(date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}

function addBusinessDays(startDate, daysToAdd) {
  const result = new Date(startDate);
  let added = 0;
  while (added < daysToAdd) {
    result.setDate(result.getDate() + 1);
    if (!isWeekend(result)) added++;
  }
  return result;
}

module.exports = { version: "${id}", formatDurationMs, isWeekend, addBusinessDays };`
  }
];

function generateModule(index) {
  const catObj = CATEGORIES[index % CATEGORIES.length];
  const uniqueId = 'mod_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 6);
  const relativeDir = path.join('src', 'modules', catObj.cat);
  const fileName = catObj.type + '_' + uniqueId + '.js';
  const fullPath = path.join(relativeDir, fileName);

  const codeContent = catObj.gen(uniqueId).trim();
  const commitTitle = 'feat(' + catObj.cat + '): implement ' + catObj.title + ' [' + uniqueId + ']';
  const prBody = 'Adds procedural implementation for **' + catObj.title + '** under `' + catObj.cat + '/' + catObj.type + '`.';

  return {
    relativeDir,
    fileName,
    fullPath,
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
