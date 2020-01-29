angular
  .module('common', [
    'ui.router',
    'angular-loading-bar',
    'ngMessages'
  ])
  .run(function($transitions, cfpLoadingBar) {
    $transitions.onStart({}, cfpLoadingBar.start);
    $transitions.onSuccess({}, cfpLoadingBar.complete);
  });
