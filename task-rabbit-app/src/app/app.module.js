// Angular
import angular from 'angular';
import { app } from './app.component';

// Firebase
import * as firebase from 'firebase';
import 'angularfire';
import { firebaseConfig } from './../firebase';

// Task Module
import './task/task.module';
import './task/index';

angular
  .module('app', [
    'task',
    'ngRoute',
    'firebase'
  ])
  .component('app', app)
  .config(['$routeProvider',
    function($routeProvider) {
      firebase.initializeApp(firebaseConfig);

      $routeProvider
        .when('/', {
          template: '<div>Main</div>'
        })
        .when('/post', {
          template: '<task-post></task-post>'
        })
        .when('/edit', {
          template: '<task-edit></task-edit>'
        })
        .when('/browse', {
          template: '<task-browse></task-browse>'
        })
        .otherwise({
          redirectTo: '/'
        });
    }
  ]);
