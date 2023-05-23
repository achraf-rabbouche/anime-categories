// categorieResolver.js
const db = require('./models');
// Implémentation des résolveurs GraphQL
const categorieResolver = {
categorie: ({ id }) => {
return new Promise((resolve, reject) => {
db.get(`SELECT * FROM categories WHERE id = ?`, [id], (err, row) => {
if (err) {
reject(err);
} else {
resolve(row);
}
});
});
},
categories: () => {
return new Promise((resolve, reject) => {
db.all(`SELECT * FROM categories`, [], (err, rows) => {
if (err) {
reject(err);
} else {
resolve(rows);
}
});
});
},
addCategorie: ({ name}) => {
return new Promise((resolve, reject) => {
db.run(`INSERT INTO categories (name) VALUES (?)`,
[name], function(err) {
if (err) {
reject(err);
} else {
resolve({ id: this.lastID, name });
}
});
});
},

updateCategorie: ({ id, name }) => {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE categories SET name = ? WHERE id = ?',
        [name, id],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id, name});
          }
        }
      );
    });
  },

deleteCategorie: ({ id }) => {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM categories WHERE id = ?`, [id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(`categorie avec l'ID ${id} supprimé.`);
        }
      });
    });
  }
};
module.exports = categorieResolver;