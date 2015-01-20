'use strict';

angular.module('jscrafts')
.controller('CraftsCtrl', ['$scope', 'CraftHttpService', function($scope, CraftHttpService) {
  
  CraftHttpService.getCrafts().then(
    function(resultData) {
      $scope.crafts = resultData.data;
    }
  );

}]);