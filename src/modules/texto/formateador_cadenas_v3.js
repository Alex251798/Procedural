function generarSlug(cadena) {
  return cadena
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function convertirACamelCase(cadena) {
  return cadena.replace(/([-_][a-z])/gi, ($1) =>
    $1.toUpperCase().replace('-', '').replace('_', '')
  );
}

function convertirASnakeCase(cadena) {
  return cadena
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase()
    .replace(/^_/, '');
}

module.exports = { version: "v3.0.0", generarSlug, convertirACamelCase, convertirASnakeCase };
