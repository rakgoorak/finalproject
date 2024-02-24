import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { DeleteOutlined } from '@ant-design/icons';
import { getUserCart } from '../functions/user';

const ProductTableCart = ({ item }) => {
    const [cart, setCart] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    useEffect(() => {
        const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(cartFromLocalStorage);
    }, []); // Run only once on component mount

    const handleChangeCount = (e) => {
        const count = e.target.value < 1 ? 1 : e.target.value;
        const updatedCart = cart.map((product) => {
            if (product._id === item._id) {
                return { ...product, count };
            }
            return product;
        });
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCart(updatedCart);
        dispatch({
            type: 'addToCart',
            payload: updatedCart,
        });
        window.location.reload(); // Reload the page
    };

    const handleRemove = () => {
        const updatedCart = cart.filter((product) => product._id !== item._id);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCart(updatedCart);
        dispatch({
            type: 'addToCart',
            payload: updatedCart,
        });
        window.location.reload(); // Reload the page
    };

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
                <DeleteOutlined onClick={handleRemove} className='text-danger' />
            </td>
        </tr>
    );
};

export default ProductTableCart;
