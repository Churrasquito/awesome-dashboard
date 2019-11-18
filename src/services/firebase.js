import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  // config firebase Cloud Firestore here
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Get a Firestore instance
export const db = firebase.firestore();

export const storage = firebase.storage();


// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { TimeStamp, GeoPoint } = firebase.firestore;
export { TimeStamp, GeoPoint };
