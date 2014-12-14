'use strict';

var APIUrls = {
  allProjects: 'http://jenniferspry.com/API/projects.php',
  allCrafts: 'http://jenniferspry.com/API/crafts.php'
};

angular.module('jenniferSpry', [
  'ngRoute',
  'ngSanitize',
  'ui.bootstrap.transition',
  'ui.bootstrap.collapse',
  'wu.masonry'
])
.constant('APIUrls', APIUrls)
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html'
    })
    .when('/maker', {
      controller: 'MakerCtrl',
      templateUrl: 'views/maker.html'
    })
    .when('/illustrator', {
      controller: 'IllustratorCtrl',
      templateUrl: 'views/illustrator.html'
    })
    .when('/developer', {
      controller: 'DeveloperCtrl',
      templateUrl: 'views/developer.html'
    })
    .when('/impress', {
      templateUrl: 'views/impress.html'
    })
    .otherwise({redirectTo: '/home'});
}]);
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
'use strict';

angular.module('jenniferSpry')
.controller('DeveloperCtrl', ['$scope', 'ProjectHttpService', function($scope, ProjectHttpService) {

  // TODO: create alternative standard image for projects (by technology?)

  ProjectHttpService.getProjects().then(
    function(projects) {

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
'use strict';

angular.module('jenniferSpry')
.controller('IllustratorCtrl', function() {
  console.log('Illustrator');
});
'use strict';

angular.module('jenniferSpry')
.controller('MakerCtrl', ['$scope', 'CraftHttpService', function($scope, CraftHttpService) {
  
  CraftHttpService.getCrafts().then(
    function(crafts) {
      $scope.crafts = crafts;
      console.log(crafts);
    }
  );

}]);
'use strict';

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