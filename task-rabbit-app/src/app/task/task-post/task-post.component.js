import angular from 'angular';
import './task-post.component.scss';

export const taskPost = {
  bindings: {
    close: '&'
  },
  template: require('./task-post.component.html').default,
  controller: function(TaskService) {
    this.$onInit = function() {
      this.task = {
        title: '',
        description: '',
        total: ''
      };
    };

    this.postTask = function({ data }) {
      TaskService.add(data)
        .then(() => this.close());
    };
  }
};

angular
  .module('task')
  .component('taskPost', taskPost);
