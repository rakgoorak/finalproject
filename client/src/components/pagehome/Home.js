import React from 'react';

function Home() {
    return (
        <div>
            <section
                className="homepage"
                id="home"
                style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/1.jpg"})`,
                }}
            >
                <div className="content">
                    <div className="text">
                        <h1>JS  POWER ELECTRIC </h1>
                        <div className="line"></div>
                        <div className="text2">
                            <h1>LIMITED PARTNERSHIP</h1>
                        </div>
                        <div className="text3">
                            <p>ยินดีต้อนรับ</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
