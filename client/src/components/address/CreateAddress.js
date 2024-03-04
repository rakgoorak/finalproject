import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createAddress } from "../functions/user";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { toast } from "react-toastify";
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';

const style = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
};

const CreateAddress = ({ handleClose }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const navigate = useNavigate();
    const [values, setValues] = useState({
        fulladdress: {
            houseNumber: "",
            subdistrict: "",
            district: "",
            province: "",
            zipcode: "",
        },
        name: "",
        phoneNumber: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleNestedChange = (e) => {
        const { name, value } = e.target;

        setValues((prevValues) => ({
            ...prevValues,
            fulladdress: {
                ...prevValues.fulladdress,
                [name]: value,
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createAddress(user.user.token, user.user.user_id, values);
            console.log("Address created successfully");
            toast.success("เพิ่มที่อยู่สำเร็จ");

            navigate("/user/profileuser");

            handleClose();
        } catch (error) {
            console.error("Error creating address:", error);
            // Handle error, e.g., show an error message to the user
        }
    };

    return (
        <div>
            <h2>ที่อยู่ใหม่</h2>
            <form onSubmit={handleSubmit} style={style}>
                <div className="name-and-phone-number flex max-w-md space-x-0.5">
                    <label>
                        <FormControl>
                            <FormLabel>ชื่อผู้รับสินค้า</FormLabel>
                            <input
                                style={{ width: '212px', height: '40px', marginBottom: '10px', outlineStyle: 'none', fontSize: '14px' }}
                                type="text"
                                name="name"
                                minLength="64"
                                value={values.name}
                                onChange={handleChange}
                                placeholder="ชื่อผู้รับสินค้า"
                                className="w-full rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                            />
                        </FormControl>
                    </label>
                    <label>
                        <FormControl>
                            <FormLabel>เบอร์โทร</FormLabel>
                            <input
                                style={{ width: '212px', marginLeft: '10px', height: '40px', marginBottom: '10px', outlineStyle: 'none', fontSize: '14px' }}
                                minLength="10"
                                type="text"
                                name="phoneNumber"
                                value={values.phoneNumber}
                                onChange={handleChange}
                                placeholder="เบอร์โทร"
                                className="w-full rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                            />
                        </FormControl>
                    </label>
                    <div className="w-full flex justify-center ">
                        <label>
                            <FormControl>
                                <FormLabel>บ้านเลขที่ / อาคาร / ซอย / ถนน</FormLabel>
                                <textarea
                                    style={{ width: '435px', height: '50px', marginBottom: '10px', resize: 'none', outlineStyle: 'none', fontSize: '14px' }}
                                    value={values.fulladdress.houseNumber}
                                    type="text"
                                    name="houseNumber"
                                    onChange={handleNestedChange}
                                    className="w-full rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                                    placeholder="บ้านเลขที่ / อาคาร / ซอย / ถนน"
                                />
                            </FormControl>
                        </label>
                    </div>
                    <div className="flex justify-center focus:outline-none">
                        <label>
                            <FormControl>
                                <FormLabel>แขวง / ตำบล</FormLabel>
                                <input
                                    className="w-full rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                                    style={{ width: '212px', height: '40px', marginBottom: '10px', outlineStyle: 'none', fontSize: '14px' }}
                                    placeholder="แขวง / ตำบล"
                                    type="text"
                                    name="subdistrict"
                                    value={values.fulladdress.subdistrict}
                                    onChange={handleNestedChange}
                                />
                            </FormControl>
                        </label>
                        <label>
                            <FormControl>
                                <FormLabel>เขต / อำเภอ</FormLabel>
                                <input
                                    className="w-full rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                                    style={{ width: '212px', marginLeft: '10px', height: '40px', marginBottom: '10px', outlineStyle: "none", fontSize: '14px' }}
                                    placeholder="เขต / อำเภอ"
                                    type="text"
                                    name="district"
                                    value={values.fulladdress.district}
                                    onChange={handleNestedChange}
                                />
                            </FormControl>
                        </label>
                    </div>
                    <div className="flex justify-center">
                        <label>
                            <FormControl>
                                <FormLabel>จังหวัด</FormLabel>
                                <input
                                    className="w-full rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                                    style={{ width: '212px', height: '40px', marginBottom: '10px', outlineStyle: "none", fontSize: '14px' }}
                                    placeholder="จังหวัด"
                                    type="text"
                                    name="province"
                                    value={values.fulladdress.province}
                                    onChange={handleNestedChange}
                                />
                            </FormControl>
                        </label>
                        <label>
                            <FormControl>
                                <FormLabel>เลขไปรษณีย์</FormLabel>
                                <input
                                    className="w-full rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                                    style={{ width: '212px', marginLeft: '10px', height: '40px', marginBottom: '10px', outlineStyle: "none", fontSize: '14px' }}
                                    placeholder="เลขไปรษณีย์"
                                    type="text"
                                    name="zipcode"
                                    value={values.fulladdress.zipcode}
                                    onChange={handleNestedChange}
                                />
                            </FormControl>
                        </label>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type="primary" ghost danger onClick={handleClose}>
                        ยกเลิก
                    </Button>
                    <Button type="primary" ghost onClick={handleSubmit} style={{ marginLeft: '10px' }}>
                        ตกลง
                    </Button>
                </div>
            </form>
        </div >
    );
};

export default CreateAddress;