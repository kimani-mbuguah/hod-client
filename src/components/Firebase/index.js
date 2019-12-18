import firebase from "firebase/app"
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCWf1TIAcweK9o78KHQI0QUWF-HmOmMDqs",
  authDomain: "houseofdestiny-40a6b.firebaseapp.com",
  databaseURL: "https://houseofdestiny-40a6b.firebaseio.com",
  projectId: "houseofdestiny-40a6b",
  storageBucket: "houseofdestiny-40a6b.appspot.com",
  messagingSenderId: "221868850601",
  appId: "1:221868850601:web:cac849eddcefec8e0658b8",
  measurementId: "G-ZWW8XDT9NR"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export { firebase, storage as default }
