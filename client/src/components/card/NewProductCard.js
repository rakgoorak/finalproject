import React from 'react';
import { Card } from 'antd';
import { EyeOutlined, ShoppingCartOutlined, } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import _ from 'lodash'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
const { Meta } = Card;

const NewProductCard = ({ product }) => {
    const { _id, name, detail, images } = product
    const dispatches = useDispatch()

    const handleAddtoCart = () => {
        let cart = []
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({
            ...product,
            count: 1
        })
        let unique = _.uniqWith(cart, _.isEqual)
        localStorage.setItem("cart", JSON.stringify(unique))
        dispatches({
            type: "addToCart",
            payload: unique
        })
        console.log('Cart after adding:', unique);
        toast.success('เพิ่มสินค้าลงในตะกร้าสำเร็จ');
    }
    return (
        <Card
            hoverable
            style={{ width: '240px', marginBottom: '100px' }}
            cover={<img
                className='P-1'
                style={{ height: "150px", objectFit: "cover" }}
                alt="example" src={images && images.length
                    ? images[0].url
                    : ""
                } />}
            actions={[
                <Link to={'/product/' + _id}>
                    < EyeOutlined className='text-warning' style={{ fontSize: '20px' }} />
                </Link>
                ,
                <ShoppingCartOutlined style={{ fontSize: '20px' }}
                    onClick={handleAddtoCart}
                    className='text-danger' />,

            ]}
        >
            <Meta title={name} description={detail} />
        </Card>
    );
}

export default NewProductCard