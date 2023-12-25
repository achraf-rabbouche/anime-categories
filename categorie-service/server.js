const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const db = require('./models');
const categorieSchema = require('./categorieSchema');
const categorieResolver = require('./categorieResolver');
const app = express();
const port = 5001;
const http = require('http');
const url = require('url');
const client = require('prom-client');

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

const register = new client.Registry()

// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: 'categorie-service'
})

// Enable the collection of default metrics
client.collectDefaultMetrics({ register })

// Create a histogram metric
const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in microseconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
})

// Register the histogram
register.registerMetric(httpRequestDurationMicroseconds)

// Define the HTTP server
const server = http.createServer(async (req, res) => {
    // Start the timer
  const end = httpRequestDurationMicroseconds.startTimer()

  // Retrieve route from request object
  const route = url.parse(req.url).pathname

  if (route === '/metrics') {
    // Return all metrics the Prometheus exposition format
    res.setHeader('Content-Type', register.contentType)
    res.end(register.metrics())
  }

  // End timer and add labels
  end({ route, code: res.statusCode, method: req.method })
})

// Start the HTTP server which exposes the metrics on http://localhost:8080/metrics
server.listen(8081)