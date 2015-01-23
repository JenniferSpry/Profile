'use strict';

angular.module('jscrafts')
.controller('OneCraftCtrl', function($scope, $routeParams, CraftHttpService) {
  
  CraftHttpService.getCraft($routeParams.id).then(
    function(responseData) {
      $scope.craft = responseData.data;
      console.log($scope.craft);
    }
  );

  CraftHttpService.getRandomCraft(3, $routeParams.id).then(
    function(responseData) {
      $scope.randomCrafts = responseData.data;
    },
    function (error) {
      console.log(error);
  });

});