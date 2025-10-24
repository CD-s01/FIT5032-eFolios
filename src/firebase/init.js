import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.process.env.FIREBASE_API_KEY,
  authDomain: 'week7-9dd44.firebaseapp.com',
  projectId: 'week7-9dd44',
  storageBucket: 'week7-9dd44.firebasestorage.app',
  messagingSenderId: '708437994512',
  appId: '1:708437994512:web:e16f027c577ee001a5ae95',
}

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()
export const auth = getAuth()
