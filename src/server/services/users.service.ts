import { UserRepository } from "../models/repositories";
import { getConnection } from "typeorm";
import createValidator from "../utils/validation/createValidator";
import { userRegistrationSchema } from "../utils/validation/schemas/userSchema";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import ErrorHandler from "../utils/error";
import { LoginDto, RegisterUserDto, LoginSuccessDto } from "../dto";

const validateUserRegistrationInfo = createValidator(userRegistrationSchema);

const authExpirationTime = "3600000"; //3600000ms == 1h

class UserService {
  private userRepository: UserRepository;

  constructor() {
    const connection = getConnection();
    this.userRepository = connection.getCustomRepository(UserRepository);
  }

  public async login(loginInfo: LoginDto): Promise<LoginSuccessDto> {
    try {
      const hash: string | null = await this.userRepository.readPasswordById(
        loginInfo.id,
      );

      if (!hash) {
        throw new ErrorHandler(401, "ValidationError", "Invalid Id");
      }

      await this.comparePasswordToHash(loginInfo.pw, hash);

      const userPrimaryKey = await this.userRepository.readUserPrimaryKeyById(
        loginInfo.id,
      );

      let token;
      if (userPrimaryKey) {
        token = await this.getToken(loginInfo.id, userPrimaryKey);
      } else {
        throw new ErrorHandler(
          500,
          "Internal Server Error",
          "Internal Server Error",
        );
      }

      const userName = await this.userRepository.readUserNameById(loginInfo.id);

      if (token && userName) {
        return {
          token,
          authExpirationTime: Number(authExpirationTime),
          userName,
        };
      } else {
        throw new ErrorHandler(
          500,
          "Internal Server Error",
          "Internal Server Error",
        );
      }
    } catch (err) {
      throw err;
    }
  }

  public async registerUser(userInfo: RegisterUserDto) {
    try {
      const validatedUserInfo = await validateUserRegistrationInfo(userInfo);

      await this.checkIdDuplication(validatedUserInfo.id);

      const hash = await this.stringPasswordToHash(validatedUserInfo.pw);

      const convertedUserInfo = Object.assign({}, validatedUserInfo, {
        pw: hash,
      });

      const user = new RegisterUserDto(convertedUserInfo).toEntity();

      await this.userRepository.createUser(user);
    } catch (err) {
      throw err;
    }
  }

  public async readShippingInfoByPrimaryKey(user_id: number) {
    const shippingInfo = await this.userRepository.readShippingInfoByPrimaryKey(
      user_id,
    );

    return shippingInfo ? shippingInfo.toDto() : undefined;
  }

  private stringPasswordToHash = (password: string): string | object => {
    return bcrypt
      .hash(password, 10)
      .then((hash: string) => {
        return hash;
      })
      .catch((err: Error) => {
        return new ErrorHandler(500, err.name, err.message);
      });
  };

  private comparePasswordToHash = (password: string, hash: string) => {
    return new Promise((resolve, reject) => {
      bcrypt
        .compare(password, hash)
        .then((res: boolean) => {
          if (!res) {
            reject(
              new ErrorHandler(401, "ValidationError", "Invalid Password"),
            );
          } else {
            resolve(res);
          }
        })
        .catch((err: Error) => {
          reject(new ErrorHandler(500, err.name, err.message));
        });
    });
  };

  private getToken = (
    id: string,
    primaryKey: number,
  ): Promise<string | undefined> => {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { id, _id: primaryKey },
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

  private async checkIdDuplication(id: string) {
    const userName = await this.userRepository.readUserNameById(id);

    if (userName !== null) {
      throw new ErrorHandler(409, "ConflictError", "ID Duplication");
    }
  }
}

export default UserService;
