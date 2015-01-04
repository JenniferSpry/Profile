'use strict';

angular.module('jenniferSpry')
.controller('IllustratorCtrl', ['$scope', 'IlluHttpService', function($scope, IlluHttpService) {
 
  IlluHttpService.getIllus().then(
    function(illus) {
      $scope.illus = illus;
    }
  );

}]);