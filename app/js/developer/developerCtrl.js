'use strict';

angular.module('jenniferSpry')
.controller('DeveloperCtrl', ['$scope', 'ProjectHttpService', function($scope, ProjectHttpService) {

  // TODO: create alternative standard image for projects (by technology?)

  ProjectHttpService.getProjects().then(
    function(responseData) {
      console.log(responseData);
      var projects = responseData.data;
      var rows = [];
      for (var i = 0; i < projects.length; i++){
        if (!rows[Math.floor(i/2)]) {
          rows[Math.floor(i/2)] = [];
        }
        rows[Math.floor(i/2)].push(projects[i]);
      }

      $scope.rows = rows;
    }
  );

}]);