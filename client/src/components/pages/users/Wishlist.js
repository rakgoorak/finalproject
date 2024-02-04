import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getWishList, removeWishList } from "../../functions/user";
import { Link } from 'react-router-dom';

const Wishlist = () => {
    const [wishlist, setWishList] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        getWishList(user.user.token)
            .then((res) => {
                setWishList(res.data.wishlist);
            })
            .catch((error) => {
                console.error('Error loading wishlist:', error);

                if (error.response && error.response.status === 401) {
                    toast.error('Unauthorized access. Please log in.');
                } else {
                    toast.error('Failed to load wishlist');
                }
            });
    };

    const handleRemove = (productId) => {
        removeWishList(user.user.token, productId)
            .then((res) => {
                console.log(res.data);
                toast.success('Item removed from wishlist successfully');
                loadData();
            })
            .catch((error) => {
                console.error('Error removing item from wishlist:', error);

                if (error.response && error.response.status === 401) {
                    toast.error('Unauthorized access. Please log in.');
                } else {
                    toast.error('Failed to remove item from wishlist');
                }
            });
    };

    return (
        <div className='col'>
            <div className='row' style={{ margin: '50px' }}>
                <h1>สินค้าที่ชอบ</h1>
                {wishlist.map((item, index) => (
                    <div key={index} className='alert alert-secondary'>
                        <Link to={"/product/" + item._id} style={{ marginLeft: '30px', textDecoration: 'none', fontSize: '25px' }}>
                            {item.name}
                        </Link>
                        <button className="btn btn-outline-primary"
                            onClick={() => handleRemove(item._id)}
                            style={{ margin: '0 50px', float: 'right', cursor: 'pointer' }}>
                            ลบ
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
