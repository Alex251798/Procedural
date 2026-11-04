function toSlug(str) {
  return str
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function toCamelCase(str) {
  return str.replace(/([-_][a-z])/gi, ($1) =>
    $1.toUpperCase().replace('-', '').replace('_', '')
  );
}

function toSnakeCase(str) {
  return str
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase()
    .replace(/^_/, '');
}

module.exports = { version: "mod_mw2c9r9y_bzcd", toSlug, toCamelCase, toSnakeCase };
