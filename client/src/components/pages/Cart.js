// rafce
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductTableCart from '../card/ProductTableCart'
import { useNavigate } from "react-router-dom";
// function
import { userCart } from "../functions/user";

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cart, user } = useSelector((state) => ({ ...state }));

    const getTotal = () => {
        return cart.reduce((currenValue, nextValue) => {
            return currenValue + nextValue.count * nextValue.price;
        }, 0);
    };
    const handleSaveOrder = () => {
        // code
        alert("ต้องการที่จะชำระเงิน?");
        userCart(user.user.token, cart)
            .then((res) => {
                console.log(res);
                navigate("/checkout");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const showCartItem = () => (
        <table className="table table-bordered">
            <thead className="thead-light">
                <tr>
                    <td>รูปสินค้า</td>
                    <td>ชื่อสินค้า</td>
                    <td>ราคา</td>
                    <td>ชิ้น</td>
                    <td>ลบสินค้า</td>
                </tr>
            </thead>
            {cart.map((item) => (
                <ProductTableCart key={item._id} item={item} />
            ))}
        </table>
    );
    return (
        <div className="container-fluid">
            <div className="row" style={{ margin: '80px' }}>
                <div className="col-md-8">
                    <h4> ตะกร้ามีสินค้า {cart.length} ชิ้น</h4>
                    {!cart.length ? <p>ไม่มีสินค้าในตะกร้า</p> : showCartItem()}
                </div>

                <div className="col-md-4">
                    <h4>ยอดรวมสินค้าทั้งหมด</h4>
                    <hr />
                    {cart.map((item, index) => (
                        <p key={index}>
                            {item.name} x {item.count} = {item.price * item.count}
                        </p>
                    ))}
                    <hr />
                    ราคาสินค้าทั้งหมด : <b> {getTotal()} </b>
                    <hr />
                    {user ? (
                        <button
                            className="btn btn-success"
                            onClick={handleSaveOrder}
                            disabled={!cart.length}
                        >
                            ชำระเงิน
                        </button>
                    ) : (
                        <button className="btn btn-danger">
                            <Link to="/login" state="cart">
                                เข้าสู่ระบบก่อน
                            </Link>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Cart;