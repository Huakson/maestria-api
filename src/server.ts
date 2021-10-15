import "reflect-metadata";
import "./shared/container";
// eslint-disable-next-line import/no-extraneous-dependencies
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";

import { IServerContext } from "./context/IContext";
import UserResolvers from "./modules/accounts/graphql/user.resolver";
import { authChecker } from "./modules/accounts/services/AuthService";

const app = async () => {
  const schema = await buildSchema({ resolvers: [UserResolvers], authChecker });

  const server = new ApolloServer({
    schema,
    context: (ctx) => {
      const serverContext: IServerContext = {
        token: ctx.req.headers.authorization,
      };
      return serverContext;
    },
  });
  server.listen(
    {
      port: 4000,
    },
    () => {
      console.log("Server is running");
    }
  );
};

app();
