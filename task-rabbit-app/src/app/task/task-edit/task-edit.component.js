import angular from 'angular';

export const taskEdit = {
  bindings: {
    task: '<',
    close: '&'
  },
  template: require('./task-edit.component.html').default,
  controller: function(TaskService) {

    this.editTask = function({ data }) {
      TaskService.update(data)
        .then(() => this.close());
    };
  }
};

angular
  .module('task')
  .component('taskEdit', taskEdit);