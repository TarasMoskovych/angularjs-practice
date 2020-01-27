var contactMethods = {
  template: `
    <div>
      <ul>
        <li>
          <a ui-sref="contact.phone">Phone</a>
        </li>
        <li>
          <a ui-sref="contact.email">Email</a>
        </li>
        <li>
          <a ui-sref="contact.post">Post</a>
        </li>
      </ul>
    </div>
  `
};

angular
  .module('contact')
  .component('contactMethods', contactMethods);
