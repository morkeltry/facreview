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
  value INTEGER NOT NULL
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
  ('Express','2017-08-14','www.hi.com'),
  ('Express-handlebars','2017-08-15','www.bye.com');
COMMIT;