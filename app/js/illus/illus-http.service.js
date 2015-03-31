(function() {
  'use strict';

  angular.module('illus').service('IllusHttpService', IllusHttpService) ;

  function IllusHttpService($http, $q, APIUrls) {

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

  }

})();
