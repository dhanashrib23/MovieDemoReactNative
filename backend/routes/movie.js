const express = require("express");
const router = express.Router();
const conn = require("../db");

// Movies API - Fetch all active movies with genre
router.get("/all", (request, response) => {
  const statement = `
    SELECT 
      m.id, 
      m.title, 
      m.description, 
      m.createdAt, 
      g.genreDesc AS genre,
      m.isActive
    FROM movies m
    JOIN genre g ON m.genreId = g.id
    WHERE m.isActive = 1
  `;

  conn.execute(statement, (err, movies) => {
    if (err) {
      console.error("Error fetching movies: ", err.message);
      return response
        .status(500)
        .json({ status: "error", message: "Failed to fetch movies" });
    }

    if (movies.length === 0) {
      return response
        .status(404)
        .json({ status: "error", message: "No active movies found" });
    }

    return response.status(200).json({
      status: "success",
      movieData: movies,
    });
  });
});

// Search movies by name using query parameters
router.get("/search", (request, response) => {
  const { title } = request.query;

  if (!title) {
    return response.status(400).json({
      status: "error",
      message: "Please provide a movie title to search.",
    });
  }

  const statement = `
          SELECT 
            m.id, 
            m.title, 
            m.description, 
            m.createdAt, 
            g.genreDesc AS genre,
            m.isActive
          FROM movies m
          JOIN genre g ON m.genreId = g.id
          WHERE m.isActive = 1 AND m.title LIKE ?
        `;

  const searchPattern = `%${title}%`;

  conn.execute(statement, [searchPattern], (err, movies) => {
    if (err) {
      console.error("Error searching movies: ", err.message);
      return response
        .status(500)
        .json({ status: "error", message: "Failed to search movies." });
    }

    if (movies.length === 0) {
      return response.status(404).json({
        status: "error",
        message: "No movies match the search criteria.",
      });
    }

    return response.status(200).json({
      status: "success",
      movieData: movies,
    });
  });
});

// Fetch movie by ID
router.get("/:id", (request, response) => {
  const { id } = request.params;

  const statement = `
      SELECT 
        m.id, 
        m.title, 
        m.description, 
        m.createdAt, 
        g.genreDesc AS genre,
        m.isActive
      FROM movies m
      JOIN genre g ON m.genreId = g.id
      WHERE m.id = ? AND m.isActive = 1
    `;

  conn.execute(statement, [id], (err, movies) => {
    if (err) {
      console.error("Error fetching movie: ", err.message);
      return response
        .status(500)
        .json({ status: "error", message: "Failed to fetch the movie." });
    }

    if (movies.length === 0) {
      return response.status(404).json({
        status: "error",
        message: "No movie found with the given ID.",
      });
    }

    return response.status(200).json({
      status: "success",
      movieData: movies[0],
    });
  });
});

// Fetch movies by genreId
router.get("/genre/:genreId", (request, response) => {
  const { genreId } = request.params;

  const statement = `
      SELECT 
        m.id, 
        m.title, 
        m.description, 
        m.createdAt, 
        g.genreDesc AS genre,
        m.isActive
      FROM movies m
      JOIN genre g ON m.genreId = g.id
      WHERE m.isActive = 1 AND g.id = ?
    `;

  conn.execute(statement, [genreId], (err, movies) => {
    if (err) {
      console.error("Error fetching movies: ", err.message);
      return response
        .status(500)
        .json({ status: "error", message: "Failed to fetch movies" });
    }

    if (movies.length === 0) {
      return response.status(404).json({
        status: "error",
        message: "No movies found for the given genre",
      });
    }

    return response.status(200).json({
      status: "success",
      movieData: movies,
    });
  });
});

module.exports = router;
