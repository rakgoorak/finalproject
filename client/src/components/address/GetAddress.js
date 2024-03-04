import React, { useState, useEffect } from "react";
import { listAddress } from "../functions/user";
import { useSelector } from "react-redux";

const AddressList = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadData();
    }, [user.user.token, user.user.user_id]);

    const loadData = () => {
        listAddress(user.user.token, user.user.user_id)
            .then((res) => {
                console.log("res", res);
                const responseData = res.data;

                if (Array.isArray(responseData)) {
                    setAddresses(responseData);
                } else {
                    console.error("Invalid response format. Expected an array.");
                    setError("Error fetching addresses. Please try again.");
                }

                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching addresses:", err);
                setError("Error fetching addresses. Please try again.");
                setLoading(false);
            });
    };

    if (loading) {
        return <p>Loading addresses...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2>User Addresses</h2>
            <ul>
                {addresses.map((address) => (
                    <li key={address._id}>
                        {/* Display address details as needed */}
                        <p>Name: {address.name}</p>
                        <p>phoneNumber: {address.phoneNumber}</p>
                        <p>House Number: {address.fulladdress.houseNumber}</p>
                        <p>Subdistrict: {address.fulladdress.subdistrict}</p>
                        <p>District: {address.fulladdress.district}</p>
                        <p>Province: {address.fulladdress.province}</p>
                        <p>Zipcode: {address.fulladdress.zipcode}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AddressList;