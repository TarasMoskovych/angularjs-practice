angular
  .module('common', [
    'ui.router',
    'angular-loading-bar',
    'ngMessages'
  ])
  .run(function($transitions, $rootScope, cfpLoadingBar) {
    $transitions.onStart({
      to: function(state) {
        $rootScope.$emit('stateChange', state.name);
      }
    }, function() {
      cfpLoadingBar.start();
    });
    $transitions.onSuccess({}, cfpLoadingBar.complete);
  });
