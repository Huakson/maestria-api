import { client } from "../../../../prisma/client";
import { ICreateUserDTO } from "../../DTOs/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersPrismaRepository implements IUsersRepository {
  async create(data: ICreateUserDTO): Promise<User> {
    return client.prisma.user.create({ data });
  }
  async findByEmail(email: string): Promise<User> {
    const user = await client.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async findById(id: string): Promise<User> {
    return client.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}

export { UsersPrismaRepository };
