'use strict';

angular.module('jscrafts')
.controller('CraftsCtrl', ['$scope', 'CraftHttpService', function($scope, CraftHttpService) {
  
  CraftHttpService.getCrafts().then(
    function(crafts) {
      $scope.crafts = crafts;
    }
  );

}]);