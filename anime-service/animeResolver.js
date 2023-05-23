// animeResolver.js
const db = require('./models');
// Implémentation des résolveurs GraphQL
const animeResolver = {
anime: ({ id }) => {
return new Promise((resolve, reject) => {
db.get(`SELECT * FROM animes WHERE id = ?`, [id], (err, row) => {
if (err) {
reject(err);
} else {
resolve(row);
}
});
});
},
animes: () => {
return new Promise((resolve, reject) => {
db.all(`SELECT * FROM animes`, [], (err, rows) => {
if (err) {
reject(err);
} else {
resolve(rows);
}
});
});
},
addAnime: ({ name, description, nbrsaisons, nbrepisodes, categorieid }) => {
return new Promise((resolve, reject) => {
db.run(`INSERT INTO animes (name, description, nbrsaisons, nbrepisodes, categorieid ) VALUES (?, ?, ?, ?, ?)`,
[name, description, nbrsaisons, nbrepisodes, categorieid], function(err) {
if (err) {
reject(err);
} else {
resolve({ id: this.lastID, name, description, nbrsaisons, nbrepisodes, categorieid });
}
});
});
},

updateAnime: ({ id, name, description, nbrsaisons, nbrepisodes }) => {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE animes SET name = ?, description = ?, nbrsaisons = ?, nbrepisodes = ? WHERE id = ?',
        [name, description, nbrsaisons, nbrepisodes, id],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id, name, description, nbrsaisons, nbrepisodes });
          }
        }
      );
    });
  },

deleteAnime: ({ id }) => {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM animes WHERE id = ?`, [id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(`Anime avec l'ID ${id} supprimé.`);
        }
      });
    });
  }
};
module.exports = animeResolver;