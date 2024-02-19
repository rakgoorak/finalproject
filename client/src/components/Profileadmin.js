import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Button, Input } from "antd";
import {
    getAddress,
    getName,
    getPhoneNumber,
    getUserName,
    getPassWord,
    saveEditedFullAddress,
    saveEditedName,
    saveEditedPhoneNumber,
    savePhoneNumber,
    saveName,
    resetPasswordUser,
} from "./functions/user";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profileadmin = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [name, setName] = useState({});
    const [username, setUserName] = useState({});
    const [password, setPassWord] = useState({});
    const [address, setAddress] = useState({});
    const [phoneNumber, setPhoneNumber] = useState({});
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
    const [editedData, setEditedData] = useState({
        name: "",
        houseNumber: "",
        subdistrict: "",
        district: "",
        province: "",
        zipcode: "",
        phoneNumber: "",
    });
    const [values, setValues] = useState({
        id: "",
        password: "",
    });
    const [newPassword, setNewPassword] = useState("");

    useEffect(() => {
        loadData(user.user.token);
    }, []);

    const loadData = () => {
        Promise.all([
            getAddress(user.user.token),
            getPhoneNumber(user.user.token),
            getName(user.user.token),
            getUserName(user.user.token),
            getPassWord(user.user.token),
        ])
            .then(([addressRes, phoneNumberRes, nameRes, usernameRes, passwordRes]) => {
                setName(nameRes.data && typeof nameRes.data === "object" ? nameRes.data : { name: nameRes.data });
                setAddress(addressRes.data);
                setPhoneNumber(phoneNumberRes.data && typeof phoneNumberRes.data === "object" ? phoneNumberRes.data : { phoneNumber: phoneNumberRes.data });
                setUserName(usernameRes.data);
                setValues(usernameRes.data);
                setPassWord(passwordRes.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    const showEditModal = () => {
        setEditedData({
            name: name.name,
            houseNumber: address.fulladdress.houseNumber,
            subdistrict: address.fulladdress.subdistrict,
            district: address.fulladdress.district,
            province: address.fulladdress.province,
            zipcode: address.fulladdress.zipcode,
            phoneNumber: phoneNumber.phoneNumber,
        });
        setIsEditModalVisible(true);
    };

    const handleChange = (e) => {
        setEditedData({ ...editedData, [e.target.name]: e.target.value });
    };

    const handleEditOk = () => {
        setIsEditModalVisible(false);

        const updatedData = {
            name: editedData.name,
            houseNumber: editedData.houseNumber,
            subdistrict: editedData.subdistrict,
            district: editedData.district,
            province: editedData.province,
            zipcode: editedData.zipcode,
            phoneNumber: editedData.phoneNumber,
        };

        Promise.all([
            saveEditedFullAddress(user.user.token, updatedData),
            savePhoneNumber(user.user.token, updatedData.phoneNumber),
            saveName(user.user.token, updatedData.name),
        ])
            .then((res) => {
                console.log(res);
                loadData(user.user.token);
                toast.success("ข้อมูลที่อยู่ได้รับการแก้ไขเรียบร้อยแล้ว!"); // เพิ่มการแสดง Toast สำเร็จ
            })
            .catch((err) => {
                console.log(err.response);
                toast.error("มีข้อผิดพลาดเกิดขึ้นในขณะที่แก้ไขข้อมูลที่อยู่"); // เพิ่มการแสดง Toast ผิดพลาด
            });
    };

    const handleEditCancel = () => {
        setIsEditModalVisible(false);
    };

    const showPasswordModal = () => {
        setIsPasswordModalVisible(true);
    };

    const handlePasswordOk = () => {
        setIsPasswordModalVisible(false);

        resetPasswordUser(user.user.token, values._id, { password: newPassword })
            .then((res) => {
                console.log(res);
                loadData(user.user.token);
                toast.success("รหัสผ่านได้รับการเปลี่ยนแปลงเรียบร้อยแล้ว!"); // เพิ่มการแสดง Toast สำเร็จ
            })
            .catch((err) => {
                console.log(err.response);
                toast.error("มีข้อผิดพลาดเกิดขึ้นในขณะที่เปลี่ยนรหัสผ่าน"); // เพิ่มการแสดง Toast ผิดพลาด
            });
    };

    const handlePasswordCancel = () => {
        setIsPasswordModalVisible(false);
    };

    return (
        <div className="container-fluid">
            <div className="row justify-content-center mt-5">
                <div className="col-lg-6 col-md-8 col-sm-10">
                    <div>
                        <div className="card text-center profile-card">
                            <div className="card-body">
                                <h1 className="card-title">โปรไฟล์ผู้ใช้</h1>
                                <p>UserName: {username.username}</p>
                                <div className="d-flex flex-column align-items-start">
                                    <Button onClick={showPasswordModal}>เปลี่ยนรหัสผ่าน</Button>
                                </div>
                            </div>
                        </div>
                        <div className="card address-card mt-3">
                            <div className="card-body">
                                <p>ชื่อผู้ใช้: {name.name}</p>
                                <p>ที่อยู่: {address && typeof address.fulladdress === "object" ? address.fulladdress.houseNumber : address.fulladdress}</p>
                                <p>ตำบล: {address && typeof address.fulladdress === "object" ? address.fulladdress.subdistrict : ""}</p>
                                <p>อำเภอ: {address && typeof address.fulladdress === "object" ? address.fulladdress.district : ""}</p>
                                <p>จังหวัด: {address && typeof address.fulladdress === "object" ? address.fulladdress.province : ""}</p>
                                <p>รหัสไปรษณีย์: {address && typeof address.fulladdress === "object" ? address.fulladdress.zipcode : ""}</p>
                                <p>เบอร์โทรศัพท์: {phoneNumber && typeof phoneNumber.phoneNumber === "object" ? phoneNumber.phoneNumber.someProperty : phoneNumber.phoneNumber}</p>
                                <Button onClick={showEditModal}>แก้ไขข้อมูล</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                title="เปลี่ยนรหัสผ่าน"
                visible={isPasswordModalVisible}
                onOk={handlePasswordOk}
                onCancel={handlePasswordCancel}
            >
                <Input
                    type="password"
                    placeholder="รหัสผ่านใหม่"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
                    value={editedData.houseNumber}
                    placeholder="ที่อยู่"
                    type="text"
                    name="houseNumber"
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
        </div>
    );
};

export default Profileadmin;