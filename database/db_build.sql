BEGIN;

DROP TABLE IF EXISTS users, workshops, reviews, votes, comments CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(300) UNIQUE NOT NULL,
    pw VARCHAR(100) NOT NULL,
    admin BOOLEAN DEFAULT false,
    avatar VARCHAR(50) NOT NULL

);

CREATE TABLE workshops (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    date DATE NOT NULL,
    avg_review FLOAT,
    gh_link VARCHAR(200)

);
CREATE TABLE comments (
 id SERIAL PRIMARY KEY,
 ws_id INTEGER REFERENCES workshops(id),
 post VARCHAR(200) NOT NULL
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  ws_id INTEGER REFERENCES workshops(id),
  review_value INTEGER NOT NULL
);

CREATE TABLE votes (
  user_id INTEGER REFERENCES users(id),
  ws_id INTEGER REFERENCES workshops(id)
);
INSERT INTO users (name,email,pw,admin,avatar) VALUES
  ('Aisha','aisha@fac.com','$2a$10$27F4y6gJ9sHQ.ATD6UhEPuMzqI5/ZaiYY8g3ZP.XTrR5/D2VALIdO','false','avatar1.jpg' ) ,
  ('Yahia','yahia@fac.com','$2a$10$GYQo2WiMlZFN3ZYaIO57r.sZFR20e.njevmmtWCJajLyzSCgU2HjW','false','avatar2.jpg' ) ;

INSERT INTO workshops (title,date,gh_link) VALUES
  ('Introduction To Express','2017-08-14','https://github.com/foundersandcoders/introduction-to-express'),
  ('Express-workshop','2017-08-14','https://github.com/foundersandcoders/express-workshop'),
  ('Handlebars','2017-08-14','https://github.com/foundersandcoders/express-handlebars-workshop'),
  ('CSS Morning Challenge','2017-08-15','https://github.com/Akin909/morning-challenge-animated-app-drawer'),
  ('TDD Express','2017-08-15','https://github.com/Akin909/express-and-testing-workshop'),
  ('Express-handlebars Morning Challenge','2017-08-16','https://github.com/foundersandcoders/express-handlebars-challenge');

INSERT INTO reviews (ws_id, review_value) VALUES
  (1, 4),
  (1, 5),
  (2, 4),
  (3, 3),
  (2, 4),
  (3, 2);

INSERT INTO votes (user_id, ws_id) VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (2, 1),
  (2, 2),
  (2, 3);

UPDATE workshops
SET avg_review = (SELECT AVG(review_value)
                     FROM reviews
                     WHERE reviews.ws_id = workshops.id);

COMMIT;
