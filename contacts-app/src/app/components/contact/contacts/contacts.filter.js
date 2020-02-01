function contactsFilter() {
  return function(collection, params) {
    return collection.filter(contact => {
      return contact.tag === (!params.filter ? contact.tag : params.filter);
    });
  }
}

angular
  .module('components.contact')
  .filter('contactsFilter', contactsFilter);
