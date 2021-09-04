import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBtkYI4DPxIJBeVzQ_PNLAE9cwTHn_6wr4",
    authDomain: "task-356e2.firebaseapp.com",
    projectId: "task-356e2",
    storageBucket: "task-356e2.appspot.com",
    messagingSenderId: "800560154900",
    appId: "1:800560154900:web:c7f7040214d026670bda01"
};


export const Firebase = firebase.initializeApp(firebaseConfig);
const db = Firebase.firestore();
const auth = firebase.auth();
const firebasestorage = Firebase.storage();

export { firebasestorage };
export { auth };
export default db;