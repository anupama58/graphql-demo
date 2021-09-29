
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

describe('User suit', () => {
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

})