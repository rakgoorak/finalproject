import React, { useState, useEffect } from 'react';
import { getUserCart, saveAddress, saveOrder, emptyCart } from '../functions/user';
import { useDispatch, useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify'

const CheckOut = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState("")
    const [addressSaved, setAddressSaved] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        getUserCart(user.user.token)
            .then(res => {
                console.log(res.data);
                setProducts(res.data.products);
                setTotal(res.data.cartTotal);
            })
    }, []);
    const handleSaveAddress = () => {
        console.log(address)
        saveAddress(user.user.token, address)
            .then(res => {
                console.log(res.data)
                if (res.data.ok) {
                    toast.success('Address Saved')
                    setAddressSaved(true)
                }
            })
    }
    const handleCreateOrder = (id) => {
        saveOrder(user.user.token)
            .then(res => {
                console.log()
                emptyCart(user.user.token, id)
                dispatch({
                    type: 'addToCart',
                    payload: []
                })
            })
    }
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className="col-md-6">
                    <h4>ที่อยู่</h4>
                    <br />
                    <ReactQuill value={address} onChange={setAddress} />
                    <button
                        className='btn btn-primary mt-2'
                        onClick={handleSaveAddress}>บันทึกข้อมูล</button>
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
                        className='btn btn-primary mt-3'>ชำระเงิน</button>
                </div>
            </div>
        </div >
    );
};

export default CheckOut;
