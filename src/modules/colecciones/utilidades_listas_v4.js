function dividirEnLotes(arreglo, tamanioLote = 1) {
  if (!Array.isArray(arreglo) || tamanioLote < 1) return [];
  const salida = [];
  for (let i = 0; i < arreglo.length; i += tamanioLote) {
    salida.push(arreglo.slice(i, i + tamanioLote));
  }
  return salida;
}

function agruparPor(arreglo, selectorClave) {
  const mapa = new Map();
  for (const elemento of arreglo) {
    const clave = typeof selectorClave === 'function' ? selectorClave(elemento) : elemento[selectorClave];
    const grupo = mapa.get(clave);
    if (!grupo) {
      mapa.set(clave, [elemento]);
    } else {
      grupo.push(elemento);
    }
  }
  return Object.fromEntries(mapa);
}

function particionar(arreglo, predicado) {
  const verdaderos = [];
  const falsos = [];
  for (const item of arreglo) {
    if (predicado(item)) {
      verdaderos.push(item);
    } else {
      falsos.push(item);
    }
  }
  return [verdaderos, falsos];
}

module.exports = { version: "v4.0.0", dividirEnLotes, agruparPor, particionar };
