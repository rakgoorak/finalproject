import React from 'react';
import 'photoswipe/dist/photoswipe.css';
import { Gallery, Item } from 'react-photoswipe-gallery';
import { Link } from 'react-router-dom';

function Reviewproductpage() {
    // รายการรูปภาพ
    const images = [
        { original: "/assets/reviewproduct/rp1.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp2.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp3.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp4.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp5.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp6.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp7.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp8.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp9.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp10.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp11.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp12.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp13.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp14.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp15.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp16.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp17.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp18.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp19.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp20.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp21.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp22.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp23.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp24.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp25.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp26.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp27.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp28.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp29.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp30.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp31.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp32.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp33.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp34.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp35.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp36.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp37.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp38.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp39.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp40.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp41.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp42.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp43.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp44.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewproduct/rp45.jpg", width: 1200, height: 900 },
    ];

    return (
        <div>
            <section className="services" id="reviewproduct">
                <p style={{ textAlign: 'center', marginTop: '50px' }}>
                    <h2>ด้านการทำงาน</h2>
                </p>
                <Gallery>
                    <ul className="cards">
                        {images.map((image, index) => (
                            <li className="card" key={index}>
                                <Item {...image}>
                                    {({ ref, open }) => (
                                        <img ref={ref} onClick={open} src={image.original} alt='' />
                                    )}
                                </Item>
                            </li>
                        ))}
                    </ul>
                </Gallery>
            </section>
            <button className="button">
                <Link to="/review" style={{ textDecoration: 'none', color: 'white' }}>
                    กลับไปหน้าหลัก
                </Link>
            </button>
        </div>
    )
}

export default Reviewproductpage;
