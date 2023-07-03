// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCzDdXnA4ftSVdykiKaerStoa3pt9_Lvsc",
  authDomain: "chill-garden.firebaseapp.com",
  projectId: "chill-garden",
  storageBucket: "chill-garden.appspot.com",
  messagingSenderId: "891268840207",
  appId: "1:891268840207:web:7b7b9e442a5971dda55c7a"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {app};
