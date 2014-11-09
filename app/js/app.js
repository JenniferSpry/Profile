var APIUrls = {
  allProjects: 'http://jenniferspry.com/API/projects.php',
  allCrafts: 'http://jenniferspry.com/API/crafts.php'
}

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
      templateUrl: 'views/impress.html',
    })
    .otherwise({redirectTo: '/home'});
}]);