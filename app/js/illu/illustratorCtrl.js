'use strict';

angular.module('jenniferSpry')
.controller('IllustratorCtrl', ['$scope', 'IlluHttpService', function($scope, IlluHttpService) {

  var pageDescription = "I grew up always creating fanart for Sailor Moon and Dragon Ball. In 2007 I was given the opportunity to draw a cover for a school book. Since then I have been illustrating on the side. My most ambitious and extensive project was the illustration for the ipad maths app <a href='http://clevermath.de/en/' target='_blank'>CleverMath</a>.";
 
  IlluHttpService.getIllus().then(
    function(responseData) {
      $scope.illus = responseData.data;
      $scope.illus.unshift({title:pageDescription});
    }
  );

}]);