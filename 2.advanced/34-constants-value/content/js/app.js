angular
  .module('app', [])
  .constant('FIREBASE_CONFIG', {
    apiKey: 'apiKey',
    authDomain: 'authDomain',
    databaseURL: 'databaseURL',
    storageBucket: '',
  })
  .value('EventEmitter', function (event) {
    $event: event
  });
