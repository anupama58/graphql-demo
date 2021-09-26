import { GraphQLServer } from 'graphql-yoga';
import fetch from 'node-fetch';

const baseURL = `http://localhost:3000`

const resolvers = {
    Query: {
        users:() => {
            return fetch(`${baseURL}/user`)
            .then(res => res.json())
            .then(data => console.log(data))
        },
        user: (parent, args) => {
            const { id } = args
            return fetch(`${baseURL}/user/${id}/edit`)
            .then(res => res.json())
            .then(data => console.log(data))

        },
    },
    Mutation:{
        signup: (parent, args) => {
            return fetch(`${baseURL}/user/sign-up`)
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                return {
                    message:'hello',
                    token:'ksjjka'
                }
            })
        },
        login: (parent, args) => {
            return fetch(`${baseURL}/user/login`)
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                return {
                    message:'hello',
                    token:'ksjjka'
                }
            })
        },
        // update: (parent, args) => {
        //     return fetch(`${baseURL}/user/`)
        //     .then(res => res.json())
        //     .then((data) => {
        //         console.log(data)
                
        //     })
        // },

    }
}


const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
});

server.start(() => console.log('server running on http://localhost:4000'))