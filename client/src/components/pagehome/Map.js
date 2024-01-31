// MapComponent.js
import React from 'react';

const Map = () => {
  const mapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.670912140419!2d100.25945209999999!3d13.7383631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2eb066732af43%3A0xcb8579f241214411!2z4Lir4LiI4LiBLiDguYDguIgu4LmA4Lit4LiqIOC5gOC4nuC4suC4p-C5jOC5gOC4p-C4reC4o-C5jCDguK3guLXguYDguKXguITguJfguKPguLTguIQ!5e0!3m2!1sth!2sth!4v1688833270289!5m2!1sth!2sth';

  return (
    <div className='container'>
      <iframe className='responsive-ifram'
        title="Google Maps"
        width="100%"
        height="300"
        loading="lazy"
        allowfullscreen
        src={mapUrl}
      ></iframe>
    </div>
  );
};

export default Map;
