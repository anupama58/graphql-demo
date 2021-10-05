const { addMocksToSchema, mockServer } = require('@graphql-tools/mock');
// const { describe, it } = require('mocha');
// const { expect } = require('chai');
// const { makeExecutableSchema } = require('graphql-tools');
const { typeDefs: schema } = require('../src/schema');
const { resolvers: mocks } = require('../src/resolver');



const server = mockServer(schema, mocks, false);
console.log("server=========",server);
const query = `
    mutation login ($username: String!, $password: String!) {
        userLogin(username: $username, password: $password) {
            message
            token
        }
    }
`;
const variables = {
    username: 'raj',
    password: 'pass@123'
};

beforeAll(() => server.listen());


test('query should return data', async () => {
    try {
        const response = await server.query(query, variables);
        console.log('==========================================', response);
    } catch (err) {
//        console.log(err);
    }
    // expect(response.data.greetUser).to.have.property('message');
});