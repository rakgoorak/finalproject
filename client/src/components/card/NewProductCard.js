import React from 'react';
import { Card } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

const NewProductCard = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { _id, name, detail, images, price } = product;

    const handleAddtoCart = () => {
        let cart = [];
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        cart.push({
            ...product,
            count: 1
        });
        let unique = _.uniqWith(cart, _.isEqual);
        localStorage.setItem("cart", JSON.stringify(unique));
        dispatch({
            type: "ADD_TO_CART",
            payload: unique
        });
        console.log('Cart after adding:', unique);
        toast.success('เพิ่มสินค้าลงในตะกร้าสำเร็จ');
    };

    const handleonClick = () => {
        navigate(`/product/${_id}`);
    }

    const handleHover = (e) => {
        e.currentTarget.classList.add('card-hovered');
    };

    const handleHoverExit = (e) => {
        e.currentTarget.classList.remove('card-hovered');
    };


    return (
        <Card
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverExit}
            hoverable
            style={{ width: '240px' }}
            cover={<img
                onClick={handleonClick}
                className='P-1'
                style={{ height: '240px', objectFit: 'cover' }}
                alt="example" src={images && images.length
                    ? images[0].url
                    : ''
                } />}
            actions={
                [
                    <ShoppingCartOutlined style={{ fontSize: '20px' }}
                        onClick={handleAddtoCart}
                        className='text-danger' />,
                ]}
        >
            <Meta
                title={
                    <span>{name}</span>
                }
                description={
                    <>
                        <span>{detail}</span>
                        <br />
                        <span style={{ color: '#2E67B1' }}>฿{price}</span>
                    </>
                }
            />
        </Card >
    );
};

export default NewProductCard;
