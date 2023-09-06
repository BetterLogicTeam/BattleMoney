import React, { Component } from "react";
import Slider from "react-slick";
import dp1 from '../Assets/doll1.png'
import dp2 from '../Assets/doll2.png'
import dp3 from '../Assets/doll3.png'

export default class VerticalSwipeToSlide extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      vertical: true,
      autoplay: true,
      autoplaySpeed: 2000,
      verticalSwiping: true,
      swipeToSlide: true,
      beforeChange: function(currentSlide, nextSlide) {
        console.log("before change", currentSlide, nextSlide);
      },
      afterChange: function(currentSlide) {
        console.log("after change", currentSlide);
      }
    };
    return (
      <div className="mt-3 rightSldR">
        <Slider {...settings}>
          <div className="text-center">
            <div>
                <img src={dp1} alt="" className="w-100" />
            </div>
          </div>
          <div className="text-center">
          <div>
                <img src={dp2} alt="" className="w-100" />
            </div>
          </div>
          <div className="text-center">
          <div>
                <img src={dp3} alt="" className="w-100" />
            </div>
          </div>
          <div className="text-center">
            <div>
                <img src={dp1} alt="" className="w-100" />
            </div>
          </div>
          <div className="text-center">
          <div>
                <img src={dp2} alt="" className="w-100" />
            </div>
          </div>
          <div className="text-center">
          <div>
                <img src={dp3} alt="" className="w-100" />
            </div>
          </div>
          
        </Slider>
      </div>
    );
  }
}