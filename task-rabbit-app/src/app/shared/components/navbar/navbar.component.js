import angular from 'angular';
import './navbar.component.scss';

const navBar = {
  template: require('./navbar.component.html').default,
  controller: function($location, $rootScope, $mdDialog, AuthService) {
    this.select = null;
    this.isSignedIn = false;

    this.$onDestroy = this.sub$;

    this.sub$ = $rootScope.$on('authStateChanged', (e, authData) => this.isSignedIn = authData);

    this.onChangeAction = function() {
      if (this.select === 'logout') this.logout();
      if (this.select === 'update') this.updateProfile();

      this.select = null;
    };

    this.logout = function() {
      AuthService
        .logout()
        .then(() => $location.path('/login'));
    };

    this.updateProfile = function() {
      const name = this.isSignedIn?.displayName;

      $mdDialog.show({
        template: `<update-profile name="{{ name }}"></update-profile>`,
        clickOutsideToClose: true,
        locals: { name },
        controller: function($scope, name) {
          $scope.name = name;
        }
      });
    };
  }
};

angular
  .module('shared')
  .component('navbar', navBar);
