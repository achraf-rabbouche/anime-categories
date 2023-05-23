const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const db = require('./models');
const animeSchema = require('./animeSchema');
const animeResolver = require('./animeResolver');
const app = express();
const port = 5000;

// Utilisation de GraphQL pour gérer les requêtes
app.use('/graphql', graphqlHTTP({
schema: animeSchema,
rootValue: animeResolver,
graphiql: true
}));
app.use(bodyParser.json());

// Utilisation de body-parser pour analyser les demandes HTTP
app.use(bodyParser.urlencoded({ extended: true }));

// Implémentation de l'API REST
app.get('/animes', (req, res) => {
db.all(`SELECT * FROM animes`, [], (err, rows) => {
if (err) {
res.status(400).json({ "error": err.message });
return;
}
res.json(rows);
});
});


app.get('/anime/:id', (req, res) => {
db.get(`SELECT * FROM animes WHERE id = ?`, [req.params.id], (err, row) => {
if (err) {
res.status(400).json({ "error": err.message });
return;
}
res.json(row);

});
});


app.post('/anime', (req, res) => {
const { name, description, nbrsaisons, nbrepisodes, categorieid } = req.body;
db.run(`INSERT INTO animes (name, description, nbrsaisons, nbrepisodes, categorieid) VALUES (?, ?, ?, ?, ?)`, [name,
description,nbrsaisons, nbrepisodes, categorieid], (err) => {
if (err) {
res.status(400).json({ "error": err.message });
return;
}
res.json({ "message": "success" });
});
});

app.put('/anime/:id', (req, res) => {
const { name, description, nbrsaisons, nbrepisodes, categorieid } = req.body;
db.run(`UPDATE animes SET name = ?, description = ?, nbrsaisons = ?, nbrepisodes = ?, categorieid = ? WHERE id = ?`,
[name, description, nbrsaisons, nbrepisodes, categorieid, req.params.id], (err) => {
if (err) {
res.status(400).json({ "error": err.message });
return;
}
res.json({ "message": "success" });
});
});
app.delete('/anime/:id', (req, res) => {
db.run(`DELETE FROM animes WHERE id = ?`, [req.params.id], (err) => {
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