import React, { useState, useEffect } from 'react';
import { getUserCart, saveAddress, saveOrder, emptyCart } from '../functions/user';
import { useDispatch, useSelector } from 'react-redux';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import QRCode from 'qrcode.react';
import generatePayload from 'promptpay-qr';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const CheckOut = () => {
    const [customerInfo, setCustomerInfo] = useState({
        name: "",
        address: "",
        postalCode: "",
        phoneNumber: "",
    });
    const { user } = useSelector((state) => ({ ...state }));
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState("");
    const [addressSaved, setAddressSaved] = useState(false);
    const [promptPayAmount, setPromptPayAmount] = useState(0); // New state for PromptPay amount
    const [phoneNumber, setPhoneNumber] = useState("097-021-5655");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        getUserCart(user.user.token)
            .then((res) => {
                console.log(res.data);
                setProducts(res.data.products);
                setTotal(res.data.cartTotal);
                setPromptPayAmount(res.data.cartTotal); // Set the PromptPay amount
            });
    }, []);

    const handleSaveAddress = () => {
        console.log(address);
        saveAddress(user.user.token, address)
            .then((res) => {
                console.log(res.data);
                if (res.data.ok) {
                    toast.success('Address Saved');
                    setAddressSaved(true);
                }
            });
    };

    const handleCreateOrder = () => {
        saveOrder(user.user.token)
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
                        <label htmlFor="postalCode" className="form-label">ไปรษณีย์:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="postalCode"
                            value={customerInfo.postalCode}
                            onChange={(e) => handleInputChange("postalCode", e.target.value)}
                        />
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
                    <div style={{ textAlign: 'center' }}>
                        <Title>PromptPay!</Title>
                        <QRCode value={generatePayload(phoneNumber, { total })} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;
