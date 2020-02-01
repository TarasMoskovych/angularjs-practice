function lengthCheck() {
  return {
    restrict: 'A',
    require: 'ngModel',
    compile: function($element) {
      $element.addClass('dynamic-input');

      return function($scope, $element, $attrs, $ctrl) {
        const dynamicClass = 'dynamic-input--no-contents';

        $scope.$watch(function() {
          return $ctrl.$viewValue;
        }, function(newValue) {
          newValue ? $element.removeClass(dynamicClass) : $element.addClass(dynamicClass);
        });
      }
    }
  };
}

angular
  .module('components.contact')
  .directive('lengthCheck', lengthCheck);
