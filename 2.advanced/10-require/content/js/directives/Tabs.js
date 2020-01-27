function tabs() {
  return {
    transclude: true,
    template: `
      <div class="tabs">
        <ul class="tabs__list" ng-keyup="tabs.changeTab($event)">
          <li
            tabindex="{{ tab.selected ? '0' : '-1' }}"
            ng-repeat="tab in tabs.list" ng-class="tab.selected ? 'tabs--selected' : ''">

            <a href="" ng-click="tabs.selectTab($index);">
              {{ tab.label }}
            </a>
          </li>
        </ul>
        <div class="tabs__content" ng-transclude></div>
      </div>
    `,
    controller: function () {
      var ctrl = this;
      ctrl.list = [];
      ctrl.selected = 0;

      ctrl.addTab = function (tab) {
        ctrl.list.push(tab);

        ctrl.list.forEach((item, idx) => {
          if (item.selected) {
            ctrl.selected = idx;
          }
        });
      };
      ctrl.selectTab = function (index) {
        ctrl.list.forEach(function (tab) {
          tab.selected = false;
        });
        ctrl.list[index].selected = true;
        ctrl.selected = index;
      };
      ctrl.changeTab = function (event) {
        if (event.keyCode === 39 && !!ctrl.list[ctrl.selected + 1]) {
          ctrl.selectTab(ctrl.selected + 1);
        }
        if (event.keyCode === 37 && !!ctrl.list[ctrl.selected - 1]) {
          ctrl.selectTab(ctrl.selected - 1);
        }
      };
    },
    controllerAs: 'tabs'
  }
}

angular
  .module('app')
  .directive('tabs', tabs);
