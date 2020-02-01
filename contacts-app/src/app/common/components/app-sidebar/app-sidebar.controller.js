function AppSidebarController() {
  const ctrl = this;

  ctrl.contactTags = [
    {
      label: 'all',
      icon: 'star'
    },
    {
      label: 'friends',
      icon: 'people'
    },
    {
      label: 'family',
      icon: 'child_care'
    },
    {
      label: 'acquaintances',
      icon: 'accessibility'
    },
    {
      label: 'following',
      icon: 'remove_red_eye'
    }
  ];
}

angular
  .module('common')
  .controller('AppSidebarController', AppSidebarController);
