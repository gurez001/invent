const admin = require("firebase-admin");
const serviceAccount= "../serviceAccountKey.json"
import mongoose from "mongoose";
export const db_connection = async () => {
  const url: string | undefined = process.env.DB; // Get the MongoDB URL from environment variables
  if (!url) {
    throw new Error("MongoDB URL (DB) is not defined in environment variables");
  }
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.log("Something went wrong in DB connection", err);
  }
};

export const initFirebase = async () => {
  if (!admin.apps.length) {
    // Only initialize if there are no existing apps
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    });
  }
  return admin.storage().bucket(); // Return the bucket reference
};
