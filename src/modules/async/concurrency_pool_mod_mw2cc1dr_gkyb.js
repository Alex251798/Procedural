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

module.exports = { version: "mod_mw2cc1dr_gkyb", PromisePool };
