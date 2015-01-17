'use strict';

angular.module('jscrafts')
.directive('randomCrafts', function() {
  return {
      restrict: 'E',
      replace: 'true',
      templateUrl: 'js/crafts/_dirRandomCrafts.html',
      scope: {
      	crafts: "="
      }
  };
});