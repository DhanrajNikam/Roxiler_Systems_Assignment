// config/db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port : '3306',
    user: 'root',
    password: 'manager',
    database: 'transaction_db',

});

module.exports = connection;
