import * as React from "react";

function Footer() {
  return (
    <div className="Footer">
      <div className="Footer__Container">
        <div className="Container__Category">
          <ul>
            <li>
              <a
                href="javascript:;"
                style={{ cursor: "default" }}
              >{`Delivery & Exchange`}</a>
            </li>
            <li>
              <a href="javascript:;" style={{ cursor: "default" }}>
                Guide
              </a>
            </li>
            <li>
              <a
                href="javascript:;"
                style={{ cursor: "default" }}
              >{`TERMS & CONDITIONS`}</a>
            </li>
            <li>
              <a href="javascript:;" style={{ cursor: "default" }}>
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
        <div className="Container__Detail">
          © 주식회사 커넥터스 (connectors Co., Ltd.) ceo : hong gil dong e-mail
          : uniformbridge@gmail.com permit number : 2000-서울중구-0000 business
          number : 000-00-00000 checking 00000 3, Achasan-ro 00ga-gil,
          Seongdong-gu, Seoul, Republic of Korea 0F
        </div>
      </div>
    </div>
  );
}

export default Footer;
