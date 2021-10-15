import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IContext {
  prisma: PrismaClient;
}

const client: IContext = {
  prisma,
};

export { IContext, client };
