'use strict';

angular.module('jenniferSpry')
.controller('ProjectsCtrl', ['$scope', 'ProjectHttpService', function($scope, ProjectHttpService) {

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