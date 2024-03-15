import React, { useState, useEffect } from "react";
import { Select, Tag, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

// functions
import {
    listUser,
    changeRole,
    removeUser,
    editUserTime,
} from "../../functions/user";

const ManageAdmin = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("user");

    const handleFilterChange = (value) => {
        setFilter(value);
    };

    useEffect(() => {
        loadData(user.user.token);
    }, [filter, user.user.token]);

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
                editUserTime(user.user.token, user.user.user_id, values);
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
                    <div>
                        <h1>{filter === "user" ? "จัดการผู้ใช้งานระบบ" : (filter === "admin" ? "จัดการผู้ดูแลระบบ" : (filter === "log" ? "ตรวจสอบการทำงาน" : ""))}</h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">ชื่อผู้ใช้</th>
                                    <th scope="col">ตำแหน่ง</th>
                                    <th scope="col">ลบ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => {
                                    if ((filter === 'user' && item.role === 'user') || (filter === 'admin' && item.role === 'admin')) {
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
        </div>
    );
};

export default ManageAdmin;