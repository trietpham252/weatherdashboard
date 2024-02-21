// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZOdsUpD4r3kzT-8jWAJPz7O1wPOt1tC0",
  authDomain: "weatherdashboard-198c7.firebaseapp.com",
  projectId: "weatherdashboard-198c7",
  storageBucket: "weatherdashboard-198c7.appspot.com",
  messagingSenderId: "753280297622",
  appId: "1:753280297622:web:2551c98b3a93c5d372b0b7",
  measurementId: "G-DJ6EQZDMM9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
onMessage(messaging, (payload) => {
  console.log('Messaging received', payload);
});
export { messaging };
