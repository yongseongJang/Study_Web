interface User {
  _id: number;
  id: string;
  pw: string;
  name: string;
  address: string;
  regular_phone: string | null;
  cellular_phone: string;
  email: string;
  is_forever: boolean | null;
  birthday: string;
  membership_level: string;
}

export default User;
