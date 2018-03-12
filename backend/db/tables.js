const db = require('../db')

db.query('CREATE TABLE questions(id SERIAL PRIMARY KEY, postTitle VARCHAR(255) not null, permalink VARCHAR(255) not null, url VARCHAR(255) not null, theOnion BOOLEAN not null)')
    .then(res => { console.log(res) })
    .catch( err => { console.log(err) })