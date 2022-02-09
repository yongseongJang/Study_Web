import { User } from "../models/entity";
import { User as IUser } from "../interfaces";

export class LoginDto {
  id: string;
  pw: string;

  constructor(id: string, pw: string) {
    this.id = id;
    this.pw = pw;
  }
}

export class LoginSuccessDto {
  token: string;
  authExpirationTime: number;
  userName: string;

  constructor(token: string, authExpirationTime: number, userName: string) {
    this.token = token;
    this.authExpirationTime = authExpirationTime;
    this.userName = userName;
  }
}

export class RegisterUserDto {
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

  constructor(user: IUser) {
    this.id = user.id;
    this.pw = user.pw;
    this.name = user.name;
    this.address = user.address;
    this.regularPhone = user.regularPhone;
    this.cellularPhone = user.cellularPhone;
    this.email = user.email;
    this.isForever = user.isForever;
    this.birthday = user.birthday;
    this.membershipLevel = user.membershipLevel;
  }

  public toEntity() {
    return User.from(
      this.id,
      this.pw,
      this.name,
      this.address,
      this.regularPhone,
      this.cellularPhone,
      this.email,
      this.isForever,
      this.birthday,
      this.membershipLevel,
    );
  }
}
