var contact = {
  template: `
    <div class="contact">
      <div class="contact-methods">
        <h3>How would you like to contact me?</h3>
        <ul>
          <li>
            <a ui-sref="contact">Phone</a>
          </li>
          <li>
            <a ui-sref="contact.email">Email</a>
          </li>
        </ul>
      </div>
      <div class="contact-details" ui-view></div>
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
