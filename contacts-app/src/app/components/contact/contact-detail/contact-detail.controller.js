function ContactDetailController() {
  const ctrl = this;

  ctrl.$onInit = function() {
    ctrl.isNewContact = !ctrl.contact.$id
  };

  ctrl.saveContact = function() {
    ctrl.onSave({
      $event: {
        contact: ctrl.contact
      }
    });
  };

  ctrl.updateContact = function() {
    if (ctrl.isNewContact) { return; }

    ctrl.onUpdate({
      $event: {
        contact: ctrl.contact
      }
    });
  };

  ctrl.deleteContact = function() {
    ctrl.onDelete({
      $event: {
        contact: ctrl.contact
      }
    });
  };

  ctrl.tagChange = function({ tag }) {
    Object.assign(ctrl.contact, { tag });
    ctrl.updateContact();
  };
}

angular
  .module('components.contact')
  .controller('ContactDetailController', ContactDetailController);
