import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Slider, Checkbox } from 'antd';
//function
import { listProduct, searchFilters } from '../functions/product'
import NewProductCard from '../card/NewProductCard'
import { listCategory } from '../functions/Category';
import Footer from '../pagehome/Footer'

const Shop = () => {
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const [price, setPrice] = useState([0, 0])
    const [ok, setOk] = useState(false)
    const { search } = useSelector((state) => ({ ...state }))
    const { text } = search
    const [category, setCategory] = useState([])
    const [categorySelect, setCategorySelect] = useState([])

    //load All Data
    useEffect(() => {
        loadData()
        listCategory().then(res => setCategory(res.data))
    }, [])
    const loadData = () => {
        setLoading(true)
        listProduct(12)
            .then((res) => {
                setProduct(res.data)
                setLoading(false)
            }).catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }
    //load text
    useEffect(() => {
        const delay = setTimeout(() => {
            fetchDataFilter({ query: text })
            if (!text) {
                loadData()
            }
        }, 300)
        return () => clearTimeout(delay)
    }, [text])
    const fetchDataFilter = (arg) => {
        searchFilters(arg)
            .then((res) => {
                setProduct(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }
    // load slider
    useEffect(() => {
        fetchDataFilter({ price })
    }, [ok])
    const handlePrice = (value) => {
        setPrice(value)
        setTimeout(() => {
            setOk(!ok)
        }, 300)

    }
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
        fetchDataFilter({ category: inState })

        // Fetch data with updated filters
        if (inState.length < 1) {
            loadData()
        }
    };

    return (
        <>
            <div className='container-fluid'>
                <div className='row' style={{ margin: '50px' }}>
                    <div className='col-md-3'>
                        Filter / Search
                        <hr />
                        <h4>ค้นหาด้วยราคาสินค้า</h4>
                        <Slider
                            value={price}
                            onChange={handlePrice}
                            range max={100000} />
                        <hr />
                        <h4>ค้นหาตามหมวดหมู่สินค้า</h4>
                        {category.map((item, index) =>
                            <Checkbox
                                onChange={handleCheck}
                                value={item._id}
                            >
                                {item.name}
                            </Checkbox>
                        )}
                    </div>
                    <div className='col-md-9'>
                        {loading
                            ? <h4 className='text-danger'>Loading....</h4>
                            : <h4 >Product</h4>
                        }

                        {product.length < 1 && <p>No Product found</p>}

                        <div className='row pb-5'>
                            {product.map((item, index) =>
                                <div key={index} className='col-md-4 mt-3'>
                                    <NewProductCard product={item} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Shop