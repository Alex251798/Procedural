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

module.exports = { version: "mod_mw2c3kbg_qsyo", PriorityQueue };
