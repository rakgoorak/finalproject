import React, { useState, useEffect } from "react";
import {
    createCategory,
    listCategory,
    deleteCategory,
} from "../../../functions/Category";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editProductTime } from "../../../functions/user";
import { Button } from "antd";

const CreateCategory = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [values, setValues] = useState({
        name: "",
    });
    const [category, setCategory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadData(user.user.token);
    }, []);

    const loadData = (authtoken) => {
        listCategory(authtoken)
            .then((res) => {
                setCategory(res.data);
            })
            .catch((err) => console.log(err));
    };

    const handleRemove = (id) => {
        const confirmDelete = window.confirm(
            "คุณแน่ใจหรือไม่ว่าต้องการลบหมวดหมู่นี้?"
        );
        if (confirmDelete) {
            deleteCategory(user.user.token, id)
                .then((res) => {
                    editProductTime(user.user.token, user.user.id, values);
                    console.log(res);
                    loadData(user.user.token);
                    toast.success("ลบหมวดหมู่เรียบร้อยแล้ว");
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("เกิดข้อผิดพลาดในการลบหมวดหมู่");
                });
        }
    };

    const handleChangeCategory = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createCategory(user.user.token, values)
            .then((res) => {
                editProductTime(user.user.token, user.user.id, values);
                loadData(user.user.token);
                toast.success("สร้างหมวดหมู่เรียบร้อยแล้ว");
            })
            .catch((err) => {
                console.log(err);
                toast.error("เกิดข้อผิดพลาดในการสร้างหมวดหมู่");
            });
    };

    const handleonClick = (id) => {
        navigate(`/admin/update-category/${id}`);
    }

    return (
        <div className="col">
            <h1>สร้างหมวดหมู่</h1>
            <div className="form-group">
                <label>เพิ่มหมวดหมู่สินค้า</label>
                <input
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChangeCategory}
                    className="form-control"
                />
                <Button type="primary" onClick={handleSubmit} ghost className="btn btn-outline-primary">เพิ่ม</Button>
            </div>
            <hr />
            <ul className="list-group">
                {category.map((item) => (
                    <li key={item.id} className="list-group-item ">
                        {item.name}
                        <Button
                            type="primary" ghost danger
                            style={{ float: "right" }}
                            className="btn btn-outline-primary"
                            onClick={() => handleRemove(item._id)}
                        >
                            ลบ
                        </Button>
                        <Button
                            type="primary" ghost
                            style={{ float: "right", marginRight: '10px', textDecoration: 'none' }}
                            className="btn btn-outline-primary"
                            onClick={() => handleonClick(item._id)}
                        >
                            แก้ไข
                        </Button>
                    </li>
                ))}
            </ul>
            <ToastContainer />
        </div>
    );
};

export default CreateCategory;
