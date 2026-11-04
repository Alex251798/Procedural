function chunk(array, size = 1) {
  if (!Array.isArray(array) || size < 1) return [];
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

function groupBy(array, keyGetter) {
  const map = new Map();
  for (const item of array) {
    const key = typeof keyGetter === 'function' ? keyGetter(item) : item[keyGetter];
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  }
  return Object.fromEntries(map);
}

function partition(array, predicate) {
  const truthy = [];
  const falsy = [];
  for (const item of array) {
    if (predicate(item)) {
      truthy.push(item);
    } else {
      falsy.push(item);
    }
  }
  return [truthy, falsy];
}

module.exports = { version: "mod_mw2ce9bj_oinp", chunk, groupBy, partition };
