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
        //code
        loadData(user.user.token);
    }, []);

    const loadData = (authtoken) => {
        //code
        listUser(authtoken)
            .then((res) => {
                //code
                setData(res.data);
            })
            .catch((err) => {
                //err
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
        if (window.confirm("Are You Sure Delete!!")) {
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
                                <th scope="col">username</th>
                                <th scope="col">role</th>
                                <th scope="col">status</th>
                                <th scope="col">created</th>
                                <th scope="col">updated</th>
                                <th scope="col">actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr>
                                    <th scope="row">{item.username}</th>
                                    <td>
                                        <Select
                                            style={{ width: "100%" }}
                                            value={item.role}
                                            onChange={(e) => handleChangeRole(e, item._id)}
                                        >
                                            {roleData.map((item, index) => (
                                                <Select.Option value={item} key={index}>
                                                    {item == "admin" ? (
                                                        <Tag color="green">{item}</Tag>
                                                    ) : (
                                                        <Tag color="red">{item}</Tag>
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
                                        <DeleteOutlined onClick={() => handleRemove(item._id)} />
                                        <EditOutlined onClick={() => showModal(item._id)} style={{ marginLeft: '25px' }} />
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
                        <p>รหัสผ่านใหม่ :</p>
                        <input
                            onChange={handleChangePassword}
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