import angular from 'angular';

const register = {
  template: require('./register.component.html').default,
  controller: function($location, $scope, AuthService, NotificationService) {
    this.loading = false;

    this.$onInit = function() {
      AuthService.redirect();
    };

    this.register = function({ data }) {
      AuthService
        .register(data)
        .then(() => $location.path('/login'))
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
  .component('register', register);
