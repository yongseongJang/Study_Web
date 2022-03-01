import * as React from "react";
import { Dispatch, SetStateAction } from "react";
import { useState, useEffect } from "react";
import { IProductSize, IOption } from "../interfaces";
import btn_count_down from "../../public/img/btn_count_down.gif";
import btn_count_up from "../../public/img/btn_count_up.gif";
import btn_price_delete from "../../public/img/btn_price_delete.gif";

interface productOptionProps {
  productName: string;
  price: number;
  salePrice: number;
  productSize: IProductSize[] | undefined;
  option: IOption;
  setOption: Dispatch<SetStateAction<IOption>>;
}

function ProductOption(props: productOptionProps) {
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const handleSizeClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const size = e.currentTarget.getAttribute("data-size");

    if (size && !props.option[size]) {
      props.setOption({ ...props.option, [size]: 1 });
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const inputValue = value === "" ? 1 : Number(value);

    const size = e.currentTarget.parentElement
      ? e.currentTarget.parentElement.getAttribute("data-size")
      : null;

    if (size) {
      props.setOption({ ...props.option, [size]: inputValue });
    }
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const size = e.currentTarget.getAttribute("data-size");

    if (size) {
      const tmp = props.option;

      delete tmp[size];

      props.setOption({ ...tmp });
    }
  };

  const handleIncreaseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const size = e.currentTarget.parentElement
      ? e.currentTarget.parentElement.getAttribute("data-size")
      : null;

    if (size) {
      props.setOption({ ...props.option, [size]: props.option[size] + 1 });
    }
  };

  const handleDecreaseClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const size = e.currentTarget.parentElement
      ? e.currentTarget.parentElement.getAttribute("data-size")
      : null;

    if (size) {
      const quantity = props.option[size] > 2 ? props.option[size] - 1 : 1;

      props.setOption({ ...props.option, [size]: quantity });
    }
  };

  useEffect(() => {
    const price = props.salePrice ? props.salePrice : props.price;

    const total = Object.keys(props.option).reduce((acc, size) => {
      return acc + props.option[size] * price;
    }, 0);

    setTotalPrice(total);
  }, [props.option]);

  return (
    <div className="productOption">
      <table className="productOption__info">
        <tbody>
          <tr>
            <td>
              <span>
                <strong
                  style={
                    props.salePrice
                      ? { textDecoration: "line-through" }
                      : undefined
                  }
                >{`KRW ${props.price}`}</strong>
              </span>
            </td>
          </tr>
          <tr>
            <td>
              {props.salePrice && (
                <span>
                  {`KRW ${props.salePrice}`}
                  <span>{` ( KRW ${props.price - props.salePrice} 할인)`}</span>
                </span>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <table className="productOption__size">
        <tbody>
          <tr>
            <th scope="row">SIZE</th>
            <td>
              <ul>
                {props.productSize &&
                  props.productSize.map((size, index) => {
                    return (
                      <li key={index}>
                        <a
                          data-size={size.size}
                          href=""
                          onClick={handleSizeClick}
                        >
                          <span>{size.size}</span>
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="productOption__selectedOption">
        <table>
          <colgroup>
            <col style={{ width: "230px" }} />
            <col style={{ width: "60px" }} />
          </colgroup>
          <tbody>
            {props.option &&
              Object.keys(props.option) &&
              Object.keys(props.option).map((size, index) => {
                return (
                  <tr className="selectedOption__product" key={index}>
                    <td>
                      <p>
                        {props.productName}
                        <span>{` - ${size}`}</span>
                      </p>
                    </td>
                    <td className="product__wrap">
                      <span className="wrap__quantity" data-size={size}>
                        <input
                          value={props.option[size]}
                          onChange={handleQuantityChange}
                        />
                        <a
                          className="quantity__increase"
                          href=""
                          onClick={handleIncreaseClick}
                        >
                          <img src={btn_count_up} alt="수량증가" />
                        </a>
                        <a
                          href=""
                          className="quantity__decrease"
                          onClick={handleDecreaseClick}
                        >
                          <img src={btn_count_down} alt="수량감소" />
                        </a>
                      </span>
                      <a href="" data-size={size} onClick={handleRemoveClick}>
                        <img
                          className="wrap__delete-img"
                          src={btn_price_delete}
                          alt="삭제"
                        />
                      </a>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="productOption__totalPrice">
        <strong>{`Total `}</strong>:
        <span className="totalPrice__total">
          <strong>
            <em>{totalPrice == 0 ? ` 0` : ` KRW ${totalPrice}`}</em>
          </strong>
        </span>
      </div>
    </div>
  );
}

export default ProductOption;
