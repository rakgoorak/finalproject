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

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [yearlyOrders, setYearlyOrders] = useState([]);
    const [yearlyTotalSales, setYearlyTotalSales] = useState(0);

    useEffect(() => {
        loadData();
        loadTotalUsers(user.user.token);
        loadYearlyData(user.user.token);
    }, [selectedYear]);

    const loadData = () => {
        setLoading(true);
        getOrdersAdmin(user.user.token)
            .then((res) => {
                const orders = res.data;
                setTotalOrders(orders.length);
                setCompletedOrders(orders.filter(order => order.orderstatus === 'Completed').length);
                setProcessingOrders(orders.filter(order => order.orderstatus === 'Processing').length);

                const totalAmount = orders.reduce((acc, order) => acc + order.cartTotal, 0);
                setTotalOrderAmount(totalAmount);

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

    const loadYearlyData = (token) => {
        setLoading(true);
        getOrdersAdmin(token)
            .then((res) => {
                const orders = res.data;
                const yearlyOrders = orders.filter(order => new Date(order.createdAt).getFullYear() === selectedYear);
                setYearlyOrders(yearlyOrders);
                const yearlySales = calculateYearlyCompletedSales(yearlyOrders);
                setYearlyTotalSales(yearlySales);
            })
            .catch((error) => {
                console.error('Error loading data:', error);
                toast.error('Error loading data');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const calculateYearlyCompletedSales = (orders) => {
        const yearlyCompletedOrders = orders.filter(order => order.orderstatus === 'Completed');
        return yearlyCompletedOrders.reduce((total, order) => total + order.cartTotal, 0);
    };

    const chartOptionsAllOrders = {
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
            categories: ['คำสั่งซื้อทั้งหมด', 'คำสั่งซื้อสำเร็จ', 'คำสั่งซื้อที่กำลังดำเนินการ', 'ผู้ใช้งานทั้งหมด'],
        },
        yaxis: {
            title: {
                text: 'จำนวน',
            },
        },
        fill: {
            opacity: 1,
        },
    };

    const chartSeriesAllOrders = [
        {
            name: 'Count',
            data: [totalOrders, completedOrders, processingOrders, totalUsers],
        },
    ];

    const chartOptionsCompletedOrders = {
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
            categories: ['ราคาคำสั่งซื้อสินค้าทั้งหมด', 'ราคาคำสั่งซื้อสำเร็จ'],
        },
        yaxis: {
            title: {
                text: 'ราคา',
            },
        },
        fill: {
            opacity: 1,
        },
    };

    const chartSeriesCompletedOrders = [
        {
            name: 'Amount',
            data: [totalOrderAmount, completedOrderAmount],
        },
    ];

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center mt-4 mb-4">Dashboard</h1>
                    <h2>ยอดขายรวมในปี {selectedYear}: {yearlyTotalSales}</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <Chart options={chartOptionsCompletedOrders} series={chartSeriesCompletedOrders} type="bar" height={350} />
                    {/* Cards for Completed Orders */}
                    <div className="row mt-4">
                        <DashboardCard title="ราคาคำสั่งซื้อสินค้าทั้งหมด" backgroundColor="#FEE7AA" data={totalOrderAmount} loading={loading} />
                        <DashboardCard title="ราคาคำสั่งซื้อสำเร็จ" backgroundColor="#CEC2EB" data={completedOrderAmount} loading={loading} />
                    </div>
                </div>
                <div className="col-md-6">
                    <Chart options={chartOptionsAllOrders} series={chartSeriesAllOrders} type="bar" height={350} />
                    {/* Cards for All Orders */}
                    <div className="row mt-4">
                        <DashboardCard title="คำสั่งซื้อทั้งหมด" backgroundColor="#C3EEFA" data={totalOrders} loading={loading} />
                        <DashboardCard title="คำสั่งซื้อสำเร็จ" backgroundColor="#FFC2D1" data={completedOrders} loading={loading} />
                        <DashboardCard title="คำสั่งซื้อที่กำลังดำเนินการ" backgroundColor="#FFD0A7" data={processingOrders} loading={loading} />
                        <DashboardCard title="ผู้ใช้งานทั้งหมด" backgroundColor="#F98581" data={totalUsers} loading={loading} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const DashboardCard = ({ title, backgroundColor, data, loading }) => (
    <div className="col-md-12 col-lg-6">
        <div className="card mb-3" style={{ backgroundColor }}>
            <div className="card-header">{title}</div>
            <div className="card-body">
                {loading ? (
                    <p className="card-text">Loading...</p>
                ) : (
                    <h5 className="card-title">{data}</h5>
                )}
            </div>
        </div>
    </div>
);

export default Dashboard;
