import React from 'react'
import NewProduct from '../home/NewProduct'
import BestSeller from '../home/BastSeller'
import Home from '../pagehome/Home'


const Homepage = () => {
    return (
        <>
            <Home />
            <p style={{ fontSize: '40px', textAlign: 'center', marginTop: '50px', marginBottom: '50px' }}>สินค้าขายดี</p>
            <BestSeller />
            <p style={{ fontSize: '40px', textAlign: 'center', marginTop: '50px', marginBottom: '50px' }}>สินค้ามาใหม่</p>
            <NewProduct />
        </>
    )
}

export default Homepage