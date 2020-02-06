import angular from 'angular';

const login = {
  template: require('./login.component.html').default,
  controller: function($location, AuthService) {
    this.login = function({ data }) {
      AuthService
        .login(data)
        .then(() => $location.path('/browse'));
    };
  }
};

angular
  .module('auth')
  .component('login', login);
