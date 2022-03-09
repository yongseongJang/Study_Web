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
  cellularPhone: string;
  email: string;
  // birthday: string;

  constructor(user: IUser) {
    this.id = user.id;
    this.pw = user.pw;
    this.name = user.name;
    this.address = user.address;
    this.cellularPhone = user.cellularPhone;
    this.email = user.email;
    // this.birthday = user.birthday;
  }

  public toEntity() {
    return User.from(
      this.id,
      this.pw,
      this.name,
      this.address,
      this.cellularPhone,
      this.email,
      // this.birthday,
    );
  }
}

export class ShippingInfoDto {
  name: string;
  address: string;
  cellularPhone: string;
  email: string;

  constructor(
    name: string,
    address: string,
    cellularPhone: string,
    email: string,
  ) {
    this.name = name;
    this.address = address;
    this.cellularPhone = cellularPhone;
    this.email = email;
  }

  static from(
    name: string,
    address: string,
    cellularPhone: string,
    email: string,
  ) {
    const shippingInfo = new ShippingInfoDto(
      name,
      address,
      cellularPhone,
      email,
    );

    return shippingInfo;
  }
}
