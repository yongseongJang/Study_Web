interface User {
  _id: number;
  id: string;
  pw: string;
  name: string;
  address: string;
  regularPhone: string | null;
  cellularPhone: string;
  email: string;
  isForever: boolean | null;
  birthday: string;
  membershipLevel: string;
}

export default User;
