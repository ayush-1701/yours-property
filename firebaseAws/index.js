//  implemented by Shubham
const admin = require('firebase-admin');
const firebaseapp=require('firebase/app');
const firebaseauth=require('firebase/auth');
const dotenv = require('dotenv');
const aws = require('aws-sdk');

dotenv.config();
let serviceAccount = require("../yours-property-firebase-adminsdk-4u3cv-42d36f676d.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
};
firebaseapp.initializeApp(firebaseConfig);
let db=admin.firestore();
let auth=firebaseauth;
// -------------------- Aws -----------------------------------
const region = "ap-south-1";
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
aws.config.update({
    region,
    accessKeyId,
    secretAccessKey
})
const s3 = new aws.S3();

module.exports={
  db:db,
  auth:auth,
  aws:s3,
}
