const contacts = {
  bindings: {
    contacts: '<',
    filter: '<'
  },
  templateUrl: './contacts.html',
  controller: 'ContactsController'
};

angular
  .module('components.contact')
  .component('contacts', contacts)
  .config(function($stateProvider) {
    $stateProvider
      .state('contacts', {
        parent: 'app',
        url: '/contacts?filter',
        component: 'contacts',
        resolve: {
          contacts: function(ContactService) {
            return ContactService.getContacts().$loaded();
          },
          filter: function($transition$) {
            return $transition$.params();
          }
        }
      });
  });
