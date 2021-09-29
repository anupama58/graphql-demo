const { addMocksToSchema, mockServer } = require('@graphql-tools/mock');
// const { describe, it } = require('mocha');
// const { expect } = require('chai');
// const { makeExecutableSchema } = require('graphql-tools');
const { typeDefs: schema } = require('../src/schema');
const { resolvers: mocks } = require('../src/resolver');

// const schema = makeExecutableSchema({ `
//     type Query {
//         """
//             This returns an array of Tags from the database
//         """
//         tags: [Tag]
//     }
//     type Tag {
//         id: Int!
//         tag: String!
//     }
// `});

// const tagString = 'Hello';

// const mocks = {
//     Tag: () => ({
//         tag: tagString,
//     }),
// };

const server = mockServer(schema, mocks, false);

const query = `
    query greetUser($name: String!) {
        greetUser(name: $name) {
            message
            statusCode
        }
    }
`;
const variables = {
    name: 'raj',
    username: 'raj',
    password: 'pass@123'
};

test('query should return data', async () => {
    try {
        console.info(server.query)
        const response = await server.query(query, variables);
        console.log('==========================================', response.data.greetUser);
    } catch (err) {
        console.log(err);
    }
    // expect(response.data.greetUser).to.have.property('message');
});