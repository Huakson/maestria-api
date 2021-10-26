import "reflect-metadata";
import "./shared/container";
// eslint-disable-next-line import/no-extraneous-dependencies
import { ApolloServer } from "apollo-server-express";
import express from "express";
import fs from "fs";
import http from "http";
import https from "https";
import { buildSchema } from "type-graphql";

import { IServerContext } from "./context/IContext";
import UserResolvers from "./modules/accounts/graphql/user.resolver";
import { authChecker } from "./modules/accounts/services/AuthService";

async function startApolloServer() {
  const configurations = {
    // Note: You may need sudo to run on port 443
    production: { ssl: true, port: 443, hostname: "localhost" },
    development: { ssl: false, port: 4002, hostname: "localhost" },
  };

  const environment = process.env.NODE_ENV || "production";
  const config = configurations[environment];

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
  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  // Create the HTTPS or HTTP server, per configuration
  let httpServer;
  if (config.ssl) {
    // Assumes certificates are in a .ssl folder off of the package root.
    // Make sure these files are secured.
    httpServer = https.createServer(
      {
        passphrase: "senha",
        key: fs.readFileSync(`/opt/ssl/key.pem`),
        cert: fs.readFileSync(`/opt/ssl/cert.pem`),
      },
      app
    );
  } else {
    httpServer = http.createServer(app);
  }

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: config.port }, resolve)
  );

  console.log(
    "🚀 Server ready at",
    `http${config.ssl ? "s" : ""}://${config.hostname}:${config.port}${
      server.graphqlPath
    }`
  );

  return { server, app };
}

startApolloServer();
