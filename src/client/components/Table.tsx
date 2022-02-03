import * as React from "react";
import btn_count_down from "../../public/img/btn_count_down.gif";
import btn_count_up from "../../public/img/btn_count_up.gif";

interface TableProps {
  attributes: string[];
}

function Table(props: TableProps) {
  return (
    <div className="table">
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
              <input type="checkbox" />
            </th>
            {props.attributes
              ? props.attributes.map((attr, index) => {
                  return (
                    <th scope="col" key={index}>
                      {attr}
                    </th>
                  );
                })
              : null}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input type="checkbox" />
            </td>
            <td>
              <a href="">
                <img src="" alt="" />
              </a>
            </td>
            <td className="product-info">
              <strong>
                <a href=""></a>
              </strong>
              <ul>
                <li>
                  <strong></strong>
                </li>
              </ul>
            </td>
            <td className="product-option">
              <span className="option__quantity">
                <input />
                <a className="quantity__increase">
                  <img src={btn_count_up} alt="수량증가" />
                </a>
                <a href="" className="quantity__decrease">
                  <img src={btn_count_down} alt="수량감소" />
                </a>
              </span>
            </td>
            <td>
              <strong>{`KRW `}</strong>
            </td>
            <td>
              <strong>{`-KRW `}</strong>
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
              <a href="" className="button__remove">
                <i className="icon-delete"></i>삭제
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
