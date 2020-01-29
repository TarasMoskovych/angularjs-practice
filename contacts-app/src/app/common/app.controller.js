function AppController(AuthService, $state) {
  const ctrl = this;

  ctrl.user = AuthService.getUser();

  ctrl.logout = function() {
    AuthService
      .logout()
      .then(() => $state.go('auth.login'));
  };
}

angular
  .module('common')
  .controller('AppController', AppController);
