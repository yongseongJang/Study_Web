import * as React from "react";
import "../styles/Banner.scss";

function Banner() {
  const bannerImage = [
    "https://edit-edition.com/images/m-1.jpg",
    "https://edit-edition.com/web/upload/NNEditor/20211110/3_shop1_201219.jpg",
    "https://edit-edition.com/web/upload/NNEditor/20211110/31_shop1_201222.jpg",
  ];
  return (
    <div className="banner-wrap">
      {bannerImage.map((image, index) => {
        return (
          <div className="banner-wrap__image" key={index}>
            <a href="" style={{ background: `url(${image})` }}></a>
          </div>
        );
      })}
    </div>
  );
}

export default Banner;
