import angular from 'angular';
import './task-form.component.scss';

const taskForm = {
  bindings: {
    offer: '@',
    title: '@',
    task: '<',
    onSubmit: '&',
  },
  template: require('./task-form.component.html').default,
  controller: function() {
    this.$onInit = function() {
      this.disabled = false;
    };

    this.$onChanges = function(changes) {
      if (changes.task) {
        this.task = angular.copy(this.task);
      }
    };

    this.submit = function() {
      this.disabled = true;

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
