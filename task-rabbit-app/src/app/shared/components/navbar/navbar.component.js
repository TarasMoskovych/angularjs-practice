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
      if (this.select === 'dashboard') $location.path('/').search({});

      this.select = null;
    };

    this.logout = function() {
      AuthService
        .logout()
        .then(() => $location.path('/login'));
    };

    this.updateProfile = function() {
      const name = this.isSignedIn?.displayName;
      const close = () => $mdDialog.hide();

      $mdDialog.show({
        template: `<update-profile name="{{ name }}" close="close();"></update-profile>`,
        clickOutsideToClose: true,
        locals: { name, close },
        controller: function($scope, name, close) {
          $scope.name = name;
          $scope.close = close;
        }
      });
    };

    this.openNewTaskModal = function() {
      const close = () => $mdDialog.hide();

      $mdDialog.show({
        template: `<task-post close="close();"></task-post>`,
        clickOutsideToClose: true,
        locals: { close },
        controller: function($scope, close) {
          $scope.close = close;
        }
      });
    };
  }
};

angular
  .module('shared')
  .component('navbar', navBar);
