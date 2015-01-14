'use strict';

angular.module('jenniferSpry')
.controller('OneCraftCtrl', function($scope, $routeParams, CraftHttpService) {
  
  CraftHttpService.getCraft($routeParams.id).then(
    function(craft) {
      $scope.craft = craft;
      //console.log(craft);
    }
  );

  CraftHttpService.getRandomCraft(3).then(
    function(crafts) {
      $scope.randomCrafts = crafts;
      console.log($scope.randomCrafts);
    },
    function (error) {
      console.log(error);
  });

});