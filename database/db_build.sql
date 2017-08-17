BEGIN;

DROP TABLE IF EXISTS users, workshops, reviews, votes CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(300) UNIQUE NOT NULL,
    pw VARCHAR(100) NOT NULL,
    admin BOOLEAN,
    avatar VARCHAR(20)

);

CREATE TABLE workshops (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    date DATE NOT NULL,
    avg_review FLOAT,
    gh_link VARCHAR(200)

);
--CREATE TABLE comment (
--  id SERIAL PRIMARY KEY,
--  user_id INTEGER REFERENCES users(id),
--  comment VARCHAR(200) NOT NULL,
--  date DATE NOT NULL
--);
--
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  ws_id INTEGER REFERENCES workshops(id),
  review_value INTEGER NOT NULL
);

CREATE TABLE votes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  ws_id INTEGER REFERENCES workshops(id)
);
INSERT INTO users (name,email,pw,admin,avatar) VALUES
  ('Aisha','aisha@fac.com','test','false','avatar1.jpg' ) ,
  ('Yahia','yahia@fac.com','test','false','avatar2.jpg' ) ;

INSERT INTO workshops (title,date,gh_link) VALUES
  ('Introduction To Express','2017-08-14','www.hi.com'),
  ('Express-workshop','2017-08-14','www.hi.com'),
  ('Handlebars','2017-08-14','www.hi.com'),
  ('CSS Morning Challenge','2017-08-15','www.hi.com'),
  ('TDD Express','2017-08-15','www.hi.com'),
  ('Express-handlebars Morning Challenge','2017-08-16','www.bye.com');

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
