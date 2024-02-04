import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getOrders } from '../../functions/user';
import { updateStatusOrder, getOrdersAdmin } from '../../functions/admin';
import { toast } from 'react-toastify'
const Order = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        getOrdersAdmin(user.user.token)
            .then((res) => {
                setOrders(res.data);
            })
            .catch((error) => {
                console.error('เกิดข้อผิดพลาดในการโหลดคำสั่งซื้อ:', error);
            });
    };

    const handleChangeStatus = (orderId, orderstatus) => {
        updateStatusOrder(user.user.token, orderId, orderstatus)
            .then(res => {
                console.log(res.data)
                toast.info('อัพเดท ' + res.data.orderstatus + ' สำเร็จ')
                loadData()
            })
    };

    return (
        <div className='col text-center'>
            <div className='row'>
                <h1>ข้อมูลการสั่งซื้อสอนค้า</h1>
                {orders.length === 0 ? (
                    <p>ไม่มีสินค้า</p>
                ) : (
                    orders.map((order, index) => (
                        <div key={index} className='cart m-3'>
                            <p>สั่งซื้อโดย <b>{order.orderBy.username}</b>
                                <br />
                                สถานะ: {order.orderstatus}</p>
                            <select
                                value={order.orderstatus}
                                onChange={(e) => handleChangeStatus(order._id, e.target.value)}
                                className='form form-control'>
                                <option value="Not Process">ไม่ผ่านการดำเนินงาน</option>
                                <option value="Processing">กำลังดำเนินงาน</option>
                                <option value="Cancelled">ยกเลิกสินค้า</option>
                                <option value="Completed">สั่งซื้อสำเร็จ</option>
                            </select>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>ชื่อ</th>
                                        <th>ราคา</th>
                                        <th>ชิ้น</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.products.map((product, i) => (
                                        <tr key={i}>
                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
                                            <td>{product.count}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan={3}>ราคาสุทธิ : {" "}<b><u>{order.cartTotal}</u></b></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Order;
