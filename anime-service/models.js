const sqlite3 = require('sqlite3').verbose();
// Connexion la base de données
let db = new sqlite3.Database('./anime.sqlite', (err) => {
if (err) {
console.error(err.message);
throw err;
}
console.log('Base de données connectée.');
});
// Création de la table "animes"
db.run(`CREATE TABLE IF NOT EXISTS animes (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
description TEXT NOT NULL,
nbrsaisons INTEGER NOT NULL,
nbrepisodes INTEGER NOT NULL,
categorieid INTEGER,
FOREIGN KEY (categorieid) REFERENCES categories(id)

)`);
// Modèle de données pour représenter un anime
class Anime {
constructor(name, description, nbrsaisons, nbrepisodes, categorieid) {
this.name = name;
this.description = description;
this.nbrsaisons = nbrsaisons;
this.nbrepisodes = nbrepisodes;
this.categorieid = categorieid;
}
// Enregistrer un nouveau anime  dans la base de données
save(callback) {
db.run(`INSERT INTO animes (name, description, nbrsaisons, nbrepisodes, categorieid) VALUES (?, ?, ?, ?, ?)`,
[this.name, this.description, this.nbrsaisons, this.nbrepisodes, this.categorieid], function(err) {
if (err) {
console.error(err.message);
return callback(err);
}
console.log(`Anime ${this.name} ajouté avec l'ID ${this.lastID}`);
callback(null, this.lastID);
});
}
// Rechercher tous les animes dans la base de données
static findAll(callback) {
db.all(`SELECT * FROM animes`, [], function(err, rows) {
if (err) {
console.error(err.message);
return callback(err);
}
const animes = rows.map(row => new Anime(row.name, row.description, row.nbrsaisons,
row.nbrepisodes, row.categorieid));
callback(null, animes);
});
}


// Rechercher un anime par ID dans la base de données
static findById(id, callback) {
db.get(`SELECT * FROM animes WHERE id = ?`, [id], function(err, row) {
if (err) {
console.error(err.message);
return callback(err);
}
if (!row) {
return callback(new Error('Anime non trouvé'));
}
const anime = new Anime(row.name, row.description, row.nbrsaisons,
    row.nbrepisodes, row.categorieid);
callback(null, anime);
});
}
// Mettre à jour un anime dans la base de données
static updateById(id, name, description, nbrsaisons, nbrepisodes, categorieid, callback) {
db.run(`UPDATE animes SET name = ?, description = ?, nbrsaisons = ?, nbrepisodes= ?, categorieid= ? WHERE id = ?`,
[name, description, nbrsaisons, nbrepisodes, categorieid, id], function(err) {
if (err) {
console.error(err.message);
return callback(err);
}
console.log(`Anime avec l'ID ${id} mis à jour.`);
callback(null);
});
}
// Supprimer un anime de la base de données
static deleteById(id, callback) {
db.run(`DELETE FROM animes WHERE id = ?`, [id], function(err) {
if (err) {
console.error(err.message);
return callback(err);
}
console.log(`Anime avec l'ID ${id} supprimé.`);
callback(null);
});
}
}
module.exports = db;