import React from 'react';
import Map from './Map'
import Footer from './Footer';

const Contact = () => {
    return (
        <>
            <section className="contact" id="contact">
                <h2>ติดต่อสั่งซื้อหรือสอบถามรายละเอียดเพิ่มเติม</h2>
                <div className="contacth2">
                    <h2>หจก.เจ.เอส เพาว์เวอร์ อีเลคทริค</h2>
                </div>
                <div className="row">
                    <div className="col information">
                        <Map />
                        <div className="contact-details">
                            <div className='icon-contact'>
                                <i class="fa fa-map-marker "></i>{" "}
                                <span>
                                    ที่อยู่
                                </span>
                            </div>
                            <div className='text-contact'>
                                <p>
                                    ห้างหุ้นส่วนจำกัด เจ.เอส เพาว์เวอร์ อีเลคทริค<br></br>ที่ตั้ง 53/24 หมู่ที่ 2 ตำบลไร่ขิง อำเภอสามพราน <br></br>จังหวัดนครปฐม 73210
                                </p>
                            </div>
                            <div className='icon-contact'>
                                <i className="fa-solid fa-phone"></i>
                                <span>เบอร์โทร</span>
                            </div>
                            <div className='text-contact'>
                                <p>คุณ เจริญ(เจ้าของบริษัท) โทร: 089-2021733 , 034-318334 , 0861606142
                                    <br></br>แฟกซ์ โทร: 034-318335
                                </p>
                            </div>
                            <div className='icon-contact'>
                                <i className="fa-solid fa-envelope"></i>
                                <span>อีเมล</span>
                            </div>
                            <div className='text-contact'>
                                <p>jspower.etc@gmail.com</p>
                            </div>
                            <div className='icon-contact'>
                                <i className="fa-solid fa-clock"></i>
                                <span>เวลาเปิดทำการ</span>
                            </div>
                            <div className='text-contact'>
                                <p>เปิดทำการทุกวัน 8:30 - 18:30 น.
                                </p>
                            </div>
                            <div className="lineimage">
                                <div className="lineimage1">
                                    <img src='/assets/line1.jpg' alt='' />
                                    <p>ติดต่อ คุณเจริญ</p>
                                </div>
                                <div className="lineimage2">
                                    <img src='/assets/line.jpg' alt='' />
                                    <p>ติดต่อ คุณฐานิต</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </section >
            <Footer />
        </>
    );
}

export default Contact;
