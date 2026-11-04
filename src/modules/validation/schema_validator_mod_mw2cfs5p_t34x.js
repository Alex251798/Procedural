class SchemaValidator {
  constructor(rules) {
    this.rules = rules;
  }

  validate(data) {
    const errors = {};
    for (const [field, rule] of Object.entries(this.rules)) {
      const val = data[field];
      if (rule.required && (val === undefined || val === null || val === '')) {
        errors[field] = 'Field is required';
        continue;
      }
      if (val !== undefined && rule.type && typeof val !== rule.type) {
        errors[field] = "Expected " + rule.type + ", received " + typeof val;
        continue;
      }
      if (rule.min !== undefined && val < rule.min) {
        errors[field] = "Minimum value is " + rule.min;
      }
    }
    return { isValid: Object.keys(errors).length === 0, errors };
  }
}

module.exports = { version: "mod_mw2cfs5p_t34x", SchemaValidator };
