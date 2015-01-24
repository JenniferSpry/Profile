'use strict';

angular.module('jscrafts')
.controller('CraftsCtrl', ['$scope', 'CraftHttpService', function($scope, CraftHttpService) {

    var pageDescription = "These are things I made.<br>I collect ideas on what I might craft next on <a href='http://www.pinterest.com/jennifersdiy/' target='_blank'>pinterest.";
  
  CraftHttpService.getCrafts().then(
    function(resultData) {
      $scope.crafts = resultData.data;
      $scope.crafts.unshift({title:pageDescription});
    }
  );

}]);