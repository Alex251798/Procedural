function busquedaBinaria(arr, objetivo) {
  let inicio = 0;
  let fin = arr.length - 1;
  while (inicio <= fin) {
    const medio = Math.floor((inicio + fin) / 2);
    if (arr[medio] === objetivo) return medio;
    if (arr[medio] < objetivo) inicio = medio + 1;
    else fin = medio - 1;
  }
  return -1;
}

function busquedaPorSaltos(arr, objetivo) {
  const n = arr.length;
  let paso = Math.floor(Math.sqrt(n));
  let previo = 0;

  while (arr[Math.min(paso, n) - 1] < objetivo) {
    previo = paso;
    paso += Math.floor(Math.sqrt(n));
    if (previo >= n) return -1;
  }

  while (arr[previo] < objetivo) {
    previo++;
    if (previo === Math.min(paso, n)) return -1;
  }

  return arr[previo] === objetivo ? previo : -1;
}

module.exports = { version: "v5.0.0", busquedaBinaria, busquedaPorSaltos };
