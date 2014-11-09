angular.module('jenniferSpry')
.service('ProjectHttpService', ['$http', '$q', 'APIUrls', function($http, $q, APIUrls) {


  function parseProject(data){

  }

  this.getProjects = function() {
    var deferred = $q.defer();

    $http.get(APIUrls.allProjects).then(
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