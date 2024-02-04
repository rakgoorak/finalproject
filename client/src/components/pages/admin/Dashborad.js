import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getOrdersAdmin } from '../../functions/admin';
import { listUser } from '../../functions/user';
import { toast } from 'react-toastify';
import Chart from 'react-apexcharts';

const Dashboard = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [totalOrders, setTotalOrders] = useState(0);
    const [completedOrders, setCompletedOrders] = useState(0);
    const [processingOrders, setProcessingOrders] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalOrderAmount, setTotalOrderAmount] = useState(0);
    const [completedOrderAmount, setCompletedOrderAmount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
        loadTotalUsers(user.user.token);
    }, []);

    const loadData = () => {
        setLoading(true);
        getOrdersAdmin(user.user.token)
            .then((res) => {
                const orders = res.data;
                setTotalOrders(orders.length);
                setCompletedOrders(orders.filter(order => order.orderstatus === 'Completed').length);
                setProcessingOrders(orders.filter(order => order.orderstatus === 'Processing').length);

                // Calculate total order amount
                const totalAmount = orders.reduce((acc, order) => acc + order.cartTotal, 0);
                setTotalOrderAmount(totalAmount);

                // Calculate completed order amount
                const completedAmount = orders
                    .filter(order => order.orderstatus === 'Completed')
                    .reduce((acc, order) => acc + order.cartTotal, 0);
                setCompletedOrderAmount(completedAmount);
            })
            .catch((error) => {
                console.error('Error loading data:', error);
                toast.error('Error loading data');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const loadTotalUsers = (authtoken) => {
        listUser(authtoken)
            .then((res) => {
                setTotalUsers(res.data.length);
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    };

    const chartOptions = {
        chart: {
            height: 350,
            type: 'bar',
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%',
                endingShape: 'rounded',
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
        },
        xaxis: {
            categories: ['คำสั่งซื้อทั้งหมด', 'คำสั่งซื้อสำเร็จ', 'คำสั่งซื้อที่กำลังดำเนินการ', 'ผู้ใช้งานทั้งหมด', 'ราคาคำสั่งซื้อสินค้าทั้งหมด', 'ราคาคำสั่งซื้อสำเร็จ'],
        },
        yaxis: {
            title: {
                text: 'ราคา/จำนวน',
            },
        },
        fill: {
            opacity: 1,
        },
    };

    const chartSeries = [
        {
            name: 'Count',
            data: [totalOrders, completedOrders, processingOrders, totalUsers, totalOrderAmount, completedOrderAmount],
        },
    ];

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center mt-4 mb-4">Dashboard</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-10 mx-auto">
                    <Chart options={chartOptions} series={chartSeries} type="bar" height={350} />
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-4">
                    <div className="card mb-3" style={{ backgroundColor: '#C3EEFA' }}>
                        <div className="card-header">คำสั่งซื้อทั้งหมด</div>
                        <div className="card-body">
                            {loading ? (
                                <p className="card-text">Loading...</p>
                            ) : (
                                <h5 className="card-title">{totalOrders}</h5>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-3" style={{ backgroundColor: '#FFC2D1' }}>
                        <div className="card-header">คำสั่งซื้อสำเร็จ</div>
                        <div className="card-body">
                            {loading ? (
                                <p className="card-text">Loading...</p>
                            ) : (
                                <h5 className="card-title">{completedOrders}</h5>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-3" style={{ backgroundColor: '#FFD0A7' }}>
                        <div className="card-header">คำสั่งซื้อที่กำลังดำเนินการ</div>
                        <div className="card-body">
                            {loading ? (
                                <p className="card-text">Loading...</p>
                            ) : (
                                <h5 className="card-title">{processingOrders}</h5>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="card mb-3" style={{ backgroundColor: '#F98581' }}>
                        <div className="card-header">ผู้ใช้งานทั้งหมด</div>
                        <div className="card-body">
                            {loading ? (
                                <p className="card-text">Loading...</p>
                            ) : (
                                <h5 className="card-title">{totalUsers}</h5>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-3" style={{ backgroundColor: '#FEE7AA' }}>
                        <div className="card-header">ราคาคำสั่งซื้อสินค้าทั้งหมด</div>
                        <div className="card-body">
                            {loading ? (
                                <p className="card-text">Loading...</p>
                            ) : (
                                <h5 className="card-title">{totalOrderAmount}</h5>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-3" style={{ backgroundColor: '#CEC2EB' }}>
                        <div className="card-header">ราคาคำสั่งซื้อสำเร็จ</div>
                        <div className="card-body">
                            {loading ? (
                                <p className="card-text">Loading...</p>
                            ) : (
                                <h5 className="card-title">{completedOrderAmount}</h5>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
