import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { history } from "../utils/history";
import { orderSelectors } from "../selectors";

const useOrderList = () => {
  const [cookies] = useCookies(["uniformbridge_token"]);
  const token = cookies.uniformbridge_token;
  const nonMemberLogin = useSelector(orderSelectors.selectNonMemberLogin);

  useEffect(() => {
    if (!token && !nonMemberLogin) {
      history.replace("/order/login/");
    }
  }, [token, nonMemberLogin]);
};

export default useOrderList;
