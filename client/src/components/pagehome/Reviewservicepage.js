import React from 'react';
import 'photoswipe/dist/photoswipe.css';
import { Gallery, Item } from 'react-photoswipe-gallery';
import { Link } from 'react-router-dom';

function Reviewserviewpage() {
    // รายการรูปภาพ
    const images = [
        { original: "/assets/reviewservice/rs1.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs2.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs3.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs4.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs5.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs6.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs7.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs8.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs9.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs10.jpg", width: 1200, height: 900 },
    ];

    return (
        <div>
            <section className="services" id="reviewservice">
                <p style={{ textAlign: 'center', marginTop: '50px' }}>
                    <h2>ด้านการให้บริการ</h2>
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

export default Reviewserviewpage;
