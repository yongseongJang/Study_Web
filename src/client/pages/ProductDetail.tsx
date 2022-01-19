import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../actions";
import {
  IProduct,
  IProductDetail,
  IProductImage,
  IProductCaution,
} from "../interfaces";

interface ProductDetailProps {
  match: {
    params: {
      category: string;
      productId: string;
    };
    path: string;
    url: string;
    isExact: boolean;
  };
  product: IProduct;
  productDetail: IProductDetail[];
  productImage: IProductImage[];
  productCaution: IProductCaution[];
}

interface Option {
  [key: string]: number;
}

function ProductDetail(props: ProductDetailProps) {
  const { totalPrice, setTotalPrice } = useState<number>(0);

  // const { totalProducts, setTotalProducts } = useState<Option>({});

  return (
    <section className="productDetail">
      <div className="productDetail__left">
        <div className="left__contents">
          <div className="contents__box">
            <div className="box__name">
              <a href="" className="name__brandName"></a>
              <h5 className="name__productName">{props.product.name}</h5>
            </div>
            <div className="box__detail"></div>
          </div>
        </div>
      </div>
      <div className="detail__center">
        {props.productImage.map((image, index) => {
          return (
            <>
              <div className="center__image" key={index}>
                <img src={image.file_name} />
              </div>
              <p>
                <br />
              </p>
              <p>
                <br />
              </p>
            </>
          );
        })}
      </div>
      <div className="detail__right">
        <div className="right__contents">
          <div className="contents__box">
            <table className="box__table">
              <tbody>
                <tr>
                  <th scope="row">
                    <span>판매가</span>
                  </th>
                  <td>
                    <span>
                      <strong>{`KRW ${props.product.price}`}</strong>
                    </span>
                  </td>
                </tr>
                <tr>
                  <th>
                    <span>할인판매가</span>
                  </th>
                  <td>
                    <span>
                      {`KRW ${props.product.salePrice}`}
                      <span>{`( KRW ${
                        props.product.price - props.product.salePrice
                      } 할인)`}</span>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="box__table">
              <caption>상품 옵션</caption>
              <tbody>
                <tr>
                  <th scope="row">SIZE</th>
                  <td>
                    <ul>
                      <li>
                        <a href="">
                          <span>S</span>
                        </a>
                      </li>
                      <li>
                        <a href="">
                          <span>M</span>
                        </a>
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="box__totalProducts">
              <table className="totalProducts__table">
                <tbody className="table__option">
                  <tr className="option__product">
                    <td>
                      <p>
                        {`${props.product.name} -`}
                        <span>S</span>
                      </p>
                    </td>
                  </tr>
                  <td>
                    <span>
                      <input type="text" />
                      <a href="">
                        <img src="" alt="수량증가" />
                      </a>
                      <a href="">
                        <img src="" alt="수량감소" />
                      </a>
                    </span>
                    <a href="">
                      <img src="" alt="삭제" />
                    </a>
                  </td>
                </tbody>
              </table>
            </div>
            <div className="box__totalPrice">
              <strong>Total</strong>:
              <span>
                <strong>
                  <em>{totalPrice === 0 ? 0 : `KRW ${totalPrice}`}</em>
                  {totalPrice === 0 ? null : "(1개)"}
                </strong>
              </span>
            </div>
            <div className="box__order">
              <a href="" className="order__buy">
                BUY NOW
              </a>
              <a href="" className="order__cart">
                ADD TO CART
              </a>
            </div>
            <div className="box__info">
              <div className="info__size">
                <a href="#" className="size__guide">
                  SIZE GUIDE
                </a>
              </div>
              <ul className="info__tabs-nav">
                <li>
                  <a href="">CAUTION</a>
                </li>
                <li>
                  <a href="">DELIVERY</a>
                </li>
              </ul>
              <div className="info__tabs-stage">
                <div className="tabs-stage-1">
                  <p>
                    {props.productCaution.map((caution, index) => {
                      return (
                        <React.Fragment key={index}>
                          {caution}
                          <br />
                          <br />
                        </React.Fragment>
                      );
                    })}
                  </p>
                </div>
                <div className="tabs-stage-2">
                  <p>
                    <strong>배송 안내</strong>
                    <br />
                    고객님께서 주문하신 상품은 입금 확인후 배송해 드립니다.
                    다만, 상품종류에 따라서 상품의 배송이 다소 지연될 수
                    있습니다.
                    <br />
                    배송일은 약 2~4일 소요되며, 예약 배송 상품의 경우 지정된
                    일정에 따라 배송됩니다.
                    <br />
                    <br />
                    <strong>반품 및 교환</strong>
                    <br />- 환불 및 교환은 에딧에디션 고객센터 또는 문의
                    게시판을 통해 신청하신 후 안내에 따라 진행해 주시기
                    바랍니다.
                    <br />- 환불 및 교환 신청은 상품을 받으신 날로 부터 7일 이내
                    신청하시고, 14일 이내에 본사로 상품이 도착하여야 가능합니다.
                    <br />- 고객센터 : 02-0000-0000
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
