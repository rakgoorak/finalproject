import React, { useState, useEffect } from 'react';
import { createCategory, listCategory, deleteCategory } from '../../../functions/Category';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateCategory = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [values, setValues] = useState({
        name: '',
    });
    const [category, setCategory] = useState([]);

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
        const confirmDelete = window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบหมวดหมู่นี้?');
        if (confirmDelete) {
            deleteCategory(user.user.token, id)
                .then((res) => {
                    console.log(res);
                    loadData(user.user.token);
                    toast.success('ลบหมวดหมู่เรียบร้อยแล้ว');
                })
                .catch((err) => {
                    console.log(err);
                    toast.error('เกิดข้อผิดพลาดในการลบหมวดหมู่');
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
                loadData(user.user.token);
                toast.success('สร้างหมวดหมู่เรียบร้อยแล้ว');
            })
            .catch((err) => {
                console.log(err);
                toast.error('เกิดข้อผิดพลาดในการสร้างหมวดหมู่');
            });
    };

    return (
        <div className="col">
            <h1>สร้างหมวดหมู่</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>เพิ่มหมวดหมู่สินค้า</label>
                    <input
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChangeCategory}
                        className="form-control"
                    />
                    <button className="btn btn-outline-primary"> เพิ่ม</button>
                </div>
            </form>
            <hr />
            <ul className="list-group">
                {category.map((item) => (
                    <li key={item.id} className="list-group-item ">
                        {item.name}
                        <span
                            style={{ float: 'right' }}
                            className="btn btn-outline-primary"
                            onClick={() => handleRemove(item._id)}
                        >
                            X
                        </span>
                        <span style={{ float: 'right' }} className="btn btn-outline-primary">
                            <Link to={`/admin/update-category/${item._id}`}>แก้ไข</Link>
                        </span>
                    </li>
                ))}
            </ul>
            <ToastContainer />
        </div>
    );
};

export default CreateCategory;
