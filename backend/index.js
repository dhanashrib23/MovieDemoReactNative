const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require("./routes/user");
const moviesRoutes = require("./routes/movie");
const genresRoutes = require("./routes/genre");

app.use("/user", userRoutes);
app.use("/movie", moviesRoutes);
app.use("/genre", genresRoutes);

// Start the server
app.listen(4444, () => {
  console.log(`Server started on port: 4444`);
});
