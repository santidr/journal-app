import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyChosjiKc288yPoo4wFA0MlrdNcg1JmuWY",
    authDomain: "journal-app-d497e.firebaseapp.com",
    projectId: "journal-app-d497e",
    storageBucket: "journal-app-d497e.appspot.com",
    messagingSenderId: "421750217352",
    appId: "1:421750217352:web:5bdbd89438829de0a95d3d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export {
    db,
    googleAuthProvider,
    firebase
}