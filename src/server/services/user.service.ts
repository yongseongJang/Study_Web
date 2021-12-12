import UserRepository from "../models/repositories/user.repository";
import { getConnection } from "typeorm";
import createValidator from "../utils/validation/createValidator";
import {
  userRegistrationSchema,
  emailSchema,
} from "../utils/validation/schemas/userSchema";
import { User as IUser, LoginInfo } from "../interfaces";
import Errorhandler from "../utils/error";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import ErrorHandler from "../utils/error";

const validateUserRegistrationInfo = createValidator(userRegistrationSchema);
const validateEmail = createValidator(emailSchema);

const authExpirationTime = "3600000"; //3600000ms == 1h

class UserService {
  private userRepository: UserRepository;

  constructor() {
    const connection = getConnection();
    this.userRepository = connection.getCustomRepository(UserRepository);
  }

  public async login(id: string, password: string): Promise<LoginInfo> {
    try {
      const hash: string | null = await this.userRepository.readPasswordById(
        id,
      );

      if (!hash) {
        throw new Errorhandler(401, "ValidationError", "Invalid Id");
      }

      await this.comparePasswordToHash(password, hash);

      const token = await this.getToken(id);

      const userName = await this.userRepository.readUserNameById(id);

      if (userName) {
        return {
          token,
          authExpirationTime: Number(authExpirationTime),
          userName,
        };
      } else {
        throw new Errorhandler(
          500,
          "Internal Server Error",
          "Internal Server Error",
        );
      }
    } catch (err) {
      throw err;
    }
  }

  public async registerUser(userInfo: IUser) {
    try {
      const validatedUserInfo = validateUserRegistrationInfo(userInfo);

      // id 중복 확인 로직 추가하기

      const hash = await this.stringPasswordToHash(validatedUserInfo.pw);

      const convertedUserInfo = Object.assign({}, validatedUserInfo, {
        pw: hash,
      });

      await this.userRepository.createUser(convertedUserInfo);
    } catch (err) {
      throw err;
    }
  }

  public async deleteUserById(id: string) {
    try {
      // id validate

      await this.userRepository.deleteUserById(id);
    } catch (err) {
      throw err;
    }
  }

  public async updateUserInfoById(id: string, userInfo: IUser) {
    try {
      // id validate

      const validatedUserInfo = await validateUserRegistrationInfo(userInfo);

      await this.userRepository.updateUserInfoById(id, validatedUserInfo);
    } catch (err) {
      throw err;
    }
  }

  private stringPasswordToHash = (password: string): string | object => {
    return bcrypt
      .hash(password, 10)
      .then((hash: string) => {
        return hash;
      })
      .catch((err: Error) => {
        return new Errorhandler(500, err.name, err.message);
      });
  };

  private comparePasswordToHash = (password: string, hash: string) => {
    return new Promise((resolve, reject) => {
      bcrypt
        .compare(password, hash)
        .then((res: boolean) => {
          if (!res) {
            reject(
              new Errorhandler(401, "ValidationError", "Invalid Password"),
            );
          } else {
            resolve(res);
          }
        })
        .catch((err: Error) => {
          reject(new Errorhandler(500, err.name, err.message));
        });
    });
  };

  private getToken = (id: string): Promise<string | undefined> => {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { id },
        process.env.PRIVATEKEY || "privatekey",
        {
          expiresIn: authExpirationTime,
        },
        (err: null | Error, token: string | undefined) => {
          if (err) {
            reject(new ErrorHandler(500, err.name, err.message));
          } else {
            resolve(token);
          }
        },
      );
    });
  };
}

export default UserService;
