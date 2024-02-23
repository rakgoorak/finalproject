import React from 'react'
import Resize from 'react-image-file-resizer'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Avatar, Badge } from 'antd';

const SlipUpload = ({ values, setValues, loading, setLoading }) => {
    const { user } = useSelector((state) => ({ ...state }))
    const handleChangeFile = (e) => {
        const files = e.target.files
        if (files) {
            setLoading(true)
        }
        if (files) {
            setLoading(true)
            let allfileUpload = values.images
            for (let i = 0; i < files.length; i++) {
                Resize.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (uri) => {
                        axios.post(process.env.REACT_APP_API + '/uploadsilp', {
                            image: uri
                        }, {
                            headers: {
                                authtoken: user.user.token,
                            }
                        }).then(res => {
                            setLoading(false)
                            allfileUpload.push(res.data)
                            setValues({ ...values, images: allfileUpload })
                        }).catch(err => {
                            setLoading(false)
                            console.log(err)
                        })
                    },
                    "base64"
                )
            }
        }
    }
    const handleRemove = (public_id) => {
        setLoading(true)
        const img = values.images
        axios.post(process.env.REACT_APP_API + '/removesilp',
            { public_id },
            {
                headers: {
                    authtoken: user.user.token
                }
            }
        ).then(res => {
            setLoading(false)
            let filterImages = img.filter(item => {
                return item.public_id !== public_id
            })
            setValues({ ...values, images: filterImages })
        }).catch(err => {
            setLoading(false)
            console.log(err)
        })
    }
    return (
        <>
            <br />
            {values.images && values.images.map(item =>
                <span className='avatar-item'>
                    <Badge
                        onClick={() => handleRemove(item.public_id)}
                        style={{ cursor: 'pointer' }}
                        count="X">
                        <Avatar className="m-3" src={item.url} shape="square" size={200} />
                    </Badge>
                </span>
            )}
            <div className='form-group'>
                <label>
                    <input
                        onChange={handleChangeFile}
                        className='form-control'
                        type='file'
                        multiple
                        accept='image/*'
                        name='file'
                    />
                    <br />
                </label>
            </div>
        </>
    )
}

export default SlipUpload
