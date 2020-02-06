import firebase from 'firebase';

export const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: ''
};

export const databases = {
  auth: () => firebase.auth(),
  users: () => firebase.database().ref('users'),
  tasks: () => firebase.database().ref('tasks'),
};
