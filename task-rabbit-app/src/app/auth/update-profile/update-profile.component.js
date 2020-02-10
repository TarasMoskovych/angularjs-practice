import angular from 'angular';

const updateProfile = {
  bindings: {
    name: '@',
    close: '&'
  },
  template: require('./update-profile.component.html').default,
  controller: function($scope, AuthService) {
    this.loading = false;

    this.onUpdate = function({ data }) {
      AuthService.updateUserProfile(data)
        .then(() => this.close())
        .finally(() => {
          this.loading = false;
          $scope.$apply();
        });
    };
  }
};

angular
  .module('auth')
  .component('updateProfile', updateProfile);
