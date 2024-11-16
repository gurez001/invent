const admin = require("firebase-admin");
const serviceAccount = "../serviceAccountKey.json";
import mongoose from "mongoose";

export const primaryConnection = mongoose.createConnection(
  process.env.PRIMARY_CONN_STR!
);
primaryConnection.on("connected", () => {
  console.log("PRIMARY DB connected");
});

primaryConnection.on("error", (err: any) => {
  console.error("Error connecting to PRIMARY DB:", err);
});

export const secondaryConnection = mongoose.createConnection(
  process.env.SECONDARY_CONN_STR!
);

secondaryConnection.on("connected", () => {
  console.log("SECONDARY DB connected");
});

secondaryConnection.on("error", (err: any) => {
  console.error("Error connecting to SECONDARY DB:", err);
});


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
