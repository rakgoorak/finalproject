import React, { useState, useEffect } from 'react';
import { listProductBy } from '../functions/product';
import NewProductCard from '../card/NewProductCard';
import LoadingCard from '../card/LoadingCard';

const NewProduct = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setLoading(true);
        listProductBy("createdAt", "desc", 8)
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
            <div className='NewProduct'>
                {loading ? (
                    <LoadingCard count={4} />
                ) : (
                    <div className='productrow'>
                        {products.map((item, index) => (
                            <div className='productimage' key={index}>
                                <NewProductCard product={item} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default NewProduct;
