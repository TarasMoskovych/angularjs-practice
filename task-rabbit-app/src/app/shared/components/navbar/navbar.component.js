import angular from 'angular';
import './navbar.component.scss';

const navBar = {
  template: require('./navbar.component.html').default,
  controller: function($location, $rootScope, AuthService) {
    this.select = null;
    this.isSignedIn = false;

    this.$onDestroy = this.sub$;

    this.sub$ = $rootScope.$on('authStateChanged', (e, authData) => this.isSignedIn = authData);

    this.onChangeAction = function() {
      if (this.select === 'logout') this.logout();

      this.select = null;
    };

    this.logout = function() {
      AuthService
        .logout()
        .then(() => $location.path('/login'));
    };
  }
};

angular
  .module('shared')
  .component('navbar', navBar);
