import angular from 'angular';
import { databases } from './../../firebase';
import { generateAvatar } from './../../helpers';

function AuthService($rootScope, $location) {
  const auth = databases.auth();
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

  const updatePassword = ({ email, password, oldPassword }) => {
    return login(email, oldPassword).then(() => auth.currentUser.updatePassword(password));
  };

  const isSignedIn = () => auth.currentUser;

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
    updatePassword,
    isSignedIn
  };
}

angular
  .module('shared')
  .factory('AuthService', AuthService);
