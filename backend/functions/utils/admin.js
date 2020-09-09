var admin = require("firebase-admin");

var serviceAccount = require("./hackernewsclone-bc4a1-firebase-adminsdk-573wt-9ee5f96ee7.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fullfill-e3bbe.firebaseio.com"
});
const db = admin.firestore();
module.exports = {admin, db};