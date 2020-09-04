const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

/**
 * Simple HTTP function that returns the "?text" query parameter in the response text.
 */
exports.simpleHttp = functions.https.onRequest((request, response) => {
  response.send(`text: ${request.query.text}`);
});

exports.simpleCallable = functions.https.onCall((data, ctx) => {

  const sum = data.a + data.b;
  return {
    c: sum,
  };
});

/**
 * Firestore-triggered function which uppercases a string field of a document.
 */
exports.firestoreUppercase = functions.firestore
  .document("/lowercase/{doc}")
  .onCreate(async (doc, ctx) => {
    const docId = doc.id;

    const docData = doc.data();
    const lowercase = docData.text;

    const firestore = admin.firestore();
    await firestore.collection("uppercase").doc(docId).set({
      text: lowercase.toUpperCase(),
    });
  });