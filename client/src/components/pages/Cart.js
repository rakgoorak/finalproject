import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductTableCart from '../card/ProductTableCart';
import { userCart } from '../functions/user';
import { useNavigate } from 'react-router-dom';
const Cart = () => {
    const navigate = useNavigate()
    const { cart, user } = useSelector((state) => ({ ...state }))
    const dispatch = useDispatch()
    const getTotal = () => {
        return cart.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };
    const handleSaveOrder = () => {
        alert('CheckOut Order')
        userCart(user.user.token, cart)
            .then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        navigate('/checkout')
    }
    const showCartItem = () => {
        return (
            <table className='table table-bordered'>
                <thead className='thead-light'>
                    <tr>
                        <td>รูปภาพ</td>
                        <td>ชื่อสินค้า</td>
                        <td>ราคา</td>
                        <td>ชิ้น</td>
                        <td>ลบสินค้า</td>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item, index) => (
                        <ProductTableCart key={item._id} item={item} />
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <>
            <div className='container-fluid'>
                <div className='row'>

                    <div className='col-md-8' style={{ marginTop: '50px' }}>
                        <h4> ตะกร้ามีสินค้า {cart.length} ชิ้น</h4>
                        {!cart.length
                            ? <p>ไม่มีสินค้าในตะกร้า</p>
                            : showCartItem()
                        }
                    </div>
                    <div className='col-md-4' style={{ marginTop: '50px' }}>
                        <h4>ข้อมูลสินค้า</h4>
                        <hr />
                        {cart.map((item, index) => (
                            <p key={index}>
                                {item.name} x {item.count} = {item.price * item.count}
                            </p>
                        ))}
                        <hr />
                        <h4>ราคาสุทธิ: <b>{getTotal()}</b></h4>
                        <hr />
                        {user.value != 0
                            ? <button className='btn btn-success'
                                onClick={handleSaveOrder}
                                disabled={!cart.length}
                            >สั่งซื้อสิค้า</button>
                            : <button className='btn btn-danger'>
                                <Link to="/login"
                                    state="cart"
                                >
                                    Login to CheckOut
                                </Link>
                            </button>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;