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

module.exports = { version: "v5.0.0", ValidadorEsquema };
