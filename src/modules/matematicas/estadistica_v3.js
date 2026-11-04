function calcularMedia(arr) {
  if (!arr.length) return 0;
  return arr.reduce((acc, val) => acc + val, 0) / arr.length;
}

function calcularMediana(arr) {
  if (!arr.length) return 0;
  const ordenado = [...arr].sort((a, b) => a - b);
  const mitad = Math.floor(ordenado.length / 2);
  return ordenado.length % 2 !== 0 ? ordenado[mitad] : (ordenado[mitad - 1] + ordenado[mitad]) / 2;
}

function calcularVarianza(arr) {
  if (arr.length <= 1) return 0;
  const m = calcularMedia(arr);
  return arr.reduce((acc, val) => acc + Math.pow(val - m, 2), 0) / (arr.length - 1);
}

function desviacionEstandar(arr) {
  return Math.sqrt(calcularVarianza(arr));
}

function correlacionPearson(arrX, arrY) {
  if (arrX.length !== arrY.length || arrX.length === 0) return 0;
  const mediaX = calcularMedia(arrX);
  const mediaY = calcularMedia(arrY);
  let numerador = 0;
  let denX = 0;
  let denY = 0;

  for (let i = 0; i < arrX.length; i++) {
    const diffX = arrX[i] - mediaX;
    const diffY = arrY[i] - mediaY;
    numerador += diffX * diffY;
    denX += diffX * diffX;
    denY += diffY * diffY;
  }

  const denominador = Math.sqrt(denX * denY);
  return denominador === 0 ? 0 : numerador / denominador;
}

module.exports = {
  version: "v3.0.0",
  calcularMedia,
  calcularMediana,
  calcularVarianza,
  desviacionEstandar,
  correlacionPearson
};
