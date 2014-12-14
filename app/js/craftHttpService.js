'use strict';

angular.module('jenniferSpry')
.service('CraftHttpService', ['$http', '$q', 'APIUrls', function($http, $q, APIUrls) {

  this.getCrafts = function() {
    var deferred = $q.defer();

    $http.get(APIUrls.allCrafts).then(
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