import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Button } from "antd";
import { resetPassword, listUser } from "./functions/user";
import moment from "moment/min/moment-with-locales";

const Profileadmin = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [data, setData] = useState([]);
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
                loadData(user.user.token);
            }).catch(err => {
                console.log(err.response)
            })
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        loadData(user.user.token);
    }, []);

    const loadData = (authtoken) => {
        listUser(authtoken)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    };

    if (!user || !user.user || user.user.role !== 'admin') {
        return null; // ถ้าไม่ใช่ admin ให้ return null เพื่อไม่แสดงข้อมูล
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <h1>โปรไฟล์ผู้ใช้</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ชื่อผู้ใช้</th>
                                <th scope="col">สร้างเมื่อ</th>
                                <th scope="col">เปลี่ยนรหัสผ่าน</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <th scope="row">{item.username}</th>
                                    <td>{moment(item.createdAt).locale("th").format("ll")}</td>
                                    <td><Button onClick={() => showModal(item._id)}>เปลี่ยนรหัสผ่าน</Button></td>
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
        </div>
    );
};

export default Profileadmin;
