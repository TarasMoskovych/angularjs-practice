import angular from 'angular';

function NotificationService($mdToast) {
  this.show = function(text, delay = 3000) {
    $mdToast.show(
      $mdToast.simple()
      .textContent(text)
      .hideDelay(delay)
      .position('right')
    );
  };
}

angular
  .module('shared')
  .service('NotificationService', NotificationService);
