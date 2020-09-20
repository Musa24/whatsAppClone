import firebase from 'firebase';
const firebaseConfig = {
  apiKey: 'AIzaSyB-LJxdbidBqhiOKAn6EOiw-XG5-nftkAw',
  authDomain: 'whatsapp-clone-6fc7f.firebaseapp.com',
  databaseURL: 'https://whatsapp-clone-6fc7f.firebaseio.com',
  projectId: 'whatsapp-clone-6fc7f',
  storageBucket: 'whatsapp-clone-6fc7f.appspot.com',
  messagingSenderId: '1029902854440',
  appId: '1:1029902854440:web:029b90ac1fe003b3f1881d',
  measurementId: 'G-M6KVCJ6WJH',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
