import angular from 'angular';
import { app } from './app.component';
import './app.component.scss';

angular
  .module('app', [])
  .component('app', app);
