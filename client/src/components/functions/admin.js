import axios from "axios";

// Update Status Order
export const updateStatusOrder = async (authtoken, orderId, orderstatus) => {
    return await axios.put(
        process.env.REACT_APP_API + "/admin/order-status",
        { orderId, orderstatus },
        {
            headers: {
                authtoken,
            },
        }
    );
};

// Get Orders for Admin
export const getOrdersAdmin = async (authtoken) => {
    return await axios.get(process.env.REACT_APP_API + "/admin/orders", {
        headers: {
            authtoken,
        },
    });
};

// Get Edit User
export const getEditUser = async (authtoken) => {
    return await axios.get(process.env.REACT_APP_API + "/edit-user-details", {
        headers: {
            authtoken,
        },
    });
};

// Get Edit Order
export const getEditOrder = async (authtoken) => {
    return await axios.get(process.env.REACT_APP_API + "/edit-order-details", {
        headers: {
            authtoken,
        },
    });
};

// Get Edit Product
export const getEditProduct = async (authtoken) => {
    return await axios.get(process.env.REACT_APP_API + "/edit-product-details", {
        headers: {
            authtoken,
        },
    });
};