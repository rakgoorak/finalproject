const express = require("express");
const router = express.Router();
const {
    read,
    list,
    create,
    update,
    remove,
    listBy,
    searchFilters
} = require("../controllers/Product");

const { auth, adminCheck } = require('../Middleware/auth')
const { upload } = require('../Middleware/upload')

router.post("/product", auth, adminCheck, create);
router.get("/product/:count", list);
router.delete("/product/:id", auth, adminCheck, remove);
router.get("/products/:id", read);
router.put("/product/:id", auth, adminCheck, update);
router.post("/productby", listBy);
router.post("/search/filters", searchFilters);

module.exports = router;