import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getOrders } from '../../functions/user';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Receipt from '../../order/Receipt';
import { Button } from 'antd';

const History = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [orders, setOrders] = useState({});
    const [filter, setFilter] = useState('Processing');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setOrders({});
        Promise.all([
            getOrders(user.user.token),
        ])
            .then(([ordersRes]) => {
                console.log("Orders response:", ordersRes.data);
                setOrders(ordersRes.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
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

    return (
        <div className="container">
            <h1 className="text-center" style={{ marginTop: '20px' }}>ประวัติการสั่งซื้อ</h1>
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
                                            <h5 className="card-title text-primary">สถานะสินค้า: {thaiStatus(order.orderstatus)}</h5>
                                            <h5 className="card-subtitle mb-2">ชื่อ: {order.name}</h5>
                                            <p className="card-text">
                                                <span className="font-weight-bold">ที่อยู่: </span>
                                                {order.fulladdress.houseNumber} {order.fulladdress.subdistrict} {order.fulladdress.district} {order.fulladdress.province} {order.fulladdress.zipcode}
                                            </p>
                                            <p className="font-weight-bold">เบอร์โทร: {order.phoneNumber}</p>
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>ชื่อ</th>
                                                        <th>ราคา</th>
                                                        <th>จำนวน</th>
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
                                                        <td colSpan={3}>ราคาสุทธิ: <b><u>{(order.cartTotal * 1.07).toFixed(2)}</u></b> (รวม VAT 7% แล้ว)</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div className="text-center">
                                                <PDFDownloadLink
                                                    document={<Receipt order={order} createdAt={order.createdAt} />}
                                                    fileName="ใบเสร็จคำสั่งซื้อ.pdf"
                                                    className="btn btn-primary m-1"
                                                >
                                                    ใบเสร็จคำสั่งซื้อ
                                                </PDFDownloadLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        } else {
                            return null;
                        }
                    })}
                </div>
            )}
        </div>
    );
};

export default History;
