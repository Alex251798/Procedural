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

module.exports = { version: "mod_mw2cf0jx_0bio", EventEmitter };
