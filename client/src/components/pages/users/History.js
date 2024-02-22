import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAddress, getName, getOrders, getPhoneNumber } from '../../functions/user';


// Create styles
import { PDFDownloadLink } from '@react-pdf/renderer';
import Receipt from '../../order/Receipt';
// Create styles

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
        // Set loading state
        setOrders({});
        setName({});
        setAddress({});
        setPhoneNumber({});

        // Fetching orders, address, phone number, and name concurrently
        Promise.all([
            getOrders(user.user.token),
            getAddress(user.user.token),
            getPhoneNumber(user.user.token),
            getName(user.user.token)
        ])
            .then(([ordersRes, addressRes, phoneNumberRes, nameRes]) => {
                console.log("Orders response:", ordersRes.data); // Log orders response
                setOrders(ordersRes.data);
                setName(nameRes.data && typeof nameRes.data === 'object' ? nameRes.data : { name: nameRes.data });
                setAddress(addressRes.data);
                setPhoneNumber(phoneNumberRes.data && typeof phoneNumberRes.data === 'object' ? phoneNumberRes.data : { phoneNumber: phoneNumberRes.data });
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                // Handle errors, e.g., set an error state or display an error message
            });
    };


    return (
        <div className='col text-center'>
            <div className='row' style={{ marginTop: '30px' }}>
                <h1>ประวัติการสั่งซื้อ</h1>
                {Object.keys(orders).length === 0 ? (
                    <p>ไม่มีสินค้า</p>
                ) : (
                    Object.keys(orders).map((index) => (
                        <div key={index} className='cart m-3'>
                            <p>สถานะสินค้า: {orders[index].orderstatus}</p>
                            <p>ชื่อ: {name.name}</p>
                            <p>ที่อยู่: {address && typeof address.fulladdress === 'object' ? address.fulladdress.houseNumber : address.fulladdress}</p>
                            <p>ตำบล: {address && typeof address.fulladdress === 'object' ? address.fulladdress.subdistrict : ''}</p>
                            <p>อำเภอ: {address && typeof address.fulladdress === 'object' ? address.fulladdress.district : ''}</p>
                            <p>จังหวัด: {address && typeof address.fulladdress === 'object' ? address.fulladdress.province : ''}</p>
                            <p>รหัสไปรษณีย์: {address && typeof address.fulladdress === 'object' ? address.fulladdress.zipcode : ''}</p>
                            <p>เบอร์โทร: {phoneNumber && typeof phoneNumber.phoneNumber === 'object' ? phoneNumber.phoneNumber.someProperty : phoneNumber.phoneNumber}</p>

                            <table className='table table-bordered' style={{ marginBottom: '50px' }}>
                                <thead>
                                    <tr>
                                        <th>ชื่อ</th>
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
                                        <td colSpan={3}>ราคาสุทธิ:<b><u>{orders[index].cartTotal}</u></b></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="row">
                                <div className="col">
                                    <PDFDownloadLink
                                        document={<Receipt order={orders[index]}
                                        />}
                                        fileName="ใบเสร็จคำสั่งซื้อ.pdf"
                                        className="btn btn-primary m-1"
                                    >
                                        PDF DownLoad
                                    </PDFDownloadLink>
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