import React, { useState, useEffect } from "react";
import { Select, Tag, Modal, Button } from "antd"; // เพิ่ม Button จาก antd
import { DeleteOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import moment from "moment/min/moment-with-locales";

// functions
import {
    listUser,
    changeStatus,
    changeRole,
    removeUser,
    resetPassword,
    editUserTime,
} from "../../functions/user";

const ManageAdmin = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [data, setData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [values, setValues] = useState({
        id: "",
        password: "",
    });
    const [filter, setFilter] = useState("user"); // เพิ่ม state filter เริ่มต้นเป็น "user"

    const handleFilterChange = (value) => {
        setFilter(value); // อัปเดต state filter เมื่อมีการเปลี่ยนแปลง
    };

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
            .then((res) => {
                console.log(res);
                loadData(user.user.token);
            })
            .catch((err) => {
                console.log(err.response);
            });
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

    const handleChangeRole = (e, id) => {
        let values = {
            id: id,
            role: e,
        };
        changeRole(user.user.token, values)
            .then((res) => {
                editUserTime(user.user.token, user.user.user_id);
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
            <div className="btn-group mb-3" role="group" aria-label="Basic outlined example">
                <Button
                    type="primary"
                    className={`btn btn-outline-primary ${filter === 'user' ? 'active' : ''}`}
                    onClick={() => handleFilterChange('user')}
                >
                    จัดการผู้ใช้งานระบบ
                </Button>
                <Button
                    type="primary"
                    className={`btn btn-outline-primary ${filter === 'admin' ? 'active' : ''}`}
                    onClick={() => handleFilterChange('admin')}
                >
                    จัดการผู้ดูแลระบบ
                </Button>
            </div>
            <div className="row">
                <div className="col">
                    <h1>{filter === "user" ? "จัดการผู้ใช้งานระบบ" : "จัดการผู้ดูแลระบบ"}</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ชื่อผู้ใช้</th>
                                <th scope="col">ตำแหน่ง</th>
                                <th scope="col">ปรับปรุงผู้ใช้งาน</th>
                                <th scope="col">ปรับปรุงคำสั่งซื้อ</th>
                                <th scope="col">ปรับปรุงสินค้า</th>
                                <th scope="col">ลบ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => {
                                if (filter === 'user' && item.role === 'user') {
                                    return (
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
                                                {moment(item.editUserTime).locale("th").format("LLL")}
                                            </td>
                                            <td>
                                                {moment(item.editOrderTime).locale("th").format("LLL")}
                                            </td>
                                            <td>
                                                {moment(item.editProductTime).locale("th").format("LLL")}
                                            </td>
                                            <td>
                                                <DeleteOutlined
                                                    onClick={() => handleRemove(item._id)}
                                                />
                                            </td>
                                        </tr>
                                    );
                                } else if (filter === 'admin' && item.role === 'admin') {
                                    return (
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
                                                {moment(item.editUserTime).locale("th").format("LLL")}
                                            </td>
                                            <td>
                                                {moment(item.editOrderTime).locale("th").format("LLL")}
                                            </td>
                                            <td>
                                                {moment(item.editProductTime).locale("th").format("LLL")}
                                            </td>
                                            <td>
                                                <DeleteOutlined
                                                    onClick={() => handleRemove(item._id)}
                                                />
                                            </td>
                                        </tr>
                                    );
                                }
                                return null;
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageAdmin;
