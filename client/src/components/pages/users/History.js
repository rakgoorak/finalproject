import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getOrders } from '../../functions/user'

export const History = () => {

    const { user } = useSelector((state) => ({ ...state }))
    const [orders, setOrders] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        getOrders(user.user.token)
            .then((res) => {
                setOrders(res.data)
            })
    }

    return (
        <div className='col text-center'>
            <div className='row' style={{ marginTop: '30px' }}>
                <h1>ประวัติการสั่งซื้อ</h1>
                {orders.length === 0 ? (
                    <p>ไม่มีสินค้า</p>
                ) : (
                    orders.map((order, index) => (
                        <div key={index} className='cart m-3'>
                            <p>สถานะสินค้า: {order.orderstatus}</p>
                            <table className='table table-bordered' style={{ marginBottom: '50px' }}>
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
                                        <td colSpan={3}>ราคาสุทธิ:<b><u>{order.cartTotal}</u></b></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default History
