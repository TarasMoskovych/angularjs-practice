// Angular
import angular from 'angular';
import 'angular-animate';
import 'angular-aria';
import 'angular-messages';
import 'angular-material';
import 'ng-file-upload';
import 'angular-material/angular-material.scss';
import { app } from './app.component';

// Firebase
import * as firebase from 'firebase';
import 'angularfire';
import { firebaseConfig } from './../firebase';

// Shared Module
import './shared/shared.module';
import './shared/components';
import './shared/services';

// Auth Module
import './auth/auth.module';
import './auth/index';

// Task Module
import './task/task.module';
import './task/index';

angular
  .module('app', [
    'shared',
    'auth',
    'task',
    'ngRoute',
    'ngMaterial',
    'ngMessages',
    'ngFileUpload',
    'firebase'
  ])
  .component('app', app)
  .config(function($routeProvider) {
    firebase.initializeApp(firebaseConfig);

    $routeProvider
      .when('/login', {
        template: '<login></login>'
      })
      .when('/register', {
        template: '<register></register>'
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
        redirectTo: '/login'
      });
  });
