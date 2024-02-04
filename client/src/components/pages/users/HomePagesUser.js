import React from 'react'
import Home from '../../pagehome/Home'
import BestSeller from '../../home/BastSeller'
import NewProduct from '../../home/NewProduct'

export const HomePagesUser = () => {
    return (
        <div>
            <Home />
            <p style={{ fontSize: '40px', textAlign: 'center', marginTop: '50px', marginBottom: '50px' }}>สินค้าขายดี</p>
            <BestSeller />
            <p style={{ fontSize: '40px', textAlign: 'center', marginTop: '50px', marginBottom: '50px' }}>สินค้ามาใหม่</p>
            <NewProduct />
        </div>
    )
}
