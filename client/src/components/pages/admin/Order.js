import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { updateStatusOrder, getOrdersAdmin } from '../../functions/admin';
import { getAddress, getName, getOrders, getPhoneNumber } from '../../functions/user';
import { toast } from 'react-toastify';

const Order = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [orders, setOrders] = useState([]);
    const [name, setName] = useState({});
    const [address, setAddress] = useState({});
    const [phoneNumber, setPhoneNumber] = useState({});

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setName({});
        setAddress({});
        setPhoneNumber({});

        Promise.all([
            getOrders(user.user.token),
            getAddress(user.user.token),
            getPhoneNumber(user.user.token),
            getName(user.user.token)
        ])

            .then(([ordersRes, addressRes, phoneNumberRes, nameRes]) => {
                console.log("Orders response:", ordersRes.data);
                setOrders(ordersRes.data);
                setName(nameRes.data && typeof nameRes.data === 'object' ? nameRes.data : { name: nameRes.data });
                setAddress(addressRes.data);
                setPhoneNumber(phoneNumberRes.data && typeof phoneNumberRes.data === 'object' ? phoneNumberRes.data : { phoneNumber: phoneNumberRes.data });
            })

        getOrdersAdmin(user.user.token)
            .then((res) => {
                setOrders(res.data);
            })
            .catch((error) => {
                console.error('เกิดข้อผิดพลาดในการโหลดคำสั่งซื้อ:', error);
            });
    };

    const thaiStatus = (status) => {
        switch (status) {
            case "Not Process":
                return "ยังไม่ดำเนินการ";
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



    const handleChangeStatus = (orderId, orderstatus) => {
        updateStatusOrder(user.user.token, orderId, orderstatus)
            .then(res => {
                console.log(res.data);
                toast.info('อัพเดท ' + res.data.orderstatus + ' สำเร็จ');
                loadData();
            })
            .catch(error => {
                console.error('เกิดข้อผิดพลาดในการอัพเดทสถานะ:', error);
                toast.error('เกิดข้อผิดพลาดในการอัพเดทสถานะ');
            });
    };

    return (
        <div className='col text-center'>
            <div className='row'>
                <h1>ข้อมูลการสั่งซื้อสินค้า</h1>
                {orders.length === 0 ? (
                    <p>ไม่มีสินค้า</p>
                ) : (
                    orders.map((order) => (
                        <div key={order._id} className='cart m-3'>
                            <p>
                                สั่งซื้อโดย <b>{order.orderBy.username}</b>
                                <br />
                                สถานะ : {thaiStatus(order.orderstatus)}
                                <p className='mb-2'>ชื่อ: {name.name}</p>
                                <p className='mb-2'>ที่อยู่: {address && typeof address.fulladdress === 'object' ? address.fulladdress.houseNumber : address.fulladdress}</p>
                                <p className='mb-2'>ตำบล: {address && typeof address.fulladdress === 'object' ? address.fulladdress.subdistrict : ''}</p>
                                <p className='mb-2'>อำเภอ: {address && typeof address.fulladdress === 'object' ? address.fulladdress.district : ''}</p>
                                <p className='mb-2'>จังหวัด: {address && typeof address.fulladdress === 'object' ? address.fulladdress.province : ''}</p>
                                <p className='mb-2'>รหัสไปรษณีย์: {address && typeof address.fulladdress === 'object' ? address.fulladdress.zipcode : ''}</p>
                                <p className='mb-2'>เบอร์โทร: {phoneNumber && typeof phoneNumber.phoneNumber === 'object' ? phoneNumber.phoneNumber.someProperty : phoneNumber.phoneNumber}</p>
                            </p>

                            <select
                                value={order.orderstatus}
                                onChange={(e) => handleChangeStatus(order._id, e.target.value)}
                                className='form form-control'
                            >
                                <option value="Not Process">ยังไม่ดำเนินการ</option>
                                <option value="Processing">กำลังดำเนินการ</option>
                                <option value="Cancelled">ถูกยกเลิก</option>
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
                                    {order.products.map((product) => (
                                        <tr key={product._id}>
                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
                                            <td>{product.count}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan={3}>
                                            ราคาสุทธิ : {' '}
                                            <b>
                                                <u>{order.cartTotal}</u>
                                            </b>
                                        </td>
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
