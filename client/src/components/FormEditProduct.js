import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { read, update } from '../functions/product';

const FormEditProduct = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState({
        id: '',
        name: '',
        detail: '',
    });
    const [fileold, setFileOld] = useState('');

    useEffect(() => {
        loadData(params.id);
    }, []);

    const loadData = async (id) => {
        read(id)
            .then((res) => {
                setData(res.data);
                setFileOld(res.data.file);
            });
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'file') {
            const file = files[0];
            setFileOld(fileold); // Reset fileold to the current file
            setData({
                ...data,
                [name]: file,
            });
        } else {
            setData({
                ...data,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);
        update(params.id, data)
            .then((res) => {
                console.log(res);
                navigate('/');
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            EditProduct

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="id"
                    onChange={handleChange}
                    placeholder="id"
                    value={data.id}
                /> <br />

                <input
                    type="text"
                    name="name"
                    placeholder="name"
                    value={data.name}
                    onChange={handleChange}
                /><br />

                <input
                    type="text"
                    name="detail"
                    placeholder="detail"
                    value={data.detail}
                    onChange={handleChange}
                />
                <br />
                <input
                    type="file"
                    name="file"
                    placeholder="file"
                    onChange={handleChange}
                />
                <br />
                <input
                    type="text"
                    name="price"
                    onChange={handleChange}
                    placeholder="id"
                    value={data.price}
                />
                <br />
                <button>ส่ง</button>
            </form>

        </div>
    );
};

export default FormEditProduct;
