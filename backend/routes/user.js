const express = require("express");
const router = express.Router();
const conn = require("../db");
const jwt = require("jsonwebtoken");
const secretKey = "your-secret-key";

// Register user
router.post("/register", (request, response) => {
  const { name, email, password, mobile } = request.body;
  console.log("request.body: ", request.body);

  const statement = `INSERT INTO users (name, email, password) 
                     VALUES (?, ?, ?)`;

  conn.execute(statement, [name, email, password], (err, result) => {
    if (err) {
      console.error(err.message);
      response.status(500).send("Error registering user.");
    } else {
      response.status(201).send("User registered successfully.");
    }
  });
});

// Login user
router.post("/login", (request, response) => {
  const { email, password } = request.body;

  const statement = `SELECT id, name, email, isActive
                     FROM users
                     WHERE email = ? AND password = ?`;

  conn.execute(statement, [email, password], (err, users) => {
    if (err) {
      console.error(err.message);
      return response.status(500).send("Error logging in.");
    }

    if (users.length == 0) {
      return response
        .status(404)
        .send("No user found with the given email and password.");
    } else {
      const { id, name, email, isActive } = users[0];

      if (isActive === 0) {
        return response.status(403).send("User is not active.");
      } else {
        const payload = {
          id,
          name,
          email,
        };

        const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

        const updateStatement = `UPDATE users SET token = ? WHERE id = ?`;
        console.log("token: " + token);
        console.log("id: " + id);

        conn.execute(updateStatement, [token, id], (err, result) => {
          if (err) {
            console.error("Error storing token in the database: ", err.message);
          }
        });

        return response.json({
          status: "success",
          userData: {
            id,
            name,
            email,
          },
          token: token,
        });
      }
    }
  });
});

module.exports = router;
