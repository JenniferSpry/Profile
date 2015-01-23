'use strict';

angular.module('jscrafts')
.service('CraftHttpService', ['$http', '$q', 'APIUrls', function($http, $q, APIUrls) {

  this.getCrafts = function() {
    var deferred = $q.defer();

    $http.get(APIUrls.allCrafts).then(
      function(response) {
        console.log(response);
        var result = response.data;

        deferred.resolve(result);
        
      }, function(response) {
        console.log('Error');
        console.log(response);
        deferred.reject();
      });

    return deferred.promise;
  };

  this.getCraft = function(id) {
    var deferred = $q.defer();

    $http.get(APIUrls.oneCraft+"?id="+id).then(
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

  this.getRandomCraft = function(amount, id) {
    var deferred = $q.defer();

    $http.get(APIUrls.randomCraft+"?amount="+amount+"&id="+id).then(
      function(response) {
        var result = response.data;

        deferred.resolve(result);
        
      }, function(response) {
        //console.log('Error');
        //console.log(response);
        deferred.reject(response);
      });

    return deferred.promise;
  };

}]);