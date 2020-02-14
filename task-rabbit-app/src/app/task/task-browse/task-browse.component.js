import angular from 'angular';
import './task-browse.component.scss';

export const taskBrowse = {
  template: require('./task-browse.component.html').default,
  controller: function(
    $routeParams,
    $scope,
    $mdDialog,
    $mdSidenav,
    AuthService,
    TaskService,
    NotificationService,
    OfferService
  ) {
    this.isCreator = false;
    this.isAssignee = false;
    this.isLoggedIn = AuthService.isSignedIn;
    this.isMaker = OfferService.isMaker;
    this.empty = false;
    this.isOfferred = false;
    this.loading = true;
    this.selectedTask = null;
    this.offers = [];

    this.$onInit = function() {
      this.getTask($routeParams.taskId);
      this.getTasks();
    };

    $scope.$on('$routeUpdate', (e, { params }) => {
      this.getTask(params.taskId);
    });

    this.getTask = function(taskId) {
      if (!taskId) { return; }

      this.offers = [];
      TaskService.getById(taskId)
        .then(selectedTask => {
          this.selectedTask = selectedTask;
          this.isCreator = TaskService.isCreator(selectedTask);
          this.isAssignee = TaskService.isAssignee(selectedTask);
          this.getOffers(selectedTask.$id);
        });
    };

    this.getTasks = function() {
      TaskService.get()
        .then(tasks => this.tasks = tasks)
        .finally(() => this.loading = false);
    };

    this.getOffers = function(id) {
      OfferService.get(id)
        .then(offers => {
          this.offers = offers;
          this.isOfferred = offers.some(offer => offer.uid === this.isLoggedIn()?.uid);
        });
    };

    this.onUpdateTask = function() {
      $mdDialog.show({
        template: `<task-edit task="task" close="close();"></task-edit>`,
        clickOutsideToClose: true,
        locals: { task: this.selectedTask, close: this.closeModal },
        controller: function($scope, task, close) {
          $scope.task = task;
          $scope.close = close;
        }
      });
    };

    this.onCompleteTask = function() {
      TaskService.complete(this.selectedTask.$id)
        .then(() => NotificationService.show('Task was completed'));
    };

    this.onCancelTask = function() {
      TaskService.remove(this.selectedTask.$id)
        .then(() => {
          NotificationService.show(`${this.selectedTask.title} was completed.`);
        });
    };

    this.onOpenMessages = function() {
      $mdSidenav('messages').toggle();
    };

    this.openMakeOfferModal = function() {
      $mdDialog.show({
        template: `<task-form on-submit="onSubmit($event)" task="task" title="make offer" offer="true"></task-form>`,
        clickOutsideToClose: true,
        locals: { task: this.selectedTask, onSubmit: this.onMakeOffer.bind(this) },
        controller: function($scope, task, onSubmit) {
          $scope.task = task;
          $scope.onSubmit = onSubmit;
        }
      });
    };

    this.onMakeOffer = function({ data }) {
      OfferService.add(data.$id, data.total)
        .then(() => {
          this.closeModal();
          this.isOfferred = true;
        });
    };

    this.onAcceptOffer = function({ $id, uid }) {
      OfferService.accept(this.selectedTask.$id, $id, uid)
        .then(() => NotificationService.show(`The offer has been placed.`));
    };

    this.onCancelOffer = function(offerId) {
      OfferService.remove(this.selectedTask.$id, offerId)
        .then(() => {
          this.isOfferred = false;
          $scope.$apply();
        });
    };

    this.closeModal = function() {
      $mdDialog.hide();
    };
  }
};

angular
  .module('task')
  .component('taskBrowse', taskBrowse);
