import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SlipCard from "../../card/SlipCard";
import { updateStatusOrder, getOrdersAdmin } from "../../functions/admin";
import { editOrderTime, getOrders } from "../../functions/user";
import { toast } from "react-toastify";
import { Button } from "antd";

const Order = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState('Processing');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        Promise.all([getOrders(user.user.token)])
            .then(([ordersRes]) => {
                console.log("Orders response:", ordersRes.data);
                setOrders(ordersRes.data);
            });

        getOrdersAdmin(user.user.token)
            .then((res) => {
                setOrders(res.data);
            })
            .catch((error) => {
                console.error("เกิดข้อผิดพลาดในการโหลดคำสั่งซื้อ:", error);
            });
    };

    const thaiStatus = (status) => {
        switch (status) {
            case "Processing":
                return "กำลังดำเนินการ";
            case "Cancelled":
                return "ถูกยกเลิก";
            case "Completed":
                return "สั่งซื้อสำเร็จ";
            default:
                return status;
        }
    };

    const handleFilterChange = (status) => {
        setFilter(status);
    };

    const handleChangeStatus = (orderId, orderstatus) => {
        updateStatusOrder(user.user.token, orderId, orderstatus)
            .then((res) => {
                editOrderTime(user.user.token, user.user.user_id);
                toast.info("อัพเดท " + res.data.orderstatus + " สำเร็จ");
                loadData();
            })
            .catch((error) => {
                console.error("เกิดข้อผิดพลาดในการอัพเดทสถานะ:", error);
                toast.error("เกิดข้อผิดพลาดในการอัพเดทสถานะ");
            });
    };

    return (
        <div className="container">
            <h1 className="text-center">ข้อมูลการสั่งซื้อสินค้า</h1>
            <div className="d-flex justify-content-center mb-3">
                <div className="btn-group" role="group" aria-label="Basic outlined example">
                    <Button type="primary" className={`btn btn-outline-primary ${filter === 'Processing' ? 'active' : ''}`} onClick={() => handleFilterChange('Processing')}>
                        กำลังดำเนินการ
                    </Button>
                    <Button type="primary" className={`btn btn-outline-primary ${filter === 'Completed' ? 'active' : ''}`} onClick={() => handleFilterChange('Completed')}>
                        สั่งซื้อสำเร็จ
                    </Button>
                    <Button type="primary" className={`btn btn-outline-primary ${filter === 'Cancelled' ? 'active' : ''}`} onClick={() => handleFilterChange('Cancelled')}>
                        ถูกยกเลิก
                    </Button>
                </div>
            </div>
            {Object.keys(orders).length === 0 ? (
                <p className="text-center">ไม่มีสินค้า</p>
            ) : (
                <div className="row justify-content-center">
                    {Object.keys(orders).map((index) => {
                        const order = orders[index];
                        if (filter === '' || order.orderstatus === filter) {
                            return (
                                <div key={index} className="col-md-8 mb-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title">สั่งซื้อโดย <b>{order.orderBy.username}</b></h4>
                                            <h5>สถานะ: {thaiStatus(order.orderstatus)}</h5>
                                            <h6>ชื่อ: {order.name}</h6>
                                            <p>
                                                <span className="font-weight-bold">ที่อยู่: </span>
                                                {order.fulladdress.houseNumber} {order.fulladdress.subdistrict} {order.fulladdress.district} {order.fulladdress.province} {order.fulladdress.zipcode}
                                            </p>
                                            <p className="font-weight-bold">เบอร์โทร: {order.phoneNumber}</p>
                                            <table className="table table-bordered">
                                                <colgroup>
                                                    <col style={{ width: "25%" }} />
                                                    <col style={{ width: "25%" }} />
                                                    <col style={{ width: "25%" }} />
                                                </colgroup>
                                                <thead>
                                                    <tr>
                                                        <th>ชื่อสินค้า</th>
                                                        <th>ราคา</th>
                                                        <th>จำนวน</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {order.products.map((product, idx) => (
                                                        <tr key={idx}>
                                                            <td>{product.name}</td>
                                                            <td>{product.price}</td>
                                                            <td>{product.count}</td>
                                                        </tr>
                                                    ))}
                                                    <tr>
                                                        <td colSpan={3}>
                                                            ราคาสุทธิ: <b><u>{order.cartTotal}</u></b>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <SlipCard order={order} />
                                            <select
                                                value={order.orderstatus}
                                                onChange={(e) => handleChangeStatus(order._id, e.target.value)}
                                                className="form-control mt-3"
                                            >
                                                <option value="Processing">กำลังดำเนินการ</option>
                                                <option value="Completed">สั่งซื้อสำเร็จ</option>
                                                <option value="Cancelled">ถูกยกเลิก</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
            )}
        </div>
    );
};

export default Order;
