import angular from 'angular';
import { databases } from './../../firebase';

function TaskService($firebaseArray) {
  const ref = databases.tasks();

  this.get = function() {
    return $firebaseArray(ref);
  };

  this.add = function(task) {
    return $firebaseArray(ref).$add(task);
  };
}

angular
  .module('task')
  .service('TaskService', ['$firebaseArray', TaskService]);
