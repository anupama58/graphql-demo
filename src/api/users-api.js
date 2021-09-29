const { RESTDataSource } = require("apollo-datasource-rest");

class UserAPI extends RESTDataSource {
  constructor() {
    // Always call super()
    super();
    // Sets the base URL for the REST API
    this.baseURL = "http://localhost:3002/user";
  }

  async editUser(id) {
    return this.get(`${id}/edit`);
  }
  async login(username, password) {
    const loginCred = {
      username: username,
      password: password,
    };
    console.log("loginCred", loginCred);
    return this.post(
      `login`, // path
      loginCred // request body
    );
  }
}

module.exports = UserAPI;
