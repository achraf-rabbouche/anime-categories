// userSchema.js
const { buildSchema } = require('graphql');
// Créer un schéma GraphQL
const categorieSchema = buildSchema(` 
type Query {
categorie(id: Int!): Categorie
categories: [Categorie]
}
type Mutation {
addCategorie(name: String!): Categorie
updateCategorie(id: Int!, name: String!): Categorie
deleteCategorie(id: Int!): String
}

type Categorie {
id: Int
name: String

}
`);
module.exports = categorieSchema;