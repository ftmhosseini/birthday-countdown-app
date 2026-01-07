import dotenv from 'dotenv';
import admin from "firebase-admin";
import { readFileSync } from 'fs';
const serviceAccount = JSON.parse(
  readFileSync(new URL('./serviceAccountKey.json', import.meta.url))
);

dotenv.config();


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL
});


export const db = admin.database();
