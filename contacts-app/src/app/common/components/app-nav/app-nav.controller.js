function AppNavController($rootScope, $state) {
  const ctrl = this;

  const onStateChangeSub = $rootScope.$on('stateChange', function(event, state) {
    ctrl.isNewContact = state === 'new';
  });

  ctrl.$onInit = function() {
    ctrl.isNewContact = $state.current.name === 'new';
  };

  ctrl.$onDestroy = onStateChangeSub;
}

angular
  .module('common')
  .controller('AppNavController', AppNavController);
