angular
  .module('components.auth', [
    'ui.router',
    'firebase'
  ])
  .config(function ($firebaseRefProvider) {
    const firebaseConfig = {
      apiKey: '',
      authDomain: '',
      databaseURL: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
      appId: '',
      measurementId: ''
    };

    $firebaseRefProvider
      .registerUrl({
        default: firebaseConfig.databaseURL,
        contacts: `${firebaseConfig.databaseURL}/contacts`
      });

    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  })
  .run(function($transitions, $state, AuthService) {

    $transitions.onStart({
      to: function(state) {
        return !!(state.data && state.data.requiredAuth);
      }
    }, function() {
      return AuthService
        .requireAuthentication()
        .catch(() => $state.target('auth.login'));
    });

    $transitions.onStart({
      to: 'auth.*'
    }, function() {
      if (AuthService.isAuthenticated()) {
        return $state.target('app');
      }
    });

  });
