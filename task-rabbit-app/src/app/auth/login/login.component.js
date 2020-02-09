import angular from 'angular';

const login = {
  template: require('./login.component.html').default,
  controller: function($location, $scope, AuthService, NotificationService) {
    this.loading = false;

    this.login = function({ data }) {
      AuthService
        .login(data)
        .then(({ user }) => {
          if (!user.emailVerified) { NotificationService.show('Your account is inactive.'); }
          $location.path('/brwose');
        })
        .catch(e => NotificationService.show(e.message))
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
