function dotProduct(vecA, vecB) {
  if (vecA.length !== vecB.length) throw new Error("Vector dimension mismatch");
  let sum = 0;
  for (let i = 0; i < vecA.length; i++) {
    sum += vecA[i] * vecB[i];
  }
  return sum;
}

function magnitude(vec) {
  return Math.sqrt(dotProduct(vec, vec));
}

function normalize(vec) {
  const mag = magnitude(vec);
  if (mag === 0) return vec.map(() => 0);
  return vec.map((val) => val / mag);
}

function crossProduct3D(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0]
  ];
}

function matrixMultiply(matA, matB) {
  const rowsA = matA.length;
  const colsA = matA[0].length;
  const rowsB = matB.length;
  const colsB = matB[0].length;
  if (colsA !== rowsB) throw new Error("Incompatible matrix dimensions");

  const result = Array.from({ length: rowsA }, () => Array(colsB).fill(0));
  for (let i = 0; i < rowsA; i++) {
    for (let j = 0; j < colsB; j++) {
      let sum = 0;
      for (let k = 0; k < colsA; k++) {
        sum += matA[i][k] * matB[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}

module.exports = {
  version: "mod_mw2chcgv_a8ws",
  dotProduct,
  magnitude,
  normalize,
  crossProduct3D,
  matrixMultiply
};
