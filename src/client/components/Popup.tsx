import * as React from "react";
import { useState } from "react";
import "../styles/Popup.scss";

interface PopupProps {
  setCookie: (
    name: string,
    value: any,
    options?: CookieSetOptions | undefined,
  ) => void;
}

function Popup(props: PopupProps) {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const handleRightBtnClick = () => {
    setIsVisible(false);
  };

  const handleLeftBtnClick = () => {
    const expires = new Date();
    expires.setDate(expires.getDate() + 1);

    props.setCookie("nonePopup", true, { expires });
  };

  return (
    <>
      {isVisible ? (
        <div className="popup">
          <div className="popup__dimmed"></div>
          <div className="popup__modal">
            <div className="modal__content">
              <p>내용</p>
            </div>
            <div className="modal__bottom">
              <div className="bottom__left-btn" onClick={handleLeftBtnClick}>
                <p>오늘 그만 보기</p>
              </div>
              <div className="bottom__right-btn" onClick={handleRightBtnClick}>
                <p>닫기</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Popup;
