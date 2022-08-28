import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCIwBGK889owtQ5Rj7D2DE4y-FfUmOK1gA',
  authDomain: 'pet-ui-project.firebaseapp.com',
  projectId: 'pet-ui-project',
  storageBucket: 'pet-ui-project.appspot.com',
  messagingSenderId: '975412591145',
  appId: '1:975412591145:web:7a0b11a308c41f1ad47a38',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);

export const auth = getAuth(app);
