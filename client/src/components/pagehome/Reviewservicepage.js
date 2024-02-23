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
        { original: "/assets/reviewservice/rs11.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs12.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs13.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs14.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs15.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs16.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs17.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs18.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs19.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs20.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs21.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs22.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs23.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs24.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs25.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs26.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs27.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs28.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs29.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs30.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs31.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs32.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs33.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs34.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs35.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs36.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs37.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs38.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs39.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs40.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs41.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs42.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs43.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs44.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs45.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs46.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs47.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs48.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs49.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs50.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs51.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs52.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs53.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs54.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs55.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs56.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs57.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs58.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs59.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs60.jpg", width: 1200, height: 900 },
        { original: "/assets/reviewservice/rs61.jpg", width: 1200, height: 900 },
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
