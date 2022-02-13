import * as React from "react";
import { useState, useEffect } from "react";
import { useInterval } from "../utils/useInterval";
import "../styles/Banner.scss";

function Banner() {
  const bannerImage = [
    "https://edit-edition.com/images/m-1.jpg",
    "https://edit-edition.com/web/upload/NNEditor/20211110/03_shop1_201805.jpg",
    "https://edit-edition.com/web/upload/NNEditor/20211110/12_shop1_201806.jpg",
  ];

  const [bannerIndex, setBannerIndex] = useState<number>(0);
  const [bannerChangeFlag, setBannerChangeFlag] = useState<boolean>(true);

  const handleLeftBtnClick = (e: React.MouseEvent) => {
    setBannerIndex(
      bannerIndex === 0
        ? bannerImage.length - 1
        : (bannerIndex - 1) % bannerImage.length,
    );
  };

  const handleRightBtnClick = (e: React.MouseEvent) => {
    setBannerIndex((bannerIndex + 1) % bannerImage.length);
  };

  const handleDotClick = (e: React.MouseEvent) => {
    const index = e.currentTarget.getAttribute("data-index");

    setBannerIndex(index ? Number(index) : 0);
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    setBannerChangeFlag(false);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    setBannerChangeFlag(true);
  };

  useInterval(
    () => {
      if (bannerChangeFlag) {
        setBannerIndex((bannerIndex + 1) % bannerImage.length);
      }
    },
    { time: 3000 },
  );

  return (
    <div className="banner">
      {bannerImage.map((image, index) => {
        return (
          <div
            className={`banner__image ${
              bannerIndex === index ? "active" : null
            }`}
            key={index}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <a href="" style={{ background: `url(${image})` }}></a>
          </div>
        );
      })}
      <div className="banner__leftBtn" onClick={handleLeftBtnClick}></div>
      <div className="banner__rightBtn" onClick={handleRightBtnClick}></div>
      <ul className="banner__dots">
        {bannerImage.map((image, index) => {
          return (
            <li key={index}>
              <button
                className={bannerIndex === index ? "active" : undefined}
                data-index={index}
                onClick={handleDotClick}
              ></button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Banner;
