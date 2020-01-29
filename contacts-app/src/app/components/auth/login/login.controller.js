function LoginController(AuthService, $state) {
  const ctrl = this;

  ctrl.$onInit = function () {
    ctrl.loading = false;
    ctrl.error = null;
    ctrl.user = {
      email: '',
      password: ''
    };
  };

  ctrl.loginUser = function (event) {
    AuthService
      .login(event.user)
      .then(
        () => $state.go('app'),
        reason => ctrl.error = reason.message
      )
      .finally(() => ctrl.loading = false);
  };

  ctrl.cleanErrors = function() {
    if (ctrl.error) {
      ctrl.error = null;
    }
  };
}

angular
  .module('components.auth')
  .controller('LoginController', LoginController);
