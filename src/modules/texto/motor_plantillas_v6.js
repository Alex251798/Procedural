function interpolarPlantilla(plantilla, contexto) {
  return plantilla.replace(/\{\{\s*([a-zA-Z0-9_.]+)\s*\}\}/g, (match, clave) => {
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
  const coincidencias = [...plantilla.matchAll(/\{\{\s*([a-zA-Z0-9_.]+)\s*\}\}/g)];
  return [...new Set(coincidencias.map((m) => m[1]))];
}

module.exports = { version: "v6.0.0", interpolarPlantilla, extraerVariablesPlantilla };
