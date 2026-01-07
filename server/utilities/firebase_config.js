import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Fetch the config from your Express server
const response = await fetch('/api/firebase-config');
const firebaseConfig = await response.json();

// Initialize
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
console.log("Firebase initialized with env values!");