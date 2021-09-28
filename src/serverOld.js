const http = require("http");
const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const config = require("config");

/** Apollo Graphql imports :: starts*/
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { ApolloServer } = require("apollo-server-express");
const { resolvers } = require("./resolver");
const { typeDefs } = require("./schema");
/** Apollo Graphql :: ends*/

const app = express();
app.use(cookieParser());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// const httpServer = http.createServer(app);


/** Graphql middleware ends here */

const PORT = config.get("HTTP_PORT") || process.env.HTTP_PORT;

async function startGqlServer() {
  app.use(helmet());
  app.use(cors({ maxAge: 86400 }));
  app.enable("trust proxy");

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();
  server.applyMiddleWare({ app });

  httpServer
    .listen(PORT, function (error) {
      if (error) {
        console.log(`Failed to start graphql server on port ${PORT}`);
        return process.exit(1);
      } else {
        console.info(
          `\n Graphql server is running on ${BASE_URL}:${PORT}/graphql`
        );
      }
    })
    .setTimeout(HTTP_TIMEOUT);
}

module.exports = {
  app,
  startGqlServer,
};
