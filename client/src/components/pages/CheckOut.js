import React, { useState, useEffect } from "react";
import {
    getUserCart,
    saveOrder,
    emptyCart,
    listAddress,
    editAddress,
    removeAddress,
} from "../functions/user";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SlipUpload from "./SlipUpload";
import QRCode from "qrcode.react";
import './CheckOut.css';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CreateAddress1 from '../address/CreateAddress1'

const style = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '500px',
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
};

const Checkout = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [error, setError] = useState("");
    const [sliptFile, setSliptFile] = useState(null);
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({
        fulladdress: {
            houseNumber: "",
            subdistrict: "",
            district: "",
            province: "",
            zipcode: "",
        },
        name: "",
        phoneNumber: "",
        images: [],
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        getUserCart(user.user.token).then((res) => {
            setProducts(res.data.products);
            setTotal(res.data.cartTotal);
        });
    }, [user.user.token]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await listAddress(user.user.token, user.user.user_id);
                const responseData = res.data;

                if (Array.isArray(responseData)) {
                    setAddresses(responseData);
                } else {
                    console.error("Invalid response format. Expected an array.");
                    setError("ยังไม่มีที่อยู่ของท่าน โปรดสร้างที่อยู่ใหม่");
                }

                setLoading(false);
            } catch (err) {
                console.error("Error fetching addresses:", err);
                setError("ยังไม่มีที่อยู่ของท่าน โปรดสร้างที่อยู่ใหม่");
                setLoading(false);
            }
        };

        loadData();
    }, [user.user.token, user.user.user_id]);

    const loadData = () => {
        listAddress(user.user.token, user.user.user_id)
            .then((res) => {
                console.log("res", res);
                const responseData = res.data;

                if (Array.isArray(responseData)) {
                    setAddresses(responseData);
                } else {
                    console.error("Invalid response format. Expected an array.");
                    setError("Error fetching addresses. Please try again.");
                }

                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching addresses:", err);
                setError("Error fetching addresses. Please try again.");
                setLoading(false);
            });
    };

    const handleAddressSelect = (selectedAddress) => {
        setValues(selectedAddress);
        setSelectedAddress(selectedAddress);
    };
    console.log("address", selectedAddress);

    const handleRemoveAddress = async (id) => {
        try {
            const confirmDelete = window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบที่อยู่นี้?");

            if (confirmDelete) {
                await removeAddress(user.user.token, id);
                toast.success("ลบที่อยู่เรียบร้อยแล้ว");
                const res = await listAddress(user.user.token, user.user.user_id);
                setAddresses(res.data);
            }
        } catch (error) {
            console.error("Error removing address:", error);
            toast.error("เกิดข้อผิดพลาดในการลบที่อยู่");
        }
    };


    const onNext = async (e) => {
        e.preventDefault();

        if (page === 0) {
            if (selectedAddress !== null) {
                setPage(page + 1);
            } else {
                toast.error("โปรดเลือกที่อยู่ก่อนทำการชำระเงิน");
            }
        } else {
            try {
                await saveOrder(user.user.token, {
                    values,
                    products,
                });

                // emptyCart(user.user.token);
                dispatch({
                    type: "ADD_TO_CART",
                    payload: [],
                });

                toast.success("สั่งซื้อสำเร็จ");
                navigate('/user/history');
            } catch (error) {
                console.error("Error during checkout:", error);
                toast.error("เกิดข้อผิดพลาดโปรดทำรายการอีกครั้ง");
            }
        }
    };

    const generatePayload = require("promptpay-qr");
    const Title = styled.h1`
    font-size: 3em;
    text-align: center;
    color: palevioletred;
    margin-bottom: 20px;
  `;

    const Container = styled.div`
    max-height: 100vh;
    padding: 4em;
    background: papayawhip;
  `;

    const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  `;

    const QRWrapper = styled.div`
    margin: auto;
    text-align: center;
    padding: 20px;
    background-color: white;
    border: 2px solid palevioletred;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  `;

    const InputWrapper = styled.div`
    margin: auto;
    text-align: center;
    padding: 20px;
  `;

    const [promptpay, setPromptPay] = useState("062-671-8672");
    const [qrCode, setQRCode] = useState((total * 1.07).toFixed(2));
    const [totalWithVat, setTotalWithVat] = useState(0);

    useEffect(() => {
        setTotalWithVat(total * 1.07);
        handleQR();
    }, [total]);

    function handleQR() {
        const newQRCode = generatePayload(promptpay, totalWithVat.toFixed(2));
        setQRCode(newQRCode);
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        loadData();
    };

    return (
        <div className='container-fluid'>
            <div className='row' style={{ margin: '50px' }}>
                <div className="col-md-6">
                    <div className="checkout-container" style={{ maxWidth: '100%' }}>
                        <div className="checkout-section">
                            <div className="checkout-content" style={{ width: '450px' }}>
                                <div className="checkout-header" style={{ margin: '0', width: '450px' }}>
                                    <div className={`header-tab ${page === 0 ? "active" : ""}`}>
                                        กรอกที่อยู่
                                    </div>
                                    <div className={`header-tab ${page === 1 ? "active" : ""}`}>
                                        ชำระค่าสินค้า
                                    </div>
                                </div>
                                {error && (<div className="error-message">{error}</div>
                                )}
                                {page === 0 ? (
                                    <>
                                        <Button style={{ marginTop: '10px', marginBottom: '10px' }} onClick={handleOpen}>+ เพิ่มที่อยู่</Button>
                                        <Modal
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={style}>
                                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                                    <CreateAddress1 handleClose={handleClose} loadData={loadData} />
                                                </Typography>
                                            </Box>
                                        </Modal>
                                        <div>
                                            {addresses.slice(0, 3).map((address) => (
                                                <div
                                                    key={address._id}
                                                    onClick={() => handleAddressSelect(address)}
                                                    style={{
                                                        border:
                                                            selectedAddress === address
                                                                ? "2px solid pink"
                                                                : "none",
                                                        padding: "5px",
                                                        margin: "5px",
                                                        cursor: "pointer",
                                                        marginTop: "10px",
                                                    }}
                                                >
                                                    <div style={{ fontSize: '16px' }}>
                                                        {`${address.name}|${address.phoneNumber}`}
                                                        <br />
                                                        {`${address.fulladdress.houseNumber}`}
                                                        <br />
                                                        {`${address.fulladdress.subdistrict}, ${address.fulladdress.district}, ${address.fulladdress.province}, ${address.fulladdress.zipcode}`}
                                                    </div>
                                                    <Button danger ghost
                                                        onClick={() => handleRemoveAddress(address._id)}
                                                        style={{ marginTop: "10px", marginBottom: '10px' }}
                                                    >
                                                        ลบที่อยู่
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <div className="payment-section">
                                        <Container>
                                            <Title>ชำระเงินที่นี้</Title>
                                            <FlexContainer>
                                                <QRWrapper>
                                                    <QRCode value={qrCode} />
                                                    <InputWrapper>
                                                        <p>ชื่อบัญชี อาทิตยา ฆารเลิศ</p>
                                                        <p>โปรดตรวจสอบจำนวนเงินให้ถูกต้องก่อนทำรายการ <p style={{ color: 'blue' }}>จำนวนเงิน {(total * 1.07).toFixed(2)} บาท</p></p>
                                                    </InputWrapper>
                                                </QRWrapper>
                                            </FlexContainer>
                                        </Container>
                                        <p id='image-preview'></p>
                                        <div className="upload-slip-section">
                                            <label htmlFor="slipt" className="upload-slip-btn">
                                                {sliptFile ? (
                                                    <img src={sliptFile} alt="Uploaded Slip" />
                                                ) : (
                                                    <div className="upload-slip-text">
                                                        <SlipUpload values={values} setValues={setValues} loading={loading} setLoading={setLoading} />
                                                        อัพโหลดสลิป
                                                    </div>
                                                )}
                                            </label>
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
                <div className="col-md-6" style={{ marginTop: '35px', fontSize: '21px' }}>
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
                    ราคา: <b>{total}</b> บาท
                    <hr />
                    <p>ราคาสุทธิ: <b>{(total * 1.07).toFixed(2)}</b> บาท (รวม Vat 7%)</p>
                </div>
            </div>
        </div>
    );
};

export default Checkout;