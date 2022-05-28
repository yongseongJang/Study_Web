import * as React from "react";
import { CartTable, Spinner } from "../components";
import { useCartInfo } from "../hooks";

function CartInfo() {
  const {
    isRequesting,
    cartInfo,
    cartAttributes,
    handleRemoveClick,
    handleIncreaseQuantityClick,
    handleDecreaseQuantityClick,
    handleQuantityChange,
    selectAllState,
    handleSelectAllStateChange,
    checkBoxState,
    handleCheckBoxStateChange,
    handleSelectRemoveClick,
    handleRemoveAllClick,
    totalSalePrice,
    totalPrice,
    handleOrderAllBtnClick,
    handleSelectedOrderBtnClick,
  } = useCartInfo();

  return (
    <div className="CartInfo">
      {isRequesting ? (
        <div className="CartInfo__Spinner">
          <Spinner></Spinner>
        </div>
      ) : (
        <>
          {cartInfo.length > 0 ? (
            <React.Fragment>
              <section>
                <CartTable
                  attributes={cartAttributes}
                  instances={cartInfo}
                  onRemoveClick={handleRemoveClick}
                  onIncreaseClick={handleIncreaseQuantityClick}
                  onDecreaseClick={handleDecreaseQuantityClick}
                  onQuantityChange={handleQuantityChange}
                  selectAllState={selectAllState}
                  onSelectAllStateChange={handleSelectAllStateChange}
                  checkBoxState={checkBoxState}
                  onCheckBoxStateChange={handleCheckBoxStateChange}
                ></CartTable>
              </section>
              <section>
                <div className="section-wrap__remove-product">
                  <span className="remove-product__leftBtn">
                    <strong>선택상품을</strong>
                    <a
                      href=""
                      className="leftBtn__remove"
                      onClick={handleSelectRemoveClick}
                    >
                      <i className="icon-delete"></i>삭제하기
                    </a>
                  </span>
                  <span className="remove-product__rightBtn">
                    <a
                      href=""
                      className="rightBtn__remove"
                      onClick={handleRemoveAllClick}
                    >
                      장바구니비우기
                    </a>
                  </span>
                </div>
              </section>
              <section className="section-wrap__total-summary">
                <table>
                  <colgroup>
                    <col style={{ width: "17%" }} />
                    <col style={{ width: "19%" }} />
                    <col style={{ width: "17%" }} />
                    <col style={{ width: "auto" }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col">
                        <strong>총 상품금액</strong>
                      </th>
                      <th scope="col">
                        <strong>총 배송비</strong>
                      </th>
                      <th
                        scope="col"
                        style={totalSalePrice ? undefined : { display: "none" }}
                      >
                        <strong>총 할인금액</strong>
                      </th>
                      <th scope="col">
                        <strong>결제예정금액</strong>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div>
                          <strong>
                            {`KRW `}
                            <span>{totalPrice}</span>
                          </strong>
                        </div>
                      </td>
                      <td>
                        <div>
                          <strong>{`+ `}</strong>
                          <strong>
                            {`KRW `}
                            <span>0</span>
                          </strong>
                        </div>
                      </td>
                      <td
                        style={totalSalePrice ? undefined : { display: "none" }}
                      >
                        <div>
                          <strong>{`- `}</strong>
                          <strong>
                            {`KRW `}
                            <span>{totalSalePrice}</span>
                          </strong>
                        </div>
                      </td>
                      <td>
                        <div>
                          <strong>{`= `}</strong>
                          <strong>
                            {`KRW `}
                            <span>{totalPrice - totalSalePrice}</span>
                          </strong>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
            </React.Fragment>
          ) : (
            <section className="section-wrap__empty-cart">
              장바구니가 비어 있습니다.
            </section>
          )}
        </>
      )}
      <section className="section-wrap__btn-wrap">
        <a
          href="/order/payment"
          className="btn-wrap__order-all"
          onClick={handleOrderAllBtnClick}
        >
          전체상품주문
        </a>
        <a
          href="/order/payment"
          className="btn-wrap__order-selected"
          onClick={handleSelectedOrderBtnClick}
        >
          선택상품주문
        </a>
        <span>
          <a href="/products/all_product" className="btn-wrap__shop">
            쇼핑계속하기
          </a>
        </span>
      </section>
    </div>
  );
}

export default CartInfo;
