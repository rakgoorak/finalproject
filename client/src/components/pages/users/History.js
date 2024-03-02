import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getOrders } from '../../functions/user';

import { PDFDownloadLink } from '@react-pdf/renderer';
import Receipt from '../../order/Receipt';

export const History = () => {
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

    const handleFilterChange = (status) => {
        setFilter(status);
    };

    return (
        <div className='col text-center'>
            <div className='row' style={{ marginTop: '30px' }}>
                <h1>ประวัติการสั่งซื้อ</h1>
                <div className="btn-group mb-3" role="group" aria-label="Basic outlined example">
                    <button type="button" className={`btn btn-outline-primary ${filter === 'Processing' ? 'active' : ''}`} onClick={() => handleFilterChange('Processing')}>
                        กำลังดำเนินการ
                    </button>
                    <button type="button" className={`btn btn-outline-primary ${filter === 'Completed' ? 'active' : ''}`} onClick={() => handleFilterChange('Completed')}>
                        สั่งซื้อสำเร็จ
                    </button>
                    <button type="button" className={`btn btn-outline-primary ${filter === 'Cancelled' ? 'active' : ''}`} onClick={() => handleFilterChange('Cancelled')}>
                        ถูกยกเลิก
                    </button>
                </div>
                {Object.keys(orders).length === 0 ? (
                    <p>ไม่มีสินค้า</p>
                ) : (
                    Object.keys(orders).map((index) => {
                        if (filter === '' || orders[index].orderstatus === filter) {
                            return (
                                <div key={index} className='cart m-3 border p-3'>
                                    <h5 className="text-primary">สถานะสินค้า: {thaiStatus(orders[index].orderstatus)}</h5>
                                    <h5 >ชื่อ: {orders[index].name}</h5>
                                    <p>
                                        <span className="font-weight-bold"> ที่อยู่:</span> {orders[index] && typeof orders[index].fulladdress === 'object' ? orders[index].fulladdress.houseNumber : orders[index].fulladdress}
                                        <span className="font-weight-bold"> ตำบล:</span> {orders[index] && typeof orders[index].fulladdress === 'object' ? orders[index].fulladdress.subdistrict : ''}
                                        <span className="font-weight-bold"> อำเภอ:</span> {orders[index] && typeof orders[index].fulladdress === 'object' ? orders[index].fulladdress.district : ''}
                                        <span className="font-weight-bold"> จังหวัด:</span> {orders[index] && typeof orders[index].fulladdress === 'object' ? orders[index].fulladdress.province : ''}
                                        <span className="font-weight-bold"> </span> {orders[index] && typeof orders[index].fulladdress === 'object' ? orders[index].fulladdress.zipcode : ''}
                                    </p>
                                    <p className="font-weight-bold">เบอร์โทร: {orders[index].phoneNumber}</p>

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
                                                <td colSpan={3}>ราคาสุทธิ: <b><u>{(orders[index].cartTotal * 1.07).toFixed(2)}</u></b> (รวม VAT 7% แล้ว)</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="row" style={{ marginBottom: '50px' }}>
                                        <div className="col">
                                            <PDFDownloadLink
                                                document={<Receipt order={orders[index]} />}
                                                fileName="ใบเสร็จคำสั่งซื้อ.pdf"
                                                className="btn btn-primary m-1"
                                            >
                                                ใบเสร็จคำสั่งซื้อ
                                            </PDFDownloadLink>
                                        </div>
                                    </div>
                                </div>
                            );
                        } else {
                            return null;
                        }
                    })
                )}
            </div>
        </div >
    );
};

export default History;
