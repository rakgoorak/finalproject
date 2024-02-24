import React, { useState, useEffect } from 'react'
import { readProduct } from '../functions/product'
import { useParams } from 'react-router-dom'
import SingleProductCard from '../card/SingleProductCard'



const Product = () => {
    const param = useParams()
    const [product, setProduct] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        readProduct(param.id)
            .then((res) => {
                setProduct(res.data)
            }).catch((err) => [
                console.log(err.response.data)
            ])
    }

    return (
        <div className='container-fluid' style={{}}>
            <div className='row pt-4'>
                <SingleProductCard product={product} />
            </div>
        </div>
    )
}

export default Product