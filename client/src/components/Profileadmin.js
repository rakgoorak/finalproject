import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Button } from "antd";
import { resetPassword, getAddress, getName, getPhoneNumber, updatename, updatehouseNumber, updatesubdistrict, updatedistrict, updateprovince, updatezipcode, updatephoneNumber } from "./functions/user";

const Profileuser = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [name, setName] = useState({});
    const [address, setAddress] = useState({});
    const [phoneNumber, setPhoneNumber] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);

    const [values, setValues] = useState({
        id: "",
        password: "",
    });

    const [editedData, setEditedData] = useState({
        name: "",
        address: "",
        subdistrict: "",
        district: "",
        province: "",
        zipcode: "",
        phoneNumber: "",
    });

    const showModal = (id) => {
        setIsModalVisible(true);
        setValues({ ...values, id: id });
    };

    const handleChangePassword = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleOk = () => {
        setIsModalVisible(false);
        resetPassword(user.user.token, values.id, { values })
            .then(res => {
                console.log(res)
                loadData(); // โหลดข้อมูลใหม่หลังจากเปลี่ยนรหัสผ่าน
            }).catch(err => {
                console.log(err.response)
            })
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        Promise.all([
            getAddress(user.user.token),
            getPhoneNumber(user.user.token),
            getName(user.user.token)
        ])
            .then(([addressRes, phoneNumberRes, nameRes]) => {
                setName(nameRes.data && typeof nameRes.data === 'object' ? nameRes.data : { name: nameRes.data });
                setAddress(addressRes.data);
                setPhoneNumber(phoneNumberRes.data && typeof phoneNumberRes.data === 'object' ? phoneNumberRes.data : { phoneNumber: phoneNumberRes.data });
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    const handleEditOk = () => {
        updatename(user.user.token, editedData)
        updatehouseNumber(user.user.token, editedData)
        updatesubdistrict(user.user.token, editedData)
        updatedistrict(user.user.token, editedData)
        updateprovince(user.user.token, editedData)
        updatezipcode(user.user.token, editedData)
        updatephoneNumber(user.user.token, editedData)
            .then((res) => {
                console.log(res);
                setIsEditModalVisible(false);
                loadData();
            })
            .catch((err) => {
                console.error(err);
            });
    };
    console.log(editedData);

    const handleEditCancel = () => {
        setIsEditModalVisible(false);
    };

    const handleChange = (e) => {
        setEditedData({ ...editedData, [e.target.name]: e.target.value });
    };

    const showEditModal = () => {
        setEditedData({
            name: name.name,
            address: address.fulladdress.houseNumber,
            subdistrict: address.fulladdress.subdistrict,
            district: address.fulladdress.district,
            province: address.fulladdress.province,
            zipcode: address.fulladdress.zipcode,
            phoneNumber: phoneNumber.phoneNumber,
        });
        setIsEditModalVisible(true);
    };

    return (
        <div className="container-fluid">
            <div className="row justify-content-center mt-5">
                <div className="col-lg-6 col-md-8 col-sm-10">
                    <div>
                        <div className="card text-center profile-card">
                            <div className="card-body">
                                <h1 className="card-title">โปรไฟล์ผู้ใช้</h1>
                                <div className="d-flex flex-column align-items-start">
                                    <Button onClick={showModal}>เปลี่ยนรหัสผ่าน</Button>
                                </div>
                            </div>
                        </div>
                        <div className="card address-card mt-3">
                            <div className="card-body">
                                <p>ชื่อผู้ใช้: {name.name}</p>
                                <p>ที่อยู่: {address && typeof address.fulladdress === 'object' ? address.fulladdress.houseNumber : address.fulladdress}</p>
                                <p>ตำบล: {address && typeof address.fulladdress === 'object' ? address.fulladdress.subdistrict : ''}</p>
                                <p>อำเภอ: {address && typeof address.fulladdress === 'object' ? address.fulladdress.district : ''}</p>
                                <p>จังหวัด: {address && typeof address.fulladdress === 'object' ? address.fulladdress.province : ''}</p>
                                <p>รหัสไปรษณีย์: {address && typeof address.fulladdress === 'object' ? address.fulladdress.zipcode : ''}</p>
                                <p>เบอร์โทรศัพท์: {phoneNumber && typeof phoneNumber.phoneNumber === 'object' ? phoneNumber.phoneNumber.someProperty : phoneNumber.phoneNumber}</p>
                                <Button onClick={showEditModal}>แก้ไขข้อมูล</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                title="เปลี่ยนรหัสผ่าน"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <input
                    className="password"
                    onChange={handleChangePassword}
                    placeholder="รหัสผ่านใหม่"
                    type="text"
                    name="password"
                />
            </Modal>
            <Modal
                title="แก้ไขข้อมูล"
                visible={isEditModalVisible}
                onOk={handleEditOk}
                onCancel={handleEditCancel}
            >
                <input
                    className="edit-input"
                    onChange={handleChange}
                    value={editedData.name}
                    placeholder="ชื่อผู้ใช้"
                    type="text"
                    name="name"
                />
                <input
                    className="edit-input"
                    onChange={handleChange}
                    value={editedData.address}
                    placeholder="ที่อยู่"
                    type="text"
                    name="address"
                />
                <input
                    className="edit-input"
                    onChange={handleChange}
                    value={editedData.subdistrict}
                    placeholder="ตำบล"
                    type="text"
                    name="subdistrict"
                />
                <input
                    className="edit-input"
                    onChange={handleChange}
                    value={editedData.district}
                    placeholder="อำเภอ"
                    type="text"
                    name="district"
                />
                <input
                    className="edit-input"
                    onChange={handleChange}
                    value={editedData.province}
                    placeholder="จังหวัด"
                    type="text"
                    name="province"
                />
                <input
                    className="edit-input"
                    onChange={handleChange}
                    value={editedData.zipcode}
                    placeholder="รหัสไปรษณีย์"
                    type="text"
                    name="zipcode"
                />
                <input
                    className="edit-input"
                    onChange={handleChange}
                    value={editedData.phoneNumber}
                    placeholder="เบอร์โทรศัพท์"
                    type="text"
                    name="phoneNumber"
                />
            </Modal>
        </div >
    );
};

export default Profileuser;
