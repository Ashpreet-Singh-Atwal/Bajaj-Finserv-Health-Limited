exports.validateSingleKey = (body) => {
  const keys = Object.keys(body);

  if (keys.length !== 1) {
    const err = new Error("Request must contain exactly one key");
    err.code = 400;
    throw err;
  }

  const allowed = ["fibonacci", "prime", "lcm", "hcf", "AI"];

  if (!allowed.includes(keys[0])) {
    const err = new Error("Invalid key");
    err.code = 422;
    throw err;
  }

  return keys[0];
};
