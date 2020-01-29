const authForm = {
  bindings: {
    user: '<',
    loading: '=',
    message: '@',
    button: '@',
    onSubmit: '&',
    onKeyup: '&'
  },
  templateUrl: './auth-form.html',
  controller: 'AuthFormController'
};

angular
  .module('components.auth')
  .component('authForm', authForm);
