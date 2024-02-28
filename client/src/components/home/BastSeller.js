import React, { useState, useEffect } from 'react';
import { listProductBy } from '../functions/product';
import NewProductCard from '../card/NewProductCard';
import LoadingCard from '../card/LoadingCard';

const BestSeller = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setLoading(true);
        listProductBy("sold", "desc", 8)
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
        <div className='BastSeller'>
            {loading ? (
                <LoadingCard count={4} />
            ) : (
                <div className='productrow'>
                    {products.map((item) => (
                        <div className='productimage'>
                            <NewProductCard product={item} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default BestSeller;
