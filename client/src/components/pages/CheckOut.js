import React, { useState, useEffect } from 'react';
import { getUserCart, saveAddress, saveOrder, emptyCart, savePhoneNumber, saveName } from '../functions/user';
import { useDispatch, useSelector } from 'react-redux';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AddressForm from '../address/AddressForm';
import axios from 'axios';
import './CheckOut.css';

const Checkout = () => {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [subdistrict, setSubDistrict] = useState("");
    const [district, setDistrict] = useState("");
    const [province, setProvince] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [fullAddress, setFullAddress] = useState({});
    const [forOthers, setForOthers] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [addressSaved, setAddressSaved] = useState(false);
    const [error, setError] = useState("");
    const [page, setPage] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onNext = async (e) => {
        e.preventDefault();

        if (!houseNumber || !subdistrict || !district || !province || !zipcode) {
            setError("กรอกข้อมูลไม่ครบ");
            return;
        }

        if (page === 0) {
            setPage(page + 1);
        } else {
            try {
                // Save order
                await saveOrder(user.user.token);
                emptyCart(user.user.token);
                dispatch({
                    type: 'addToCart',
                    payload: [],
                });
                if (typeof window !== "undefined") {
                    localStorage.removeItem("cart");
                }
                toast.success("Save Order Success");

                // Save address
                const addressRes = await saveAddress(user.user.token, fullAddress);

                if (addressRes.data.ok) {
                    toast.success('Address Saved');
                    setAddressSaved(true);
                } else {
                    toast.error('Failed to save address. Please try again.');
                    return;
                }

                // Save phone number and name
                const phoneRes = await savePhoneNumber(user.user.token, phoneNumber);
                const nameRes = await saveName(user.user.token, name);
                console.log(nameRes.data);
                console.log(phoneRes.data);
                if (phoneRes.data.ok && nameRes.data.ok) {
                    toast.success('Phone Number and Name Saved');
                } else {
                    toast.error('Failed to save phone number and name. Please try again.');
                }

                // Redirect to history page
                navigate('/user/history');
            } catch (error) {
                console.error('Error during checkout:', error);
                toast.error('Error during checkout. Please try again.');
            }
        }
    };

    useEffect(() => {
        getUserCart(user.user.token)
            .then((res) => {
                console.log(res.data);
                setProducts(res.data.products);
                setTotal(res.data.cartTotal);
                handlePayment(); // เรียกใช้งานฟังก์ชัน handlePayment เพื่อทำการชำระเงินอัตโนมัติ
            });
    }, [user.user.token]);


    function onSelect(fulladdress) {
        const { subdistrict, district, province, zipcode } = fulladdress;
        setSubDistrict(subdistrict);
        setDistrict(district);
        setProvince(province);
        setZipcode(zipcode);
        setFullAddress({ houseNumber, subdistrict, district, province, zipcode });
        setError("");
        console.log("some fulladdress: ", fullAddress);
    }

    // PromptPayment
    const [promptPayNumber, setPromptPayNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);

    const handlePayment = async () => {
        setLoading(true);
        try {
            const response = await axios.post('YOUR_PROMPTPAY_API_ENDPOINT', {
                promptPayNumber,
                amount,
                message
            });
            setResponse(response.data);
        } catch (error) {
            console.error('Error making payment:', error);
            setResponse(null);
        }
        setLoading(false);
    };

    return (
        <div className='container-fluid'>
            <div className='row' style={{ margin: '50px' }}>
                <div className="col-md-6">
                    <div className="checkout-container">
                        <div className="checkout-section">
                            <div className="checkout-content">
                                <div className="checkout-header">
                                    <div
                                        className={`header-tab ${page === 0 ? 'active' : ''}`}
                                    >
                                        กรอกที่อยู่
                                    </div>
                                    <div
                                        className={`header-tab ${page === 1 ? 'active' : ''}`}
                                    >
                                        ชำระค่าสินค้า
                                    </div>
                                </div>
                                {error && (
                                    <div className="error-message">{error}</div>
                                )}

                                {page === 0 ? (
                                    <AddressForm
                                        name={name}
                                        setName={setName}
                                        phone={phoneNumber}
                                        setPhone={setPhoneNumber}
                                        setError={setError}
                                        houseNumber={houseNumber}
                                        setHouseNumber={setHouseNumber}
                                        subdistrict={subdistrict}
                                        setSubDistrict={setSubDistrict}
                                        district={district}
                                        setDistrict={setDistrict}
                                        province={province}
                                        setProvince={setProvince}
                                        zipcode={zipcode}
                                        setZipcode={setZipcode}
                                        fullAddress={fullAddress}
                                        setFullAddress={setFullAddress}
                                        onSelect={onSelect}
                                        setForOthers={setForOthers}
                                        forOthers={forOthers}
                                    />
                                ) : (
                                    <div className="payment-section">
                                        <div>
                                            <input type="number" placeholder="ราคา" value={total} onChange={e => setAmount(e.target.value)} />
                                            <input type="text" placeholder="เบอร์โทรศัพท์" value={"0970215655"} onChange={e => setPhoneNumber(e.target.value)} />
                                            <input type="text" placeholder="ข้อความ" value={message} onChange={e => setMessage(e.target.value)} />
                                            <button onClick={handlePayment} disabled={loading}>Make Payment</button>

                                            {loading && <p>Loading...</p>}
                                            {response && (
                                                <div>
                                                    <p>Payment Status: {response.status}</p>
                                                    <p>Transaction ID: {response.transactionId}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div
                                    className="payment-button"
                                    onClick={onNext}
                                >
                                    ชำระเงิน
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6" style={{ marginTop: '35px', fontSize: '20px' }}>
                    <h4>ข้อมูลสินค้าทั้งหมด</h4>
                    <hr />
                    <p>จำนวนสินค้า: {products.length} ชิ้น</p>
                    <hr />
                    <p>รายการสินค้า</p>
                    {products.map((item, i) => (
                        <div key={i}>
                            <p>
                                {item.name} x {item.count} = {item.price * item.count}
                            </p>
                        </div>
                    ))}
                    <hr />
                    ราคาสุทธิ: <b>{total}</b>
                    <br />
                    <hr />
                </div>
            </div>
        </div>
    );
};

export default Checkout;