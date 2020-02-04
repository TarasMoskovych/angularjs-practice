import angular from 'angular';

export const taskBrowse = {
  template: require('./task-browse.component.html').default,
  controller: ['TaskService', function(TaskService) {
    this.$onInit = function() {
      this.tasks = TaskService.get();
    };
  }]
};

angular
  .module('task')
  .component('taskBrowse', taskBrowse);
