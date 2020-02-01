function ContactController() {
  const ctrl = this;

  ctrl.selectContact = function() {
    ctrl.onSelect({
      $event: {
        id: ctrl.contact.$id
      }
    });
  };
}

angular
  .module('components.contact')
  .controller('ContactController', ContactController);
