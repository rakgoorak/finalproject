import React, { useState, useEffect } from "react";
import { Switch, Select, Tag, Modal } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import moment from "moment/min/moment-with-locales";

// functions
import {
    listUser,
    changeStatus,
    changeRole,
    removeUser,
    resetPassword
} from "../../functions/user";

const ManageAdmin = () => {
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

    console.log("data", data);
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

    const handleOnchange = (e, id) => {
        const value = {
            id: id,
            enabled: e,
        };
        changeStatus(user.user.token, value)
            .then((res) => {
                console.log(res);
                loadData(user.user.token);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    const handleChangeRole = (e, id) => {
        let values = {
            id: id,
            role: e,
        };
        changeRole(user.user.token, values)
            .then((res) => {
                console.log(res);
                loadData(user.user.token);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };
    const handleRemove = (id) => {
        if (window.confirm("คุณแน่ใจหรือว่าลบบัญชีนี้!!")) {
            removeUser(user.user.token, id)
                .then((res) => {
                    console.log(res);
                    loadData(user.user.token);
                })
                .catch((err) => {
                    console.log(err.response);
                });
        }
    };
    const roleData = ["admin", "user"];
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <h1>ManageAdmin Page</h1>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">ชื่อผู้ใช้</th>
                                <th scope="col">ยศ</th>
                                <th scope="col">สถานะ</th>
                                <th scope="col">สร้างเมื่อ</th>
                                <th scope="col">ปรับปรุงเมื่อ</th>
                                <th scope="col">แก้ไข</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <th scope="row">{item.username}</th>
                                    <td>
                                        <Select
                                            style={{ width: "100%" }}
                                            value={item.role}
                                            onChange={(e) => handleChangeRole(e, item._id)}
                                        >
                                            {roleData.map((role, roleIndex) => (
                                                <Select.Option value={role} key={roleIndex}>
                                                    {role === "admin" ? (
                                                        <Tag color="green">{role}</Tag>
                                                    ) : (
                                                        <Tag color="red">{role}</Tag>
                                                    )}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </td>
                                    <td>
                                        <Switch
                                            checked={item.enabled}
                                            onChange={(e) => handleOnchange(e, item._id)}
                                        />
                                    </td>
                                    <td>{moment(item.createdAt).locale("th").format("ll")}</td>
                                    <td>
                                        {moment(item.updatedAt)
                                            .locale("th")
                                            .startOf(item.updatedAt)
                                            .fromNow()}
                                    </td>
                                    <td>
                                        <EditOutlined onClick={() => showModal(item._id)} />
                                        <DeleteOutlined onClick={() => handleRemove(item._id)} style={{ marginLeft: '15px' }} />
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
                        <p>New Password :</p>
                        <input
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

export default ManageAdmin;
