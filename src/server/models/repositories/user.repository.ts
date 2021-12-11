import { EntityRepository, Repository } from "typeorm";
import { User } from "../entity/user";
import { User as IUser } from "../../interfaces";
import Errorhandler from "../../utils/error";

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public async createUser(convertedUserInfo: IUser): Promise<void> {
    try {
      await this.manager.transaction(async (transactionEntityManager) => {
        await transactionEntityManager.insert(User, convertedUserInfo);
      });
    } catch (err: any) {
      throw new Errorhandler(500, err.name, err.message);
    }
  }

  public async readPasswordById(id: string): Promise<null | string> {
    try {
      return await this.manager.transaction(
        async (transactionEntityManager) => {
          const user = await transactionEntityManager.findOne(User, { id });

          return user ? user.pw : null;
        },
      );
    } catch (err: any) {
      throw new Errorhandler(500, err.name, err.message);
    }
  }

  public async readUserNameById(id: string): Promise<null | string> {
    try {
      return await this.manager.transaction(async (transactionEntityManger) => {
        const user = await transactionEntityManger.findOne(User, { id });

        return user ? user.name : null;
      });
    } catch (err: any) {
      throw new Errorhandler(500, err.name, err.message);
    }
  }
}

export default UserRepository;
