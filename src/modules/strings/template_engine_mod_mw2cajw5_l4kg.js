function interpolate(template, context) {
  return template.replace(/\{\{\s*([a-zA-Z0-9_.]+)\s*\}\}/g, (match, key) => {
    const keys = key.split('.');
    let value = context;
    for (const k of keys) {
      if (value === null || value === undefined) return '';
      value = value[k];
    }
    return value !== undefined && value !== null ? String(value) : '';
  });
}

function extractVariables(template) {
  const matches = [...template.matchAll(/\{\{\s*([a-zA-Z0-9_.]+)\s*\}\}/g)];
  return [...new Set(matches.map((m) => m[1]))];
}

module.exports = { version: "mod_mw2cajw5_l4kg", interpolate, extractVariables };
