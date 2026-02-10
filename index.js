require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const bfhlRoute = require("./routes/bfhl");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: process.env.OFFICIAL_EMAIL
  });
});

app.use("/bfhl", bfhlRoute);

app.use((err, req, res, next) => {
  res.status(500).json({
    is_success: false,
    message: "Internal Server Error"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
