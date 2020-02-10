import angular from 'angular';
import { databases } from './../../firebase';
import { generateAvatar } from './../../helpers';

function AuthService($rootScope, $location) {
  const auth = databases.auth();
  const storage = databases.storage();
  const users = databases.users();

  const login = ({ email, password }) => auth.signInWithEmailAndPassword(email, password);

  const register = ({ name, email, password }) => {
    return auth.createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        user.sendEmailVerification();
        return user.updateProfile({
          displayName: name,
          photoURL: generateAvatar(user.uid)
        })
        .then(() => {
          const { displayName, email, photoURL } = user;
          return users
            .child(user.uid)
            .set({ displayName, email, photoURL });
        });
      });
  };

  const logout = () => auth.signOut();

  const updateUserProfile = ({ name, photo }) => {
    const { uid } = auth.currentUser;

    const _updateProfile = (photoURL = null) => {
      const obj = { displayName: name };

      if (photoURL) { Object.assign(obj, { photoURL }); }

      return auth.currentUser.updateProfile(obj).then(() => users.child(uid).update(obj));
    };

    if (!photo) { return _updateProfile(); }

    return storage
      .child(`avatars/user-${uid}`)
      .put(photo, { contentType: 'image/jpeg' })
      .then(snapshot => snapshot.ref.getDownloadURL().then(downloadURL => _updateProfile(downloadURL)));
  };

  const isSignedIn = () => auth.currentUser;

  const redirect = () => {
    if (auth.currentUser) {
      $location.path('/browse');
    }
  };

  auth.onAuthStateChanged(authData => {
    if (authData?.emailVerified) {
      $rootScope.$emit('authStateChanged', authData);
      $location.path('/browse');
      $rootScope.$apply();
    } else {
      $rootScope.$emit('authStateChanged', null);
    }
  });

  return {
    login,
    register,
    logout,
    updateUserProfile,
    isSignedIn,
    redirect
  };
}

angular
  .module('shared')
  .factory('AuthService', AuthService);
