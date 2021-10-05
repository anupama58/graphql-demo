const { mockServer } = require('graphql-tools');
const { describe, it } = require('mocha');
const { expect } = require('chai');
// const { makeExecutableSchema } = require('graphql-tools');
const { typeDefs } = require('../src/schema');
const { resolvers } = require('../src/resolver');

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

const server = mockServer(typeDefs, resolvers);

const query = `
    mutation login ($username: String!, $password: String!) {
        userLogin(username: $username, password: $password) {
            message
            token
        }
    }
`;
const variables = {
    name:'raaj',
    username: 'raj',
    password: 'pass@123'
};

server.query(query, variables).then((response) => {
    describe('Login test suit', () => {
        it('query should return data', () => {
            console.log('==========================================', response.data.userLogin);
            expect(response.data.userLogin).to.have.lengthOf(2);
        });
        // it('tag name should match the mocked data', () => {
        //     expect(response.data.tags[0].tag).to.equal(tagString);
        // });
    });
});