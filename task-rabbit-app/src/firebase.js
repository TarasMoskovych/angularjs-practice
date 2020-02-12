import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

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
  storage: () => firebase.storage().ref(),
  timestamp: () => firebase.database.ServerValue.TIMESTAMP,
  messages: () => firebase.database().ref('messages'),
  users: () => firebase.database().ref('users'),
  tasks: () => firebase.database().ref('tasks'),
};
