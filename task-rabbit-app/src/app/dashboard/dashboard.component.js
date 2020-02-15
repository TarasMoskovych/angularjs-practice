import angular from 'angular';
import './dashboard.component.scss';

const dashboard = {
  template: require('./dashboard.component.html').default,
  controller: function($location, $q, AuthService, TaskService) {
    this.$onInit = function() {
      this.posterTasks = [];
      this.runnerTasks = [];

      if (!AuthService.isSignedIn()) {
        $location.path('/login');
      } else {
        this.getInfo();
      }
    };

    this.getInfo = function() {
      $q.all([
        TaskService.getUserTasks('poster'),
        TaskService.getUserTasks('runner')
      ]).then(arr => {
        this.posterTasks = arr[0];
        this.runnerTasks = arr[1];
      });
    };
  },
};

angular
  .module('dashboard')
  .component('dashboard', dashboard);
