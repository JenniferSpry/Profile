'use strict';

var APIUrls = {
  allProjects: 'http://jenniferspry.com/API/projects.php',
  allCrafts: 'http://jenniferspry.com/API/allcrafts.php',
  allIllus: 'http://jenniferspry.com/API/allillus.php',
  oneCraft: 'http://jenniferspry.com/API/craft.php',
  randomCraft: 'http://jenniferspry.com/API/random_craft.php',
};

angular.module('jenniferSpry', [
  'ngRoute',
  'ngSanitize',
  'ngAnimate',
  'ui.bootstrap.transition',
  'ui.bootstrap.collapse',
  'wu.masonry',
  'angular-loading-bar',
  'jscrafts'
])
.constant('APIUrls', APIUrls)
.config(['$httpProvider', function ($httpProvider) {
      // enable http caching
     $httpProvider.defaults.cache = true;
}])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: '_home.html'
    })
    .when('/crafts', {
      controller: 'CraftsCtrl',
      templateUrl: 'js/crafts/_allcrafts.html'
    })
    .when('/craft/:id', {
      controller: 'OneCraftCtrl',
      templateUrl: 'js/crafts/_craft.html'
    })
    .when('/illustrator', {
      controller: 'IllustratorCtrl',
      templateUrl: 'js/illu/_allIllus.html'
    })
    .when('/projects', {
      controller: 'ProjectsCtrl',
      templateUrl: 'js/projects/_projects.html'
    })
    .when('/impress', {
      templateUrl: '_impress.html'
    })
    .otherwise({redirectTo: '/home'});
}])
.run(function ($rootScope, $location) {
  $rootScope.$on('$locationChangeSuccess', function () {
    $rootScope.isHomePage = ($location.path() == '/home');
    $rootScope.isCollapsed = true;
  });
});