// Angular
import angular from 'angular';
import 'angular-route';
import 'angular-animate';
import 'angular-aria';
import 'angular-messages';
import 'angular-material';
import 'angular-moment';
import 'ng-file-upload';
import 'angular-material/angular-material.scss';
import { app } from './app.component';

// Firebase
import firebase from 'firebase/app';
import 'angularfire';
import { firebaseConfig } from './../firebase';

// Shared Module
import './shared/shared.module';
import './shared/components';
import './shared/services';

// Auth Module
import './auth/auth.module';
import './auth/index';

// Dashboard Module
import './dashboard/dashboard.module';
import './dashboard/index';

// Task Module
import './task/task.module';
import './task/index';

angular
  .module('app', [
    'shared',
    'auth',
    'task',
    'dashboard',
    'ngRoute',
    'ngMaterial',
    'ngMessages',
    'ngFileUpload',
    'angularMoment',
    'firebase'
  ])
  .component('app', app)
  .config(function($routeProvider) {
    firebase.initializeApp(firebaseConfig);

    $routeProvider
      .when('/', {
        template: '<dashboard></dashboard>'
      })
      .when('/login', {
        template: '<login></login>'
      })
      .when('/register', {
        template: '<register></register>'
      })
      .when('/browse', {
        template: '<task-browse></task-browse>',
        reloadOnSearch: false
      })
      .otherwise({
        redirectTo: '/login'
      });
  });
