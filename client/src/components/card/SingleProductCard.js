import React from 'react';
import { Card, Tabs } from 'antd';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { addToWishList } from '../functions/user';
import { toast } from 'react-toastify';
const { Meta } = Card;
const { TabPane } = Tabs;

const SingleProductCard = ({ product }) => {
    const dispatches = useDispatch();
    const { _id, name, detail, images, price, sold, category } = product;
    const { user } = useSelector((state) => ({ ...state }));

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
        dispatches({
            type: "addToCart",
            payload: unique
        });
        console.log('Cart after adding:', unique);
        toast.success('เพิ่มสินค้าลงในตะกร้าสำเร็จ');
    };

    const handleAddtoWishList = () => {
        if (user) {
            addToWishList(user.user.token, _id)
                .then(res => {
                    console.log(res.data)
                    toast.success('เพิ่มเข้าในรายการที่ต้องการ สำเร็จ')
                }).catch((err) => {
                    console.log(err)
                });
        } else {
            toast.error('เข้าสู่ระบบก่อน');
        }
    };

    return (
        <div className='row justify-content-center'>
            <div className='col-md-3'>
                <Carousel autoPlay showArrows={true} infiniteLoop>
                    {images && images.map(item => <img src={item.url} alt={name} key={item.public_id} />)}
                </Carousel>

                <Tabs>
                    <TabPane tab="คำอธิบาย" key="1">
                        {detail}
                    </TabPane>
                </Tabs>
            </div>
            <div className='col-md-4'>
                <h1 className='bg-info p-3'>{name}</h1>
                <Card
                    actions={[
                        <a onClick={handleAddtoWishList} style={{ fontSize: '20px' }}>
                            <HeartOutlined className='text-info' /><br />
                            เพิ่มเข้าในรายการที่ต้องการ
                        </a>,
                        <a onClick={handleAddtoCart} style={{ fontSize: '20px' }}>
                            <ShoppingCartOutlined
                                className='text-danger'
                            />
                            <br />
                            เพิ่มลงในตะกร้า
                        </a>
                    ]}
                >
                    <ul class="list-group">
                        <li class="list-group-item" style={{ fontSize: '18px' }}>
                            ราคา
                            <span className='float-end'>{price}</span>
                        </li>
                        <li class="list-group-item" style={{ fontSize: '18px' }}>
                            รายละเอียดสินค้า
                            <span className='float-end'>{detail}</span>
                        </li>
                        <li class="list-group-item" style={{ fontSize: '18px' }}>
                            ขายแล้ว
                            <span className='float-end'>{sold}</span>
                        </li>
                        {category &&
                            <li class="list-group-item" style={{ fontSize: '18px' }}>
                                หมวดหมู่
                                <span className='float-end'>{category.name}</span>
                            </li>
                        }
                    </ul>
                </Card>
                <button className="button" style={{ marginBottom: '100px', marginTop: '20px', width: '100%' }}>
                    <Link to="/shop" style={{ textDecoration: 'none', color: 'white' }}>
                        กลับไปหน้าหลัก
                    </Link>
                </button>
            </div>
        </div>
    )
}

export default SingleProductCard;
