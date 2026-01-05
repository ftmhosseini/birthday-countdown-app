// const pool = require('../utilities/mysql_db')
import pool from '../mysql_db.js'

export default class LoginModel{
    static getInfo = async (email) =>{
        const [result] = await pool.query('select dob from users where email=?',[email]);
        return result[0]
    }
    static insertUser = async (email, name, password, dob) =>{
        const [result] = await pool.query('insert into users (email, name, password, date_of_birth) value(?,?,?,?)',[email, name, password, dob]);
        return result[0]
    }
    static checkAuthentication = async (email, password) =>{
        const [result] = await pool.query('select * from users where email=? and password=? ',[email, password]);
        return result[0]
    }
}