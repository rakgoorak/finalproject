import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify'
import { DeleteOutlined } from '@ant-design/icons'
import { getUserCart } from '../functions/user';

const ProductTableCart = ({ item }) => {
    const [cart, setCart] = useState([])
    const { user } = useSelector((state) => ({ ...state }))
    const dispatch = useDispatch()
    const handleChangeCount = (e) => {
        const count = e.target.value < 1 ? 1 : e.target.value
        let cart = []
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.map((product, i) => {
            if (product._id === item._id) {
                cart[i].count = count
            }
        })
        localStorage.setItem('cart', JSON.stringify(cart))
        dispatch({
            type: "addToCart",
            payload: cart
        })
    }
    const handleRemove = () => {
        let cart = []
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.map((product, i) => {
            if (product._id === item._id) {
                cart.splice(i, 1);
            }
        });
        localStorage.setItem('cart', JSON.stringify(cart))
        dispatch({
            type: "addToCart",
            payload: cart
        })
    }
    return (
        <tr>
            <td>
                <img
                    src={item.images[0].url}
                    alt={item.name}
                    style={{ width: '50px', height: 'auto' }}
                />
            </td>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>
                <input
                    onChange={handleChangeCount}
                    className='form-control'
                    type='number'
                    value={item.count}
                />
            </td>
            <td>
                <DeleteOutlined
                    onClick={handleRemove}
                    className='text-danger' />
            </td>
        </tr>
    );
};

export default ProductTableCart;