import React, { useState } from "react";
import Resize from "react-image-file-resizer";
import { useSelector } from "react-redux";
import axios from "axios";
import { Avatar, Badge } from "antd";

const SlipUpload = ({ values, setValues }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [loading, setLoading] = useState(false);

    if (!values.images) {
        setValues({ ...values, images: [] });
    }

    const handleImageUpload = async (file) => {
        try {
            const uri = await resizeImage(file);
            const response = await axios.post(
                `${process.env.REACT_APP_API}/uploadsilp`,
                { image: uri },
                { headers: { authtoken: user.user.token } }
            );
            setLoading(false);
            setValues((prevValues) => ({
                ...prevValues,
                images: [...prevValues.images, response.data],
            }));
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const resizeImage = (file) => {
        return new Promise((resolve, reject) => {
            Resize.imageFileResizer(
                file,
                720,
                720,
                "JPEG",
                100,
                0,
                (uri) => resolve(uri),
                "base64"
            );
        });
    };

    const handleChangeFile = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setLoading(true);
            const uploadPromises = Array.from(files).map((file) =>
                handleImageUpload(file)
            );
            Promise.all(uploadPromises).then(() => {
                // All images have been uploaded
                // Additional logic if needed
                setLoading(false); // เสร็จสิ้นการอัปโหลด ตั้งค่า uploading เป็น false
            });
        }
    };

    const handleRemove = (public_id) => {
        setLoading(true);
        const img = values.images;
        axios
            .post(
                `${process.env.REACT_APP_API}/removesilp`,
                { public_id },
                { headers: { authtoken: user.user.token } }
            )
            .then((res) => {
                setLoading(false);
                const filterImages = img.filter((item) => item.public_id !== public_id);
                setValues((prevValues) => ({ ...prevValues, images: filterImages }));
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };

    return (
        <>
            <br />
            {loading && <div>Loading...</div>} {/* แสดง loading spinner ถ้ากำลังอัปโหลด */}
            {values.images &&
                values.images.map((item) => (
                    <span className="avatar-item" key={item.public_id}>
                        <Badge
                            onClick={() => handleRemove(item.public_id)}
                            style={{ cursor: "pointer" }}
                            count="X"
                        >
                            <Avatar
                                className="m-3"
                                src={item.url}
                                shape="square"
                                size={200}
                                onLoad={() => console.log("Image loaded successfully")}
                            />
                        </Badge>
                    </span>
                ))}
            <div className="form-group">
                <label>
                    <input
                        onChange={handleChangeFile}
                        className="form-control"
                        type="file"
                        multiple
                        accept="image/*"
                        name="file"
                    />
                    <br />
                </label>
            </div>
        </>
    );
};

export default SlipUpload;
