import * as React from "react";

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
            <td>
              <strong>
                <a href=""></a>
              </strong>
              <ul>
                <li>
                  <strong></strong>
                </li>
              </ul>
            </td>
            <td>
              <span>
                <input />
                <a>
                  <img alt="수량증가" />
                </a>
                <a href="">
                  <img />
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
            <td>
              <a href="">주문하기</a>
              <a href="">관심상품등록</a>
              <a href="">
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
