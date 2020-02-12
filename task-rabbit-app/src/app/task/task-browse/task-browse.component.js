import angular from 'angular';
import './task-browse.component.scss';

export const taskBrowse = {
  template: require('./task-browse.component.html').default,
  controller: function($routeParams, $scope, $mdDialog, AuthService, TaskService, NotificationService, MessageService) {
    this.admin = false;
    this.isLoggedIn = AuthService.isSignedIn;
    this.empty = false;
    this.loading = true;
    this.selectedTask = null;
    this.messages = [];

    this.$onInit = function() {
      this.getTask($routeParams.taskId);
      this.getTasks();
    };

    $scope.$on('$routeUpdate', (e, { params }) => {
      this.getTask(params.taskId);
    });

    this.getTask = function(taskId) {
      if (taskId) {
        TaskService.getById(taskId)
          .then(selectedTask => {
            this.selectedTask = selectedTask;
            this.admin = TaskService.isCreator(selectedTask);
            this.getMessages(selectedTask.$id);
          });
      }
    };

    this.getMessages = function(taskId) {
      MessageService.get(taskId)
        .then(messages => this.messages = messages);
    };

    this.getTasks = function() {
      TaskService.get()
        .then(tasks => {
          this.tasks = tasks;
          this.calculateOpenedTasks();
        })
        .finally(() => this.loading = false);
    };

    this.onUpdate = function() {
      const close = () => $mdDialog.hide();

      $mdDialog.show({
        template: `<task-edit task="task" close="close();"></task-edit>`,
        clickOutsideToClose: true,
        locals: { task: this.selectedTask, close },
        controller: function($scope, task, close) {
          $scope.task = task;
          $scope.close = close;
        }
      });
    };

    this.onCancel = function() {
      TaskService.remove(this.selectedTask.$id)
        .then(() => {
          this.calculateOpenedTasks();
          NotificationService.show(`${this.selectedTask.title} was completed.`);
        });
    };

    this.calculateOpenedTasks = function() {
      this.empty = this.tasks.filter(task => task.status === 'open').length;
    };

    this.onSendMessage = function(event) {
      if (this.message && (!event || event?.keyCode === 13)) {
        MessageService.add(this.selectedTask.$id, this.message)
          .then(() => this.message = '');
      }
    };
  }
};

angular
  .module('task')
  .component('taskBrowse', taskBrowse);
