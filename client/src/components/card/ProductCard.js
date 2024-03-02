import React from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const ProductCard = ({ product, handleRemove }) => {
    const { _id, name, detail, images, price } = product;

    return (
        <Card
            hoverable
            style={{ width: 240 }}
            cover={<img
                className='m-2'
                style={{ height: "150px", objectFit: "cover" }}
                alt="example" src={images && images.length ? images[0].url : ""} />}
            actions={[
                <Link to={'/admin/update-product/' + _id}>
                    <EditOutlined key="edit" className='text-warning' />
                </Link>,
                <DeleteOutlined
                    onClick={() => handleRemove(_id)}
                    key="delete" className='text-danger' />,
            ]}
        >
            <Meta
                title={
                    <span style={{ color: '#1890FF' }}>{name}</span>
                }
                description={
                    <>
                        <span style={{ color: '#00171F' }}>{detail}</span>
                        <br />
                        <span style={{ color: '#2E67B1' }}>฿{price}</span>
                    </>
                }
            />
        </Card>
    );
}

export default ProductCard;
