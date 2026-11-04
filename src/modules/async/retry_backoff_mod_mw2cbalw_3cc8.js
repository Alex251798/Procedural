function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function retryWithBackoff(fn, options = {}) {
  const {
    maxRetries = 3,
    initialDelay = 100,
    maxDelay = 2000,
    factor = 2,
    jitter = true
  } = options;

  let attempt = 0;
  let delay = initialDelay;

  while (true) {
    try {
      attempt++;
      return await fn(attempt);
    } catch (err) {
      if (attempt >= maxRetries) throw err;
      const actualDelay = jitter ? delay * (0.8 + Math.random() * 0.4) : delay;
      await sleep(Math.min(actualDelay, maxDelay));
      delay = Math.min(delay * factor, maxDelay);
    }
  }
}

module.exports = { version: "mod_mw2cbalw_3cc8", sleep, retryWithBackoff };
