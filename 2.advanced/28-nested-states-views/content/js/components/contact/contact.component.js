var contact = {
  template: `
    <div class="contact">
      How would you like to contact me?
      <div class="tabs">
        <a ui-sref="contact">Phone</a>
        <a ui-sref="contact.email">Email</a>
      </div>
      <div ui-view></div>
    </div>
  `
};

angular
  .module('contact')
  .component('contact', contact)
  .config(function ($stateProvider) {
    $stateProvider
      .state('contact', {
        redirectTo: 'contact.phone',
        url: '/contact',
        component: 'contact'
      });
  });
