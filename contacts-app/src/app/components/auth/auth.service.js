function AuthService($firebaseAuth) {
  const auth = $firebaseAuth();
  let authData = null;

  const storeAuthData = response => {
    authData = response;
    return authData;
  };

  const clearAuthData = () => {
    authData = null;
  };

  const onSignIn = response => {
    authData = response;
    return auth.$requireSignIn();
  };

  this.register = function({ email, password }) {
    return auth
      .$createUserWithEmailAndPassword(email, password)
      .then(storeAuthData);
  };

  this.login = function({ email, password }) {
    return auth
      .$signInWithEmailAndPassword(email, password)
      .then(storeAuthData);
  };

  this.logout = function() {
    return auth
      .$signOut()
      .then(clearAuthData);
  }

  this.requireAuthentication = function() {
    return auth
      .$waitForSignIn()
      .then(onSignIn);
  };

  this.isAuthenticated = function() {
    return !!authData;
  };

  this.getUser = function() {
    if (authData) {
      return authData;
    }
  }
}

angular
  .module('components.auth')
  .service('AuthService', AuthService);
