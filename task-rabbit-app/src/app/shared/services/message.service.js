import angular from 'angular';
import { databases } from './../../../firebase';

function MessageService($firebaseArray, AuthService) {
  const ref = databases.messages();

  this.get = function(taskId) {
    return $firebaseArray(ref.child(taskId)).$loaded();
  };

  this.add = function(taskId, message) {
    const { photoURL, displayName } = AuthService.isSignedIn();

    return $firebaseArray(ref.child(taskId)).$add({
      message,
      datetime: databases.timestamp(),
      photoURL,
      displayName
    });
  };
}

angular
  .module('shared')
  .service('MessageService', MessageService);
