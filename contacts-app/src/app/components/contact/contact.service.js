function ContactService(AuthService, $firebaseRef, $firebaseArray, $firebaseObject) {
  const ref = $firebaseRef.contacts;

  const getContactById = id => $firebaseObject(ref.child(AuthService.getUser().uid).child(id));
  const getContacts = () => $firebaseArray(ref.child(AuthService.getUser().uid));
  const createNewContact = contact => $firebaseArray(ref.child(AuthService.getUser().uid)).$add(contact);
  const updateContact = contact => contact.$save();
  const deleteContact = contact => contact.$remove();

  return {
    getContactById,
    getContacts,
    createNewContact,
    updateContact,
    deleteContact
  };
}

angular
  .module('components.contact')
  .factory('ContactService', ContactService);
