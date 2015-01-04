'use strict';

var APIUrls = {
  allProjects: 'http://jenniferspry.com/API/projects.php',
  allCrafts: 'http://jenniferspry.com/API/allcrafts.php',
  oneCraft: 'http://jenniferspry.com/API/craft.php'
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
    .when('/crafts', {
      controller: 'CraftsCtrl',
      templateUrl: 'js/crafts/views/allcrafts.html'
    })
    .when('/craft/:id', {
      controller: 'OneCraftCtrl',
      templateUrl: 'js/crafts/views/craft.html'
    })
    .when('/illustrator', {
      controller: 'IllustratorCtrl',
      templateUrl: 'js/illu/illustrator.html'
    })
    .when('/developer', {
      controller: 'DeveloperCtrl',
      templateUrl: 'js/developer/developer.html'
    })
    .when('/impress', {
      templateUrl: 'views/impress.html'
    })
    .otherwise({redirectTo: '/home'});
}]);