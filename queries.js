const Pool = require('pg').Pool
const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    database: 'HW8',
    password: 'admin123',
    port: 5432,
})

console.log(pool + "Success connect DB")

const getUsers = (req, res) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (err, res) => {
        if(err) {
            throw error
        }
        res.status(200).json(res.rows)
    })
}
const a = getUsers.json
console.log( a  + "Contoh query connected")