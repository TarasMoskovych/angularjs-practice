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

  this.update = function({ $id, datetime, description, displayName, poster, status, title, total, runner }) {
    const { photoURL } = AuthService.isSignedIn();
    const obj = { datetime, description, displayName, photoURL, poster, status, title, total, runner };

    Object.keys(obj).forEach((key) => (obj[key] === null || obj[key] === undefined) && delete obj[key]);
    return ref.child($id).update(obj);
  };

  this.remove = function($id) {
    return this.update({ $id, status: 'cancelled' });
  };

  this.complete = function($id) {
    return this.update({ $id, status: 'completed' });
  };

  this.isCreator = function(task) {
    return AuthService.isSignedIn()?.uid === task.poster;
  };

  this.isAssignee = function(task) {
    return AuthService.isSignedIn()?.uid === task.runner;
  };

  this.isOpen = function(task) {
    return task.status === 'open';
  };
}

angular
  .module('task')
  .service('TaskService', TaskService);
