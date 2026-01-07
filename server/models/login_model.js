import pool from '../utilities/mysql_db.js';
import { db } from '../utilities/firebase_db.js';
import {ref, get, set, push } from "firebase/database";

export default class LoginModel {
    static getInfo = async (email) => {
        const [result] = await pool.query('select dob from users where email=?', [email]);
        return result[0]
    }
    static insertUser = async (email, name, password, dob, tel = '00000') => {
        // const [result] = await pool.query('insert into users (email, name, password, date_of_birth) value(?,?,?,?)', [email, name, password, dob]);
        // return result[0]
        this.writeUserData({
            email: email,
            phone: tel,
            // phone: phone ?? '00000',
            name: name,
            password: password,
            dob: dob})
    }
    static writeUserData = async (obj) => {

        const emailKey = normalizeEmail(obj.email);
        const emailRef = ref(db, "emails/" + emailKey);
        console.log(emailKey);
        console.log(`emails are ${ref(db, "userId/" + emailRef.id)}`);

        // 🔍 Check if email already exists
        const snapshot = await get(emailRef);
        console.log(`snapshot are ${snapshot.val}`);

        if (snapshot.exists()) {
            throw new Error("Email already exists");
        }
        // ✅ Create user ID
        const userRef = push(ref(db, "users"));
        const userId = userRef.key;

        await set(userRef, {
            username: obj.name,
            email: obj.email,
            tel: obj.phone,
            psd: obj.password,
            dob: obj.dob
        });

        await set(emailRef, userId);
        console.log('done!!!');

    }

    static checkAuthentication = async (email, password) => {
        // const [result] = await pool.query('select * from users where email=? and password=? ', [email, password]);
        // return result[0]
        const users = await db.ref('users').once('value');
        const usersData =  users.exists() ? Object.values(users.val()) : [];
        const result = usersData.filter(
            user => user.email === email && user.psd === password
        )
        console.log(`the query of authentication is ${result}`);
        
        return result;
    }
}

function normalizeEmail(email) {
  return email.toLowerCase().replace(/\./g, "_");
}