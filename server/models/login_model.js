import pool from '../utilities/mysql_db.js';
import { db_firebase } from '../utilities/firebase_db.js';
import { ref, get, set, push, query, orderByChild, equalTo } from "firebase/database";

export default class LoginModel {
    static insertUser = async (db, email, name, password, dob) => {
        if (db === 'mysql') {
            const [result] = await pool.query('insert into users (email, name, password, date_of_birth) value(?,?,?,?)', [email, name, password, dob]);
            
            return result[0]
        }
        else return this.writeUserData({
            email: email,
            name: name,
            password: password,
            dob: dob
        })
    }
    static writeUserData = async (obj) => {
        try {

            const snapshot = await get(query(ref(db_firebase, 'userss'), orderByChild('email'), equalTo(obj.email)));

            if (snapshot.exists()) {
                return { ok: false, error: 'Email already exists' };
            }
            await push(ref(db_firebase, 'userss'), {
                name: obj.name,
                email: obj.email,
                password: obj.password,
                date_of_birth: obj.dob
            });
            return { ok: true };
        } catch (error) {
            console.error("Error saving data: ", error);
            return { ok: false, error };
        }
    }

    static checkAuthentication = async (db, email, password) => {
        if (db === 'mysql') {
            const [result] = await pool.query('select * from users where email=? and password=? ', [email, password]);
            return result
        }
        else {
            const userData = { email, password };

            const snapshot = await get(ref(db_firebase, 'userss'), userData);
            if (!snapshot.exists()) return [];

            const users = Object.values(snapshot.val());
            const result = users.filter(
                user => user.email === email && user.password === password
            )
            return result;
        }
    }
}
