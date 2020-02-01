function ContactsController($state) {
  const ctrl = this;

  ctrl.goToContact = function({ id }) {
    $state.go('contact', { id });
  }
}

angular
  .module('components.contact')
  .controller('ContactsController', ContactsController);
