import angular from 'angular';
import './task-browse.component.scss';
import taskIcon from './../../../assets/task.png';

export const taskBrowse = {
  template: require('./task-browse.component.html').default,
  controller: function(TaskService) {
    this.loading = true;

    this.$onInit = function() {
      this.getTasks();
      this.taskIcon = taskIcon;
    };

    this.getTasks = function() {
      TaskService.get()
        .then(tasks => this.tasks = tasks)
        .finally(() => this.loading = false);
    };
  }
};

angular
  .module('task')
  .component('taskBrowse', taskBrowse);
