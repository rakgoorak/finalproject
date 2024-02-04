const express = require("express");
const router = express.Router();

const {
    listUsers,
    readUsers,
    updateUsers,
    removeUsers,
    changeStatus,
    changeRole,
    removeUser,
    userCart,
    getUserCart,
    saveAddress,
    saveOrder,
    emptyCart,
    addToWishList,
    getWishList,
    removeWishList,
    getOrder,
    savePhone,
    saveCounty,
    savePost,
    getAddress,
    getPhone,
    getCounty,
    getPost,
    getName } = require("../controllers/user");
const { auth, adminCheck } = require("../Middleware/auth");


// http://localhost:5000/api/user
//@Endpoint  http://localhost:5000/api/users
//@Method    GET
//@Access    Private
router.get("/users", auth, adminCheck, listUsers);

//@Endpoint  http://localhost:5000/api/users/:id
//@Method    GET
//@Access    Private
router.get("/users/:id", readUsers);

//@Endpoint  http://localhost:5000/api/users/:id
//@Method    PUT
//@Access    Private
router.put("/users/:id", auth, adminCheck, updateUsers);

//@Endpoint  http://localhost:5000/api/users/:id
//@Method    DELETE
//@Access    Private
router.delete("/users/:id", removeUsers);

//@Endpoint  http://localhost:5000/api/change-status
//@Method    POST
//@Access    Private
router.post("/change-status", auth, adminCheck, changeStatus);

//@Endpoint  http://localhost:5000/api/change-role
//@Method    POST
//@Access    Private
router.post("/change-role", auth, adminCheck, changeRole);
router.post("/user/cart", auth, userCart);
router.get("/user/cart", auth, getUserCart);
router.delete("/user/cart", auth, emptyCart);
router.post("/user/address", auth, saveAddress);
router.get("/user/address", auth, getAddress);
router.post("/user/phone", auth, savePhone);
router.get("/user/phone", auth, getPhone);
router.post("/user/county", auth, saveCounty);
router.get("/user/county", auth, getCounty);
router.post("/user/post", auth, savePost);
router.get("/user/post", auth, getPost);
router.post("/user/name", auth, saveName);
router.get("/user/name", auth, getName);
router.post("/user/order", auth, saveOrder);
router.get("/user/orders", auth, getOrder);
router.post("/user/wishlist", auth, addToWishList);
router.get("/user/wishlist", auth, getWishList);
router.put("/user/wishlist/:productId", auth, removeWishList);



module.exports = router;