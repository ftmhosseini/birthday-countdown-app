// const mysql = require('mysql2');
import mysql from 'mysql2';
import dotenv from 'dotenv';

// require('dotenv').config()
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE_NAME || 'login_db'
}).promise()

// module.exports = pool;
export default pool;
