const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const http = require('http');
const config = require('config');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const { resolvers } = require("./resolver");
const { typeDefs } = require("./schema");
const BASE_URL = config.get('BASE_URL');
const HTTP_TIMEOUT = config.get('HTTP_TIMEOUT');

async function startApolloServer() {
  const app = express();

  app.use(cookieParser());

  // catch 404 and forward to error handler
  // app.use(function (req, res, next) {
  //   next(createError(404));
  // });

  // error handler
  // app.use(function (err, req, res, next) {
  //   // set locals, only providing error in development
  //   res.locals.message = err.message;
  //   res.locals.error = req.app.get("env") === "development" ? err : {};

  //   // render the error page
  //   res.status(err.status || 500);
  //   res.render("error");
  // });

  app.use(helmet());
  app.use(cors({ maxAge: 86400 }));
  app.enable("trust proxy");

  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  // Additional middleware can be mounted at this point to run before Apollo.
  // app.use('*', jwtCheck, requireAuth, checkScope);

  // Mount Apollo middleware here.
  server.applyMiddleware({ app, path: '/graphql' });
  // await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  // console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  const PORT = config.get("HTTP_PORT") || process.env.HTTP_PORT;
  httpServer
    .listen(PORT, function (error) {
      if (error) {
        console.log(`Failed to start graphql server on port ${PORT}`);
        return process.exit(1);
      } else {
        console.info(
          `🚀 Graphql server is running on ${BASE_URL}:${PORT}/graphql`
        );
      }
    })
    .setTimeout(HTTP_TIMEOUT);
  return { server, app };
}

module.exports = {
  startGqlServer: startApolloServer
}