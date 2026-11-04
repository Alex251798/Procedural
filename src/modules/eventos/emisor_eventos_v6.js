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

module.exports = { version: "v6.0.0", EmisorEventos };
