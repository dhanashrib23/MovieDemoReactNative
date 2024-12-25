const express = require("express");
const router = express.Router();
const conn = require("../db");

// All Genres API
router.get("/all", (request, response) => {
  const statement = `SELECT id, genreDesc, createdAt, isActive 
                     FROM genre 
                     WHERE isActive = 1`;

  conn.execute(statement, (err, genres) => {
    if (err) {
      console.error("Error fetching genres: ", err.message);
      return response
        .status(500)
        .json({ status: "error", message: "Failed to fetch genres" });
    }

    if (genres.length === 0) {
      return response
        .status(404)
        .json({ status: "error", message: "No active genres found" });
    }

    return response.status(200).json({
      status: "success",
      data: genres,
    });
  });
});

module.exports = router;
