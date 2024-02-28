const express = require("express");
const router = express.Router();

const { changeOrderStatus, getOrderAdmin } = require('../controllers/admin')
const { auth, adminCheck } = require("../Middleware/auth");

router.put("/admin/order-status", auth, changeOrderStatus);
router.get("/admin/orders", auth, getOrderAdmin);

module.exports = router;
