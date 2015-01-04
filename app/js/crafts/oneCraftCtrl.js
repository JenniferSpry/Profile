'use strict';

angular.module('jenniferSpry')
.controller('OneCraftCtrl', ['$scope', '$routeParams', 'CraftHttpService', function($scope, $routeParams, CraftHttpService) {
  
  CraftHttpService.getCraft($routeParams.id).then(
    function(craft) {
      $scope.craft = craft;
      console.log(craft);
    }
  );

}]);