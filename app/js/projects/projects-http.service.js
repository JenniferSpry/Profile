(function() {
  'use strict';

  angular.module('projects').service('ProjectsHttpService', ProjectsHttpService);

  function ProjectsHttpService($http, $q, APIUrls) {

    this.getProjects = function() {
      var deferred = $q.defer();

      $http.get(APIUrls.allProjects).then(
        function(response) {
          console.log(response);
          deferred.resolve(response.data);
        }, function(response) {
          console.log('Error');
          console.log(response);
          deferred.reject();
        });

      return deferred.promise;
    };

  }

})();
