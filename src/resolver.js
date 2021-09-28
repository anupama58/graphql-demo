const path = require('path');
const { mergeResolvers } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');

const resolversArray = loadFilesSync(path.join(__dirname, './resolvers'), {
    recursive: true,
    extensions: ['.js']
})

const resolvers = mergeResolvers(resolversArray, {
    all: true
})

module.exports = {
    resolvers
}