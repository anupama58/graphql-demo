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
            const configJson = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(args),
            }

            return fetch(`${baseURL}/user/sign-up`,configJson)
            .then(res => res.json())
            .then((user) => {
                console.log(user)
                return {
                    message:user.user.message,
                    token:user.user.token
                }
            })
        },
        login: async (parent, args) => {
            const configJson = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(args),
            }
           return fetch(`${baseURL}/user/login`,configJson)
            .then(res => res.json())
            .then((user) => {
                console.log(user.user.token)
                return {
                    message:user.user.token,
                    token:user.user.token
                }
           })
        },
        update: (parent, args) => {
            const configJson = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(args),
            }
            return fetch(`${baseURL}/user/update`)
            .then(res => res.json())
            .then((updateData) => {
                console.log(updateData)
                return{
                    message:updateData.user.message,
                    result:updateData.user.result
                }
            })
        },

    }
}


const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
});

server.start(() => console.log('server running on http://localhost:4000'))