const db = require('../db');
const logError = require('../lib');

module.exports = {
  getById: id => db.query('SELECT * FROM questions WHERE id = $1', [id])
    .then(res => res.rows[0])
    .catch(logError),

  save: post => db.query('INSERT INTO questions (posttitle, permalink, url, theonion) VALUES ($1, $2, $3, $4) RETURNING id, posttitle as title', [post.title, post.permalink, post.url, post.theonion])
    .then(res => res.rows[0])
    .catch(logError),

  getRandom: () => db.query('SELECT * FROM questions OFFSET RANDOM() * (SELECT COUNT(*) FROM questions) LIMIT 1;')
    .then(res => res.rows[0])
    .catch(logError),
};
