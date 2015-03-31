(function() {
  'use strict';

  angular.module('crafts').controller('OneCraftController', OneCraftController);

  function OneCraftController($scope, $routeParams, CraftsHttpService) {
    
    CraftsHttpService.getCraft($routeParams.id).then(
      function(responseData) {
        $scope.craft = responseData.data;
      }
    );

    CraftsHttpService.getRandomCraft(3, $routeParams.id).then(
      function(responseData) {
        $scope.randomCrafts = responseData.data;
      },
      function(error) {
        console.log(error);
      });
  }

})();
