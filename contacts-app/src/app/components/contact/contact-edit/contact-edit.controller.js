function ContactEditController(ContactService, cfpLoadingBar, $window, $state) {
  const ctrl = this;

  ctrl.updateContact = function({ contact }) {
    cfpLoadingBar.start();

    ContactService
      .updateContact(contact)
      .finally(cfpLoadingBar.complete);
  };

  ctrl.deleteContact = function({ contact }) {
    const message = `Delete ${contact.name} from contacts?`;

    if (!$window.confirm(message)) { return; }

    cfpLoadingBar.start();

    ContactService
      .deleteContact(contact)
      .then(() => $state.go('contacts'))
      .finally(cfpLoadingBar.complete);
  };
}

angular
  .module('components.contact')
  .controller('ContactEditController', ContactEditController);
