import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAddress, getName, getOrders, getPhoneNumber } from '../../functions/user';

export const History = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [orders, setOrders] = useState({});
    const [name, setName] = useState({});
    const [address, setAddress] = useState({});
    const [phoneNumber, setPhoneNumber] = useState({});

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setOrders({});
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
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    return (
        <div className='container' style={{ marginTop: '50px' }}>
            <h1 className='text-center'>ประวัติการสั่งซื้อ</h1>
            <div className='row justify-content-center'>
                {Object.keys(orders).length === 0 ? (
                    <p className='text-center'>ไม่มีสินค้า</p>
                ) : (
                    Object.keys(orders).map((index) => (
                        <div key={index} className='col-md-10 mt-3'>
                            <div className='card h-100'>
                                <div className='card-body d-flex flex-column'>
                                    <h5 className='card-title'>สถานะสินค้า: {orders[index].orderstatus}</h5>
                                    <p className='mb-2'>ชื่อ: {name.name}</p>
                                    <p className='mb-2'>ที่อยู่: {address && typeof address.fulladdress === 'object' ? address.fulladdress.houseNumber : address.fulladdress}</p>
                                    <p className='mb-2'>ตำบล: {address && typeof address.fulladdress === 'object' ? address.fulladdress.subdistrict : ''}</p>
                                    <p className='mb-2'>อำเภอ: {address && typeof address.fulladdress === 'object' ? address.fulladdress.district : ''}</p>
                                    <p className='mb-2'>จังหวัด: {address && typeof address.fulladdress === 'object' ? address.fulladdress.province : ''}</p>
                                    <p className='mb-2'>รหัสไปรษณีย์: {address && typeof address.fulladdress === 'object' ? address.fulladdress.zipcode : ''}</p>
                                    <p className='mb-2'>เบอร์โทร: {phoneNumber && typeof phoneNumber.phoneNumber === 'object' ? phoneNumber.phoneNumber.someProperty : phoneNumber.phoneNumber}</p>

                                    <table className='table table-bordered mt-3'>
                                        <thead>
                                            <tr>
                                                <th>ชื่อสินค้า</th>
                                                <th>ราคา</th>
                                                <th>ชิ้น</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders[index].products.map((product, i) => (
                                                <tr key={i}>
                                                    <td>{product.name}</td>
                                                    <td>{product.price}</td>
                                                    <td>{product.count}</td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <td colSpan={3} className='text-center'>ราคาสุทธิ: <b>{orders[index].cartTotal}</b></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default History;
