const API_URL = config.get('API_URL');
const PORT = config.get("HTTP_PORT") || process.env.HTTP_PORT;

const resolvers = {
    Query: {
        greetUser (root, args, context, info) {
            try {
                return {
                    message: `Welcome, ${args.name}`,
                    statusCode: 200
                }
            } catch (error) {
                return {
                    message: error.message,
                    statusCode: error.statusCode
                }
            }
        },
        getUser(root,args,context,info){
            try{
                // const data  = await axios.get(
                //     "https://jsonplaceholder.typicode.com/users"
                // );
                // users = data.map(user => user.name);

                // const data = await axios.get(`${BASE_URL}:${PORT}/user`, {
                //     query: `query getUser($id: Int!) {
                //       getUserCity(userID: $id){
                //         id
                //       }
                //     }`,
                //     variables: {
                //       id: 2,
                //     }},  
                //     {
                //         headers: {
                //             'Content-Type': 'application/json'
                //         }
                //     })
            

            }catch(error){
                return{

                }

            }
        }


    },
    Mutation: {}
};

module.exports = resolvers;