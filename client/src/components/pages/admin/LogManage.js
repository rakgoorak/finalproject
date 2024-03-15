import React, { useState, useEffect } from "react";
import { getEditUser, getEditOrder, getEditProduct } from "../../functions/admin";
import { Button } from "antd";
import moment from "moment/min/moment-with-locales";

export default function LogManage() {
    const [editUserDetails, setEditUserDetails] = useState([]);
    const [editProductDetails, setEditProductDetails] = useState([]);
    const [editOrderDetails, setEditOrderDetails] = useState([]);
    const [filterType, setFilterType] = useState("user");

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (filterType === "user") {
                    const response = await getEditUser();
                    setEditUserDetails(response.data);
                } else if (filterType === "product") {
                    const response = await getEditProduct();
                    setEditProductDetails(response.data);
                } else if (filterType === "order") {
                    const response = await getEditOrder();
                    setEditOrderDetails(response.data);
                }
            } catch (error) {
                console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล", error);
            }
        };
    
        fetchData();
    }, [filterType]);
    

    const handleFilter = (type) => {
        setFilterType(type);
    };

    const filterData = (data) => {
        if (filterType === "user") {
            return data;
        } else {
            return data;
        }
    };
    

    return (
        <div>
            <div className="btn-group mb-3" role="group" aria-label="Basic outlined example">
                <Button type="primary" className={`btn btn-outline-primary ${filterType === 'user' ? 'active' : ''}`} onClick={() => handleFilter("user")}>ผู้ใช้งาน</Button>
                <Button type="primary" className={`btn btn-outline-primary ${filterType === 'product' ? 'active' : ''}`} onClick={() => handleFilter("product")}>สินค้า</Button>
                <Button type="primary" className={`btn btn-outline-primary ${filterType === 'order' ? 'active' : ''}`} onClick={() => handleFilter("order")}>คำสั่งซื้อ</Button>
            </div>
            {filterType === "user" && (
                <div>
                    <h1>ตรวจสอบการแก้ไขข้อมูลของผู้ใช้</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">แก้ไขโดย</th>
                                <th scope="col">แก้ไขคำสั่งซื้อสินค้า</th>
                                <th scope="col">แก้ไขเมื่อ</th>
                                <th scope="col">รายละเอียด</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterData(editUserDetails).map((user, index) => (
                                <tr key={index}>
                                    <td>{user.editUserBy}</td>
                                    <td>{user.editUser}</td>
                                    <td>{moment(user.editedTime).locale("th").format("LLL")}</td>
                                    <td>เปลี่ยนเป็น {user.editUserDetail}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {filterType === "product" && (
                <div>
                    <h1>ตรวจสอบการแก้ไขข้อมูลสินค้า</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">แก้ไขโดย</th>
                                <th scope="col">แก้ไขสินค้า</th>
                                <th scope="col">แก้ไขเมื่อ</th>
                                <th scope="col">รายละเอียด</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterData(editProductDetails).map((product, index) => (
                                <tr key={index}>
                                    <td>{product.editproductById}</td>
                                    <td>{product.editProductId}</td>
                                    <td>{moment(product.editedTime).locale("th").format("LLL")}</td>
                                    <td>ทำการ {product.editproductDetail}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {filterType === "order" && (
                <div>
                    <h1>ตรวจสอบการแก้ไขข้อมูลคำสั่งซื้อ</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">แก้ไขโดย</th>
                                <th scope="col">แก้ไขผู้ใช้งาน</th>
                                <th scope="col">แก้ไขเมื่อ</th>
                                <th scope="col">รายละเอียด</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterData(editOrderDetails).map((order, index) => (
                                <tr key={index}>
                                    <td>{order.editOrderBy}</td>
                                    <td>{order.editOrderId}</td>
                                    <td>{moment(order.editedTime).locale("th").format("LLL")}</td>
                                    <td>ทำการแก้ไขประวัติเป็น {order.editOrderDetail}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
