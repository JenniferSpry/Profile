'use strict';

angular.module('jscrafts')
.controller('OneCraftCtrl', function($scope, $routeParams, CraftHttpService) {
  
  CraftHttpService.getCraft($routeParams.id).then(
    function(craft) {
      $scope.craft = craft;
      //console.log(craft);
    }
  );

  CraftHttpService.getRandomCraft(3).then(
    function(data) {
      $scope.randomCrafts = data.data;
      console.log($scope.randomCrafts);
    },
    function (error) {
      console.log(error);
  });

});