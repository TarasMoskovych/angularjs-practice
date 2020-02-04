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
  tasks: () => firebase.database().ref('tasks'),
};
