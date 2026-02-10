const express = require("express");
const router = express.Router();

const {
  fibonacci,
  primeFilter,
  lcmArray,
  hcfArray
} = require("../utils/math");

const { askAI } = require("../utils/ai");
const { validateSingleKey } = require("../utils/validator");

router.post("/", async (req, res) => {
  try {
    const key = validateSingleKey(req.body);
    let data;

    switch (key) {
      case "fibonacci":
        data = fibonacci(req.body[key]);
        break;

      case "prime":
        data = primeFilter(req.body[key]);
        break;

      case "lcm":
        data = lcmArray(req.body[key]);
        break;

      case "hcf":
        data = hcfArray(req.body[key]);
        break;

      case "AI":
        data = await askAI(req.body[key]);
        break;
    }

    res.status(200).json({
      is_success: true,
      official_email: process.env.OFFICIAL_EMAIL,
      data
    });

  } catch (err) {
    res.status(err.code || 400).json({
      is_success: false,
      message: err.message
    });
  }
});

module.exports = router;
