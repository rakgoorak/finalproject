import React, { useState, useEffect } from 'react';
import { listProductBy } from '../functions/product';
import NewProductCard from '../card/NewProductCard';
import LoadingCard from '../card/LoadingCard';

const BastSeller = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setLoading(true);
        listProductBy("sold", "desc", 3)
            .then(res => {
                setLoading(false);
                setProducts(res.data);
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            });
    };

    return (
        <>
            <div className='container'>
                {loading ? (
                    <LoadingCard count={4} />
                ) : (
                    <div className='row'>
                        {products.map((item, index) => (
                            <div className='col-md-4' key={index}>
                                <NewProductCard product={item} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default BastSeller
