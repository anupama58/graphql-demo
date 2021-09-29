const resolvers = {
  Query: {
    greetUser(root, args, context, info) {
      try {
        return {
          message: `Welcome, ${args.name}`,
          statusCode: 200,
        };
      } catch (error) {
        return {
          message: error.message,
          statusCode: error.statusCode,
        };
      }
    },
    user: async (_, { id }, { dataSources }) => {
      return dataSources.userApi.editUser(id);
    },
  },
  Mutation: {
    userLogin: async (_, { username, password }, { dataSources }) => {
      const response = {
        message: "Something wen wrong, Please try later",
        token: null,
        code: 500,
      };
      try {
        const { userLogin: result } = await dataSources.userApi.login(username, password);
        console.log("login api response", result);

        response.message = result?.message;
        response.code = 200;
        response.token = result?.token;

        return response;
      } catch (e) {
        console.log(e);
        response.message = e.extensions.response.statusText;
        response.code = e.extensions.response.status;
        return response;
      }
    },
  },
};

module.exports = resolvers;
