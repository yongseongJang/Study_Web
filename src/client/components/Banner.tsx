import * as React from "react";
import { useState, useEffect } from "react";
import { useInterval } from "../utils/useInterval";
import "../styles/Banner.scss";

function Banner() {
  const bannerImage = [
    "https://edit-edition.com/web/upload/NNEditor/20211111/07_shop1_110000.jpg",
    "https://edit-edition.com/web/upload/NNEditor/20211111/17_shop1_110001.jpg",
    "https://edit-edition.com/web/upload/NNEditor/20211110/maui_16_shop1_202625.jpg",
    "https://edit-edition.com/web/upload/NNEditor/20211111/07_shop1_110000.jpg",
    "https://edit-edition.com/web/upload/NNEditor/20211111/17_shop1_110001.jpg",
    "https://edit-edition.com/web/upload/NNEditor/20211110/maui_16_shop1_202625.jpg",
    "https://edit-edition.com/web/upload/NNEditor/20211111/07_shop1_110000.jpg",
  ];

  const [direction, setDirection] = useState<string>("right");
  const [bannerIndex, setBannerIndex] = useState<number>(4);
  const [bannerChangeFlag, setBannerChangeFlag] = useState<boolean>(true);
  const time =
    (bannerIndex === 1 && direction === "right") ||
    (bannerIndex === 3 && direction === "left")
      ? 0
      : 3000;

  useEffect(() => {
    if (bannerIndex === bannerImage.length - 2) {
      setBannerIndex(1);
    }
  }, [bannerIndex]);

  const handleLeftBtnClick = (e: React.MouseEvent) => {
    if (bannerIndex === 4) {
      setDirection("right"); // bannerIndex === 3 & direction === left 인 경우 interval time 0 이 되므로 (0에서 3이 된 경우와 4에서 3이 된 경우 분리)
    } else {
      setDirection("left");
    }
    setBannerIndex(
      bannerIndex === 0
        ? bannerImage.length - 4
        : (bannerIndex - 1) % bannerImage.length,
    );
  };

  const handleRightBtnClick = (e: React.MouseEvent) => {
    setDirection("right");
    setBannerIndex(
      (bannerIndex === 4 ? 1 : bannerIndex + 1) % bannerImage.length,
    );
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
        setBannerIndex(
          bannerIndex === 3 && direction === "left" // 상단의 주석과 동일한 이유
            ? (bannerIndex - 1) % bannerImage.length
            : (bannerIndex + 1) % bannerImage.length,
        );
        if (bannerIndex !== 0) {
          // 0일 때 right 이되면 time이 0이되므로
          setDirection("right");
        }
      }
    },
    { time },
  );

  // React.useEffect(() => {
  //   let id: NodeJS.Timer;
  //   if (bannerChangeFlag) {
  //     id = setInterval(
  //       () => setBannerIndex((bannerIndex + 1) % bannerImage.length),
  //       time,
  //     );
  //   }

  //   return () => clearInterval(id);
  // }, [bannerIndex, bannerChangeFlag]);
  console.log(window.innerWidth);
  return (
    <div className="banner">
      <div
        className="banner__wrap"
        style={{
          width: `${1100 * bannerImage.length}px`,
          transform: `translateX(-${900 + 1100 * bannerIndex}px)`,
          transition:
            (bannerIndex === 1 && direction === "right") ||
            (bannerIndex === 3 && direction === "left")
              ? "0s"
              : "0.5s",
        }}
      >
        {bannerImage.map((image, index) => {
          return (
            <div
              className={`wrap__image`}
              key={index}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <a href="" style={{ background: `url(${image})` }} />
            </div>
          );
        })}
      </div>
      <div className="banner__leftBtn" onClick={handleLeftBtnClick}></div>
      <div className="banner__rightBtn" onClick={handleRightBtnClick}></div>
    </div>
  );
}

export default Banner;
