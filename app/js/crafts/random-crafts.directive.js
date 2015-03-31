(function() {
  'use strict';

  angular.module('crafts').directive('spryRandomCrafts', spryRandomCrafts);

  function spryRandomCrafts() {
    return {
      restrict: 'E',
      replace: 'true',
      templateUrl: 'js/crafts/random-crafts.html',
      scope: {
        crafts: '='
      }
    };
  }

})();
