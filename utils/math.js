exports.fibonacci = (n) => {
  if (!Number.isInteger(n) || n < 0) {
    const err = new Error("Fibonacci input must be a non-negative integer");
    err.code = 400;
    throw err;
  }

  if (n > 10000) {
    const err = new Error("Fibonacci input too large");
    err.code = 413;
    throw err;
  }

  const result = [];
  let a = 0, b = 1;

  for (let i = 0; i < n; i++) {
    result.push(a);
    [a, b] = [b, a + b];
  }

  return result;
};

exports.primeFilter = (arr) => {
  if (!Array.isArray(arr)) {
    const err = new Error("Prime input must be an array of integers");
    err.code = 400;
    throw err;
  }

  for (const val of arr) {
    if (!Number.isInteger(val)) {
      const err = new Error("Prime input must be an array of integers");
      err.code = 400;
      throw err;
    }
  }

  const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  return arr.filter(isPrime);
};

const gcd = (a, b) => {
  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    const err = new Error("LCM/HCF input must be integers");
    err.code = 400;
    throw err;
  }
  return b === 0 ? Math.abs(a) : gcd(b, a % b);
};

exports.lcmArray = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    const err = new Error("LCM input must be a non-empty array of integers");
    err.code = 400;
    throw err;
  }

  for (const val of arr) {
    if (!Number.isInteger(val)) {
      const err = new Error("LCM input must be a non-empty array of integers");
      err.code = 400;
      throw err;
    }
  }

  return arr.reduce((a, b) => Math.abs(a * b) / gcd(a, b));
};

exports.hcfArray = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    const err = new Error("HCF input must be a non-empty array of integers");
    err.code = 400;
    throw err;
  }

  for (const val of arr) {
    if (!Number.isInteger(val)) {
      const err = new Error("HCF input must be a non-empty array of integers");
      err.code = 400;
      throw err;
    }
  }

  return arr.reduce((a, b) => gcd(a, b));
};
