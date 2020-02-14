import angular from 'angular';
import { databases } from './../../../firebase';

function OfferService($firebaseArray, AuthService, TaskService) {
  const ref = databases.offers();

  this.get = function(taskId) {
    return $firebaseArray(ref.child(taskId)).$loaded();
  };

  this.add = function(taskId, total) {
    const { uid, photoURL, displayName } = AuthService.isSignedIn();

    return $firebaseArray(ref.child(taskId)).$add({
      total,
      photoURL,
      displayName,
      uid
    });
  };

  this.remove = function(taskId, offerId) {
    return ref.child(taskId).child(offerId).remove();
  };

  this.isMaker = function(offer) {
    return AuthService.isSignedIn()?.uid === offer.uid;
  };

  this.accept = function(taskId, offerId, runner) {
    return ref.child(taskId).child(offerId).update({ assigned: true })
      .then(() => TaskService.update({ $id: taskId, status: 'assigned', runner }));
  };
}

angular
  .module('shared')
  .service('OfferService', OfferService);
