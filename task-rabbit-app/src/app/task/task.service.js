import angular from 'angular';
import { databases } from './../../firebase';

function TaskService($firebaseArray, $firebaseObject, AuthService) {
  const ref = databases.tasks();

  this.get = function() {
    return $firebaseArray(ref).$loaded();
  };

  this.getById = function(id) {
    return $firebaseObject(ref.child(id)).$loaded();
  };

  this.add = function(task) {
    const { uid, photoURL, displayName } = AuthService.isSignedIn();

    return $firebaseArray(ref).$add({
      ...task,
      datetime: databases.timestamp(),
      status: 'open',
      poster: uid,
      photoURL,
      displayName
    });
  };

  this.update = function({ $id, datetime, description, displayName, poster, status, title, total }) {
    const { photoURL } = AuthService.isSignedIn();

    return ref.child($id).update({ datetime, description, displayName, photoURL, poster, status, title, total });
  };

  this.remove = function(id) {
    return ref.child(id).update({ status: 'cancelled' });
  };

  this.isCreator = function(task) {
    return AuthService.isSignedIn()?.uid === task.poster;
  };

  this.isOpen = function(task) {
    return task.status === 'open';
  };
}

angular
  .module('task')
  .service('TaskService', TaskService);
