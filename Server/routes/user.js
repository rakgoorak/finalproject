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
    saveFullAddress,
    saveOrder,
    emptyCart,
    addToWishList,
    getWishList,
    removeWishList,
    getOrder,
    getFullAddress,
    getName,
    saveName,
    savePhoneNumber,
    getPhoneNumber,
    saveProvince,
    getProvince,
    saveZipCode,
    getZipCode,
    saveSubdistrict,
    saveEditedFullAddress,
    getSubdistrict,
    saveEditedName,
    saveEditedPhoneNumber,
    getUserName,
    getPassWord,
    resetPasswordUser } = require("../controllers/user");
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
//@Endpoint  http://localhost:5000/api/users/reset-password/:id
//@Method    PUT
//@Access    Private
router.put("/users/reset-password/:id", auth, resetPasswordUser);
//@Endpoint  http://localhost:5000/api/users/:id
//@Method    DELETE
//@Access    Private
router.delete("/users/:id", auth, removeUsers);
router.get("/user", auth, getUserName);
router.get("/user", auth, getPassWord);

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
router.post("/user/address", auth, saveFullAddress);
router.post("/user/address", auth, saveEditedFullAddress);
router.get("/user/address", auth, getFullAddress);
router.post("/user/phone", auth, savePhoneNumber);
router.post("/user/phone", auth, saveEditedPhoneNumber);
router.get("/user/phone", auth, getPhoneNumber);
router.post("/user/province", auth, saveProvince);
router.get("/user/province", auth, getProvince);
router.post("/user/zipcode", auth, saveZipCode);
router.get("/user/zipcode", auth, getZipCode);
router.post("/user/name", auth, saveName);
router.post("/user/name", auth, saveEditedName);
router.get("/user/name", auth, getName);
router.post("/user/subdistrict", auth, saveSubdistrict);
router.get("/user/subdistrict", auth, getSubdistrict);
router.post("/user/order", auth, saveOrder);
router.get("/user/orders", auth, getOrder);
router.post("/user/wishlist", auth, addToWishList);
router.get("/user/wishlist", auth, getWishList);
router.put("/user/wishlist/:productId", auth, removeWishList);



module.exports = router;