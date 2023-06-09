import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAY41gwzcsLrOtWIDuC_-t7f-4QEbxmZwI",
  authDomain: "fir-react-t-1b9db.firebaseapp.com",
  projectId: "fir-react-t-1b9db",
  storageBucket: "fir-react-t-1b9db.appspot.com",
  messagingSenderId: "585440762942",
  appId: "1:585440762942:web:3165f621277f038889c56f",
  measurementId: "G-ZB72NHZC1N"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);