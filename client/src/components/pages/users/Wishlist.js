import React, { useState, useEffect } from 'react'
import ResponsiveAppBar from '../../layout/ResponsiveAppBar'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getWishList, removeWishList } from "../../functions/user"
import { Link } from 'react-router-dom'
const Wishlist = () => {
    const [wishlist, setWishList] = useState([])
    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        loadData()
    }, [])
    const loadData = () => {
        getWishList(user.user.token)
            .then((res) => {
                setWishList(res.data.wishlist)
            })
    }
    const handleRemove = (productId) => {
        removeWishList(user.user.token, productId)
            .then((res) => {
                console.log(res.data);
                toast.success('Item removed from wishlist successfully');
                loadData()
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
            <div className='row'>
                <h1>Wishlist </h1>
                {wishlist.map((item, index) =>
                    <div key={index} className='alert alert-secondary'>
                        <Link to={"/product/" + item._id}>
                            {item.name}
                        </Link>
                        <span
                            onClick={() => handleRemove(item._id)}
                            style={{ float: 'right' }}>ลบ</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Wishlist