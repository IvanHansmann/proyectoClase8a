import firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyDqsO92okRpL58CEscqV8vusD1gnBRFUD4",
  authDomain: "proyectoclase8a.firebaseapp.com",
  projectId: "proyectoclase8a",
  storageBucket: "proyectoclase8a.appspot.com",
  messagingSenderId: "996062025955",
  appId: "1:996062025955:web:bb6e6939b4524d57a0cdd6"
};

  export const firebaseApp = firebase.initializeApp(firebaseConfig)