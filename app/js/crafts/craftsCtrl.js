'use strict';

angular.module('jenniferSpry')
.controller('CraftsCtrl', ['$scope', 'CraftHttpService', function($scope, CraftHttpService) {
  
  CraftHttpService.getCrafts().then(
    function(crafts) {
      $scope.crafts = crafts;
    }
  );

}]);