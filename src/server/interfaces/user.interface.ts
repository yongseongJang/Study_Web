interface User {
  _id: number;
  id: string;
  pw: string;
  name: string;
  address: string;
  regularPhone: string | undefined;
  cellularPhone: string;
  email: string;
  isForever: boolean | undefined;
  birthday: string;
  membershipLevel: string;
}

export default User;
