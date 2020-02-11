import angular from 'angular';
import './task-form.component.scss';

const taskForm = {
  bindings: {
    title: '@',
    task: '<',
    onSubmit: '&',
  },
  template: require('./task-form.component.html').default,
  controller: function() {
    this.$onChanges = function(changes) {
      if (changes.task) {
        this.task = angular.copy(this.task);
      }
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
