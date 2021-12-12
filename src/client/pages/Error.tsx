import * as React from "react";

function Error() {
  return (
    <div className="error">
      <div className="error__page-outer">
        <div className="page-outer__page-inner">
          <p className="page-inner__error-title">
            잘못된 경로로 접근하셨습니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Error;
