(function() {
  'use strict';

  angular.module('crafts').controller('AllCraftsController', AllCraftsController);

  function AllCraftsController($scope, CraftsHttpService, Lightbox) {

    var pageDescription = 'These are things I made.<br>I collect ideas on what I might craft next on <a href="http://www.pinterest.com/jennifersdiy/" target="_blank">pinterest.';
    
    CraftsHttpService.getCrafts().then(
      function(resultData) {
        $scope.crafts = resultData.data;
        $scope.crafts.unshift({title:pageDescription});
      }
    );

    // $scope.openLightboxModal = function(index) {
    //   Lightbox.openModal($scope.crafts, index);
    // };

  }

})();
