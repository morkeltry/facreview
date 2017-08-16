BEGIN;

DROP TABLE IF EXISTS users, posts, reviews, comment CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    email TEXT UNIQUE,
    password TEXT NOT NULL
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(250) NOT NULL,
    date DATE NOT NULL,
    fac_ID INTEGER,
    week INTEGER,
    avg_review INTEGER
);
CREATE TABLE comment (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  comment VARCHAR(200) NOT NULL,
  date DATE NOT NULL
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  post_id INTEGER REFERENCES posts(id),
  review INTEGER
);


COMMIT;