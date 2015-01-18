'use strict';

angular.module('jscrafts')
.controller('OneCraftCtrl', function($scope, $routeParams, CraftHttpService) {
  
  CraftHttpService.getCraft($routeParams.id).then(
    function(craft) {
      $scope.craft = craft;
    }
  );

  CraftHttpService.getRandomCraft(3, $routeParams.id).then(
    function(data) {
      $scope.randomCrafts = data.data;
    },
    function (error) {
      console.log(error);
  });

});