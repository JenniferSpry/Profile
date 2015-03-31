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
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'home.html'
        })
        .state('crafts', {
          url: '/crafts',
          controller: 'AllCraftsController',
          templateUrl: 'js/crafts/all-crafts.html'
        })
        .state('singleCraft', {
          url:'/craft/:craftId',
          controller: 'OneCraftController',
          templateUrl: 'js/crafts/one-craft.html'
        })
        .state('illustrator', {
          url: '/illustrator',
          controller: 'IllusController',
          templateUrl: 'js/illus/all-Illus.html'
        })
        .state('projects', {
          url: '/projects',
          controller: 'ProjectsController',
          templateUrl: 'js/projects/projects.html'
        })
        .state('impress', {
          url: 'impress',
          templateUrl: 'impress.html'
        });
      $urlRouterProvider.otherwise('/home');
    })
    .run(function($rootScope, $location) {
      $rootScope.$on('$locationChangeSuccess', function() {
        $rootScope.isHomePage = ($location.path() == '/home');
        $rootScope.isCollapsed = true;
      });
    });

})();
