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

module.exports = { version: "v4.0.0", formatearDuracion, esFinDeSemana, sumarDiasLaborables };
