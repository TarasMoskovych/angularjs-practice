import angular from 'angular';

const login = {
  template: require('./login.component.html').default,
  controller: function($scope, AuthService, NotificationService) {
    this.loading = false;

    this.$onInit = function() {
      AuthService.redirect();
    };

    this.login = function({ data }) {
      AuthService
        .login(data)
        .then(({ user }) => {
          if (!user.emailVerified) { NotificationService.show('Your account is inactive.'); }
          AuthService.redirect();
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
