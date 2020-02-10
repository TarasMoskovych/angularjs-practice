import angular from 'angular';
import './auth-form.component.scss';

const authForm = {
  bindings: {
    name: '@',
    title: '@',
    button: '@',
    type: '@',
    fullWidth: '<',
    loading: '=',
    onSubmit: '&'
  },
  template: require('./auth-form.component.html').default,
  controller: function($scope) {
    this.$onInit = function() {
      this.form = {
        name: '',
        email: '',
        password: ''
      };

      if (this.name) {
        Object.assign(this.form, { name: this.name });
      }
    };

    this.onUpdatePhoto = function(file) {
      const reader = new FileReader();

      if (file) {
        reader.readAsDataURL(file);
        reader.addEventListener('load', () => {
          this.preview = reader.result;
          $scope.$apply();
        }, { once: true });
      }
    };

    this.onRemovePhoto = function() {
      this.form.photo = null;
      this.preview = null;
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
