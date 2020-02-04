import angular from 'angular';

export const taskPost = {
  template: require('./task-post.component.html').default,
  controller: ['$location', 'TaskService',
    function($location, TaskService) {
      this.$onInit = function() {
        this.task = {
          title: '',
          description: '',
          total: ''
        };
      };

      this.postTask = function() {
        TaskService.add(this.task)
          .then(() => $location.path('/browse'));
      };
    }]
};

angular
  .module('task')
  .component('taskPost', taskPost);
