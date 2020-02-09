import angular from 'angular';
import './auth-form.component.scss';

const authForm = {
  bindings: {
    title: '@',
    button: '@',
    type: '@',
    loading: '=',
    onSubmit: '&'
  },
  template: require('./auth-form.component.html').default,
  controller: function() {
    this.$onInit = function() {
      this.form = {
        name: '',
        email: '',
        password: ''
      };
    };

    this.submit = function() {
      this.loading = true;
      this.onSubmit({
        $event: {
          data: this.form
        }
      });
    };
  }
};

angular
  .module('shared')
  .component('authForm', authForm);
