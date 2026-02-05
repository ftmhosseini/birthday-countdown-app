import dotenv from 'dotenv';
import admin from "firebase-admin";
dotenv.config();
// import { readFileSync } from 'fs';
// const serviceAccount = JSON.parse(
//   readFileSync(new URL('./serviceAccountKey.json', import.meta.url))
// );
// Check if the variable exists, then parse it


const serviceAccount = process.env.SERVICE_ACCOUNT_KEY 
  ? JSON.parse(process.env.SERVICE_ACCOUNT_KEY) 
  : null;

if (!serviceAccount) {
  throw new Error("SERVICE_ACCOUNT_KEY is missing from environment variables");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL
});

// console.log(admin.database());

export const db_firebase = admin.database();
