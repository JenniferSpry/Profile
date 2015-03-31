(function() {
  'use strict';

  angular.module('crafts').controller('OneCraftController', OneCraftController);

  function OneCraftController($scope, $stateParams, CraftsHttpService) {
    
    CraftsHttpService.getCraft($stateParams.craftId).then(
      function(responseData) {
        $scope.craft = responseData.data;
      }
    );

    CraftsHttpService.getRandomCraft(3, $stateParams.craftId).then(
      function(responseData) {
        $scope.randomCrafts = responseData.data;
      },
      function(error) {
        console.log(error);
      });
  }

})();
