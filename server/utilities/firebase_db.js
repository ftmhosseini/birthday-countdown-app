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

// console.log(admin.database());

export const db_firebase = admin.database();
