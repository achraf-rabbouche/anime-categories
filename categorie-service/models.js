const sqlite3 = require('sqlite3').verbose();
// Connexion la base de données
let db = new sqlite3.Database('./categorie.sqlite', (err) => {
if (err) {
console.error(err.message);
throw err;
}
console.log('Base de données connectée.');
});
// Création de la table "categories"
db.run(`CREATE TABLE IF NOT EXISTS categories (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL
)`);
// Modèle de données pour représenter une categorie
class Categorie {
constructor(name) {
this.name = name;
}
// Enregistrer une nouvelle categorie  dans la base de données
save(callback) {
db.run(`INSERT INTO categories (name) VALUES (?)`,
[this.name], function(err) {
if (err) {
console.error(err.message);
return callback(err);
}
console.log(`Categorie ${this.name} ajouté avec l'ID ${this.lastID}`);
callback(null, this.lastID);
});
}
// Rechercher tous les categories dans la base de données
static findAll(callback) {
db.all(`SELECT * FROM categories`, [], function(err, rows) {
if (err) {
console.error(err.message);
return callback(err);
}
const categories = rows.map(row => new Categorie(row.name));
callback(null, categories);
});
}


// Rechercher une categorie par ID dans la base de données
static findById(id, callback) {
db.get(`SELECT * FROM categories WHERE id = ?`, [id], function(err, row) {
if (err) {
console.error(err.message);
return callback(err);
}
if (!row) {
return callback(new Error('Categorie non trouvé'));
}
const categorie = new Categorie(row.name);
callback(null, categorie);
});
}
// Mettre à jour une categorie dans la base de données
static updateById(id, name, callback) {
db.run(`UPDATE categories SET name = ? WHERE id = ?`,
[name, id], function(err) {
if (err) {
console.error(err.message);
return callback(err);
}
console.log(`Categorie avec l'ID ${id} mis à jour.`);
callback(null);
});
}
// Supprimer un categorie de la base de données
static deleteById(id, callback) {
db.run(`DELETE FROM categories WHERE id = ?`, [id], function(err) {
if (err) {
console.error(err.message);
return callback(err);
}
console.log(`categorie avec l'ID ${id} supprimé.`);
callback(null);
});
}
}
module.exports = db;