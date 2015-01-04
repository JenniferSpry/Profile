'use strict';

angular.module('jenniferSpry')
.service('IlluHttpService', ['$http', '$q', 'APIUrls', function($http, $q, APIUrls) {

  this.getIllus = function() {
    var deferred = $q.defer();

    $http.get(APIUrls.allIllus).then(
      function(response) {
        var result = response.data;

        deferred.resolve(result);
        
      }, function(response) {
        console.log('Error');
        console.log(response);
        deferred.reject();
      });

    return deferred.promise;
  };

}]);