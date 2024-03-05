import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { editAddress, listAddress, removeAddress } from "../functions/user";
import { Button } from "antd";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CreateAddress from './CreateAddress'
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';

const style = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '500px',
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
};

const initialstate = {
    fulladdress: {
        houseNumber: "",
        subdistrict: "",
        district: "",
        province: "",
        zipcode: "",
    },
    name: "",
    phoneNumber: "",
};

const EditUserAddress = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { user } = useSelector((state) => ({ ...state }));
    const [values, setValues] = useState(initialstate);
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState();
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await listAddress(user.user.token, user.user.user_id);
                console.log("res", res);
                const responseData = res.data;

                if (Array.isArray(responseData)) {
                    setAddresses(responseData);
                } else {
                    console.error("Invalid response format. Expected an array.");
                    setError("มีข้อผิดพลาดเกิดขึ้นเกี่ยวกับที่อยู่");
                }

                setLoading(false);
            } catch (err) {
                console.error("Error fetching addresses:", err);
                setError("มีข้อผิดพลาดเกิดขึ้นเกี่ยวกับที่อยู่");
                setLoading(false);
            }
        };

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
                    setError("มีข้อผิดพลาดเกิดขึ้นเกี่ยวกับที่อยู่");
                }

                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching addresses:", err);
                setError("มีข้อผิดพลาดเกิดขึ้นเกี่ยวกับที่อยู่");
                setLoading(false);
            });
    };

    const handleAddressSelect = (selectedAddress) => {
        setValues(selectedAddress);
        setSelectedAddress(selectedAddress);
    };

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
            fulladdress: {
                ...values.fulladdress,
                [e.target.name]: e.target.value,
            },
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        editAddress(user.user.token, values._id, values)
            .then((res) => {
                console.log("edit", res);
                toast.success("อัปเดตสินค้าเรียบร้อยแล้ว");
                setLoading(false);
                handleCloseEditModal();
            })
            .catch((err) => {
                console.error("Update failed:", err);
                toast.error("ไม่สามารถอัปเดตสินค้าได้");
                setLoading(false);
            });
    };


    const handleRemoveAddress = async (id) => {
        try {
            if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบที่อยู่นี้?")) {
                removeAddress(user.user.token, id)
                    .then((res) => {
                        console.log(res);
                        toast.success("ลบที่อยู่เรียบร้อยแล้ว");
                        loadData();
                    })
                    .catch((err) => {
                        console.log(err);
                        toast.error("เกิดข้อผิดพลาดในการลบที่อยู่");
                    });
            }
        } catch (error) {
            console.error("Error removing address:", error);
            toast.error("เกิดข้อผิดพลาดในการลบที่อยู่");
        }
    };
    console.log("ที่อยู่", values.fulladdress);

    const handleOpen = () => {
        setOpen(true);
        loadData();
    };
    const handleClose = () => {
        setOpen(false);
        loadData();
    };
    const handleOpenEditModal = () => {
        setEditModalOpen(true);
        loadData();
    };
    const handleCloseEditModal = () => {
        setEditModalOpen(false);
        loadData();
    };

    return (
        <div>
            <h7>ที่อยู่ของฉัน</h7>
            <Button style={{ float: "right" }} onClick={handleOpen} loadData={loadData}>+ เพิ่มที่อยู่</Button>
            <Modal
                open={open}
                onClose={handleClose}
                loadData={loadData}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <CreateAddress handleClose={handleClose} loadData={loadData} />
                    </Typography>
                </Box>
            </Modal>
            {error && <p>Error: {error}</p>}
            <div>
                <ul>
                    {addresses.slice(0, 3).map((address) => (
                        <div style={{ marginTop: '20px', marginBottom: '50px' }}>
                            <div style={{ fontSize: '14px' }}>
                                {`${address.name}|${address.phoneNumber}`}
                                <br />
                                {`${address.fulladdress.houseNumber}`}
                                <br />
                                {`${address.fulladdress.subdistrict}, ${address.fulladdress.district}, ${address.fulladdress.province}, ${address.fulladdress.zipcode}`}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-50px' }}>
                                <Button type="primary" ghost
                                    loadData={loadData}
                                    onClick={() => {
                                        handleAddressSelect(address);
                                        handleOpenEditModal();
                                    }}
                                >
                                    แก้ไขที่อยู่
                                </Button>
                                <Button danger style={{ marginLeft: '10px' }} loadData={loadData} onClick={() => handleRemoveAddress(address._id)}>
                                    ลบที่อยู่
                                </Button>
                            </div>
                            <div>
                                <Modal
                                    open={editModalOpen}
                                    onClose={handleCloseEditModal}
                                    loadData={loadData}
                                    aria-labelledby="edit-modal-title"
                                    aria-describedby="edit-modal-description"
                                >
                                    <Box sx={style}>
                                        <Typography id="edit-modal-title" variant="h6" component="h2">
                                            <form onSubmit={handleSubmit}>
                                                <h2>แก้ไขที่อยู่</h2>
                                                <label>
                                                    <FormControl>
                                                        <FormLabel>ชื่อผู้รับสินค้า</FormLabel>
                                                        <input
                                                            style={{ width: '212px', height: '40px', marginBottom: '10px', outlineStyle: 'none', fontSize: '14px' }}
                                                            minLength="64"
                                                            type="text"
                                                            name="name"
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
                                                <label>
                                                    <FormControl>
                                                        <FormLabel>บ้านเลขที่ / อาคาร / ซอย / ถนน</FormLabel>
                                                        <input
                                                            style={{ width: '440px', height: '50px', marginBottom: '10px', resize: 'none', outlineStyle: 'none', fontSize: '14px' }}
                                                            type="text"
                                                            name="houseNumber"
                                                            value={values.fulladdress.houseNumber}
                                                            onChange={handleChange}
                                                            placeholder="บ้านเลขที่ / อาคาร / ซอย / ถนน"
                                                            className="w-full rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                                                        />
                                                    </FormControl>
                                                </label>
                                                <label>
                                                    <FormControl>
                                                        <FormLabel>แขวง / ตำบล</FormLabel>
                                                        <input
                                                            style={{ width: '212px', height: '40px', marginBottom: '10px', outlineStyle: 'none', fontSize: '14px' }}
                                                            type="text"
                                                            name="subdistrict"
                                                            value={values.fulladdress?.subdistrict}
                                                            onChange={handleChange}
                                                            placeholder="แขวง / ตำบล"
                                                            className="w-full rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                                                        />
                                                    </FormControl>
                                                </label>
                                                <label>
                                                    <FormControl>
                                                        <FormLabel>เขต / อำเภอ</FormLabel>
                                                        <input
                                                            style={{ width: '212px', marginLeft: '10px', height: '40px', marginBottom: '10px', outlineStyle: "none", fontSize: '14px' }}
                                                            type="text"
                                                            name="district"
                                                            value={values.fulladdress?.district}
                                                            onChange={handleChange}
                                                            placeholder="เขต / อำเภอ"
                                                            className="w-full rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                                                        />
                                                    </FormControl>
                                                </label>
                                                <label>
                                                    <FormControl>
                                                        <FormLabel>จังหวัด</FormLabel>
                                                        <input
                                                            style={{ width: '212px', height: '40px', marginBottom: '10px', outlineStyle: "none", fontSize: '14px' }}
                                                            type="text"
                                                            name="province"
                                                            value={values.fulladdress?.province}
                                                            onChange={handleChange}
                                                            placeholder="จังหวัด"
                                                            className="w-full rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                                                        />
                                                    </FormControl>
                                                </label>
                                                <label>
                                                    <FormControl>
                                                        <FormLabel>เลขไปรษณีย์</FormLabel>
                                                        <input
                                                            style={{ width: '212px', marginLeft: '10px', height: '40px', marginBottom: '10px', outlineStyle: "none", fontSize: '14px' }}
                                                            type="text"
                                                            name="zipcode"
                                                            value={values.fulladdress?.zipcode}
                                                            onChange={handleChange}
                                                            placeholder="เลขไปรษณีย์"
                                                            className="w-full rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                                                        />
                                                    </FormControl>
                                                </label>
                                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                    <Button loadData={loadData} onClick={handleCloseEditModal} type="primary" ghost danger>
                                                        ยกเลิก
                                                    </Button>
                                                    <Button type="primary" ghost loadData={loadData} onClick={handleSubmit} disabled={loading} style={{ marginLeft: '10px' }}>
                                                        {loading ? "Updating..." : "ตกลง"}
                                                    </Button>
                                                </div>
                                            </form>
                                        </Typography>
                                    </Box>
                                </Modal>
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        </div >
    );
};

export default EditUserAddress;
