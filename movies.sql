CREATE DATABASE movies_db;
USE movies_db;

-- Table structure for table genre
DROP TABLE IF EXISTS genre;
CREATE TABLE genre (
  id INT NOT NULL AUTO_INCREMENT,
  genreDesc VARCHAR(100) NOT NULL,
  createdAt DATE DEFAULT NULL,
  isActive TINYINT(1) DEFAULT 1,
  PRIMARY KEY (id)
);


INSERT INTO genre VALUES 
(1, 'Action', '2024-12-01', 1),
(2, 'Comedy', '2024-11-25', 1),
(3, 'Drama', '2024-12-05', 1),
(4, 'Horror', '2024-10-15', 0),
(5, 'Science Fiction', '2024-09-10', 1),
(6, 'Romance', '2024-08-20', 1),
(7, 'Documentary', '2024-07-30', 1);
UNLOCK TABLES;

-- Table structure for table movies
DROP TABLE IF EXISTS movies;
CREATE TABLE movies (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  genreId INT NOT NULL,
  description VARCHAR(200) DEFAULT NULL,
  createdAt DATE DEFAULT NULL,
  isActive TINYINT(1) DEFAULT 1,
  PRIMARY KEY (id),
  KEY genreId (genreId),
  CONSTRAINT fk_genre FOREIGN KEY (genreId)
    REFERENCES genre(id)
    ON DELETE CASCADE
);

-- Dumping data for table movies

INSERT INTO movies VALUES 
(1, 'The Dark Knight', 1, 'A gritty and intense superhero film.', '2024-12-01', 1),
(2, 'Superbad', 2, 'A hilarious coming-of-age comedy.', '2024-11-30', 1),
(3, 'The Shawshank Redemption', 3, 'An inspiring story of hope and friendship.', '2024-12-05', 1),
(4, 'The Conjuring', 4, 'A chilling horror film based on true events.', '2024-10-20', 1),
(5, 'Inception', 5, 'A mind-bending science fiction thriller.', '2024-09-15', 1),
(6, 'The Notebook', 6, 'A touching romantic drama.', '2024-08-25', 1),
(7, 'Planet Earth', 7, 'A breathtaking nature documentary series.', '2024-07-31', 1);


-- Table structure for table users
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  imagePath VARCHAR(200) DEFAULT NULL,
  password VARCHAR(50) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  isActive TINYINT(1) DEFAULT 1,
  token VARCHAR(200) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY email (email)
);

INSERT INTO users (name, email, password) VALUES ("Shreyas", "shreyas@gmail.com", "sj");

