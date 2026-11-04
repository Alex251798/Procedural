function particionar(arr, bajo, alto, comparador) {
  const pivote = arr[alto];
  let i = bajo - 1;

  for (let j = bajo; j < alto; j++) {
    if (comparador(arr[j], pivote) <= 0) {
      i++;
      const temporal = arr[i];
      arr[i] = arr[j];
      arr[j] = temporal;
    }
  }

  const intercambio = arr[i + 1];
  arr[i + 1] = arr[alto];
  arr[alto] = intercambio;
  return i + 1;
}

function auxiliarQuickSort(arr, bajo, alto, comparador) {
  if (bajo < alto) {
    const indiceParticion = particionar(arr, bajo, alto, comparador);
    auxiliarQuickSort(arr, bajo, indiceParticion - 1, comparador);
    auxiliarQuickSort(arr, indiceParticion + 1, alto, comparador);
  }
}

function ordenarQuickSort(arreglo, comparador = (a, b) => a - b) {
  const copia = [...arreglo];
  auxiliarQuickSort(copia, 0, copia.length - 1, comparador);
  return copia;
}

module.exports = { version: "v2.0.0", ordenarQuickSort };
