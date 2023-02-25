const router = require("express").Router();
const transactionCtrl = require("../controllers/transaction");

router.post("/:id", transactionCtrl.createTransaction);
// router.get("/:id", transactionCtrl.getBalance);
// router.patch("/:id", transactionCtrl.patchBalance);

module.exports = router;
