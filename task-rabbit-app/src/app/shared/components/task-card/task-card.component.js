import angular from 'angular';
import './task-card.component.scss';

const taskCard = {
  bindings: {
    titleWrapperClass: '@',
    titleText: '@',
    tasks: '<'
  },
  template: require('./task-card.component.html').default
};

angular
  .module('shared')
  .component('taskCard', taskCard);
