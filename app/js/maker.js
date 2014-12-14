'use strict';

angular.module('jenniferSpry')
.controller('MakerCtrl', ['$scope', 'CraftHttpService', function($scope, CraftHttpService) {
  
  CraftHttpService.getCrafts().then(
    function(crafts) {
      $scope.crafts = crafts;
      console.log(crafts);
    }
  );

}]);