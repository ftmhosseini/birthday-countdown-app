// const pool = require('../utilities/mysql_db')
import pool from '../mysql_db.js'

export default class ImageModel{
    static getImages = async()=>{
        const [result] = await pool.query('select * from images')
        console.log(result)
        return result
    }
    static getImageBirth = async()=>{
        const [result] = await pool.query('select * from images where description=?',['birthday'])
        console.log(result)
        const res = await ImageModel.getImages().filter(image => image.description ==='birthday')
        console.log(res);
        
        return result
    }
}
// console.log(ImageModel.getImage());

// exports.module = ImageModel
