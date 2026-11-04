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

module.exports = { version: "v4.0.0", PiscinaConcurrencia };
