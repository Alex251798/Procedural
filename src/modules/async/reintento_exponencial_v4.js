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

module.exports = { version: "v4.0.0", pausar, reintentarConRetroceso };
