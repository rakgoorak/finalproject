import React, { useState } from 'react';
import { Card, Modal } from 'antd';

const SlipCard = ({ order }) => {
    const { images } = order;
    const [modalVisible, setModalVisible] = useState(false);

    const showModal = () => {
        setModalVisible(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    return (
        <>
            <Card
                hoverable
                style={{ width: 240 }}
                cover={<img
                    className='m-2'
                    style={{ height: "300px", objectFit: "cover" }}
                    alt="example" src={images && images.length ? images[0].url : ""} />}
                onClick={showModal}
            >
            </Card>
            <Modal
                visible={modalVisible}
                onCancel={handleCancel}
                footer={null}
                width={500}
            >
                <img
                    alt="example"
                    style={{ width: '100%' }}
                    src={images && images.length ? images[0].url : ""}
                />
            </Modal>
        </>
    );
};

export default SlipCard;
