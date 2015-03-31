(function() {
  'use strict';

  var APIUrls = {
    allProjects: 'http://jenniferspry.com/API/projects.php',
    allCrafts: 'http://jenniferspry.com/API/allcrafts.php',
    allIllus: 'http://jenniferspry.com/API/allillus.php',
    oneCraft: 'http://jenniferspry.com/API/craft.php',
    randomCraft: 'http://jenniferspry.com/API/random_craft.php'
  };

  angular.module('jenniferSpry')
    .constant('APIUrls', APIUrls)
    .config(['$httpProvider', function($httpProvider) {
      // enable http caching
      $httpProvider.defaults.cache = true;
    }])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider
        .when('/home', {
          templateUrl: 'home.html'
        })
        .when('/crafts', {
          controller: 'AllCraftsController',
          templateUrl: 'js/crafts/all-crafts.html'
        })
        .when('/craft/:id', {
          controller: 'OneCraftController',
          templateUrl: 'js/crafts/one-craft.html'
        })
        .when('/illustrator', {
          controller: 'IllusController',
          templateUrl: 'js/illus/all-Illus.html'
        })
        .when('/projects', {
          controller: 'ProjectsController',
          templateUrl: 'js/projects/projects.html'
        })
        .when('/impress', {
          templateUrl: 'impress.html'
        })
        .otherwise({redirectTo: '/home'});
    }])
    .run(function($rootScope, $location) {
      $rootScope.$on('$locationChangeSuccess', function() {
        $rootScope.isHomePage = ($location.path() == '/home');
        $rootScope.isCollapsed = true;
      });
    });

})();
