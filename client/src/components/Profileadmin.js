import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Button } from "antd";
import { resetPassword, getAddress, getName, getPhoneNumber } from "./functions/user";

const Profileadmin = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [data, setData] = useState([]);
    const [name, setName] = useState({});
    const [address, setAddress] = useState({});
    const [phoneNumber, setPhoneNumber] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [values, setValues] = useState({
        id: "",
        password: "",
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
                loadData();
            }).catch(err => {
                console.log(err.response)
            })
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    console.log("data", data);
    useEffect(() => {
        loadData(user.user.token);
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
                // Handle errors, e.g., set an error state or display an error message
            });
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <h1>โปรไฟล์ผู้ใช้</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ชื่อผู้ใช้</th>
                                <th scope="col">ที่อยู่</th>
                                <th scope="col">ตำบล</th>
                                <th scope="col">อำเภอ</th>
                                <th scope="col">จังหวัด</th>
                                <th scope="col">รหัสไปรษณีย์</th>
                                <th scope="col">เบอร์โทรศัพท์</th>
                                <th scope="col">เปลี่ยนรหัสผ่าน</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{name.name}</td>
                                <td>{address && typeof address.fulladdress === 'object' ? address.fulladdress.houseNumber : address.fulladdress}</td>
                                <td>{address && typeof address.fulladdress === 'object' ? address.fulladdress.subdistrict : ''}</td>
                                <td>{address && typeof address.fulladdress === 'object' ? address.fulladdress.district : ''}</td>
                                <td>{address && typeof address.fulladdress === 'object' ? address.fulladdress.province : ''}</td>
                                <td>{address && typeof address.fulladdress === 'object' ? address.fulladdress.zipcode : ''}</td>
                                <td>{phoneNumber && typeof phoneNumber.phoneNumber === 'object' ? phoneNumber.phoneNumber.someProperty : phoneNumber.phoneNumber}</td>
                                <td>
                                    <Button onClick={() => showModal(user.user._id)}>เปลี่ยนรหัสผ่าน</Button>
                                </td>
                            </tr>
                            {data.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>{item.address}</td>
                                    <td>{item.subdistrict}</td>
                                    <td>{item.district}</td>
                                    <td>{item.province}</td>
                                    <td>{item.zipcode}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>
                                        <Button onClick={() => showModal(item._id)}>เปลี่ยนรหัสผ่าน</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Modal
                        title="เปลี่ยนรหัสผ่าน"
                        visible={isModalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        <input className="password"
                            onChange={handleChangePassword}
                            placeholder="รหัสผ่านใหม่"
                            type="text"
                            name="password"
                        />
                    </Modal>
                </div>
            </div>
        </div >
    );
};

export default Profileadmin;
