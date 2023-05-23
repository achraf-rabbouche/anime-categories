// userSchema.js
const { buildSchema } = require('graphql');
// Créer un schéma GraphQL
const animeSchema = buildSchema(` 
type Query {
anime(id: Int!): Anime
animes: [Anime]
}
type Mutation {
addAnime(name: String!, description: String!, nbrsaisons: Int!, nbrepisodes: Int!, categorieid: Int!): Anime
updateAnime(id: Int!, name: String!, description: String!, nbrsaisons: Int!, nbrepisodes: Int!, categorieid: Int!): Anime
deleteAnime(id: Int!): String
}

type Anime {
id: Int
name: String
description: String
nbrsaisons: Int
nbrepisodes: Int
categorieid: Int
}
`);
module.exports = animeSchema;