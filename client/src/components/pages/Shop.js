import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Checkbox } from 'antd';
import { listProduct, searchFilters } from '../functions/product';
import NewProductCard from '../card/NewProductCard';
import { listCategory } from '../functions/Category';
import { cartReducer } from '../store/cartSlice';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0, 0]);
    const { search, cart } = useSelector((state) => ({ ...state }));
    const { text } = search;
    const [categories, setCategories] = useState([]);
    const [categorySelect, setCategorySelect] = useState([]);
    const dispatch = useDispatch();
    const [cartQuantity, setCartQuantity] = useState(0);

    useEffect(() => {
        loadAllData();
        listCategory().then(res => setCategories(res.data));
    }, []);

    useEffect(() => {
        const delay = setTimeout(() => {
            fetchDataFilter({ query: text });
            if (!text) {
                loadAllData();
            }
        }, 300);
        return () => clearTimeout(delay);
    }, [text]);

    useEffect(() => {
        fetchDataFilter({ price });
    }, [price]);

    useEffect(() => {
        setCartQuantity(cart.length);
    }, [cart]);

    const loadAllData = () => {
        setLoading(true);
        listProduct(12)
            .then((res) => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                // Reload the page after 5 seconds if products are not found
                setTimeout(() => {
                    window.location.reload();
                }, 5000);
            });
    };

    const fetchDataFilter = (arg) => {
        searchFilters(arg)
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleCheck = (e) => {
        let inCheck = e.target.value;
        let inState = [...categorySelect];
        let findCheck = inState.indexOf(inCheck);
        if (findCheck === -1) {
            inState.push(inCheck);
        } else {
            inState.splice(findCheck, 1);
        }
        setCategorySelect(inState);
        fetchDataFilter({ category: inState });

        if (inState.length < 1) {
            loadAllData();
        }
    };

    const handleAddtoCart = (product) => {
        dispatch(cartReducer(product));
        window.location.reload();
    };

    const handleSort = (e) => {
        const sortType = e.target.value;
        let sortedProducts = [...products];
        if (sortType === "asc") {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else {
            sortedProducts.sort((a, b) => b.price - a.price);
        }
        setProducts(sortedProducts);
    };

    return (
        <div className='container-fluid'>
            <div className='row' style={{ margin: '50px' }}>
                <div className='col-md-3' style={{ fontSize: '25px' }}>
                    <h6>เรียงลำดับตามราคา</h6>
                    <select onChange={handleSort} style={{ fontSize: '17px' }}>
                        <option value="" style={{ display: 'flex', fontSize: '17px' }}>เรียงลำดับตาม</option>
                        <option value="asc" style={{ display: 'flex', fontSize: '17px' }}>ต่ำไปสูง</option>
                        <option value="desc" style={{ display: 'flex', fontSize: '17px' }}>สูงไปต่ำ</option>
                    </select>
                    <hr />
                    <h6>ค้นหาตามหมวดหมู่</h6>
                    {categories.map((item, index) => (
                        <Checkbox
                            key={index}
                            style={{ fontSize: '20px', display: 'flex' }}
                            onChange={handleCheck}
                            value={item._id}
                        >
                            {item.name}
                        </Checkbox>
                    ))}
                </div >
                <div className='col-md-9'>
                    {loading ? (
                        <h4 className='text-danger'>Loading....</h4>
                    ) : (
                        <>
                            <h4>สินค้า</h4>
                            {products.length < 1 && <p>ไม่พบสินค้า</p>}
                            <div className='shop row pb-5'>
                                {products.map((item, index) => (
                                    <div key={index} className='col-md-4 mt-3'>
                                        <NewProductCard
                                            product={item}
                                            handleAddtoCart={handleAddtoCart}
                                        />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div >
        </div >
    );
};

export default Shop;
