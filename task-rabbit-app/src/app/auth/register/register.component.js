import angular from 'angular';

const register = {
  template: require('./register.component.html').default,
  controller: function($location, AuthService) {
    this.register = function({ data }) {
      AuthService
        .register(data)
        .then(() => $location.path('/login'));
    };
  }
};

angular
  .module('auth')
  .component('register', register);
