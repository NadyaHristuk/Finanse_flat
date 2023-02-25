const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const balanceRouter = require("./routes/startBalance");
const transactionRouter = require("./routes/transactions");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/currentBalance", balanceRouter);
app.use("/transactions", transactionRouter);
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});
app.use((err, req, res, next) => {
  const { status = 500, message = "Smth wrong" } = err;
  res.status(status).json({ message });
});

module.exports = app;
