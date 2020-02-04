import angular from 'angular';

export const taskEdit = {
  template: require('./task-edit.component.html').default,
  controller: function() {

  }
};

angular
  .module('task')
  .component('taskEdit', taskEdit);