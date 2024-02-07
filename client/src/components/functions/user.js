import axios from "axios";

export const listUser = async (authtoken) => {
    return await axios.get(process.env.REACT_APP_API + "/users", {
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

export const getUser = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API}/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};


export const userCart = async (authtoken, cart) => {
    return await axios.post(process.env.REACT_APP_API + "/user/cart", { cart }, {
        headers: {
            authtoken,
        },
    });
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

export const saveAddress = async (authtoken, address) => {
    return await axios.post(process.env.REACT_APP_API + "/user/address", { address }, {
        headers: {
            authtoken,
        },
    });
};

export const saveOrder = async (authtoken) => {
    return await axios.post(process.env.REACT_APP_API + "/user/order", {}, {
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
        return await axios.post(process.env.REACT_APP_API + "/user/wishlist", { productId }, {
            headers: {
                authtoken,
            },
        });
    } catch (error) {
        // Handle error (e.g., log it, show a user-friendly message)
        console.error('Error adding to wishlist:', error);
        throw error; // Rethrow the error for the caller to handle if needed
    }
};

export const removeWishList = async (authtoken, productId) => {
    return await axios.put(
        process.env.REACT_APP_API + "/user/wishlist/" + productId,
        {},  // Empty data object to satisfy the axios.put signature
        {
            headers: {
                authtoken,
            },
        }
    );
};
