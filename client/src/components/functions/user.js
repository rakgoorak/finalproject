import axios from "axios";

export const listUser = async (authtoken) => {
    return await axios.get(process.env.REACT_APP_API + "/users", {
        headers: {
            authtoken,
        },
    });
};
export const readUser = async (authtoken, id) => {
    return await axios.get(process.env.REACT_APP_API + "/users/" + id, {
        headers: {
            authtoken,
        },
    });
};
export const resetPasswordUser = async (authtoken, id, values) => {
    try {
        return await axios.put(
            process.env.REACT_APP_API + "/users/reset-password/" + id,
            values,
            {
                headers: {
                    authtoken,
                },
            }
        );
    } catch (error) {
        console.error("Error resetting password:", error);
        throw error;
    }
};
export const getUserName = async (authtoken) => {
    return await axios.get(process.env.REACT_APP_API + "/user", {
        headers: {
            authtoken,
        },
    });
};
export const getPassWord = async (authtoken) => {
    return await axios.get(process.env.REACT_APP_API + "/user", {
        headers: {
            authtoken,
        },
    });
};
export const changeStatus = async (authtoken, value) => {
    return await axios.post(process.env.REACT_APP_API + "/change-status", value, {
        headers: {
            authtoken,
        },
    });
};

export const changeRole = async (authtoken, value) => {
    return await axios.post(process.env.REACT_APP_API + "/change-role", value, {
        headers: {
            authtoken,
        },
    });
};

export const editUserTime = async (authtoken, id) => {
    try {
        return await axios.post(
            process.env.REACT_APP_API + "/users/edit-user-time/" + id,
            {},
            {
                headers: {
                    authtoken,
                },
            }
        );
    } catch (error) {
        console.error("Error editing user time:", error);
        throw error;
    }
};
export const editOrderTime = async (authtoken, id) => {
    try {
        return await axios.post(
            process.env.REACT_APP_API + "/users/edit-order-time/" + id,
            {},
            {
                headers: {
                    authtoken,
                },
            }
        );
    } catch (error) {
        console.error("Error editing order time:", error);
        throw error;
    }
};
export const editProductTime = async (authtoken, id) => {
    try {
        return await axios.post(
            process.env.REACT_APP_API + "/users/edit-product-time/" + id,
            {},
            {
                headers: {
                    authtoken,
                },
            }
        );
    } catch (error) {
        console.error("Error editing order time:", error);
        throw error;
    }
};

export const removeUser = async (authtoken, id) => {
    return await axios.delete(process.env.REACT_APP_API + "/users/" + id, {
        headers: {
            authtoken,
        },
    });
};
export const resetPassword = async (authtoken, id, values) => {
    return await axios.put(process.env.REACT_APP_API + "/users/" + id, values, {
        headers: {
            authtoken,
        },
    });
};
export const userCart = async (authtoken, cart) => {
    return await axios.post(
        process.env.REACT_APP_API + "/user/cart",
        { cart },
        {
            headers: {
                authtoken,
            },
        }
    );
};

export const getUserCart = async (authtoken) => {
    return await axios.get(process.env.REACT_APP_API + "/user/cart", {
        headers: {
            authtoken,
        },
    });
};

export const emptyCart = async (authtoken) => {
    return await axios.delete(process.env.REACT_APP_API + "/user/cart", {
        headers: {
            authtoken,
        },
    });
};

export const saveAddress = async (authtoken, fulladdress) => {
    return await axios.post(
        process.env.REACT_APP_API + "/user/address",
        { fulladdress },
        {
            headers: {
                authtoken,
            },
        }
    );
};
export const saveEditedFullAddress = async (authtoken, fulladdress) => {
    return await axios.post(
        process.env.REACT_APP_API + "/user/address",
        { fulladdress },
        {
            headers: {
                authtoken,
            },
        }
    );
};
export const getAddress = async (authtoken) => {
    return await axios.get(process.env.REACT_APP_API + "/user/address", {
        headers: {
            authtoken,
        },
    });
};
export const savePhoneNumber = async (authtoken, phoneNumber) => {
    return await axios.post(
        process.env.REACT_APP_API + "/user/phone",
        { phoneNumber },
        {
            headers: {
                authtoken,
            },
        }
    );
};
export const saveEditedPhoneNumber = async (authtoken, updatedData) => {
    return await axios.post(
        process.env.REACT_APP_API + "/user/phone",
        { updatedData },
        {
            headers: {
                authtoken,
            },
        }
    );
};
export const getPhoneNumber = async (authtoken) => {
    return await axios.get(process.env.REACT_APP_API + "/user/phone", {
        headers: {
            authtoken,
        },
    });
};

export const saveName = async (authtoken, name) => {
    return await axios.post(
        process.env.REACT_APP_API + "/user/name",
        { name },
        {
            headers: {
                authtoken,
            },
        }
    );
};
export const saveEditedName = async (authtoken, updatedData) => {
    return await axios.post(
        process.env.REACT_APP_API + "/user/name",
        { updatedData },
        {
            headers: {
                authtoken,
            },
        }
    );
};
export const getName = async (authtoken) => {
    return await axios.get(process.env.REACT_APP_API + "/user/name", {
        headers: {
            authtoken,
        },
    });
};
export const saveZipCode = async (authtoken, zipCode) => {
    return await axios.post(
        process.env.REACT_APP_API + "/user/zipcode",
        { zipCode },
        {
            headers: {
                authtoken,
            },
        }
    );
};
export const getZipCode = async (authtoken, zipCode) => {
    return await axios.get(
        process.env.REACT_APP_API + "/user/zipcode",
        { zipCode },
        {
            headers: {
                authtoken,
            },
        }
    );
};
export const saveSubdistrict = async (authtoken, subdistrict) => {
    return await axios.post(
        process.env.REACT_APP_API + "/user/subdistrict",
        { subdistrict },
        {
            headers: {
                authtoken,
            },
        }
    );
};
export const getSubdistrict = async (authtoken, subdistrict) => {
    return await axios.get(
        process.env.REACT_APP_API + "/user/subdistrict",
        { subdistrict },
        {
            headers: {
                authtoken,
            },
        }
    );
};
export const saveProvince = async (authtoken, province) => {
    return await axios.post(
        process.env.REACT_APP_API + "/user/province",
        { province },
        {
            headers: {
                authtoken,
            },
        }
    );
};
export const getProvince = async (authtoken, province) => {
    return await axios.get(
        process.env.REACT_APP_API + "/user/province",
        { province },
        {
            headers: {
                authtoken,
            },
        }
    );
};

export const saveOrder = async (authtoken, values) => {
    return await axios.post(process.env.REACT_APP_API + "/user/order", values, {
        headers: {
            authtoken,
        },
    });
};

export const getOrders = async (authtoken) => {
    return await axios.get(process.env.REACT_APP_API + "/user/orders", {
        headers: {
            authtoken,
        },
    });
};
export const getWishList = async (authtoken) => {
    return await axios.get(process.env.REACT_APP_API + "/user/wishlist", {
        headers: {
            authtoken,
        },
    });
};
export const addToWishList = async (authtoken, productId) => {
    try {
        return await axios.post(
            process.env.REACT_APP_API + "/user/wishlist",
            { productId },
            {
                headers: {
                    authtoken,
                },
            }
        );
    } catch (error) {
        // Handle error (e.g., log it, show a user-friendly message)
        console.error("Error adding to wishlist:", error);
        throw error; // Rethrow the error for the caller to handle if needed
    }
};

export const removeWishList = async (authtoken, productId) => {
    return await axios.put(
        process.env.REACT_APP_API + "/user/wishlist/" + productId,
        {}, // Empty data object to satisfy the axios.put signature
        {
            headers: {
                authtoken,
            },
        }
    );
};
export const createAddress = async (authtoken, id, values) => {
    try {
        console.log("createaddress", id);
        return await axios.post(
            process.env.REACT_APP_API + "/user/address/" + id,
            values,
            {
                headers: {
                    authtoken,
                },
            }
        );
    } catch (error) {
        console.error("Error creating address:", error);
        throw error;
    }
};
export const listAddress = async (authtoken, id) => {
    try {
        return await axios.get(process.env.REACT_APP_API + "/user/address/" + id, {
            headers: {
                authtoken,
            },
        });
    } catch (error) {
        console.error("Error listing addresses:", error);
        throw error;
    }
};
export const editAddress = async (authtoken, addressId, values) => {
    try {
        return await axios.put(
            process.env.REACT_APP_API + "/user/address/" + addressId,
            values,
            {
                headers: {
                    authtoken,
                },
            }
        );
    } catch (error) {
        console.error("Error editing address:", error);
        throw error;
    }
};
