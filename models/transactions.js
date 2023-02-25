const { Schema, model } = require("mongoose");

const transactionSchema = Schema({
  cardBalance: Number,
  cardName: String,
  category: String,
  description: String,
  sum: Number,
  date: { type: Date, default: Date.now },
});

const Transaction = model("transaction", transactionSchema);

module.exports = Transaction;
