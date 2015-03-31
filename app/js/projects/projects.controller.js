(function() {
  'use strict';

  angular.module('projects').controller('ProjectsController', ProjectsController);

  function ProjectsController($scope, ProjectsHttpService) {

    ProjectsHttpService.getProjects().then(
      function(responseData) {
        var projects = responseData.data;
        var rows = [];
        for (var i = 0; i < projects.length; i++) {
          if (!rows[Math.floor(i / 2)]) {
            rows[Math.floor(i / 2)] = [];
          }
          rows[Math.floor(i / 2)].push(projects[i]);
        }

        $scope.rows = rows;
      }
    );

  }

})();
