import angular from 'angular';
import './messages.component.scss';

const messages = {
  bindings: {
    task: '<'
  },
  template: require('./messages.component.html').default,
  controller: function(AuthService, MessageService) {
    this.$onInit = function() {
      this.isLoggedIn = AuthService.isSignedIn;
      this.messages = [];
      this.messagesRef = document.querySelector('.scroll-view');
    };

    this.$onChanges = function(changes) {
      if (changes.task) {
        this.getMessages(this.task?.$id);
      }
    };

    this.onSendMessage = function() {
      if (this.message && (!event || event?.keyCode === 13)) {
        MessageService.add(this.task.$id, this.message)
          .then(() => {
            this.message = '';
            this.messagesRef.scrollIntoView({ behavior: 'smooth'});
          });
      }
    };

    this.getMessages = function(id) {
      if (!id) { return; }

      MessageService.get(id)
        .then(messages => {
          this.messages = messages;
        });
    };
  }
};

angular
  .module('shared')
  .component('messages', messages);
