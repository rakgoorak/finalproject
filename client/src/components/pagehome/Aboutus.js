import SimpleGallery from '../../components/SimpleGallery'
import 'photoswipe/dist/photoswipe.css'

function Aboutus() {
  return (
    <>
      <div className="about-us" id='about'>
        <div className="image-container1">
          <SimpleGallery
            galleryID="my-test-gallery"
            images={[
              {
                largeURL:
                  '/assets/h2.jpg',
                thumbnailURL:
                  '/assets/h2.jpg',
                width: 1920,
                height: 1080,
              },
            ]}
          />
        </div>
        <div className="content1">
          <h2>เกี่ยวกับเรา</h2>
          <p>ห้างหุ้นส่วนจำกัด เจ.เอส เพาว์เวอร์ อีเลคทริค
            จำหน่ายอุปกรณ์ไฟฟ้าแรงสูงทุกชนิด เป็นตัวแทนจำหน่ายสายไฟบางกอก อุปกรณ์ประกอบเสาและอุปกรณ์ไฟฟ้าอื่นๆอีกมากมายในราคาโรงงาน และรับติดตั้งหม้อแปลงระบบ 22,33 KV และ 115 KV การันตีคุณภาพด้วยการดำเนินธุรกิจมามากกว่า 10 ปีและให้บริการลูกค้ามาแล้วทั่วประเทศไทย
          </p>
          <h3>หากท่านกำลังมองหาสินค้าคุณภาพในราคาโรงงานพร้อมทั้งบริการที่ประทับใจ เราพร้อมให้บริการ</h3>
        </div>
      </div>
    </>
  )
}

export default Aboutus;
