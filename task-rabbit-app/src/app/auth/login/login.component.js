import angular from 'angular';

const login = {
  template: require('./login.component.html').default,
  controller: function($scope, AuthService, NotificationService) {
    this.loading = false;

    this.login = function({ data }) {
      AuthService
        .login(data)
        .catch(e =>  NotificationService.show(e.message))
        .finally(() => {
          this.loading = false;
          $scope.$apply();
        });
    };
  }
};

angular
  .module('auth')
  .component('login', login);
