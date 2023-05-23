const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const db = require('./models');
const categorieSchema = require('./categorieSchema');
const categorieResolver = require('./categorieResolver');
const app = express();
const port = 5001;

// Utilisation de GraphQL pour gérer les requêtes
app.use('/graphql', graphqlHTTP({
schema: categorieSchema,
rootValue: categorieResolver,
graphiql: true
}));
app.use(bodyParser.json());

// Utilisation de body-parser pour analyser les demandes HTTP
app.use(bodyParser.urlencoded({ extended: true }));

// Implémentation de l'API REST
app.get('/categories', (req, res) => {
db.all(`SELECT * FROM categories`, [], (err, rows) => {
if (err) {
res.status(400).json({ "error": err.message });
return;
}
res.json(rows);
});
});
app.get('/categorie/:id', (req, res) => {
db.get(`SELECT * FROM categories WHERE id = ?`, [req.params.id], (err, row) => {
if (err) {
res.status(400).json({ "error": err.message });
return;
}
res.json(row);
});
});
app.post('/categorie', (req, res) => {
const { name } = req.body;
db.run(`INSERT INTO categories (name) VALUES (?)`, [name], (err) => {
if (err) {
res.status(400).json({ "error": err.message });
return;
}
res.json({ "message": "success" });
});
});

app.put('/categorie/:id', (req, res) => {
const { name } = req.body;
db.run(`UPDATE categories SET name = ? WHERE id = ?`,
[name, req.params.id], (err) => {
if (err) {
res.status(400).json({ "error": err.message });
return;
}
res.json({ "message": "success" });
});
});
app.delete('/categorie/:id', (req, res) => {
db.run(`DELETE FROM categories WHERE id = ?`, [req.params.id], (err) => {
if (err) {
res.status(400).json({ "error": err.message });
return;
}
res.json({ "message": "success" });
});
});
// Lancement du serveur
app.listen(port, () => {
console.log(`Serveur démarré sur le port ${port}.`);
});