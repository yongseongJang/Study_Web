import * as React from "react";
import mainBanner from "../../public/img/mainbanner.jpg";
import search from "../../public/img/search.png";
import coat from "../../public/img/coat.jpg";
import knit from "../../public/img/knit.jpg";
import still_by_hand from "../../public/img/still_by_hand.jpg";
import arcteryx from "../../public/img/arcteryx.jpg";

function Main() {
  const secondSectionImage = [coat, knit, still_by_hand, arcteryx];

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
                        <h3>
                          UNIFORM BRIDGE
                          <br />
                          2021 BLACK FRIDAY SALE
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="element__column topMenu">
                    <div className="column__wrap">
                      <div className="wrap__menu">
                        <div className="menu__container">
                          <ul>
                            <li>
                              <a href="/member/login">Login</a>
                            </li>
                            <li>
                              <a href="/member/join">Join</a>
                            </li>
                            <li>
                              <a href="/myshop/order">Order</a>
                            </li>
                            <li>
                              <a href="/">{`Q&A`}</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="wrap__search">
                        <div className="search__container">
                          <div>
                            <input type="text" />
                            <input type="image" src={search} />
                          </div>
                        </div>
                      </div>
                      <div className="wrap__info">
                        <div className="info__container">
                          <h5>
                            We always welcome you!
                            <br />
                            CS Center : Mon–Fri / 10:00 ~ 17:00
                            <br />
                            02-2231-2593
                          </h5>
                          <h6>
                            Editedition Showroom
                            <br />
                            236, Itaewon-ro, Yongsan-gu, Seoul
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
                              <a href="/">
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
              <section className="content__section"></section>
              <section className="content__section"></section>
              <section className="content__section"></section>
              <section className="content__section"></section>
              <section className="content__section"></section>
              <section className="content__section"></section>
              <section className="content__section"></section>
              <section className="content__section"></section>
              <section className="content__section"></section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Main;
