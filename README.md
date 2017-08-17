# Readme
## What :question: 

FAC*STAR works as a tempurature check for how students at FAC found workshops. When logged in students can rate workshops between 1-5 depending on how they felt it went, and view an average of rating for each workshop.

## Why :snail: 
Founders and Coders is an amazing course that is continually growing and developing with every cohort. To aid this process, FAC*STAR collects accurate feedback from all students on course workshops. By collating this information it can be used for:
- prompting conversations during SGC's
- highlight excellent workshops and those that need improvement
- reminders for the next set of mentors when they are planning their week

## User Stories :dancers: 
### MVP :sparkles: 
 * Users can Login.
 * Users can see all the workshops from a given week, split by date/day.
 * Users can annonymously give feedback to workshops out of 5.
 * Once users give feedback, only then can they see the average feedback rating. 

### Stretch Goals :runner: 
 * Users can sign up. 
 * Users can post anonymous comments for each workshop. 


### SUPER Stretch Goals :runner: :runner: :runner: 
 * Admin can add workshops
 * Admin can see all anonymous comments posted on workshops
 * Admin can see the number of students who have voted on each workshop

## Requirements :grey_exclamation: 
- [x] Build an app using the Express framework.
- [x] Use a PostgreSQL database to store and retrieve your data.
- [x] Use the retrieved data to populate a Handlebars template for server-side rendering to be displayed on the front-end.
- [ ] Include tests and set up code coverage.
- [ ] Use Heroku or a similar service to host the app and the database.
- [x] Try to include ES6 syntax on the server.

## Schema :information_source: 
### users

| Column | Types | Modifiers |
| -------- | -------- | -------- |
|  id  | serial     |   PRIMARY KEY   |
|  name  | VARCHAR(100) |   NOT NULL  |
|  email  | VARCHAR(300) |   NOT NULL UNIQUE  |
|  pw  |   VARCHAR(100)    |   NOT NULL    |
|  admin  | BOOLEAN      |       |
| avatar | VARCHAR(20) |        |

### workshops

| Column | Types | Modifiers |
| -------- | -------- | -------- |
|   id   | serial     |   PRIMARY KEY   |
|   title  | VARCHAR(200) |   NOT NULL  |
|  date   |   DATE    | NOT NULL      |
|   avg_review   |   FLOAT    |       |
|   gh_link  | VARCHAR(200) |     |

### reviews

| Column | Types | Modifiers |
| -------- | -------- | -------- |
|  id   | serial     |   PRIMARY KEY   |
|   ws_id  | INTEGER REFERENCES workshops(id)    |   |
|   review_value  |   INTEGER    |   NOT NULL    |

### votes (linking table)

| Column | Types | Modifiers |
| -------- | -------- | -------- |
|   user_id  |INTEGER REFERENCES users(id)    |      |
|   ws_id  | INTEGER REFERENCES workshop(id)    |     |

### comments (STRETCH)

| Column | Types | Modifiers |
| -------- | -------- | -------- |
|   id   |  serial     |   PRIMARY KEY   |
|  ws_id   | INTEGER REFERENCES workshop(id)    |   |
|   post   | VARCHAR(200) |   NOT NULL  |

## Middleware 🖕

* **cookie-parser**: deals with cookies - creates them in the correct format
* **express-validator**: simplifies validation functions - checks length, email etc.
* **flash**: displays messages onscreen, e.g. error messages and confirmations
* **express-session**: manages session and setting cookie. *It works well with passport*
* **passport**: manages logins. *Use* `passport-local` *to deal with local DB sign-ups*


