import * as React from "react";
import { IOrderInfo } from "../interfaces";

interface OrderTableProps {
  attributes: string[];
  instances: IOrderInfo[];
}

function OrderTable(props: OrderTableProps) {
  return (
    <div className="orderTable">
      <table>
        <colgroup>
          <col style={{ width: "135px" }} />
          <col style={{ width: "93px" }} />
          <col style={{ width: "auto" }} />
          <col style={{ width: "61px" }} />
          <col style={{ width: "111px" }} />
          <col style={{ width: "111px" }} />
          <col style={{ width: "111px" }} />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">
              주문일자
              <br />
              [주문번호]
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
                    <strong>
                      <a
                        href={`/products/${instance.category}/${instance.productId}`}
                      >{`${instance.orderId}`}</a>
                    </strong>
                  </td>
                  <td>
                    <a
                      href={`/products/${instance.category}/${instance.productId}`}
                    >
                      <img
                        src={`${process.env.REACT_APP_CLOUDFRONT_URI}/${instance.image}`}
                        alt="상품 이미지"
                      />
                    </a>
                  </td>
                  <td className="product-info">
                    <strong>
                      <a
                        href={`/products/${instance.category}/${instance.productId}`}
                      >{`${instance.name}`}</a>
                    </strong>
                    <ul>
                      <li>
                        <strong>{`[옵션: ${instance.orderDetailOption}]`}</strong>
                      </li>
                    </ul>
                  </td>
                  <td>
                    <strong>{instance.quantity}</strong>
                  </td>
                  <td>
                    <strong>{`KRW ${
                      instance.price * instance.quantity
                    }`}</strong>
                  </td>
                  <td>
                    <strong>{instance.status}</strong>
                  </td>
                  <td>
                    <strong></strong>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default OrderTable;
