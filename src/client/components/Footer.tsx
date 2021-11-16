import * as React from "react";

function Footer() {
  return (
    <div className="Footer">
      <div className="Footer__Layout">
        <div className="Footer__Layout__Left">
          <ul>
            <li className="Footer__Layout__Left__Menu">
              <a href="/shopinfo">{`delivery & exchange`}</a>
              <br />
              <a href="/shopinfo">guide</a>
              <br />
              <a href="/shopinfo">{`terms & conditions`}</a>
              <br />
              <a href="/shopinfo">privacy policy</a>
            </li>
            <li className="Footer__Layout__Left__Copy">
              © 주식회사 커넥터스 (connectors Co., Ltd.)
            </li>
            <li className="Footer__Layout__Left__Info">
              <span>ceo : hong gil dong</span>
              <span className="Footer__Layout__Left__Info__Line">
                email: uniformbridge@gmail.com
              </span>
              <span className="Footer__Layout__Left__Info__Line">
                permit number: 2021-서울성동
              </span>
              <br />
              <span>business number: 229-88-00000</span>
              <br />
              <span>
                04614 3, Achasan-ro 11ga-gil, Seongdong-gu, Seoul, Republic of
                Korea 4F
              </span>
            </li>
          </ul>
        </div>
        <div className="Footer__Layout__Right">
          <ul>
            <li className="Footer__Layout__Right__URL">www.edit-edition.com</li>
            <li className="Footer__Layout__Right__SNS">
              <a href="http://instagram.com">Instagram</a>
              <br />
              <a href="http://facebook.com">Facebook</a>
              <br />
            </li>
            <li className="Footer__Layout__Right__CS">
              Online store
              <br />
              CS Center : 02-2231-0000
              <br />
              Mon–Fri. AM.10 - PM.5 ( Lunch｜PM.12:30 - PM.1:30 ) sat / sun /
              holiday off
            </li>
            <br />
            <li className="Footer__Layout__Right__Offline">
              Offline store
              <br />
              <a href="https://map.naver.com/v5/search/%EC%97%90%EB%94%A7%EC%97%90%EB%94%94%EC%85%98/place/1602678065?c=14137082.8199226,4514066.8722151,15,0,0,0,dh">
                236, Itaewon-ro, Yongsan-gu, Seoul
              </a>
            </li>
            <li className="Footer__Layout__Right__Offline">
              Tel : 02-792-0000
            </li>
            <li className="Footer__Layout__Right__Offline">
              Mon-Sun, AM.11 - PM.9 / Open 365 days a year
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
