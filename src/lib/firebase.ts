// src/lib/firebase.ts

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase config sourced securely from environment variables
const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;

// Log found environment variables for debugging - check your server terminal for these logs!
// This log helps confirm if .env.local is being picked up at all.
console.log("--- Firebase Environment Variables Check (from src/lib/firebase.ts) ---");
console.log("Attempting to load NEXT_PUBLIC_FIREBASE_API_KEY:", apiKey ? "Found" : "NOT FOUND / UNDEFINED");
console.log("----------------------------------------------------------------------");


if (!apiKey) {
  throw new Error(
    "Firebase API Key (NEXT_PUBLIC_FIREBASE_API_KEY) is not defined. " +
    "Please ensure it is set correctly in your .env.local file in the project root (NOT inside the src/ folder). " +
    "Verify there are no typos in the variable name or its value. " +
    "Crucially, you MUST COMPLETELY RESTART your Next.js development server (e.g., stop and re-run `npm run dev`) after creating or modifying the .env.local file. " +
    "Ensure the file is named exactly '.env.local' (with a leading dot)."
  );
}

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

// Prevent re-initialization during hot reloads in development
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage }
