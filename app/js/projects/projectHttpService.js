'use strict';

angular.module('jenniferSpry')
.service('ProjectHttpService', ['$http', '$q', 'APIUrls', function($http, $q, APIUrls) {

  this.getProjects = function() {
    var deferred = $q.defer();

    $http.get(APIUrls.allProjects).then(
      function(response) {
        deferred.resolve(response.data);
      }, function(response) {
        console.log('Error');
        console.log(response);
        deferred.reject();
      });

    return deferred.promise;
    };

}]);