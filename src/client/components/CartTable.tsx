import * as React from "react";
import btn_count_down from "../../public/img/btn_count_down.gif";
import btn_count_up from "../../public/img/btn_count_up.gif";
import { ICartInfo } from "../interfaces";

interface CartTableProps {
  attributes: string[];
  instances: ICartInfo[];
  onRemoveClick: (e: React.MouseEvent) => void;
  onIncreaseClick: (e: React.MouseEvent) => void;
  onDecreaseClick: (e: React.MouseEvent) => void;
  onQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectAllState: boolean;
  onSelectAllStateChange: () => void;
  checkBoxState: boolean[];
  onCheckBoxStateChange: (e: React.ChangeEvent) => void;
}

function CartTable(props: CartTableProps) {
  return (
    <div className="cartTable">
      <table>
        <colgroup>
          <col style={{ width: "27px" }} />
          <col style={{ width: "92px" }} />
          <col style={{ width: "auto" }} />
          <col style={{ width: "88px" }} />
          <col style={{ width: "110px" }} />
          <col style={{ width: "88px" }} />
          <col style={{ width: "88px" }} />
          <col style={{ width: "85px" }} />
          <col style={{ width: "98px" }} />
          <col style={{ width: "110px" }} />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">
              <input
                type="checkbox"
                onChange={props.onSelectAllStateChange}
                checked={props.selectAllState}
              />
            </th>
            {props.attributes &&
              props.attributes.map((attr, index) => {
                return (
                  <th scope="col" key={index}>
                    {attr}
                  </th>
                );
              })}
          </tr>
        </thead>
        <tbody>
          {props.instances &&
            props.instances.map((instance, index) => {
              return (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      data-id={instance.productId}
                      data-index={index}
                      onChange={props.onCheckBoxStateChange}
                      checked={props.checkBoxState[index]}
                    />
                  </td>
                  <td>
                    <a
                      href={`/products/${instance.category}/${instance.productId}`}
                    >
                      <img
                        src={`${process.env.REACT_APP_CLOUDFRONT_URI}/${instance.productInfo.image}`}
                        alt="상품 이미지"
                      />
                    </a>
                  </td>
                  <td className="product-info">
                    <strong>
                      <a
                        href={`/products/${instance.category}/${instance.productId}`}
                      >{`${instance.productInfo.name}`}</a>
                    </strong>
                    <ul>
                      <li>
                        <strong>{`[옵션: ${instance.option}]`}</strong>
                      </li>
                    </ul>
                  </td>
                  <td className="product-option">
                    <span
                      className="option__quantity"
                      data-id={instance.productId}
                      data-option={instance.option}
                      data-quantity={instance.quantity}
                    >
                      <input
                        value={instance.quantity}
                        onChange={props.onQuantityChange}
                      />
                      <a
                        href=""
                        className="quantity__increase"
                        onClick={props.onIncreaseClick}
                      >
                        <img src={btn_count_up} alt="수량증가" />
                      </a>
                      <a
                        href=""
                        className="quantity__decrease"
                        onClick={props.onDecreaseClick}
                      >
                        <img src={btn_count_down} alt="수량감소" />
                      </a>
                    </span>
                  </td>
                  <td>
                    <strong>{`KRW ${
                      instance.productInfo.price * instance.quantity
                    }`}</strong>
                  </td>
                  <td>
                    <strong>{`-KRW ${
                      instance.productInfo.salePrice > 0
                        ? (instance.productInfo.price -
                            instance.productInfo.salePrice) *
                          instance.quantity
                        : 0
                    }`}</strong>
                  </td>
                  <td>
                    <span>-</span>
                  </td>
                  <td>
                    <div>기본배송</div>
                  </td>
                  <td>무료</td>
                  <td className="button">
                    <a href="" className="button__order">
                      주문하기
                    </a>
                    <a
                      href=""
                      className="button__remove"
                      data-id={instance.productId}
                      data-option={instance.option}
                      onClick={props.onRemoveClick}
                    >
                      <i className="icon-delete"></i>삭제
                    </a>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default CartTable;
