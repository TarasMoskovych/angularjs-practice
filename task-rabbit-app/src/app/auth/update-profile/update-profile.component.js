import angular from 'angular';

const updateProfile = {
  bindings: {
    name: '@'
  },
  template: require('./update-profile.component.html').default,
  controller: function() {

    this.onUpdate = function() {
    };
  }
};

angular
  .module('auth')
  .component('updateProfile', updateProfile);
