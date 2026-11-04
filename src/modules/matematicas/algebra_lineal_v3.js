function productoPunto(vecA, vecB) {
  if (vecA.length !== vecB.length) throw new Error("Las dimensiones de los vectores no coinciden");
  let suma = 0;
  for (let i = 0; i < vecA.length; i++) {
    suma += vecA[i] * vecB[i];
  }
  return suma;
}

function magnitudVector(vec) {
  return Math.sqrt(productoPunto(vec, vec));
}

function normalizarVector(vec) {
  const mag = magnitudVector(vec);
  if (mag === 0) return vec.map(() => 0);
  return vec.map((val) => val / mag);
}

function productoCruz3D(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0]
  ];
}

function multiplicarMatrices(matA, matB) {
  const filasA = matA.length;
  const colA = matA[0].length;
  const filasB = matB.length;
  const colB = matB[0].length;
  if (colA !== filasB) throw new Error("Dimensiones de matrices incompatibles");

  const resultado = Array.from({ length: filasA }, () => Array(colB).fill(0));
  for (let i = 0; i < filasA; i++) {
    for (let j = 0; j < colB; j++) {
      let suma = 0;
      for (let k = 0; k < colA; k++) {
        suma += matA[i][k] * matB[k][j];
      }
      resultado[i][j] = suma;
    }
  }
  return resultado;
}

module.exports = {
  version: "v3.0.0",
  productoPunto,
  magnitudVector,
  normalizarVector,
  productoCruz3D,
  multiplicarMatrices
};
