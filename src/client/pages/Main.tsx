import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers/types";
import { loginActions } from "../actions";
import mainBanner from "../../public/img/mainbanner.jpg";
import search from "../../public/img/search.png";
import coat from "../../public/img/coat.jpg";
import knit from "../../public/img/knit.jpg";
import still_by_hand from "../../public/img/still_by_hand.jpg";
import arcteryx from "../../public/img/arcteryx.jpg";
import thirdFirstOne from "../../public/img/3-1.jpg";
import thirdSecondOne from "../../public/img/3-2.jpg";
import thirdFirstTwo from "../../public/img/3-3.jpg";
import thirdSecondTwo from "../../public/img/3-4.jpg";
import thirdFirstThree from "../../public/img/3-5.jpg";
import thirdSecondThree from "../../public/img/3-6.jpg";
import renewalEvent from "../../public/img/renewal_event.jpg";
import womensLine from "../../public/img/womens_line.jpg";

function Main() {
  const secondSectionImage = [coat, knit, still_by_hand, arcteryx];

  const dispatch = useDispatch();

  const { token } = useSelector((state: RootState) => state.loginReducer);

  const thirdSectionTitle = [
    "UNIFORM BRIDGE 21-22 WINTER",
    "UNIFORM BRIDGE 21-22 FALL/WINTER",
    "STILL BY HAND 21 AW",
  ];
  const thirdSectionFirstImage = [
    thirdFirstOne,
    thirdFirstTwo,
    thirdFirstThree,
  ];
  const thirdSectionSecondImage = [
    thirdSecondOne,
    thirdSecondTwo,
    thirdSecondThree,
  ];

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    dispatch(loginActions.logout());
  };

  return (
    <div className="main">
      <div className="main__page-outer">
        <div className="page-outer__page-inner">
          <main className="page-inner__content">
            <div className="content__item">
              <section className="content__section">
                <div className="section__element">
                  <div
                    className="element__column mainBanner"
                    style={{ backgroundImage: `url(${mainBanner})` }}
                  >
                    <div className="column__wrap">
                      <div className="wrap__bannerTxt">
                        <a href="/products/uniform_bridge">UNIFORM BRIDGE</a>
                      </div>
                    </div>
                  </div>
                  <div className="element__column topMenu">
                    <div className="column__wrap">
                      <div className="wrap__menu">
                        <div className="menu__container">
                          <ul>
                            {token ? (
                              <li>
                                <a href="/" onClick={handleClick}>
                                  Logout
                                </a>
                              </li>
                            ) : (
                              <React.Fragment>
                                <li>
                                  <a href="/member/login">Login</a>
                                </li>
                                <li>
                                  <a href="/member/join">Join</a>
                                </li>
                              </React.Fragment>
                            )}
                            <li>
                              <a href="/order/order">Order</a>
                            </li>
                            <li>
                              <a
                                href="javascript:;"
                                style={{ cursor: "default" }}
                              >{`Q&A`}</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      {/* <div className="wrap__search">
                        <div className="search__container">
                          <div>
                            <input type="text" />
                            <input type="image" src={search} />
                          </div>
                        </div>
                      </div> */}
                      <div className="wrap__info">
                        <div className="info__container">
                          <h5>
                            We always welcome you!
                            <br />
                            CS Center : Mon–Fri / 10:00 ~ 17:00
                            <br />
                            02-0001-0001
                          </h5>
                          <h6>
                            Editedition Showroom
                            <br />
                            000, Itaewon-ro, Yongsan-gu, Seoul
                            <br />
                            Mon–Sun / 11:00 ~ 21:00
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="content__section">
                <div className="section__element">
                  {secondSectionImage.map((v, i) => {
                    return (
                      <div className="element__column" key={i}>
                        <div className="column__wrap">
                          <div className="wrap__picture-menu">
                            <div>
                              <a
                                href="javascript:;"
                                style={{ cursor: "default" }}
                              >
                                <img src={v} />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
              <section className="content__section">
                <div className="section__element">
                  <div className="element__column">
                    <div className="column__wrap">
                      <div className="wrap__carousel">
                        <article className="carousel__slide">
                          <div className="slide__inner">
                            <div className="inner__left">
                              {thirdSectionTitle.map((v, i) => {
                                return (
                                  <div className="left__item" key={i}>
                                    <h2 className="item__title">
                                      <a
                                        href="javascript:;"
                                        style={{ cursor: "default" }}
                                      >
                                        {v}
                                      </a>
                                    </h2>
                                    <div className="item__read-more">
                                      <a
                                        href="javascript:;"
                                        style={{ cursor: "default" }}
                                      >
                                        <span>View lookbook</span>
                                      </a>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="inner_right">
                              {thirdSectionFirstImage.map((v, i) => {
                                return (
                                  <div className="right__first-image" key={i}>
                                    <a
                                      href="javascript:;"
                                      style={{ cursor: "default" }}
                                    >
                                      <img src={v} alt="" />
                                    </a>
                                  </div>
                                );
                              })}
                              {thirdSectionSecondImage.map((v, i) => {
                                return (
                                  <div
                                    className={`right__right-image${i}`}
                                    key={i}
                                  >
                                    <a
                                      href="javascript:;"
                                      style={{ cursor: "default" }}
                                    >
                                      <img src={v} alt="" />
                                    </a>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </article>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="content__section"></section>
              <section className="content__section">
                <div className="section__column">
                  <div className="column__left">
                    <div className="left__wrap">
                      <div className="wrap__container">
                        <a href="javascript:;" style={{ cursor: "default" }}>
                          <p>STILL BY HAND</p>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="column__right">
                    <div className="right__wrap">
                      <div className="wrap__container">
                        <a href="javascript:;" style={{ cursor: "default" }}>
                          <img src={womensLine} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="content__section"></section>
              <section className="content__section"></section>
              <section className="content__section">
                <div className="section__element">
                  <div className="element__column">
                    <div className="column__wrap">
                      <div className="wrap__space"></div>
                      <div className="wrap__container">
                        <div className="container__left">
                          <div className="left__wrap">
                            <h4>
                              The Edit Edition online store has been renewed.As
                              a thank you, we are running a discount event, so
                              please click the banner.
                            </h4>
                          </div>
                        </div>
                        <div className="container__right">
                          <a href="javascript:;" style={{ cursor: "default" }}>
                            <img src={renewalEvent} alt="" />
                          </a>
                        </div>
                      </div>
                      <div className="wrap__space2"></div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Main;
