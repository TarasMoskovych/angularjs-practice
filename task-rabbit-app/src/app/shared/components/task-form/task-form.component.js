import angular from 'angular';
import './task-form.component.scss';

const taskForm = {
  bindings: {
    title: '@',
    onSubmit: '&',
  },
  template: require('./task-form.component.html').default,
  controller: function() {
    this.$onInit = function() {
      this.task = {
        title: '',
        description: '',
        total: ''
      };
    };

    this.submit = function() {
      this.onSubmit({
        $event: {
          data: this.task
        }
      });
    };
  }
};

angular
  .module('shared')
  .component('taskForm', taskForm);
