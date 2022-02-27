import * as React from "react";

function Terms2() {
  return (
    <div className="terms2">
      <div className="agree">
        <span className="agree__check">
          <input type="checkbox" id="mallAgree" />
          <label htmlFor="mallAgree">
            <span>[필수] </span>
            쇼핑몰 이용약관 동의
          </label>
        </span>
        <a className="btnAgree"></a>
      </div>
    </div>
  );
}

export default Terms2;
