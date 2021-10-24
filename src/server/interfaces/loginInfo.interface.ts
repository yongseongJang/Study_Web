import { User } from ".";

interface LoginInfo {
  token: string | undefined;
  authExpirationTime: number;
  userName: string;
}

export default LoginInfo;
