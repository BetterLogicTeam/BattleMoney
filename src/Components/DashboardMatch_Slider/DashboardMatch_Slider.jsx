import React from "react";
import "./DashboardMatch_Slider.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
// import './styles.css';

function DashboardMatch_Slider() {
  return (
    <div>
      <>
        <Swiper
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        pagination={true}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 50,
            },
          }}
        modules={[Autoplay, Pagination]} 
        className="mySwiper">
          <SwiperSlide>
            <div>
                <img src="https://sitethemedata.com/sitethemes/common/front/banners/1693257729678.png" alt="" className="w-100" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
                <img src="https://sitethemedata.com/sitethemes/common/front/banners/1694121756906.png" alt="" className="w-100" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
          
                <img src="https://sitethemedata.com/sitethemes/common/front/banners/1692077913595.jpg" alt="" className="w-100" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
                <img src="	https://sitethemedata.com/sitethemes/common/front/banners/1692077913600.jpg" alt="" className="w-100" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
                <img src="https://sitethemedata.com/sitethemes/common/front/banners/1694119610981.jpg" alt="" className="w-100" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
                <img src="	https://sitethemedata.com/sitethemes/common/front/banners/1692077913604.jpg" alt="" className="w-100" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
                <img src="	https://sitethemedata.com/sitethemes/common/front/banners/1693257729678.png" alt="" className="w-100" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
            <img src="https://sitethemedata.com/sitethemes/common/front/banners/1694119610981.jpg" alt="" className="w-100" />
            </div>
          </SwiperSlide>
        </Swiper>
      </>
    </div>
  );
}

export default DashboardMatch_Slider;
