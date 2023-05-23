# Anime and Categories Microservices

This project consists of two microservices: Anime and Categories. The Anime microservice manages anime-related information such as name, description, number of episodes, and number of seasons. The Categories microservice handles the categorization of anime.

## Technologies Used

- Node.js
- Express.js
- SQLite (for data storage)
- GraphQL (for API querying)
- RESTful API (for CRUD operations)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/achraf-rabbouche/anime-categories.git


2. Install the dependencies for each microservice:

   ```bash
   cd anime-microservice
    npm install

    cd ../categories-microservice
    npm install
    
  ## Usage


The Anime microservice provides a GraphQL API that allows querying and manipulating anime data. Access the GraphQL playground at http://localhost:5000/graphql to interact with the API.

The Categories microservice exposes a RESTful API for managing anime categories. Available endpoints include:

GET /categories - Retrieves a list of all categories.
GET /categories/:id - Retrieves a specific category by ID.
POST /categories - Creates a new category.
PUT /categories/:id - Updates an existing category.
DELETE /categories/:id - Deletes a category.
Ensure that both microservices are running simultaneously to utilize the full functionality of the system.
