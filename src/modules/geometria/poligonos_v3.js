function calcularAreaPoligono(vertices) {
  const n = vertices.length;
  if (n < 3) return 0;
  let area = 0;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    area += vertices[i].x * vertices[j].y;
    area -= vertices[j].x * vertices[i].y;
  }
  return Math.abs(area) / 2;
}

function distanciaEuclidiana(p1, p2) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.hypot(dx, dy);
}

function orientacionPuntos(p, q, r) {
  const valor = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
  if (valor === 0) return 0;
  return valor > 0 ? 1 : 2;
}

module.exports = {
  version: "v3.0.0",
  calcularAreaPoligono,
  distanciaEuclidiana,
  orientacionPuntos
};
