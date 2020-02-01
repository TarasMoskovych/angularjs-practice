function ContactService(AuthService, $firebaseRef, $firebaseArray, $firebaseObject) {
  const ref = $firebaseRef.contacts;
  const uid = AuthService.getUser().uid;

  const getContactById = id => $firebaseObject(ref.child(uid).child(id));
  const getContacts = () => $firebaseArray(ref.child(uid));
  const createNewContact = contact => $firebaseArray(ref.child(uid)).$add(contact);
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
