const Transaction = require("../models/transaction");
const startBalance = require("../models/startBalance");

const byYear = async (req, res) => {};

const byMonth = async (req, res) => {
  const { _id } = req.user;
  const { month, year } = req.query;
  const balance = await startBalance.findOne({ owner: _id });
  const totalByMounth = await Transaction.aggregate([
    {
      $match: {
        owner: _id,
        year,
        month,
      },
    },
    {
      $group: {
        _id: null,
        totalSum: {
          $sum: "$sum",
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalSum: 1,
      },
    },
  ]);

  const accumulated = balance.bothSalary - totalByMounth[0].totalSum;
  const plan = balance.bothSalary * (balance.percentagePerMounth / 100);
  const planPro = Math.floor((accumulated / plan) * 100);

  res.json({
    income: balance.bothSalary,
    expenses: totalByMounth[0].totalSum,
    accumulated,
    plan,
    planPro,
  });
};

const byFlat = async (req, res) => {
  const { _id, balance } = req.user;
  const userBalance = await startBalance.findOne({ owner: _id });

  const accumulatedUAH = userBalance.savings + balance;
  const accumulated = (accumulatedUAH / userBalance.cost) * 100;
  const squareM = Math.floor(
    accumulatedUAH / (userBalance.cost / userBalance.footage)
  );

  res.json({
    month: userBalance.month,
    year: userBalance.year,
    accumulated,
    accumulatedUAH,
    squareM,
  });
};

const bySqm = async (req, res) => {};

module.exports = {
  byYear,
  byMonth,
  byFlat,
  bySqm,
};
