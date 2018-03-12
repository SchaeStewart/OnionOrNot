const db = require('../db')

module.exports = { 
    getById: async (id) => {
        const { rows } = await db.query('SELECT * FROM questions WHERE id = $1', [ id ])
        return rows[0]
    },
    save: async (post) => {
        const res = await db.query("INSERT INTO questions (posttitle, permalink, url, theonion) VALUES ($1, $2, $3, $4) RETURNING id", [post.title, post.permalink, post.url, post.theonion] )
        return res.rows[0].id
    }
}