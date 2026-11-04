function mean(arr) {
  if (!arr.length) return 0;
  return arr.reduce((acc, val) => acc + val, 0) / arr.length;
}

function median(arr) {
  if (!arr.length) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function variance(arr) {
  if (arr.length <= 1) return 0;
  const m = mean(arr);
  return arr.reduce((acc, val) => acc + Math.pow(val - m, 2), 0) / (arr.length - 1);
}

function standardDeviation(arr) {
  return Math.sqrt(variance(arr));
}

function pearsonCorrelation(arrX, arrY) {
  if (arrX.length !== arrY.length || arrX.length === 0) return 0;
  const meanX = mean(arrX);
  const meanY = mean(arrY);
  let num = 0;
  let denX = 0;
  let denY = 0;

  for (let i = 0; i < arrX.length; i++) {
    const diffX = arrX[i] - meanX;
    const diffY = arrY[i] - meanY;
    num += diffX * diffY;
    denX += diffX * diffX;
    denY += diffY * diffY;
  }

  const denominator = Math.sqrt(denX * denY);
  return denominator === 0 ? 0 : num / denominator;
}

module.exports = { version: "mod_mw2citq7_dy35", mean, median, variance, standardDeviation, pearsonCorrelation };
