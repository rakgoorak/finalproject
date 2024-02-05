import React, { useState, useEffect } from 'react';
import { getUserCart, saveAddress, saveOrder, emptyCart } from '../functions/user';
import { useDispatch, useSelector } from 'react-redux';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CheckOut = () => {
    const [customerInfo, setCustomerInfo] = useState({
        name: "",
        address: "",
        phoneNumber: "",
    });

    const { user } = useSelector((state) => ({ ...state }));
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [addressSaved, setAddressSaved] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        getUserCart(user.user.token)
            .then((res) => {
                console.log(res.data);
                setProducts(res.data.products);
                setTotal(res.data.cartTotal);
            });
    }, [user.user.token]);  // Add user.user.token as a dependency

    const handleSaveAddress = () => {
        console.log(customerInfo.address);
        saveAddress(user.user.token, customerInfo.address)
            .then((res) => {
                console.log(res.data);
                if (res.data.ok) {
                    toast.success('Address Saved');
                    setAddressSaved(true);
                }
            });
    };

    const handleCreateOrder = () => {
        saveOrder(user.user.token, customerInfo)
            .then((res) => {
                console.log();
                emptyCart(user.user.token);
                dispatch({
                    type: 'addToCart',
                    payload: [],
                });
                if (typeof window !== "undefined") {
                    localStorage.removeItem("cart");
                }

                toast.success("Save Order Success");
                navigate('/user/history');
            });
    };

    const handleInputChange = (field, value) => {
        setCustomerInfo({ ...customerInfo, [field]: value });
    };

    return (
        <div className='container-fluid'>
            <div className='row' style={{ margin: '50px' }}>
                <div className="col-md-6">
                    <h4>ข้อมูลลูกค้า</h4>
                    <br />
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">ชื่อ:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={customerInfo.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">ที่อยู่:</label>
                        <textarea
                            className="form-control"
                            id="address"
                            value={customerInfo.address}
                            onChange={(e) => handleInputChange("address", e.target.value)}
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phoneNumber" className="form-label">เบอร์โทร:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="phoneNumber"
                            value={customerInfo.phoneNumber}
                            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                        />
                    </div>
                    <button
                        className='btn btn-primary mt-2'
                        onClick={handleSaveAddress}
                    >
                        บันทึกข้อมูล
                    </button>
                </div>
                <div className="col-md-6" style={{ marginTop: '35px' }}>
                    <h4>ข้อมูลสินค้าทั้งหมด</h4>
                    <hr />
                    <p>จำนวนสินค้า: {products.length} ชิ้น</p>
                    <hr />
                    <p>รายการสินค้า</p>
                    {products.map((item, i) =>
                        <div key={i}>
                            <p>
                                {item.name} x {item.count} = {item.price * item.count}
                            </p>
                        </div>
                    )}
                    <hr />
                    ราคาสุทธิ:<b> {total}</b>
                    <br />
                    <button
                        onClick={handleCreateOrder}
                        disabled={!addressSaved || !products.length}
                        className='btn btn-primary mt-3'
                    >
                        ชำระเงิน
                    </button>
                    <hr />
                </div>
            </div>
        </div>
    );
};

export default CheckOut;
