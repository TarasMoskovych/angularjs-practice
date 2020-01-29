const appSidevar = {
  templateUrl: './app-sidebar.html',
  controller: 'AppSidebarController'
};

angular
  .module('common')
  .component('appSidebar', appSidevar);
