import fetch from 'node-fetch';

const resolvers = {
    Query: {
        user:() => {
            return fetch(`${baseURL}/user`)
            .then(res => res.json())
            .then(data => console.log(data))
        }
    },
}

export default resolvers